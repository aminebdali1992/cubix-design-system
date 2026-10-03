/**
 * End-to-end smoke test for the cubix-ui CLI.
 *
 * For each base it scaffolds a fresh project from a template, runs
 * `init`, adds every public registry component with `add --all`, and runs
 * the project's production build so every copied file is type-checked.
 *
 * Usage:
 *   node scripts/smoke-cli.mjs                       # local build, all bases, vite
 *   node scripts/smoke-cli.mjs --cli 0.1.2           # published npm version
 *   node scripts/smoke-cli.mjs --base aria --template next
 *   node scripts/smoke-cli.mjs --dir E:/cubix-smoke  # custom work directory
 *
 * The registry defaults to the live site. Set CUBIX_REGISTRY_URL to test
 * another registry.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ALL_BASES = ["base", "aria", "radix"];
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function parseArgs(argv) {
  const opts = {
    cli: "local",
    bases: ALL_BASES,
    template: "vite",
    dir: path.join(os.tmpdir(), "cubix-smoke"),
  };
  for (let i = 0; i < argv.length; i += 1) {
    const flag = argv[i];
    const value = argv[i + 1];
    if (value === undefined) throw new Error(`Missing value for ${flag}`);
    if (flag === "--cli") opts.cli = value;
    else if (flag === "--base") opts.bases = value.split(",");
    else if (flag === "--template") opts.template = value;
    else if (flag === "--dir") opts.dir = path.resolve(value);
    else throw new Error(`Unknown option ${flag}`);
    i += 1;
  }
  const invalid = opts.bases.filter((base) => !ALL_BASES.includes(base));
  if (invalid.length > 0) {
    throw new Error(`Invalid base: ${invalid.join(", ")}. Use ${ALL_BASES.join(", ")}`);
  }
  return opts;
}

function cliCommand(cli) {
  if (cli === "local") {
    const entry = path.join(root, "packages/cubix/dist/index.js");
    if (!fs.existsSync(entry)) {
      throw new Error("Local CLI is not built. Run: npm run build:cli");
    }
    return { cmd: process.execPath, prefix: [entry] };
  }
  return { cmd: "npx", prefix: ["--yes", `cubix-ui@${cli}`] };
}

function run(cmd, args, cwd) {
  const isWin = process.platform === "win32";
  // On Windows, `shell: true` breaks paths that contain spaces (e.g. Program Files).
  // Use shell only for npm/npx shims; call node directly otherwise.
  const useShell = isWin && cmd !== process.execPath;
  const resolvedCmd =
    useShell && (cmd === "npm" || cmd === "npx") ? `${cmd}.cmd` : cmd;

  console.log(`\n$ ${[resolvedCmd, ...args].join(" ")}  (in ${cwd})`);
  const result = spawnSync(resolvedCmd, args, {
    cwd,
    stdio: "inherit",
    shell: useShell,
    env: process.env,
    windowsHide: true,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(
      `Command failed with exit code ${result.status}: ${resolvedCmd} ${args.join(" ")}`
    );
  }
}

function smokeBase({ cli, template, dir }, base) {
  const name = `smoke-${template}-${base}`;
  const projectDir = path.join(dir, name);
  fs.rmSync(projectDir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });

  const { cmd, prefix } = cliCommand(cli);
  run(cmd, [...prefix, "init", "-t", template, "--base", base, "-y", "--name", name], dir);
  run(cmd, [...prefix, "add", "--all", "-y", "--overwrite"], projectDir);
  run("npm", ["run", "build"], projectDir);
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  console.log(
    `cubix-ui smoke test - cli: ${opts.cli}, template: ${opts.template}, bases: ${opts.bases.join(", ")}`
  );

  const results = [];
  for (const base of opts.bases) {
    try {
      smokeBase(opts, base);
      results.push({ base, ok: true });
    } catch (err) {
      results.push({ base, ok: false, message: err instanceof Error ? err.message : String(err) });
    }
  }

  console.log("\nSummary");
  for (const result of results) {
    console.log(`  ${result.ok ? "PASS" : "FAIL"}  ${result.base}${result.ok ? "" : ` - ${result.message}`}`);
  }
  if (results.some((result) => !result.ok)) process.exit(1);
}

main();
