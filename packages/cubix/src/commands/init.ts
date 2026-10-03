import path from "node:path";
import { Command } from "commander";
import prompts from "prompts";

import { getTemplate, TEMPLATE_IDS, TEMPLATES } from "../templates";
import type { TemplateDefinition } from "../templates/scaffold";
import { BASES, type BaseName, readConfig } from "../utils/config";
import { configureProject } from "../utils/configure";
import { error, info, setSilent, success, warn, dim } from "../utils/logger";
import { getInvokingPackageManager } from "../utils/package-manager";
import { getProjectInfo } from "../utils/project";
import { runAdd } from "./add";

type InitOptions = {
  template?: string;
  base: string;
  yes: boolean;
  force: boolean;
  cwd: string;
  srcDir: boolean;
  silent: boolean;
  name?: string;
};

async function chooseTemplate(
  opts: InitOptions,
  isEmpty: boolean
): Promise<TemplateDefinition | null> {
  if (opts.template) {
    const template = getTemplate(opts.template);
    if (!template) {
      throw new Error(
        `Invalid template "${opts.template}". Use one of: ${TEMPLATE_IDS.join(", ")}`
      );
    }
    return template;
  }

  if (!isEmpty) return null;
  if (opts.yes) return getTemplate("next") ?? null;

  const answer = await prompts({
    type: "select",
    name: "template",
    message: "This directory is empty. Which framework should Cubix scaffold?",
    choices: [
      ...TEMPLATES.map((template) => ({
        title: template.title,
        value: template.id,
      })),
      { title: "None - configure this folder as-is", value: "none" },
    ],
    initial: 0,
  });
  if (typeof answer.template !== "string") {
    throw new Error("Initialization cancelled.");
  }
  return answer.template === "none" ? null : getTemplate(answer.template) ?? null;
}

async function confirmOverwrite(cwd: string, opts: InitOptions) {
  if (opts.force || opts.yes) return true;
  if (!(await readConfig(cwd))) return true;
  const { proceed } = await prompts({
    type: "confirm",
    name: "proceed",
    message: "cubix.json already exists. Overwrite?",
    initial: false,
  });
  return Boolean(proceed);
}

export const initCommand = new Command()
  .name("init")
  .description("initialize your project and install dependencies")
  .argument("[components...]", "components to add after init")
  .option(
    "-t, --template <template>",
    `scaffold a new project (${TEMPLATE_IDS.join(", ")})`
  )
  .option("-b, --base <base>", "the primitive backend to use (base, radix, aria)", "base")
  .option("-y, --yes", "skip confirmation prompts", false)
  .option("-f, --force", "force overwrite of existing configuration", false)
  .option("-c, --cwd <cwd>", "the working directory", process.cwd())
  .option("--src-dir", "use a src/ directory (Next.js template)", false)
  .option("--name <name>", "project name when using --template")
  .option("-s, --silent", "mute output", false)
  .action(async (components: string[], opts: InitOptions) => {
    setSilent(opts.silent);
    const cwd = path.resolve(opts.cwd);
    const base = opts.base as BaseName;

    try {
      if (!BASES.includes(base)) {
        throw new Error(`Invalid base "${opts.base}". Use one of: ${BASES.join(", ")}`);
      }

      const project = await getProjectInfo(cwd);
      const template = await chooseTemplate(opts, project.isEmpty);
      if (opts.srcDir && template?.id !== "next") {
        warn("--src-dir only applies to the Next.js template and was ignored.");
      }

      let projectCwd = cwd;
      if (template) {
        projectCwd = await template.scaffold({
          cwd,
          name: opts.name,
          srcDir: opts.srcDir,
          yes: opts.yes,
          silent: opts.silent,
          packageManager: getInvokingPackageManager(cwd),
        });
      } else if (!(await confirmOverwrite(cwd, opts))) {
        info("Aborted.");
        return;
      }

      await configureProject({
        cwd: projectCwd,
        base,
        force: opts.force || Boolean(template),
        silent: opts.silent,
      });

      if (components.length > 0) {
        await runAdd(components, {
          cwd: projectCwd,
          base,
          yes: true,
          overwrite: true,
          silent: opts.silent,
        });
      }

      success("Cubix is ready.");
      if (template) {
        dim(`Next: cd ${path.relative(cwd, projectCwd) || "."} && npx cubix@latest add button`);
      } else {
        dim("Next: npx cubix@latest add button");
      }
    } catch (err) {
      error(err instanceof Error ? err.message : String(err));
      process.exit(1);
    }
  });
