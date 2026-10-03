import { Command } from "commander";

import { addCommand } from "./commands/add";
import { buildCommand } from "./commands/build";
import { infoCommand } from "./commands/info";
import { initCommand } from "./commands/init";
import { searchCommand } from "./commands/search";
import { viewCommand } from "./commands/view";

async function main() {
  const program = new Command()
    .name("cubix")
    .description(
      "Cubix CLI - initialize projects, add registry components, and build registry JSON"
    )
    .version("0.1.0");

  program
    .addCommand(initCommand)
    .addCommand(addCommand)
    .addCommand(viewCommand)
    .addCommand(searchCommand)
    .addCommand(buildCommand)
    .addCommand(infoCommand);

  program.parse();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
