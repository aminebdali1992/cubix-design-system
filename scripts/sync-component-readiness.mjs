/**
 * Cubix readiness contract:
 * A component is public (ready) only when all of these are true:
 *   1. Source exists for base, aria, and radix
 *   2. Docs page exists at app/docs/components/<slug>/page.tsx
 *   3. It is listed in the source registry.json
 *
 * This script writes ready-components.json and syncs ready flags in
 * app/docs/components/components-data.ts. Run before registry:build.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const bases = ["base", "aria", "radix"];
const componentsDataPath = path.join(
  root,
  "app/docs/components/components-data.ts"
);
const registryPath = path.join(root, "registry.json");
const outPath = path.join(root, "lib/ready-components.json");

function listBase(base) {
  const dir = path.join(root, "components/cubix", base);
  if (!fs.existsSync(dir)) return new Set();
  return new Set(
    fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".tsx"))
      .map((f) => f.replace(/\.tsx$/, ""))
  );
}

const byBase = Object.fromEntries(bases.map((b) => [b, listBase(b)]));
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
const registryNames = new Set(registry.items.map((item) => item.name));

function hasDocs(slug) {
  return fs.existsSync(
    path.join(root, "app/docs/components", slug, "page.tsx")
  );
}

function meetsContract(slug) {
  return (
    byBase.base.has(slug) &&
    byBase.aria.has(slug) &&
    byBase.radix.has(slug) &&
    registryNames.has(slug) &&
    hasDocs(slug)
  );
}

const src = fs.readFileSync(componentsDataPath, "utf8");
const catalogSlugs = new Set();
for (const match of src.matchAll(/href:\s*"\/docs\/components\/([^"]+)"/g)) {
  catalogSlugs.add(match[1]);
}

const readySlugs = [...catalogSlugs].filter(meetsContract).sort();
const readySet = new Set(readySlugs);

let updated = src;
for (const slug of catalogSlugs) {
  const ready = readySet.has(slug);
  const pattern = new RegExp(
    `(href:\\s*"/docs/components/${slug}",\\s*\\n\\s*)ready:\\s*(true|false)`,
    "g"
  );
  updated = updated.replace(pattern, `$1ready: ${ready}`);
}

if (updated === src) {
  // Still write the JSON even if flags already match.
} else {
  fs.writeFileSync(componentsDataPath, updated, "utf8");
}

const payload = {
  $schemaComment:
    "Public Cubix readiness contract. A slug is ready only with base+aria+radix sources, docs, and a registry.json entry.",
  generatedAt: new Date().toISOString(),
  slugs: readySlugs,
};

fs.writeFileSync(outPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

const demoted = [...catalogSlugs].filter((s) => !readySet.has(s)).sort();
const registryNotReady = [...registryNames]
  .filter((name) => !readySet.has(name))
  .sort();

console.log(`Ready: ${readySlugs.length}`);
console.log(readySlugs.join(", "));
console.log(`\nNot ready (catalog): ${demoted.length}`);
console.log(
  `Registry items excluded from public install: ${registryNotReady.length}`
);
console.log(registryNotReady.join(", "));
