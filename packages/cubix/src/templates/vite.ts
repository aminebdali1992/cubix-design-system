import fs from "fs-extra";
import path from "node:path";

import { installDependencies, runPackageBinary } from "../utils/package-manager";
import { resolveTarget, runStep, type TemplateDefinition } from "./scaffold";

const VITE_CONFIG = `import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
`;

export const viteTemplate: TemplateDefinition = {
  id: "vite",
  title: "Vite",
  async scaffold(options) {
    const { name, target } = await resolveTarget(options);

    await runStep(options, "Creating a Vite + React + TypeScript app...", () =>
      runPackageBinary(
        options.packageManager,
        "create-vite@latest",
        // Never let create-vite start the dev server - Cubix still has to configure the app.
        [name, "--template", "react-ts", "--no-interactive", "--no-immediate"],
        { cwd: options.cwd, silent: options.silent }
      )
    );

    await runStep(options, "Adding Tailwind CSS v4 and the @ alias...", async () => {
      await installDependencies(target, ["tailwindcss", "@tailwindcss/vite"], {
        silent: options.silent,
      });
      await installDependencies(target, ["@types/node"], {
        dev: true,
        silent: options.silent,
      });
      await fs.writeFile(path.join(target, "vite.config.ts"), VITE_CONFIG, "utf8");
      await fs.writeFile(
        path.join(target, "src", "index.css"),
        `@import "tailwindcss";\n`,
        "utf8"
      );
    });

    return target;
  },
};
