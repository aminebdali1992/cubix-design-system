/**
 * End-to-end smoke test for the cubix-ui CLI.
 *
 * For each base it scaffolds a fresh project, runs `init`, adds components,
 * and runs the project's production build so copied files are type-checked.
 *
 * Usage:
 *   node scripts/smoke-cli.mjs
 *   node scripts/smoke-cli.mjs --cli local --base base,aria,radix
 *   node scripts/smoke-cli.mjs --cli 0.1.3 --components button,select,text-field
 *   node scripts/smoke-cli.mjs --dir /tmp/cubix-smoke
 *
 * When --cli local and CUBIX_REGISTRY_URL is unset, the local public/r folder
 * is used so CI does not depend on the live site.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ALL_BASES = ["base", "aria", "radix"];
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const localRegistry = path.join(root, "public/r");

function parseArgs(argv) {
  const opts = {
    cli: "local",
    bases: ALL_BASES,
    template: "vite",
    components: null,
    dir: path.join(os.tmpdir(), "cubix-smoke"),
  };
  for (let i = 0; i < argv.length; i += 1) {
    const flag = argv[i];
    const value = argv[i + 1];
    if (value === undefined) throw new Error(`Missing value for ${flag}`);
    if (flag === "--cli") opts.cli = value;
    else if (flag === "--base") opts.bases = value.split(",").map((s) => s.trim());
    else if (flag === "--template") opts.template = value;
    else if (flag === "--components") {
      opts.components = value.split(",").map((s) => s.trim()).filter(Boolean);
    } else if (flag === "--dir") opts.dir = path.resolve(value);
    else throw new Error(`Unknown option ${flag}`);
    i += 1;
  }
  const invalid = opts.bases.filter((base) => !ALL_BASES.includes(base));
  if (invalid.length > 0) {
    throw new Error(
      `Invalid base: ${invalid.join(", ")}. Use ${ALL_BASES.join(", ")}`
    );
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

function run(cmd, args, cwd, env = process.env) {
  const isWin = process.platform === "win32";
  // Avoid shell:true with node paths that contain spaces (Windows Program Files).
  const useShell = isWin && cmd !== process.execPath;
  const resolvedCmd =
    useShell && (cmd === "npm" || cmd === "npx") ? `${cmd}.cmd` : cmd;

  console.log(`\n$ ${[resolvedCmd, ...args].join(" ")}  (in ${cwd})`);
  const result = spawnSync(resolvedCmd, args, {
    cwd,
    stdio: "inherit",
    shell: useShell,
    env,
    windowsHide: true,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(
      `Command failed with exit code ${result.status}: ${resolvedCmd} ${args.join(" ")}`
    );
  }
}

function smokeEnv(cli) {
  const env = { ...process.env };
  if (cli === "local" && !env.CUBIX_REGISTRY_URL) {
    if (!fs.existsSync(path.join(localRegistry, "registry.json"))) {
      throw new Error(
        `Local registry missing at ${localRegistry}. Run: npm run registry:build`
      );
    }
    env.CUBIX_REGISTRY_URL = localRegistry;
  }
  return env;
}

function smokeBase(opts, base, env) {
  const name = `smoke-${opts.template}-${base}`;
  const projectDir = path.join(opts.dir, name);
  fs.rmSync(projectDir, { recursive: true, force: true });
  fs.mkdirSync(opts.dir, { recursive: true });

  const { cmd, prefix } = cliCommand(opts.cli);
  run(
    cmd,
    [
      ...prefix,
      "init",
      "-t",
      opts.template,
      "--base",
      base,
      "-y",
      "--name",
      name,
    ],
    opts.dir,
    env
  );

  const addArgs = opts.components
    ? [...prefix, "add", ...opts.components, "-y", "--overwrite"]
    : [...prefix, "add", "--all", "-y", "--overwrite"];
  run(cmd, addArgs, projectDir, env);
  run("npm", ["run", "build"], projectDir, env);
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  const env = smokeEnv(opts.cli);
  const componentLabel = opts.components
    ? opts.components.join(",")
    : "--all";

  console.log(
    `cubix-ui smoke - cli: ${opts.cli}, template: ${opts.template}, bases: ${opts.bases.join(", ")}, components: ${componentLabel}`
  );
  if (env.CUBIX_REGISTRY_URL) {
    console.log(`registry: ${env.CUBIX_REGISTRY_URL}`);
  }

  const results = [];
  for (const base of opts.bases) {
    try {
      smokeBase(opts, base, env);
      results.push({ base, ok: true });
    } catch (err) {
      results.push({
        base,
        ok: false,
        message: err instanceof Error ? err.message : String(err),
      });
    }
  }

  console.log("\nSummary");
  for (const result of results) {
    console.log(
      `  ${result.ok ? "PASS" : "FAIL"}  ${result.base}${result.ok ? "" : ` - ${result.message}`}`
    );
  }
  if (results.some((result) => !result.ok)) process.exit(1);
}

main();
