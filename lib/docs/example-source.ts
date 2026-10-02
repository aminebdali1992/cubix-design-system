import fs from "node:fs"
import path from "node:path"

type ReadDocsExampleOptions = {
  /**
   * Public module path seniors paste into their apps.
   * Relative docs adapter imports (../docs-popover, ./docs-dialog, …)
   * are rewritten to this specifier in the displayed source.
   */
  publicImport: string
}

/**
 * Reads a docs example file for the Code tab.
 *
 * Preview imports the same module; the Code tab shows that file with
 * docs-only adapter paths rewritten to the public Cubix import so the
 * copied source is paste-ready and stays in sync with the live demo.
 */
export function readDocsExampleSource(
  relativePath: string,
  { publicImport }: ReadDocsExampleOptions
): string {
  const absolutePath = path.join(process.cwd(), relativePath)
  const source = fs.readFileSync(absolutePath, "utf8")

  return source
    .replace(/\r\n/g, "\n")
    .replace(/from\s+["'](?:\.\.\/|\.\/)docs-[a-z0-9-]+["']/g, `from "${publicImport}"`)
    .replace(/\s+$/u, "\n")
}

/**
 * Pulls the JSX inside the demo's top-level `return (...)` for short
 * Usage snippets. Dedents one level so the excerpt is paste-ready.
 */
export function extractDemoJsx(source: string): string {
  const match = source.match(/return\s*\(\n([\s\S]*?)\n\s*\)\s*\n\}\s*$/)
  if (!match?.[1]) {
    throw new Error("Could not extract return JSX from docs example source.")
  }

  const body = match[1]
  const indentMatch = body.match(/^[ \t]+/m)
  const indent = indentMatch?.[0] ?? ""
  const dedented = indent
    ? body
        .split("\n")
        .map((line) => (line.startsWith(indent) ? line.slice(indent.length) : line))
        .join("\n")
    : body

  return `${dedented}\n`
}

/**
 * Pulls the import block from a rewritten demo file for the Usage
 * Import code block (strips the "use client" directive).
 */
export function extractDemoImports(source: string): string {
  const withoutDirective = source.replace(/^["']use client["'];?\r?\n\r?\n?/, "")
  const exportIndex = withoutDirective.search(/^export\s/m)
  if (exportIndex === -1) {
    throw new Error("Could not extract imports from docs example source.")
  }

  return `${withoutDirective.slice(0, exportIndex).trimEnd()}\n`
}
