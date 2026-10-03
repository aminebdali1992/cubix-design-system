import fs from "fs-extra";
import path from "node:path";

export type Framework =
  | "next"
  | "start"
  | "react-router"
  | "astro"
  | "laravel"
  | "vite"
  | "unknown";

export type ProjectInfo = {
  framework: Framework;
  /** Folder that `@/*` resolves to, relative to the project root ("" for the root itself). */
  sourceRoot: string;
  /** Detected global CSS entry, relative to the project root. */
  cssPath: string | null;
  hasTsConfig: boolean;
  isEmpty: boolean;
};

const DEFAULT_CSS: Record<Exclude<Framework, "next" | "unknown">, string> = {
  start: "src/styles.css",
  "react-router": "app/app.css",
  astro: "src/styles/global.css",
  laravel: "resources/css/app.css",
  vite: "src/index.css",
};

const GENERIC_CSS_CANDIDATES = [
  "app/globals.css",
  "src/app/globals.css",
  "src/index.css",
  "src/styles.css",
  "src/styles/global.css",
  "src/styles/globals.css",
  "styles/globals.css",
];

async function readDependencies(cwd: string): Promise<Record<string, string>> {
  const file = path.join(cwd, "package.json");
  if (!(await fs.pathExists(file))) return {};
  const pkg = await fs.readJson(file);
  return { ...pkg.dependencies, ...pkg.devDependencies };
}

async function detectFramework(cwd: string): Promise<Framework> {
  const deps = await readDependencies(cwd);
  if (deps.next) return "next";
  if (deps["@tanstack/react-start"]) return "start";
  if (deps["@react-router/dev"]) return "react-router";
  if (deps.astro) return "astro";
  if (
    (await fs.pathExists(path.join(cwd, "composer.json"))) &&
    (await fs.pathExists(path.join(cwd, "resources", "js")))
  ) {
    return "laravel";
  }
  if (deps.vite) return "vite";
  return "unknown";
}

async function detectSourceRoot(cwd: string, framework: Framework) {
  switch (framework) {
    case "next":
      return (await fs.pathExists(path.join(cwd, "src", "app"))) ? "src" : "";
    case "react-router":
      return "app";
    case "laravel":
      return "resources/js";
    case "start":
    case "astro":
    case "vite":
      return "src";
    default:
      return (await fs.pathExists(path.join(cwd, "src"))) ? "src" : "";
  }
}

export function defaultCssPath(framework: Framework, sourceRoot: string) {
  if (framework === "next" || framework === "unknown") {
    return path.posix.join(sourceRoot, "app", "globals.css");
  }
  return DEFAULT_CSS[framework];
}

export async function getProjectInfo(cwd: string): Promise<ProjectInfo> {
  const entries = (await fs.pathExists(cwd))
    ? (await fs.readdir(cwd)).filter((name) => name !== ".git")
    : [];

  const framework = await detectFramework(cwd);
  const sourceRoot = await detectSourceRoot(cwd, framework);
  const candidates = [
    defaultCssPath(framework, sourceRoot),
    ...GENERIC_CSS_CANDIDATES,
  ];

  let cssPath: string | null = null;
  for (const candidate of candidates) {
    if (await fs.pathExists(path.join(cwd, candidate))) {
      cssPath = candidate;
      break;
    }
  }

  return {
    framework,
    sourceRoot,
    cssPath,
    hasTsConfig: await fs.pathExists(path.join(cwd, "tsconfig.json")),
    isEmpty: entries.length === 0,
  };
}
