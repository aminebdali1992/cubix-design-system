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

const readyListSchema = z.object({
  slugs: z.array(z.string()),
});

function resolveSourceFile(cwd: string, name: string, base: BaseName) {
  const candidates = [
    path.join(cwd, "components/cubix", base, `${name}.tsx`),
    path.join(cwd, "components/cubix", `${name}.tsx`),
  ];
  if (base === "base") {
    candidates.splice(
      1,
      0,
      path.join(cwd, "components/cubix/base", `${name}.tsx`)
    );
  }
  return candidates.find((candidate) => fs.existsSync(candidate)) ?? null;
}

async function writeJson(file: string, data: unknown) {
  await fs.ensureDir(path.dirname(file));
  await fs.writeJson(file, data, { spaces: 2 });
  await fs.appendFile(file, "\n");
}

function itemOutputPath(outputDir: string, name: string, base: BaseName) {
  return base === "base"
    ? path.join(outputDir, `${name}.json`)
    : path.join(outputDir, base, `${name}.json`);
}

async function loadReadySlugs(cwd: string): Promise<Set<string> | null> {
  const readyPath = path.join(cwd, "lib/ready-components.json");
  if (!(await fs.pathExists(readyPath))) return null;
  const ready = readyListSchema.parse(await fs.readJson(readyPath));
  return new Set(ready.slugs);
}

async function prunePublicRegistry(
  outputDir: string,
  keepNames: Set<string>
) {
  if (!(await fs.pathExists(outputDir))) return;

  const rootFiles = await fs.readdir(outputDir);
  for (const entry of rootFiles) {
    const full = path.join(outputDir, entry);
    const stat = await fs.stat(full);
    if (stat.isDirectory()) {
      if (entry === "aria" || entry === "radix") {
        const nested = await fs.readdir(full);
        for (const file of nested) {
          if (!file.endsWith(".json")) continue;
          const name = file.replace(/\.json$/, "");
          if (!keepNames.has(name)) {
            await fs.remove(path.join(full, file));
          }
        }
      }
      continue;
    }
    if (!entry.endsWith(".json") || entry === REGISTRY_INDEX_FILE) continue;
    const name = entry.replace(/\.json$/, "");
    if (!keepNames.has(name)) {
      await fs.remove(full);
    }
  }
}

export const buildCommand = new Command()
  .name("build")
  .description("build components for a Cubix registry")
  .argument("[registry]", "path to the source registry.json", "./registry.json")
  .option("-o, --output <path>", "destination directory for JSON files", "./public/r")
  .option("-c, --cwd <cwd>", "the working directory", process.cwd())
  .option(
    "-b, --base <base>",
    "legacy single-base embed (ignored when ready-components.json is present)"
  )
  .action(async (registryArg: string, opts) => {
    const cwd = path.resolve(opts.cwd);
    const outputDir = path.resolve(cwd, opts.output);
    const sourcePath = path.resolve(cwd, registryArg);

    const spinner = ora("Building registry items with embedded source...").start();
    try {
      if (!(await fs.pathExists(sourcePath))) {
        throw new Error(`Registry source not found: ${sourcePath}`);
      }

      const source = sourceIndexSchema.parse(await fs.readJson(sourcePath));
      await fs.ensureDir(outputDir);

      const readySlugs = await loadReadySlugs(cwd);
      const items = readySlugs
        ? source.items.filter((item) => readySlugs.has(item.name))
        : source.items;

      if (readySlugs && items.length === 0) {
        throw new Error(
          "ready-components.json is present but matched no registry items. Run node scripts/sync-component-readiness.mjs first."
        );
      }

      const basesToBuild: BaseName[] = readySlugs
        ? [...BASES]
        : [((opts.base as BaseName | undefined) ?? "base")];

      const indexItems = [];
      for (const item of items) {
        const builtBases: BaseName[] = [];
        let title = item.title;
        let description = item.description;
        let dependencies = item.dependencies ?? [];
        let registryDependencies = item.registryDependencies ?? [];

        for (const base of basesToBuild) {
          const sourceFile = resolveSourceFile(cwd, item.name, base);
          if (!sourceFile) {
            if (readySlugs) {
              throw new Error(
                `Ready component "${item.name}" is missing ${base} source under components/cubix/${base}/.`
              );
            }
            spinner.warn(`Skipping ${item.name} (no source for base "${base}")`);
            spinner.start();
            continue;
          }

          const content = (await fs.readFile(sourceFile, "utf8")).replace(
            /\r\n/g,
            "\n"
          );
          const target = `components/cubix/${item.name}.tsx`;
          dependencies = dependenciesFromSource(content, item.dependencies ?? []);
          registryDependencies = item.registryDependencies ?? [];
          title = item.title ?? title;
          description = item.description ?? description;

          await writeJson(itemOutputPath(outputDir, item.name, base), {
            $schema: REGISTRY_ITEM_SCHEMA_URL,
            name: item.name,
            type: item.type,
            title,
            description,
            dependencies,
            registryDependencies,
            files: [{ path: target, type: item.type, target, content }],
          });
          builtBases.push(base);
        }

        if (builtBases.length === 0) continue;

        indexItems.push({
          name: item.name,
          type: item.type,
          title,
          description,
          dependencies,
          registryDependencies,
          files: [{ path: `components/cubix/${item.name}.tsx`, type: item.type }],
          bases: builtBases,
        });
      }

      await writeJson(path.join(outputDir, REGISTRY_INDEX_FILE), {
        $schema: REGISTRY_SCHEMA_URL,
        name: source.name,
        homepage: source.homepage,
        items: indexItems,
      });

      if (readySlugs) {
        await prunePublicRegistry(outputDir, new Set(indexItems.map((i) => i.name)));
      }

      spinner.succeed(
        `Built ${indexItems.length} registry items (${basesToBuild.join(", ")}) and ${REGISTRY_INDEX_FILE} into ${opts.output}`
      );
      success("Registry ready for CLI add.");
    } catch (err) {
      spinner.fail("Registry build failed");
      error(err instanceof Error ? err.message : String(err));
      process.exit(1);
    }
  });
