import path from "node:path";
import { Command } from "commander";

import { readConfig } from "../utils/config";
import { fetchRegistryItem } from "../utils/registry";
import { error } from "../utils/logger";

export const viewCommand = new Command()
  .name("view")
  .description("view items from the registry before installing them")
  .argument("<items...>", "the item names or URLs to view")
  .option("-c, --cwd <cwd>", "the working directory", process.cwd())
  .action(async (items: string[], opts) => {
    const cwd = path.resolve(opts.cwd);
    try {
      const config = await readConfig(cwd);
      for (const name of items) {
        const item = await fetchRegistryItem(name, config);
        console.log(JSON.stringify(item, null, 2));
      }
    } catch (err) {
      error(err instanceof Error ? err.message : String(err));
      process.exit(1);
    }
  });
