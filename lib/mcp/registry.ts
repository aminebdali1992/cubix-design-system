import fs from "node:fs/promises";
import path from "node:path";

import { isBaseName, type BaseName } from "@/lib/bases";
import { siteConfig } from "@/lib/site";

const REGISTRY_DIR = path.join(process.cwd(), "public", "r");
const COMPONENT_NAME_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type RegistryIndexItem = {
  name: string;
  type: string;
  title?: string;
  description?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files?: Array<{ path: string; type?: string }>;
  bases?: string[];
};

export type RegistryIndex = {
  name: string;
  homepage?: string;
  items: RegistryIndexItem[];
};

export type RegistryFile = {
  path: string;
  type?: string;
  target?: string;
  content?: string;
};

export type RegistryItem = {
  name: string;
  type: string;
  title?: string;
  description?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
};

let indexCache: { at: number; value: RegistryIndex } | null = null;
const INDEX_TTL_MS = 30_000;

export function isValidComponentName(name: string): boolean {
  return COMPONENT_NAME_RE.test(name);
}

export function normalizeBase(value: unknown): BaseName {
  if (typeof value === "string" && isBaseName(value)) {
    return value;
  }
  return "base";
}

function itemPath(name: string, base: BaseName): string {
  if (base === "base") {
    return path.join(REGISTRY_DIR, `${name}.json`);
  }
  return path.join(REGISTRY_DIR, base, `${name}.json`);
}

export async function loadRegistryIndex(): Promise<RegistryIndex> {
  const now = Date.now();
  if (indexCache && now - indexCache.at < INDEX_TTL_MS) {
    return indexCache.value;
  }

  const raw = await fs.readFile(
    path.join(REGISTRY_DIR, "registry.json"),
    "utf8"
  );
  const parsed = JSON.parse(raw) as RegistryIndex;
  if (!parsed || !Array.isArray(parsed.items)) {
    throw new Error("Registry index is malformed.");
  }

  indexCache = { at: now, value: parsed };
  return parsed;
}

export async function loadRegistryItem(
  name: string,
  base: BaseName = "base"
): Promise<RegistryItem | null> {
  if (!isValidComponentName(name)) {
    return null;
  }

  try {
    const raw = await fs.readFile(itemPath(name, base), "utf8");
    const parsed = JSON.parse(raw) as RegistryItem;
    if (!parsed?.name || !Array.isArray(parsed.files)) {
      return null;
    }
    return parsed;
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      (error as NodeJS.ErrnoException).code === "ENOENT"
    ) {
      return null;
    }
    throw error;
  }
}

export function searchRegistryItems(
  items: RegistryIndexItem[],
  query: string
): RegistryIndexItem[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];

  return items.filter((item) => {
    const haystack = [
      item.name,
      item.title ?? "",
      item.description ?? "",
      ...(item.bases ?? []),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(needle);
  });
}

export function buildInstallCommand(
  name: string,
  base: BaseName = "base"
): string {
  const flag = base === "base" ? "" : ` --base ${base}`;
  return `npx ${siteConfig.packageName}@latest add ${name}${flag}`;
}

export function componentDocsUrl(name: string, base: BaseName = "base"): string {
  return `${siteConfig.url}/docs/components/${base}/${name}`;
}

export function registryItemUrl(name: string, base: BaseName = "base"): string {
  if (base === "base") {
    return `${siteConfig.registryUrl}/${name}.json`;
  }
  return `${siteConfig.registryUrl}/${base}/${name}.json`;
}

export type SummarizedComponent = {
  name: string;
  title: string;
  description: string;
  type: string;
  bases: string[];
  registryDependencies: string[];
  docs: string;
};

export function summarizeIndexItem(
  item: RegistryIndexItem
): SummarizedComponent {
  const bases =
    item.bases && item.bases.length > 0
      ? item.bases
      : (["base", "aria", "radix"] as const);
  return {
    name: item.name,
    title: item.title ?? item.name,
    description: item.description ?? "",
    type: item.type,
    bases: [...bases],
    registryDependencies: item.registryDependencies ?? [],
    docs: componentDocsUrl(item.name),
  };
}
