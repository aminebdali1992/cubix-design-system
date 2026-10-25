import type { TokenTableRow } from "@/components/docs/token-table"

export const admonitionPropRows = [
  {
    prop: "type",
    type: '"default" | "note" | "warning" | "destructive" | "success"',
    default: '"default"',
    description: "Sets the surface, border and icon color. Also sets the accessible label.",
  },
  {
    prop: "title",
    type: "React.ReactNode",
    description: "Optional heading line. Pair it with description or children.",
  },
  {
    prop: "description",
    type: "React.ReactNode",
    description: "Body text rendered below the title in muted color.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Rich body content (paragraphs, lists, links) rendered like description.",
  },
  {
    prop: "actions",
    type: "React.ReactNode",
    description: "Buttons rendered below the text, or beside it in horizontal layouts.",
  },
  {
    prop: "layout",
    type: '"vertical" | "horizontal" | "responsive"',
    default: '"horizontal"',
    description:
      "Places actions below or beside the text. Responsive switches at the @md container width.",
  },
  {
    prop: "showIcon",
    type: "boolean",
    default: "true",
    description: "Shows the type icon at the start.",
  },
  {
    prop: "icon",
    type: "React.ReactNode",
    description: "Replaces the default type icon.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "...props",
    type: "React.ComponentProps<'div'>",
    description: "Native div attributes (id, aria-*, data-*) are forwarded to the root element.",
  },
]

export const admonitionTypographyRows: TokenTableRow[] = [
  { element: "Title", token: "text-label font-normal", value: "13px / 18px, 400" },
  { element: "Description", token: "text-label font-normal leading-relaxed", value: "13px, 400" },
]

export const admonitionColorRows: TokenTableRow[] = [
  { element: "Default background", token: "bg-card", value: "--card", swatch: "--card", swatchOutline: true },
  { element: "Note background", token: "bg-muted", value: "--muted", swatch: "--muted", swatchOutline: true },
  { element: "Border", token: "border-border", value: "--border", swatch: "--border", swatchOutline: true },
  { element: "Title", token: "text-foreground", value: "--foreground", swatch: "--foreground" },
  { element: "Description", token: "text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
  { element: "Default icon", token: "bg-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
  { element: "Warning surface and icon", token: "bg-warning/10 border-warning/40 bg-warning", value: "--warning", swatch: "--warning" },
  { element: "Destructive surface and icon", token: "bg-destructive/10 border-destructive/40 bg-destructive", value: "--destructive", swatch: "--destructive" },
  { element: "Success surface and icon", token: "bg-success/10 border-success/40 bg-success", value: "--success", swatch: "--success" },
]
