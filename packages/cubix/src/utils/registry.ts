import fs from "fs-extra";
import path from "node:path";
import { z } from "zod";

import type { BaseName, CubixConfig } from "./config";
import {
  CLI_NAME,
  DEFAULT_REGISTRY_URL,
  REGISTRY_INDEX_FILE,
  REGISTRY_URL_ENV,
} from "./constants";

const registryFileSchema = z.object({
  path: z.string(),
  type: z.string().optional(),
  target: z.string().optional(),
  content: z.string().optional(),
});

export const registryItemSchema = z.object({
  name: z.string(),
  type: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  dependencies: z.array(z.string()).optional().default([]),
  registryDependencies: z.array(z.string()).optional().default([]),
  files: z.array(registryFileSchema),
});

export type RegistryItem = z.infer<typeof registryItemSchema>;

const registryIndexSchema = z.object({
  name: z.string(),
  homepage: z.string().optional(),
  items: z.array(
    z.object({
      name: z.string(),
      type: z.string(),
      title: z.string().optional(),
      description: z.string().optional(),
    })
  ),
});

export type RegistryIndex = z.infer<typeof registryIndexSchema>;

export function getRegistryBaseUrl(config?: CubixConfig | null): string {
  return (
    process.env[REGISTRY_URL_ENV]?.replace(/\/$/, "") ||
    config?.registries?.cubix?.replace(/\/$/, "") ||
    DEFAULT_REGISTRY_URL
  );
}

async function fetchJson(url: string, label: string): Promise<unknown> {
  let response: Response;
  try {
    response = await fetch(url);
  } catch {
    throw new Error(
      `Could not reach the registry for ${label} at ${url}. Check your connection or set ${REGISTRY_URL_ENV}.`
    );
  }
  if (!response.ok) {
    throw new Error(`Failed to fetch ${label} from ${url} (${response.status}).`);
  }
  return response.json();
}

export async function fetchRegistryIndex(
  config?: CubixConfig | null
): Promise<RegistryIndex> {
  const url = `${getRegistryBaseUrl(config)}/${REGISTRY_INDEX_FILE}`;
  return registryIndexSchema.parse(await fetchJson(url, "the registry index"));
}

export async function fetchRegistryItem(
  nameOrUrl: string,
  config?: CubixConfig | null
): Promise<RegistryItem> {
  const base = getRegistryBaseUrl(config);
  const url =
    nameOrUrl.startsWith("http://") ||
    nameOrUrl.startsWith("https://") ||
    nameOrUrl.startsWith("file:")
      ? nameOrUrl
      : nameOrUrl.endsWith(".json")
        ? nameOrUrl
        : `${base}/${nameOrUrl}.json`;

  if (url.startsWith("file:")) {
    const filePath = url.replace("file:", "");
    const raw = await fs.readJson(filePath);
    return registryItemSchema.parse(raw);
  }

  if (await fs.pathExists(url)) {
    const raw = await fs.readJson(url);
    return registryItemSchema.parse(raw);
  }

  // Local registry dir (monorepo / offline): ./public/r/button.json
  const localCandidate = path.resolve(url);
  if (await fs.pathExists(localCandidate)) {
    const raw = await fs.readJson(localCandidate);
    return registryItemSchema.parse(raw);
  }

  return registryItemSchema.parse(
    await fetchJson(url, `registry item "${nameOrUrl}"`)
  );
}

export async function resolveFileContent(options: {
  item: RegistryItem;
  file: RegistryItem["files"][number];
  base: BaseName;
  componentsRoot?: string;
}): Promise<string> {
  if (options.file.content) return options.file.content;

  const roots = [
    options.componentsRoot,
    process.env.CUBIX_COMPONENTS_DIR,
    path.resolve(process.cwd(), "components/cubix"),
    path.resolve(process.cwd(), "../../components/cubix"),
  ].filter(Boolean) as string[];

  const name = options.item.name;
  const candidates = [
    `${options.base}/${name}.tsx`,
    `base/${name}.tsx`,
    `${name}.tsx`,
  ];

  for (const root of roots) {
    for (const relative of candidates) {
      const full = path.join(root, relative);
      if (await fs.pathExists(full)) {
        return fs.readFile(full, "utf8");
      }
    }
  }

  throw new Error(
    `Registry item "${options.item.name}" has no file content. Run \`${CLI_NAME} build\` in the Cubix monorepo to embed sources, or set CUBIX_COMPONENTS_DIR.`
  );
}

export function packageNameFromSpecifier(specifier: string) {
  if (specifier.startsWith("@")) {
    return specifier.split("/").slice(0, 2).join("/");
  }
  return specifier.split("/")[0] ?? specifier;
}

const SKIP_DEPS = new Set([
  "react",
  "react-dom",
  "next",
  "clsx",
  "tailwind-merge",
  "class-variance-authority",
  "lucide-react",
]);

export function dependenciesFromSource(source: string, declared: string[]) {
  const packages = new Set(declared);
  for (const match of source.matchAll(/from ["']([^"']+)["']/g)) {
    const specifier = match[1];
    if (!specifier || specifier.startsWith(".") || specifier.startsWith("@/")) {
      continue;
    }
    const name = packageNameFromSpecifier(specifier);
    if (!SKIP_DEPS.has(name)) packages.add(name);
  }
  return [...packages].sort();
}
