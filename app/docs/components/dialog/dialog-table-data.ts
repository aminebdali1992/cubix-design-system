import type { TokenTableRow } from "@/components/docs/token-table"

export const dialogPropRows = [
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
    description: "The trigger and content elements.",
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

export const footerPropRows = [
  {
    prop: "showCloseButton",
    type: "boolean",
    default: "false",
    description: "Append a default outline Close button in the footer.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const subcomponentRows = [
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const dialogTypographyRows: TokenTableRow[] = [
  { element: "Title", token: "text-title font-medium", value: "15px, 500" },
  { element: "Description", token: "text-description font-normal", value: "13px, 400" },
]

export const dialogColorRows: TokenTableRow[] = [
  { element: "Overlay", token: "bg-overlay-strong", value: "--overlay-strong", swatch: "--overlay-strong" },
  { element: "Content background", token: "bg-popover", value: "--popover", swatch: "--popover", swatchOutline: true },
  { element: "Content text", token: "text-popover-foreground", value: "--popover-foreground", swatch: "--popover-foreground" },
  { element: "Content ring", token: "ring-foreground/10", value: "--foreground / 10%", swatch: "--foreground" },
  { element: "Description", token: "text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
  { element: "Footer background", token: "bg-muted/50", value: "--muted / 50%", swatch: "--muted", swatchOutline: true },
  { element: "Footer border", token: "border-border", value: "--border", swatch: "--border" },
]