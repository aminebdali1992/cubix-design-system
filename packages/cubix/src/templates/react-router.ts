import { initGitRepository } from "../utils/git";
import { installProject, runPackageBinary } from "../utils/package-manager";
import { resolveTarget, runStep, type TemplateDefinition } from "./scaffold";

export const reactRouterTemplate: TemplateDefinition = {
  id: "react-router",
  title: "React Router",
  async scaffold(options) {
    const { name, target } = await resolveTarget(options);

    // create-react-router aborts when install or the initial commit fails,
    // so Cubix owns both steps and degrades gracefully.
    await runStep(options, "Creating a React Router app with create-react-router...", () =>
      runPackageBinary(
        options.packageManager,
        "create-react-router@latest",
        [
          name,
          "--no-install",
          "--no-git-init",
          "--package-manager",
          options.packageManager,
          "--no-motion",
          ...(options.yes ? ["--yes"] : []),
        ],
        { cwd: options.cwd, silent: options.silent }
      )
    );

    await runStep(options, "Installing React Router dependencies...", () =>
      installProject(target, options.packageManager, { silent: options.silent })
    );
    await initGitRepository(target);

    return target;
  },
};
