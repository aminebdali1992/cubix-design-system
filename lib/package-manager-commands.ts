import { siteConfig } from "@/lib/site";

export type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

const cli = `${siteConfig.packageName}@latest`;

export function addComponentCommands(
  name: string,
  base = "base"
): Record<PackageManager, string> {
  const flag = base === "base" ? "" : ` --base ${base}`;
  return {
    pnpm: `pnpm dlx ${cli} add ${name}${flag}`,
    npm: `npx ${cli} add ${name}${flag}`,
    yarn: `yarn dlx ${cli} add ${name}${flag}`,
    bun: `bunx --bun ${cli} add ${name}${flag}`,
  };
}

export function installDependencyCommands(
  dependencies: string[]
): Record<PackageManager, string> {
  const list = dependencies.join(" ");
  return {
    pnpm: `pnpm add ${list}`,
    npm: `npm install ${list}`,
    yarn: `yarn add ${list}`,
    bun: `bun add ${list}`,
  };
}
