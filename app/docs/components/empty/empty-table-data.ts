import type { TokenTableRow } from "@/components/docs/token-table"

export const emptyPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const emptyMediaPropRows = [
  {
    prop: "variant",
    type: '"default" | "icon" | "outline"',
    default: '"default"',
    description:
      "Visual style for the media. Use icon for a muted rounded icon container, or outline for a larger bordered icon tile on the page background.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const emptySubcomponentRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const emptyTypographyRows: TokenTableRow[] = [
  { element: "Title", token: "text-description font-medium", value: "13px, 500" },
  { element: "Description", token: "text-description/relaxed", value: "13px / 1.625, 400" },
  { element: "Content", token: "text-description", value: "13px, 400" },
]

export const emptyColorRows: TokenTableRow[] = [
  { element: "Title", token: "text-foreground", value: "--foreground", swatch: "--foreground" },
  { element: "Description", token: "text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
  { element: "Description link hover", token: "text-primary", value: "--primary", swatch: "--primary" },
  { element: "Media (icon) background", token: "bg-muted", value: "--muted", swatch: "--muted", swatchOutline: true },
  { element: "Media (icon) icon", token: "text-foreground", value: "--foreground", swatch: "--foreground" },
  { element: "Media (outline) border", token: "border-border", value: "--border", swatch: "--border", swatchOutline: true },
  { element: "Media (outline) background", token: "bg-background", value: "--background", swatch: "--background", swatchOutline: true },
  { element: "Media (outline) icon", token: "text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
]
