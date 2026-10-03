import fs from "fs-extra";
import path from "node:path";
import ora from "ora";

import { withCubixCss } from "../templates/css";
import { UTILS_SOURCE } from "../templates/utils";
import {
  type BaseName,
  type CubixConfig,
  defaultConfig,
  writeConfig,
} from "./config";
import * as logger from "./logger";
import { installDependencies } from "./package-manager";
import { defaultCssPath, getProjectInfo } from "./project";
import { ensurePathAlias } from "./tsconfig";

export type ConfigureOptions = {
  cwd: string;
  base: BaseName;
  force?: boolean;
  silent?: boolean;
};

const SHARED_DEPENDENCIES = [
  "class-variance-authority",
  "clsx",
  "tailwind-merge",
  "lucide-react",
];

const BASE_DEPENDENCIES: Record<BaseName, string[]> = {
  base: ["@base-ui/react"],
  radix: ["radix-ui", "@radix-ui/react-slot"],
  aria: ["react-aria-components"],
};

async function hasViteAlias(cwd: string) {
  for (const name of ["vite.config.ts", "vite.config.mts", "vite.config.js"]) {
    const file = path.join(cwd, name);
    if (!(await fs.pathExists(file))) continue;
    const source = await fs.readFile(file, "utf8");
    return /tsconfigPaths|["']@["']\s*:/.test(source);
  }
  return false;
}

export async function configureProject(
  options: ConfigureOptions
): Promise<CubixConfig> {
  const info = await getProjectInfo(options.cwd);
  const cssRelative =
    info.cssPath ?? defaultCssPath(info.framework, info.sourceRoot);
  const cssAbsolute = path.join(options.cwd, cssRelative);
  const utilsPath = path.join(options.cwd, info.sourceRoot, "lib", "utils.ts");

  const config = defaultConfig({
    base: options.base,
    css: cssRelative,
    rsc: info.framework === "next",
  });

  const spinner = options.silent
    ? null
    : ora("Writing cubix.json, design tokens, and lib/utils.ts...").start();

  try {
    await fs.ensureDir(path.dirname(cssAbsolute));
    const existingCss = (await fs.pathExists(cssAbsolute))
      ? await fs.readFile(cssAbsolute, "utf8")
      : "";
    await fs.writeFile(cssAbsolute, withCubixCss(existingCss), "utf8");

    if (!(await fs.pathExists(utilsPath)) || options.force) {
      await fs.ensureDir(path.dirname(utilsPath));
      await fs.writeFile(utilsPath, UTILS_SOURCE, "utf8");
    }

    const alias = await ensurePathAlias(options.cwd, info.sourceRoot);
    await writeConfig(options.cwd, config);
    spinner?.succeed("Wrote cubix.json, design tokens, and lib/utils.ts");

    if (alias.updated.length > 0) {
      logger.success(`Added the @/* alias to ${alias.updated.join(", ")}`);
    }
    for (const file of alias.conflicts) {
      logger.warn(
        `${file} already maps @/* elsewhere (or could not be parsed). Point it at ./${info.sourceRoot || "."}/* for Cubix imports.`
      );
    }
  } catch (error) {
    spinner?.fail("Failed to write Cubix configuration");
    throw error;
  }

  if (!info.cssPath) {
    logger.warn(
      `Created ${cssRelative}. Import it from your app entry so the tokens load.`
    );
  }
  if (info.framework === "vite" && !(await hasViteAlias(options.cwd))) {
    logger.warn(
      `Add resolve.alias { "@": "./src" } to vite.config so the bundler resolves @/ imports.`
    );
  }

  logger.info("Installing dependencies...");
  try {
    await installDependencies(
      options.cwd,
      [...SHARED_DEPENDENCIES, ...BASE_DEPENDENCIES[options.base]],
      { silent: options.silent }
    );
    if (!options.silent) logger.success("Installed dependencies");
  } catch (error) {
    if (!options.silent) logger.error("Failed to install dependencies");
    throw error;
  }

  return config;
}
