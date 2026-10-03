import path from "node:path";
import { Command } from "commander";
import fs from "fs-extra";
import ora from "ora";
import { z } from "zod";

import { BASES, type BaseName } from "../utils/config";
import {
  REGISTRY_INDEX_FILE,
  REGISTRY_ITEM_SCHEMA_URL,
  REGISTRY_SCHEMA_URL,
} from "../utils/constants";
import { error, success } from "../utils/logger";
import { dependenciesFromSource } from "../utils/registry";

const sourceIndexSchema = z.object({
  name: z.string(),
  homepage: z.string().optional(),
  items: z.array(
    z.object({
      name: z.string(),
      type: z.string().default("registry:ui"),
      title: z.string().optional(),
      description: z.string().optional(),
      dependencies: z.array(z.string()).optional(),
      registryDependencies: z.array(z.string()).optional(),
    })
  ),
});

const existingItemSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    dependencies: z.array(z.string()).optional(),
    registryDependencies: z.array(z.string()).optional(),
    files: z.array(z.object({ content: z.string().optional() })).optional(),
  })
  .passthrough();

function resolveSourceFile(cwd: string, name: string, base: BaseName) {
  const candidates = [
    path.join(cwd, "components/cubix", base, `${name}.tsx`),
    path.join(cwd, "components/cubix/base", `${name}.tsx`),
    path.join(cwd, "components/cubix", `${name}.tsx`),
  ];
  return candidates.find((candidate) => fs.existsSync(candidate)) ?? null;
}

async function readExistingItem(file: string) {
  if (!(await fs.pathExists(file))) return null;
  return existingItemSchema.parse(await fs.readJson(file));
}

async function writeJson(file: string, data: unknown) {
  await fs.writeJson(file, data, { spaces: 2 });
  await fs.appendFile(file, "\n");
}

export const buildCommand = new Command()
  .name("build")
  .description("build components for a Cubix registry")
  .argument("[registry]", "path to the source registry.json", "./registry.json")
  .option("-o, --output <path>", "destination directory for JSON files", "./public/r")
  .option("-c, --cwd <cwd>", "the working directory", process.cwd())
  .option("-b, --base <base>", "base variant source to embed", "base")
  .action(async (registryArg: string, opts) => {
    const cwd = path.resolve(opts.cwd);
    const outputDir = path.resolve(cwd, opts.output);
    const sourcePath = path.resolve(cwd, registryArg);
    const base = String(opts.base) as BaseName;

    if (!BASES.includes(base)) {
      error(`Invalid base "${opts.base}". Use one of: ${BASES.join(", ")}`);
      process.exit(1);
    }

    const spinner = ora("Building registry items with embedded source...").start();
    try {
      if (!(await fs.pathExists(sourcePath))) {
        throw new Error(`Registry source not found: ${sourcePath}`);
      }

      const source = sourceIndexSchema.parse(await fs.readJson(sourcePath));
      await fs.ensureDir(outputDir);

      const indexItems = [];
      for (const item of source.items) {
        const itemPath = path.join(outputDir, `${item.name}.json`);
        const existing = await readExistingItem(itemPath);
        const sourceFile = resolveSourceFile(cwd, item.name, base);
        const content = (
          sourceFile
            ? await fs.readFile(sourceFile, "utf8")
            : existing?.files?.[0]?.content
        )?.replace(/\r\n/g, "\n");

        if (!content) {
          spinner.warn(`Skipping ${item.name} (no source for base "${base}")`);
          spinner.start();
          continue;
        }

        const target = `components/cubix/${item.name}.tsx`;
        const title = item.title ?? existing?.title;
        const description = item.description ?? existing?.description;
        const dependencies = dependenciesFromSource(
          content,
          item.dependencies ?? existing?.dependencies ?? []
        );
        const registryDependencies =
          item.registryDependencies ?? existing?.registryDependencies ?? [];

        await writeJson(itemPath, {
          $schema: REGISTRY_ITEM_SCHEMA_URL,
          name: item.name,
          type: item.type,
          title,
          description,
          dependencies,
          registryDependencies,
          files: [{ path: target, type: item.type, target, content }],
        });

        indexItems.push({
          name: item.name,
          type: item.type,
          title,
          description,
          dependencies,
          registryDependencies,
          files: [{ path: target, type: item.type }],
        });
      }

      await writeJson(path.join(outputDir, REGISTRY_INDEX_FILE), {
        $schema: REGISTRY_SCHEMA_URL,
        name: source.name,
        homepage: source.homepage,
        items: indexItems,
      });

      spinner.succeed(
        `Built ${indexItems.length} registry items and ${REGISTRY_INDEX_FILE} into ${opts.output}`
      );
      success("Registry ready for CLI add.");
    } catch (err) {
      spinner.fail("Registry build failed");
      error(err instanceof Error ? err.message : String(err));
      process.exit(1);
    }
  });
