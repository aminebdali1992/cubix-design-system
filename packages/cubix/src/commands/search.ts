import path from "node:path";
import { Command } from "commander";

import { readConfig } from "../utils/config";
import { error } from "../utils/logger";
import { fetchRegistryIndex } from "../utils/registry";

export const searchCommand = new Command()
  .name("search")
  .alias("list")
  .description("search items from the registry")
  .option("-q, --query <query>", "query string")
  .option("-l, --limit <number>", "maximum number of items to display", "100")
  .option("-o, --offset <number>", "number of items to skip", "0")
  .option("-c, --cwd <cwd>", "the working directory", process.cwd())
  .action(async (opts) => {
    const cwd = path.resolve(opts.cwd);
    try {
      const config = await readConfig(cwd);
      const index = await fetchRegistryIndex(config);

      const query = (opts.query as string | undefined)?.toLowerCase();
      const items = query
        ? index.items.filter((item) =>
            `${item.name} ${item.title ?? ""} ${item.description ?? ""}`
              .toLowerCase()
              .includes(query)
          )
        : index.items;

      const offset = Number(opts.offset) || 0;
      const limit = Number(opts.limit) || 100;
      const slice = items.slice(offset, offset + limit);

      for (const item of slice) {
        console.log(
          `${item.name.padEnd(24)} ${item.title ?? ""}${item.description ? ` - ${item.description}` : ""}`
        );
      }
      console.log(`\n${slice.length} of ${items.length} items`);
    } catch (err) {
      error(err instanceof Error ? err.message : String(err));
      process.exit(1);
    }
  });
