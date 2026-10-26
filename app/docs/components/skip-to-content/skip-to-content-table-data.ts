import type { TokenTableRow } from "@/components/docs/token-table"

export const skipToContentRows = [
  { prop: "href", type: "string", description: "Hash href to the main content landmark, e.g. #main." },
  { prop: "children", type: "React.ReactNode", default: "'پرش به محتوا'", description: "Link label." },
  { prop: "className", type: "string", description: "Optional classes merged onto the positioning wrapper (useful for demos or layout overrides)." },
]

export const skipToContentTypographyRows: TokenTableRow[] = [
  { element: "Label", token: "text-caption leading-none font-normal", value: "12px / 1, 400" },
]

export const skipToContentColorRows: TokenTableRow[] = [
  { element: "Outline", token: "border-border bg-background hover:bg-muted", value: "--border / --background", swatch: "--border", swatchOutline: true },
  { element: "Label", token: "text-foreground", value: "--foreground", swatch: "--foreground" },
  { element: "Focus ring", token: "focus-visible:ring-primary/20", value: "--primary / 20%", swatch: "--primary" },
]
