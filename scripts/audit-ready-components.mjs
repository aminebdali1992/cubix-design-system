import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const ready = JSON.parse(
  fs.readFileSync(path.join(root, "lib/ready-components.json"), "utf8")
).slugs
const bases = ["base", "aria", "radix"]
const hex = /#[0-9a-fA-F]{3,8}\b/
const rgb = /\brgba?\(/

// Context-only providers do not render a host element for data-slot.
const skipDataSlot = new Set(["direction"])
// Toast keeps a shared Toaster entry with primitive-native part names below it.
const skipExportParity = new Set(["toast"])

// Form controls that must expose an invalid visual state for a11y/forms.
// Chips are multi-select affordances without a shipped invalid demo/API.
const requireInvalidState = new Set([
  "input",
  "textarea",
  "select",
  "checkbox",
  "switch",
  "radio-group",
  "text-field",
  "email-field",
  "password-field",
  "phone-field",
  "number-field",
  "amount-field",
  "credit-card",
  "birthday-date",
  "verify-code",
  "combobox",
  "input-group",
])

// Numeric fields intentionally keep text-right for digit readability in RTL.
const allowTextRight = new Set([
  "amount-field",
  "number-field",
  "phone-field",
  "credit-card",
])

// Physical spacing/text utilities that usually break RTL when not direction-scoped.
const physicalSpacing =
  /(?:^|[\s"'`])((?:(?:sm|md|lg|xl|2xl|dark|hover|focus|focus-visible|active|disabled|aria-invalid|data-\[[^\]]+\]):)*)((?:ml|mr|pl|pr|text-left|text-right|float-left|float-right)-[^\s"'`]+)/g

const issues = []

function readComponent(base, slug) {
  const file = path.join(root, "components/cubix", base, `${slug}.tsx`)
  if (!fs.existsSync(file)) return null
  return { file, src: fs.readFileSync(file, "utf8") }
}

function isRelativeReexport(src) {
  return /export\s*\*\s*from\s*["']\.\.\/(base|aria|radix)\//.test(src)
}

function resolveSource(base, src, depth = 0) {
  const match = src.match(
    /export\s*\*\s*from\s*["']\.\.\/(base|aria|radix)\/([a-z0-9-]+)["']/
  )
  if (!match || depth >= 2) return { base, src }
  const next = readComponent(match[1], match[2])
  if (!next) return { base, src }
  return resolveSource(match[1], next.src, depth + 1)
}

function exportsOf(src) {
  const names = new Set()
  for (const match of src.matchAll(
    /export\s+(?:function|const)\s+([A-Z][A-Za-z0-9]*)/g
  )) {
    names.add(match[1])
  }
  for (const match of src.matchAll(/export\s*\{\s*([^}]+)\}/g)) {
    for (const part of match[1].split(",")) {
      const name = part.trim().split(/\s+as\s+/).pop()?.trim()
      if (name && /^[A-Z]/.test(name)) names.add(name)
    }
  }
  return [...names].sort()
}

function hasInvalidState(src) {
  return (
    src.includes("aria-invalid") ||
    src.includes("data-[invalid]") ||
    src.includes("group-data-[invalid]") ||
    src.includes("has-aria-invalid") ||
    src.includes("isInvalid")
  )
}

for (const slug of ready) {
  for (const base of bases) {
    const item = readComponent(base, slug)
    if (!item) {
      issues.push({ slug, base, kind: "missing-file" })
      continue
    }

    const { src } = item
    if (isRelativeReexport(src)) continue

    if (!skipDataSlot.has(slug) && !src.includes("data-slot")) {
      issues.push({ slug, base, kind: "no-data-slot" })
    }

    if (src.includes("className") && !src.includes("cn(")) {
      issues.push({ slug, base, kind: "no-cn" })
    }

    for (const other of bases.filter((value) => value !== base)) {
      if (src.includes(`@/components/cubix/${other}/`)) {
        issues.push({ slug, base, kind: "cross-base-import", other })
      }
    }

    if (requireInvalidState.has(slug) && !hasInvalidState(src)) {
      issues.push({ slug, base, kind: "missing-invalid-state" })
    }

    for (const [index, line] of src.split("\n").entries()) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith("//") || trimmed.startsWith("*")) {
        continue
      }
      if (trimmed.includes("currentColor") || trimmed.includes("var(--")) {
        continue
      }
      if (hex.test(trimmed) || rgb.test(trimmed)) {
        issues.push({
          slug,
          base,
          kind: "hardcoded-color",
          line: index + 1,
          text: trimmed.slice(0, 140),
        })
      }

      physicalSpacing.lastIndex = 0
      let match
      while ((match = physicalSpacing.exec(line)) !== null) {
        const full = `${match[1]}${match[2]}`
        if (full.includes("ltr:") || full.includes("rtl:")) continue
        if (allowTextRight.has(slug) && match[2].startsWith("text-right")) {
          continue
        }
        issues.push({
          slug,
          base,
          kind: "physical-spacing",
          line: index + 1,
          text: full,
        })
      }
    }
  }

  const files = Object.fromEntries(
    bases.map((base) => [base, readComponent(base, slug)])
  )
  if (!files.base || !files.aria || !files.radix) continue
  if (skipExportParity.has(slug)) continue

  const resolved = {
    base: resolveSource("base", files.base.src),
    aria: resolveSource("aria", files.aria.src),
    radix: resolveSource("radix", files.radix.src),
  }
  const baseExports = exportsOf(resolved.base.src)
  const ariaExports = exportsOf(resolved.aria.src)
  const radixExports = exportsOf(resolved.radix.src)

  if (ariaExports.join(",") !== baseExports.join(",")) {
    issues.push({
      slug,
      kind: "export-mismatch",
      pair: "base-aria",
      base: baseExports,
      other: ariaExports,
    })
  }
  if (radixExports.join(",") !== baseExports.join(",")) {
    issues.push({
      slug,
      kind: "export-mismatch",
      pair: "base-radix",
      base: baseExports,
      other: radixExports,
    })
  }
}

const summary = issues.reduce((acc, issue) => {
  acc[issue.kind] = (acc[issue.kind] ?? 0) + 1
  return acc
}, {})

console.log(
  JSON.stringify(
    {
      ready: ready.length,
      issueCount: issues.length,
      summary,
      issues,
    },
    null,
    2
  )
)

if (issues.length > 0) process.exitCode = 1
