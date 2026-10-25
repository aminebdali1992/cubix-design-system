import type { TokenTableRow } from "@/components/docs/token-table"

export const alertPropRows = [
  {
    prop: "variant",
    type: '"default" | "destructive"',
    default: '"default"',
    description: "The visual style of the alert.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "...props",
    type: "React.ComponentProps<'div'>",
    description:
      "All native div attributes (role, id, aria-*, ...) are forwarded to the rendered element.",
  },
]

export const alertTitleRows = [
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const alertDescriptionRows = [
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const alertActionRows = [
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const alertTypographyRows: TokenTableRow[] = [
  { element: "Title", token: "text-label font-medium", value: "13px / 18px, 500" },
  { element: "Description", token: "text-description", value: "13px / 22px, 400" },
]

export const alertColorRows: TokenTableRow[] = [
  { element: "Background", token: "bg-card", value: "--card", swatch: "--card", swatchOutline: true },
  { element: "Title and icon", token: "text-card-foreground", value: "--card-foreground", swatch: "--card-foreground" },
  { element: "Description", token: "text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
  { element: "Border", token: "border-border", value: "--border", swatch: "--border", swatchOutline: true },
  { element: "Link (hover)", token: "hover:text-foreground", value: "--foreground", swatch: "--foreground" },
  { element: "Destructive text and icon", token: "text-destructive", value: "--destructive", swatch: "--destructive" },
]