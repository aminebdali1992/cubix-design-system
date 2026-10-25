import type * as React from "react"

export type PreviewPrimaryId =
  | "cubix"
  | "digikala"
  | "alibaba"
  | "wepod"
  | "divar"
  | "black"

export const previewPrimaryOptions: {
  id: PreviewPrimaryId
  label: string
  color?: string
  foreground?: string
}[] = [
  { id: "cubix", label: "Cubix" },
  { id: "digikala", label: "Digikala", color: "#EF4056", foreground: "#ffffff" },
  { id: "alibaba", label: "Alibaba", color: "#FDB713", foreground: "#1a1a1a" },
  { id: "wepod", label: "Wepod", color: "#009B63", foreground: "#ffffff" },
  { id: "divar", label: "Divar", color: "#C32E2E", foreground: "#ffffff" },
  { id: "black", label: "Black", color: "#3B3B3C", foreground: "#ffffff" },
]

export function resolvePreviewPrimary(value: string | null | undefined): PreviewPrimaryId {
  return previewPrimaryOptions.some((option) => option.id === value)
    ? (value as PreviewPrimaryId)
    : "cubix"
}

/** CSS variables that recolor the primary inside a preview. Cubix returns none (global brand). */
export function previewPrimaryStyle(id: PreviewPrimaryId): React.CSSProperties | undefined {
  const option = previewPrimaryOptions.find((item) => item.id === id)
  if (!option?.color) return undefined
  return {
    "--primary": option.color,
    "--primary-foreground": option.foreground,
    "--ring": option.color,
  } as React.CSSProperties
}

export const globalPrimaryStorageKey = "cubix-primary"

const primaryVarNames = ["--primary", "--primary-foreground", "--ring"] as const

/** Sets (or clears, for Cubix) the primary vars on <html>. */
export function applyGlobalPrimary(id: PreviewPrimaryId) {
  const root = document.documentElement
  const style = previewPrimaryStyle(id) as Record<string, string> | undefined
  for (const name of primaryVarNames) {
    if (style?.[name]) root.style.setProperty(name, style[name])
    else root.style.removeProperty(name)
  }
}

/** Inline script for <head>: applies the saved color before first paint. */
export const globalPrimaryScript = `(function(){try{var o=${JSON.stringify(
  Object.fromEntries(
    previewPrimaryOptions
      .filter((option) => option.color)
      .map((option) => [option.id, [option.color, option.foreground]])
  )
)};var c=o[localStorage.getItem("${globalPrimaryStorageKey}")];if(c){var s=document.documentElement.style;s.setProperty("--primary",c[0]);s.setProperty("--primary-foreground",c[1]);s.setProperty("--ring",c[0]);}}catch(e){}})();`