import path from "node:path";
import { Command } from "commander";
import fs from "fs-extra";
import ora from "ora";
import prompts from "prompts";

import {
  BASES,
  type BaseName,
  readConfig,
  resolveAliasPath,
} from "../utils/config";
import { installDependencies } from "../utils/package-manager";
import { getProjectInfo } from "../utils/project";
import { CLI_NAME } from "../utils/constants";
import {
  dependenciesFromSource,
  fetchRegistryIndex,
  fetchRegistryItem,
  resolveFileContent,
  type RegistryItem,
} from "../utils/registry";
import { setSilent, error, success, dim } from "../utils/logger";

export type AddOptions = {
  cwd: string;
  base?: BaseName;
  yes?: boolean;
  overwrite?: boolean;
  silent?: boolean;
  dryRun?: boolean;
  path?: string;
  all?: boolean;
};

async function writeItem(
  item: RegistryItem,
  options: AddOptions & { base: BaseName }
) {
  const config = await readConfig(options.cwd);
  if (!config) {
    throw new Error(`No cubix.json found. Run \`${CLI_NAME} init\` first.`);
  }

  const info = await getProjectInfo(options.cwd);
  const uiDir = options.path
    ? path.resolve(options.cwd, options.path)
    : resolveAliasPath(options.cwd, config.aliases.ui, info.sourceRoot);

  const written: string[] = [];
  const deps = new Set<string>(item.dependencies ?? []);

  for (const file of item.files) {
    const content = await resolveFileContent({
      item,
      file,
      base: options.base,
      componentsRoot: process.env.CUBIX_COMPONENTS_DIR,
    });

    for (const dep of dependenciesFromSource(content, item.dependencies ?? [])) {
      deps.add(dep);
    }

    const finalPath = path.join(
      uiDir,
      path.basename(file.target ?? `${item.name}.tsx`)
    );

    if ((await fs.pathExists(finalPath)) && !options.overwrite) {
      if (options.yes) continue;
      const { overwrite } = await prompts({
        type: "confirm",
        name: "overwrite",
        message: `${path.relative(options.cwd, finalPath)} exists. Overwrite?`,
        initial: false,
      });
      if (!overwrite) continue;
    }

    if (options.dryRun) {
      dim(`[dry-run] write ${path.relative(options.cwd, finalPath)}`);
      written.push(finalPath);
      continue;
    }

    await fs.ensureDir(path.dirname(finalPath));
    await fs.writeFile(finalPath, content, "utf8");
    written.push(finalPath);
  }

  for (const depName of item.registryDependencies ?? []) {
    await runAdd([depName], { ...options, yes: true });
  }

  if (!options.dryRun && deps.size > 0) {
    await installDependencies(options.cwd, [...deps], {
      silent: options.silent,
    });
  }

  return written;
}

export async function runAdd(names: string[], options: AddOptions) {
  const config = await readConfig(options.cwd);
  if (!config && !options.dryRun) {
    throw new Error(`No cubix.json found. Run \`${CLI_NAME} init\` first.`);
  }

  const base = (options.base ?? config?.base ?? "base") as BaseName;
  if (!BASES.includes(base)) {
    throw new Error(`Invalid base "${base}"`);
  }

  let targets = names;
  if (options.all) {
    const index = await fetchRegistryIndex(config);
    targets = index.items.map((item) => item.name);
  }

  if (targets.length === 0) {
    throw new Error("Specify one or more components, or pass --all.");
  }

  for (const name of targets) {
    const spinner = options.silent
      ? null
      : ora(`Adding ${name}...`).start();
    try {
      const item = await fetchRegistryItem(name, config, { base });
      const written = await writeItem(item, { ...options, base });
      spinner?.succeed(
        `Added ${item.name}${written.length ? ` (${written.length} file${written.length === 1 ? "" : "s"})` : ""}`
      );
    } catch (err) {
      spinner?.fail(`Failed to add ${name}`);
      throw err;
    }
  }

  if (!options.silent) {
    success("Done.");
  }
}

export const addCommand = new Command()
  .name("add")
  .description("add a component to your project")
  .argument("[components...]", "name, url, or local path to a component")
  .option("-b, --base <base>", "override the project base (base, radix, aria)")
  .option("-y, --yes", "skip confirmation prompt", false)
  .option("-o, --overwrite", "overwrite existing files", false)
  .option("-c, --cwd <cwd>", "the working directory", process.cwd())
  .option("-a, --all", "add all available components", false)
  .option("-p, --path <path>", "the path to add the component to")
  .option("-s, --silent", "mute output", false)
  .option("--dry-run", "preview changes without writing files", false)
  .action(async (components: string[], opts) => {
    setSilent(Boolean(opts.silent));
    try {
      await runAdd(components, {
        cwd: path.resolve(opts.cwd),
        base: opts.base as BaseName | undefined,
        yes: Boolean(opts.yes),
        overwrite: Boolean(opts.overwrite),
        silent: Boolean(opts.silent),
        dryRun: Boolean(opts.dryRun),
        path: opts.path,
        all: Boolean(opts.all),
      });
    } catch (err) {
      error(err instanceof Error ? err.message : String(err));
      process.exitCode = 1;
    }
  });
