export type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

export function addComponentCommands(
  name: string,
  base = "base"
): Record<PackageManager, string> {
  const flag = base === "base" ? "" : ` --base ${base}`;
  return {
    pnpm: `pnpm dlx cubix@latest add ${name}${flag}`,
    npm: `npx cubix@latest add ${name}${flag}`,
    yarn: `yarn dlx cubix@latest add ${name}${flag}`,
    bun: `bunx --bun cubix@latest add ${name}${flag}`,
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
