import type { TokenTableRow } from "@/components/docs/token-table"

export const collapsibleCardSectionRows = [
  { prop: "title", type: "string", description: "Trigger text, rendered mono uppercase with tracking-widest." },
  { prop: "description", type: "React.ReactNode", description: "Short qualifier shown at the top of the content, only when the title needs context." },
  { prop: "defaultOpen", type: "boolean", default: "false", description: "Opens the section on first render." },
  { prop: "className", type: "string", description: "Classes for the Collapsible root." },
  { prop: "children", type: "React.ReactNode", description: "Optional or advanced form fields." },
]

export const collapsibleCardSectionTypographyRows: TokenTableRow[] = [
  { element: "Trigger title", token: "text-description font-medium", value: "13px / 22px, 500" },
  { element: "Description", token: "text-description font-normal", value: "13px / 22px, 400" },
]

export const collapsibleCardSectionColorRows: TokenTableRow[] = [
  { element: "Trigger title and chevron", token: "text-foreground", value: "--foreground", swatch: "--foreground" },
  { element: "Description", token: "text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
  { element: "Focus ring", token: "ring-primary/20", value: "--primary / 20%", swatch: "--primary" },
]