import { execa } from "execa";
import fs from "fs-extra";
import path from "node:path";

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

export function detectPackageManager(cwd: string): PackageManager {
  if (fs.existsSync(path.join(cwd, "bun.lockb")) || fs.existsSync(path.join(cwd, "bun.lock"))) {
    return "bun";
  }
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) {
    return "pnpm";
  }
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) {
    return "yarn";
  }
  return "npm";
}

/** The manager that launched the CLI (`pnpm dlx cubix-ui` sets a pnpm user agent). */
export function getInvokingPackageManager(cwd: string): PackageManager {
  const agent = process.env.npm_config_user_agent ?? "";
  if (agent.startsWith("pnpm")) return "pnpm";
  if (agent.startsWith("yarn")) return "yarn";
  if (agent.startsWith("bun")) return "bun";
  if (agent.startsWith("npm")) return "npm";
  return detectPackageManager(cwd);
}

function binaryCommand(pm: PackageManager, pkg: string, args: string[]) {
  switch (pm) {
    case "pnpm":
      return { bin: "pnpm", args: ["dlx", pkg, ...args] };
    case "yarn":
      return { bin: "yarn", args: ["dlx", pkg, ...args] };
    case "bun":
      return { bin: "bunx", args: [pkg, ...args] };
    default:
      return { bin: "npx", args: ["--yes", pkg, ...args] };
  }
}

export function formatPackageBinaryCommand(
  pm: PackageManager,
  pkg: string,
  args: string[]
) {
  const runner = { npm: "npx", pnpm: "pnpm dlx", yarn: "yarn dlx", bun: "bunx" }[pm];
  return [runner, pkg, ...args].join(" ");
}

export async function runPackageBinary(
  pm: PackageManager,
  pkg: string,
  args: string[],
  options: { cwd: string; silent?: boolean }
) {
  const command = binaryCommand(pm, pkg, args);
  await execa(command.bin, command.args, {
    cwd: options.cwd,
    stdio: options.silent ? "ignore" : "inherit",
  });
}

function localBinaryCommand(pm: PackageManager, bin: string, args: string[]) {
  switch (pm) {
    case "pnpm":
      return { bin: "pnpm", args: ["exec", bin, ...args] };
    case "yarn":
      return { bin: "yarn", args: [bin, ...args] };
    case "bun":
      return { bin: "bun", args: ["x", bin, ...args] };
    default:
      return { bin: "npm", args: ["exec", "--no", "--", bin, ...args] };
  }
}

/** Runs a binary already installed in the project's node_modules. */
export async function runLocalBinary(
  pm: PackageManager,
  bin: string,
  args: string[],
  options: { cwd: string; silent?: boolean }
) {
  const command = localBinaryCommand(pm, bin, args);
  await execa(command.bin, command.args, {
    cwd: options.cwd,
    stdio: options.silent ? "ignore" : "inherit",
  });
}

async function runInstall(
  pm: PackageManager,
  args: string[],
  options: { cwd: string; silent?: boolean }
) {
  const stdio = options.silent ? "ignore" : "inherit";
  try {
    await execa(pm, args, { cwd: options.cwd, stdio });
  } catch (error) {
    // Fresh scaffolds sometimes pin a React prerelease that strict npm peers reject.
    if (pm !== "npm") throw error;
    await execa(pm, [...args, "--legacy-peer-deps"], { cwd: options.cwd, stdio });
  }
}

/** Installs everything already listed in package.json. */
export async function installProject(
  cwd: string,
  pm: PackageManager,
  options: { silent?: boolean } = {}
) {
  await runInstall(pm, ["install"], { cwd, silent: options.silent });
}

export async function installDependencies(
  cwd: string,
  packages: string[],
  options: { dev?: boolean; silent?: boolean } = {}
) {
  if (packages.length === 0) return;
  const pm = detectPackageManager(cwd);
  const devFlag = options.dev ? [pm === "bun" ? "-d" : "-D"] : [];
  await runInstall(pm, [pm === "npm" ? "install" : "add", ...devFlag, ...packages], {
    cwd,
    silent: options.silent,
  });
}
