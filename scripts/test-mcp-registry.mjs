/**
 * Offline checks for files the MCP tools rely on (no HTTP server required).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registryDir = path.join(root, "public", "r");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const index = JSON.parse(
  fs.readFileSync(path.join(registryDir, "registry.json"), "utf8")
);
assert(Array.isArray(index.items) && index.items.length > 0, "registry items");

for (const item of index.items) {
  assert(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.name),
    `invalid name ${item.name}`
  );
  const basePath = path.join(registryDir, `${item.name}.json`);
  assert(fs.existsSync(basePath), `missing ${item.name}.json`);
  for (const base of ["aria", "radix"]) {
    const variant = path.join(registryDir, base, `${item.name}.json`);
    assert(fs.existsSync(variant), `missing ${base}/${item.name}.json`);
  }
}

const button = JSON.parse(
  fs.readFileSync(path.join(registryDir, "button.json"), "utf8")
);
assert(
  typeof button.files?.[0]?.content === "string" &&
    button.files[0].content.length > 0,
  "button.json embeds source"
);

const demoPath = path.join(
  root,
  "app/docs/components/button/examples/button-demo.tsx"
);
assert(fs.existsSync(demoPath), "button demo exists for get_component_demo");

console.log(
  `OK  MCP registry contract: ${index.items.length} components with base/aria/radix JSON`
);
