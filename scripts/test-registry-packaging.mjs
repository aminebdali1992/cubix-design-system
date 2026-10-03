/**
 * Fast contract tests for the public registry packaging rules.
 * Does not scaffold apps - asserts on public/r after registry:build.
 *
 * Run: node scripts/test-registry-packaging.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registryDir = path.join(root, "public/r");
const readyPath = path.join(root, "lib/ready-components.json");

const BASES = ["base", "aria", "radix"];
const CROSS_BASE_IMPORT =
  /@\/components\/cubix\/(?:base|aria|radix)\/[a-z0-9-]+/;
const REEXPORT =
  /^export\s+\*\s+from\s+["']\.\.\/(?:base|aria|radix)\/[a-z0-9-]+["'];?\s*$/;

let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  PASS  ${message}`);
    return;
  }
  failed += 1;
  console.error(`  FAIL  ${message}`);
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function itemPath(name, base) {
  return base === "base"
    ? path.join(registryDir, `${name}.json`)
    : path.join(registryDir, base, `${name}.json`);
}

function main() {
  console.log("Registry packaging contract\n");

  assert(fs.existsSync(registryDir), "public/r exists");
  assert(fs.existsSync(readyPath), "lib/ready-components.json exists");

  const ready = readJson(readyPath);
  const index = readJson(path.join(registryDir, "registry.json"));
  const readySlugs = [...ready.slugs].sort();
  const indexNames = index.items.map((item) => item.name).sort();

  assert(
    readySlugs.length === indexNames.length &&
      readySlugs.every((slug, i) => slug === indexNames[i]),
    `registry index matches ready slugs (${readySlugs.length})`
  );

  for (const name of readySlugs) {
    for (const base of BASES) {
      const file = itemPath(name, base);
      assert(fs.existsSync(file), `${base}/${name}.json exists`);
      if (!fs.existsSync(file)) continue;

      const item = readJson(file);
      const mainFile = item.files?.find((entry) =>
        (entry.target ?? entry.path ?? "").endsWith(`${name}.tsx`)
      );
      assert(Boolean(mainFile?.content), `${base}/${name} has embedded source`);
      if (!mainFile?.content) continue;

      assert(
        !CROSS_BASE_IMPORT.test(mainFile.content),
        `${base}/${name} has no base/aria/radix import paths`
      );
      assert(
        !REEXPORT.test(mainFile.content.trim()),
        `${base}/${name} is not a relative re-export`
      );

      const deps = item.registryDependencies ?? [];
      assert(
        !deps.some((dep) => BASES.includes(dep)),
        `${base}/${name} registryDependencies do not include base names`
      );

      const imports = [
        ...mainFile.content.matchAll(/@\/components\/cubix\/([a-z0-9-]+)/g),
      ].map((match) => match[1]);
      for (const dep of new Set(imports)) {
        if (dep === name) continue;
        assert(
          deps.includes(dep),
          `${base}/${name} lists registryDependency "${dep}"`
        );
      }

      const libImports = [
        ...mainFile.content.matchAll(/@\/lib\/([a-z0-9_-]+)/g),
      ]
        .map((match) => match[1])
        .filter((mod) => mod !== "utils");
      for (const mod of new Set(libImports)) {
        const shipped = (item.files ?? []).some(
          (entry) =>
            (entry.target ?? entry.path ?? "").replace(/\\/g, "/") ===
            `lib/${mod}.ts`
        );
        assert(shipped, `${base}/${name} ships lib/${mod}.ts`);
      }
    }
  }

  console.log(
    `\nSummary: ${failed === 0 ? "PASS" : "FAIL"} (${failed} failure${failed === 1 ? "" : "s"})`
  );
  if (failed > 0) process.exit(1);
}

main();
