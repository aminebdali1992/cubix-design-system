import { runPackageBinary } from "../utils/package-manager";
import { resolveTarget, runStep, type TemplateDefinition } from "./scaffold";

export const astroTemplate: TemplateDefinition = {
  id: "astro",
  title: "Astro",
  async scaffold(options) {
    const { name, target } = await resolveTarget(options);
    await runStep(options, "Creating an Astro app with Tailwind CSS and React...", () =>
      runPackageBinary(
        options.packageManager,
        "create-astro@latest",
        [
          name,
          "--template",
          "with-tailwindcss",
          "--add",
          "react",
          "--install",
          "--git",
          "--skip-houston",
          ...(options.yes ? ["--yes"] : []),
        ],
        { cwd: options.cwd, silent: options.silent }
      )
    );
    return target;
  },
};
