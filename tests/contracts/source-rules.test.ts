// @vitest-environment node
import { readdirSync, readFileSync } from "node:fs"
import path from "node:path"

import { describe, expect, it } from "vitest"

const ROOT = path.resolve(__dirname, "../..")

const SKIPPED_DIRS = new Set([".git", ".next", ".vercel", "dist", "node_modules", "out"])
const TEXT_FILE = /\.(c|m)?(j|t)sx?$|\.(json|md|mdx|css|ya?ml)$/

const EM_DASH = "\u2014"

// Scanning every text file in the repository is slow on a cold disk cache.
const REPO_SCAN_TIMEOUT_MS = 120_000

/*
  Hex values that are not applied colors: attribute selectors that match the
  chart library's default strokes so token classes can override them.
*/
const CHART_DEFAULT_STROKE = /\[stroke='#[0-9a-fA-F]{3,8}'\]/g

/*
  The code block syntax palette has no design tokens yet, so its light and
  dark values are the only hardcoded colors allowed in shipped components.
*/
const SYNTAX_PALETTE_FILE = path.join("components", "cubix", "base", "code-block.tsx")
const SYNTAX_PALETTE_VAR = /\[--sh-[a-z]+:#[0-9a-fA-F]{6}\]/g

const RAW_COLOR = /#[0-9a-fA-F]{3,8}\b|\b(rgba?|hsla?)\(/g

function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory()) {
      return SKIPPED_DIRS.has(entry.name) ? [] : walk(path.join(dir, entry.name))
    }
    return [path.join(dir, entry.name)]
  })
}

function relative(file: string): string {
  return path.relative(ROOT, file)
}

describe("source rules", () => {
  it("never uses an em dash", () => {
    const offenders = walk(ROOT)
      .filter((file) => TEXT_FILE.test(file))
      .filter((file) => readFileSync(file, "utf8").includes(EM_DASH))
      .map(relative)

    expect(offenders).toEqual([])
  }, REPO_SCAN_TIMEOUT_MS)

  it("uses only design tokens for color in shipped components", () => {
    const offenders: string[] = []

    for (const file of walk(path.join(ROOT, "components", "cubix"))) {
      if (!file.endsWith(".tsx")) continue
      let source = readFileSync(file, "utf8").replace(CHART_DEFAULT_STROKE, "")
      if (relative(file) === SYNTAX_PALETTE_FILE) {
        source = source.replace(SYNTAX_PALETTE_VAR, "")
      }
      const colors = source.match(RAW_COLOR)
      if (colors) offenders.push(`${relative(file)}: ${[...new Set(colors)].join(" ")}`)
    }

    expect(offenders).toEqual([])
  })

  it("still needs the syntax palette exception", () => {
    const source = readFileSync(path.join(ROOT, SYNTAX_PALETTE_FILE), "utf8")

    expect(source.match(SYNTAX_PALETTE_VAR)?.length ?? 0).toBeGreaterThan(0)
  })
})
