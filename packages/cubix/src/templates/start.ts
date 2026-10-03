import { runPackageBinary } from "../utils/package-manager";
import { resolveTarget, runStep, type TemplateDefinition } from "./scaffold";

export const startTemplate: TemplateDefinition = {
  id: "start",
  title: "TanStack Start",
  async scaffold(options) {
    const { name, target } = await resolveTarget(options);
    await runStep(options, "Creating a TanStack Start app with the TanStack CLI...", () =>
      runPackageBinary(
        options.packageManager,
        "@tanstack/cli@latest",
        [
          "create",
          name,
          "--framework",
          "react",
          "--package-manager",
          options.packageManager,
          "--no-examples",
          "--no-intent",
          ...(options.yes ? ["-y"] : []),
        ],
        { cwd: options.cwd, silent: options.silent }
      )
    );
    return target;
  },
};
