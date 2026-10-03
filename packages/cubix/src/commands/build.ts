import path from "node:path";
import { Command } from "commander";
import fs from "fs-extra";
import ora from "ora";

import { BASES, type BaseName } from "../utils/config";
import { error, success } from "../utils/logger";

type IndexItem = {
  name: string;
  type: string;
  title?: string;
  description?: string;
  files: Array<{ path: string; type: string }>;
};

function resolveSourceFile(
  cwd: string,
  name: string,
  base: BaseName
): string | null {
  const candidates = [
    path.join(cwd, "components/cubix", base, `${name}.tsx`),
    path.join(cwd, "components/cubix/base", `${name}.tsx`),
    path.join(cwd, "components/cubix", `${name}.tsx`),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

function collectDependencies(source: string): string[] {
  const skip = new Set([
    "react",
    "react-dom",
    "next",
    "clsx",
    "tailwind-merge",
    "class-variance-authority",
    "lucide-react",
  ]);
  const deps = new Set<string>();
  for (const match of source.matchAll(/from ["']([^"']+)["']/g)) {
    const specifier = match[1];
    if (!specifier || specifier.startsWith(".") || specifier.startsWith("@/")) {
      continue;
    }
    const name = specifier.startsWith("@")
      ? specifier.split("/").slice(0, 2).join("/")
      : specifier.split("/")[0]!;
    if (!skip.has(name)) deps.add(name);
  }
  return [...deps].sort();
}

export const buildCommand = new Command()
  .name("build")
  .description("build components for a Cubix registry")
  .argument("[registry]", "path to registry index JSON", "./public/r/index.json")
  .option("-o, --output <path>", "destination directory for JSON files", "./public/r")
  .option("-c, --cwd <cwd>", "the working directory", process.cwd())
  .option("-b, --base <base>", "base variant source to embed", "base")
  .action(async (registryArg: string, opts) => {
    const cwd = path.resolve(opts.cwd);
    const outputDir = path.resolve(cwd, opts.output);
    const indexPath = path.resolve(cwd, registryArg);
    const base = String(opts.base) as BaseName;

    if (!BASES.includes(base)) {
      error(`Invalid base "${opts.base}"`);
      process.exit(1);
    }

    const spinner = ora("Building registry items with embedded source...").start();
    try {
      if (!(await fs.pathExists(indexPath))) {
        throw new Error(`Registry index not found: ${indexPath}`);
      }

      const index = (await fs.readJson(indexPath)) as {
        $schema?: string;
        name: string;
        homepage?: string;
        items: IndexItem[];
      };

      await fs.ensureDir(outputDir);
      let built = 0;

      for (const item of index.items) {
        const sourcePath = resolveSourceFile(cwd, item.name, base);
        const existingPath = path.join(outputDir, `${item.name}.json`);
        const existing = (await fs.pathExists(existingPath))
          ? await fs.readJson(existingPath)
          : {};

        const content = sourcePath
          ? await fs.readFile(sourcePath, "utf8")
          : (existing.files?.[0]?.content as string | undefined);

        if (!content) {
          spinner.warn(`Skipping ${item.name} (no source for base "${base}")`);
          continue;
        }

        const target = `components/cubix/${item.name}.tsx`;
        const payload = {
          $schema:
            existing.$schema ??
            "https://cubix.design/schema/registry-item.json",
          name: item.name,
          type: item.type ?? "registry:ui",
          title: item.title ?? existing.title,
          description: item.description ?? existing.description,
          dependencies:
            existing.dependencies ?? collectDependencies(content),
          registryDependencies: existing.registryDependencies ?? [],
          files: [
            {
              path: target,
              type: "registry:ui",
              target,
              content,
            },
          ],
        };

        await fs.writeJson(existingPath, payload, { spaces: 2 });
        await fs.appendFile(existingPath, "\n");
        built += 1;
      }

      spinner.succeed(`Built ${built} registry items into ${opts.output}`);
      success("Registry ready for CLI add.");
    } catch (err) {
      spinner.fail("Registry build failed");
      error(err instanceof Error ? err.message : String(err));
      process.exit(1);
    }
  });
