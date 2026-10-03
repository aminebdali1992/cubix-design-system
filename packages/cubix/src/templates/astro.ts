import { initGitRepository } from "../utils/git";
import { installProject, runLocalBinary, runPackageBinary } from "../utils/package-manager";
import { resolveTarget, runStep, type TemplateDefinition } from "./scaffold";

export const astroTemplate: TemplateDefinition = {
  id: "astro",
  title: "Astro",
  async scaffold(options) {
    const { name, target } = await resolveTarget(options);

    // create-astro abandons its install on a fixed timeout and keeps writing
    // node_modules in the background, so Cubix owns install, integrations and git.
    await runStep(options, "Creating an Astro app with Tailwind CSS...", () =>
      runPackageBinary(
        options.packageManager,
        "create-astro@latest",
        [
          name,
          "--template",
          "with-tailwindcss",
          "--no-install",
          "--no-git",
          "--skip-houston",
          ...(options.yes ? ["--yes"] : []),
        ],
        { cwd: options.cwd, silent: options.silent }
      )
    );

    await runStep(options, "Installing Astro dependencies...", () =>
      installProject(target, options.packageManager, { silent: options.silent })
    );

    await runStep(options, "Adding the React integration...", () =>
      runLocalBinary(options.packageManager, "astro", ["add", "react", "--yes"], {
        cwd: target,
        silent: options.silent,
      })
    );

    await initGitRepository(target);

    return target;
  },
};
