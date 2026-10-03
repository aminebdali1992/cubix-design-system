import { Command } from "commander";

import { addCommand } from "./commands/add";
import { buildCommand } from "./commands/build";
import { infoCommand } from "./commands/info";
import { initCommand } from "./commands/init";
import { searchCommand } from "./commands/search";
import { viewCommand } from "./commands/view";
import { CLI_NAME, CLI_VERSION } from "./utils/constants";

async function main() {
  const program = new Command()
    .name(CLI_NAME)
    .description(
      "Cubix CLI - initialize projects, add registry components, and build registry JSON"
    )
    .version(CLI_VERSION, "-v, --version", "display the version number");

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
