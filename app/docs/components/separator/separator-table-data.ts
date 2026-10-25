import type { TokenTableRow } from "@/components/docs/token-table"

export const separatorPropRows = [
  {
    prop: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: "The orientation of the separator.",
  },
  {
    prop: "variant",
    type: '"solid" | "dashed"',
    default: '"solid"',
    description: "Draws a solid or a dashed line.",
  },
  {
    prop: "decorative",
    type: "boolean",
    default: "true",
    description:
      "When true, the separator is purely visual and hidden from assistive tech (Radix UI).",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const separatorTypographyRows: TokenTableRow[] = [
  { element: "Title (example)", token: "text-label", value: "13px, 400" },
  { element: "Description (example)", token: "text-description", value: "13px, 400" },
]

export const separatorColorRows: TokenTableRow[] = [
  { element: "Line", token: "bg-border", value: "--border", swatch: "--border" },
  { element: "Title (example)", token: "text-foreground", value: "--foreground", swatch: "--foreground" },
  { element: "Description (example)", token: "text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
]