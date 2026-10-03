import fs from "fs-extra";
import path from "node:path";
import prompts from "prompts";

import * as logger from "../utils/logger";
import type { PackageManager } from "../utils/package-manager";

export type ScaffoldOptions = {
  cwd: string;
  name?: string;
  srcDir: boolean;
  yes: boolean;
  silent: boolean;
  packageManager: PackageManager;
};

export type TemplateDefinition = {
  id: string;
  title: string;
  /** Creates the project and returns its absolute path. */
  scaffold: (options: ScaffoldOptions) => Promise<string>;
};

const DEFAULT_PROJECT_NAME = "my-app";

export async function resolveTarget(options: ScaffoldOptions) {
  let name = options.name;
  if (!name) {
    if (options.yes) {
      name = DEFAULT_PROJECT_NAME;
    } else {
      const answer = await prompts({
        type: "text",
        name: "name",
        message: "What is your project named?",
        initial: DEFAULT_PROJECT_NAME,
      });
      if (typeof answer.name !== "string") {
        throw new Error("Project creation cancelled.");
      }
      name = answer.name.trim() || DEFAULT_PROJECT_NAME;
    }
  }

  if (!/^[a-z0-9][a-z0-9._-]*$/i.test(name)) {
    throw new Error(
      `Invalid project name "${name}". Use letters, numbers, dots, dashes, or underscores.`
    );
  }

  const target = path.resolve(options.cwd, name);
  if (
    (await fs.pathExists(target)) &&
    (await fs.readdir(target)).length > 0
  ) {
    throw new Error(`Target directory is not empty: ${target}`);
  }

  return { name, target };
}

/**
 * Runs a scaffold step. No spinner: framework scaffolders write their own
 * prompts and progress to the same terminal.
 */
export async function runStep<T>(
  options: Pick<ScaffoldOptions, "silent">,
  text: string,
  task: () => Promise<T>
): Promise<T> {
  const label = text.replace(/\.\.\.$/, "");
  logger.info(text);
  try {
    const result = await task();
    logger.success(label);
    return result;
  } catch (error) {
    if (!options.silent) logger.error(`Failed: ${label}`);
    throw error;
  }
}
