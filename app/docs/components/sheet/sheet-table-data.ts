import type { TokenTableRow } from "@/components/docs/token-table"

export const sheetPropRows = [
  {
    prop: "open",
    type: "boolean",
    description: "Controlled open state. Omit to use uncontrolled mode.",
  },
  {
    prop: "defaultOpen",
    type: "boolean",
    default: "false",
    description: "Initial open state when uncontrolled.",
  },
  {
    prop: "onOpenChange",
    type: "(open: boolean) => void",
    description: "Called when the open state changes.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "The trigger and sheet content.",
  },
]

export const triggerClosePropRows = [
  {
    prop: "render",
    type: "React.ReactElement",
    description: "Render the trigger or close control as another Cubix element (e.g. a Button).",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const contentPropRows = [
  {
    prop: "side",
    type: '"top" | "right" | "bottom" | "left"',
    default: '"right"',
    description: "Edge of the screen where the sheet appears.",
  },
  {
    prop: "showCloseButton",
    type: "boolean",
    default: "true",
    description: "Show the built-in close (X) button in the top end corner.",
  },
  {
    prop: "dir",
    type: '"ltr" | "rtl"',
    default: '"rtl"',
    description: "Text direction of the portaled panel. Defaults to RTL for Persian-first layouts.",
  },
  {
    prop: "lang",
    type: "string",
    default: '"fa"',
    description: 'Language attribute applied when dir is "rtl". Pass dir="ltr" to omit it.',
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const headerFooterPropRows = [
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const titleDescriptionPropRows = [
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const sheetTypographyRows: TokenTableRow[] = [
  { element: "Title", token: "text-title", value: "15px, 400" },
  { element: "Description", token: "text-description", value: "13px, 400" },
  { element: "Body", token: "text-label", value: "13px, 400" },
]

export const sheetColorRows: TokenTableRow[] = [
  { element: "Overlay", token: "bg-overlay-strong", value: "--overlay-strong", swatch: "--overlay-strong" },
  { element: "Panel", token: "bg-popover", value: "--popover", swatch: "--popover", swatchOutline: true },
  { element: "Title / Body", token: "text-popover-foreground", value: "--popover-foreground", swatch: "--popover-foreground" },
  { element: "Description", token: "text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
  { element: "Header / Footer border", token: "border-border", value: "--border", swatch: "--border" },
  { element: "Footer", token: "bg-muted/50", value: "--muted, 50%", swatch: "--muted", swatchOutline: true },
]