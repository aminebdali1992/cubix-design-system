import path from "node:path";
import { Command } from "commander";

import { readConfig } from "../utils/config";
import { CLI_NAME } from "../utils/constants";
import { getProjectInfo } from "../utils/project";
import { error } from "../utils/logger";

export const infoCommand = new Command()
  .name("info")
  .description("get information about your project")
  .option("-c, --cwd <cwd>", "the working directory", process.cwd())
  .option("--json", "output as JSON", false)
  .action(async (opts) => {
    const cwd = path.resolve(opts.cwd);
    try {
      const config = await readConfig(cwd);
      const project = await getProjectInfo(cwd);
      const payload = {
        cwd,
        config,
        project,
      };
      if (opts.json) {
        console.log(JSON.stringify(payload, null, 2));
        return;
      }
      console.log(`cwd: ${cwd}`);
      console.log(`framework: ${project.framework}`);
      console.log(`sourceRoot: ${project.sourceRoot || "."}`);
      console.log(`css: ${project.cssPath ?? "(none)"}`);
      if (config) {
        console.log(`base: ${config.base}`);
        console.log(`aliases.ui: ${config.aliases.ui}`);
        console.log(`tailwind.css: ${config.tailwind.css}`);
      } else {
        console.log(`cubix.json: (missing - run ${CLI_NAME} init)`);
      }
    } catch (err) {
      error(err instanceof Error ? err.message : String(err));
      process.exit(1);
    }
  });
