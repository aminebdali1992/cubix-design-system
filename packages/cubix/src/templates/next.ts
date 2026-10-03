import { runPackageBinary } from "../utils/package-manager";
import { resolveTarget, runStep, type TemplateDefinition } from "./scaffold";

export const nextTemplate: TemplateDefinition = {
  id: "next",
  title: "Next.js",
  async scaffold(options) {
    const { name, target } = await resolveTarget(options);
    await runStep(options, "Creating a Next.js app with create-next-app...", () =>
      runPackageBinary(
        options.packageManager,
        "create-next-app@latest",
        [
          name,
          "--typescript",
          "--tailwind",
          "--eslint",
          "--app",
          "--import-alias",
          "@/*",
          `--use-${options.packageManager}`,
          options.srcDir ? "--src-dir" : "--no-src-dir",
          "--yes",
        ],
        { cwd: options.cwd, silent: options.silent }
      )
    );
    return target;
  },
};
