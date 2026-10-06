// @vitest-environment node
import { readdirSync } from "node:fs"
import path from "node:path"

import { describe, expect, it } from "vitest"

const CUBIX_DIR = path.resolve(__dirname, "../../components/cubix")

// Importing every component module of every base is slow on a cold cache.
const IMPORT_ALL_TIMEOUT_MS = 120_000

/*
  Export differences between bases that exist today, keyed by "<base>/<component>".
  The suite fails when an entry is resolved as well as when a new difference
  appears, so this list only ever shrinks on purpose.
*/
const KNOWN_DIVERGENCES: Readonly<Record<string, { missing: string[]; extra: string[] }>> = {
  "radix/drawer": { missing: ["DrawerSwipeHandle"], extra: [] },
  "radix/navigation-menu": {
    missing: ["NavigationMenuPositioner"],
    extra: ["NavigationMenuViewport"],
  },
  "radix/toast": {
    missing: [
      "ToastContent",
      "ToastPortal",
      "ToastProvider",
      "createToastManager",
      "useToastManager",
    ],
    extra: [],
  },
  "aria/toast": {
    missing: [
      "Toast",
      "ToastAction",
      "ToastClose",
      "ToastContent",
      "ToastDescription",
      "ToastPortal",
      "ToastProvider",
      "ToastTitle",
      "ToastViewport",
      "createToastManager",
      "useToastManager",
    ],
    extra: ["ToastRegion"],
  },
}

function componentNames(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".tsx"))
    .map((entry) => entry.name.slice(0, -".tsx".length))
    .sort()
}

async function exportNames(file: string): Promise<string[]> {
  const mod: Record<string, unknown> = await import(/* @vite-ignore */ file)
  return Object.keys(mod).sort()
}

function difference(from: string[], other: string[]): string[] {
  const exclude = new Set(other)
  return from.filter((name) => !exclude.has(name))
}

const baseNames = componentNames(path.join(CUBIX_DIR, "base"))
const radixNames = componentNames(path.join(CUBIX_DIR, "radix"))
const ariaNames = componentNames(path.join(CUBIX_DIR, "aria"))
const rootNames = componentNames(CUBIX_DIR)

describe("base parity", () => {
  it("ships every Base UI component on Radix and at the package root", () => {
    expect(radixNames).toEqual(baseNames)
    expect(rootNames).toEqual(baseNames)
  })

  it("ships no React Aria component without a Base UI original", () => {
    expect(difference(ariaNames, baseNames)).toEqual([])
  })

  it("re-exports Base UI from every root entry", async () => {
    for (const name of rootNames) {
      const root = await exportNames(path.join(CUBIX_DIR, `${name}.tsx`))
      const base = await exportNames(path.join(CUBIX_DIR, "base", `${name}.tsx`))
      expect({ name, exports: root }).toEqual({ name, exports: base })
    }
  }, IMPORT_ALL_TIMEOUT_MS)

  it("keeps the same exports across bases", async () => {
    const divergences: Record<string, { missing: string[]; extra: string[] }> = {}

    for (const name of baseNames) {
      const base = await exportNames(path.join(CUBIX_DIR, "base", `${name}.tsx`))
      const others = [
        ["radix", true],
        ["aria", ariaNames.includes(name)],
      ] as const

      for (const [other, present] of others) {
        if (!present) continue
        const exports = await exportNames(path.join(CUBIX_DIR, other, `${name}.tsx`))
        const missing = difference(base, exports)
        const extra = difference(exports, base)
        if (missing.length > 0 || extra.length > 0) {
          divergences[`${other}/${name}`] = { missing, extra }
        }
      }
    }

    expect(divergences).toEqual(KNOWN_DIVERGENCES)
  }, IMPORT_ALL_TIMEOUT_MS)
})
