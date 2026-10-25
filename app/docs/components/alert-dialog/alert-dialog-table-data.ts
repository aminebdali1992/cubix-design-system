import type { TokenTableRow } from "@/components/docs/token-table"

export const alertDialogPropRows = [
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

export const triggerPropRows = [
  {
    prop: "render",
    type: "React.ReactElement",
    description: "Render the trigger as another Cubix element (e.g. a Button).",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const contentPropRows = [
  {
    prop: "size",
    type: '"default" | "sm"',
    default: '"default"',
    description: "Width of the alert dialog panel.",
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

export const actionPropRows = [
  {
    prop: "variant",
    type: '"default" | "secondary" | "gray" | "destructive" | "destructive-secondary" | "outline" | "ghost" | "link"',
    default: '"default"',
    description: "Visual style of the confirm button.",
  },
  {
    prop: "size",
    type: '"default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"',
    default: '"sm"',
    description: "Size of the confirm button.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const cancelPropRows = [
  {
    prop: "variant",
    type: '"default" | "secondary" | "gray" | "destructive" | "destructive-secondary" | "outline" | "ghost" | "link"',
    default: '"outline"',
    description: "Visual style of the cancel button.",
  },
  {
    prop: "size",
    type: '"default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"',
    default: '"sm"',
    description: "Size of the cancel button.",
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

export const alertDialogTypographyRows: TokenTableRow[] = [
  { element: "Title", token: "text-title font-medium", value: "15px / 22px, 500" },
  { element: "Description", token: "text-description", value: "13px / 22px, 400" },
]

export const alertDialogColorRows: TokenTableRow[] = [
  { element: "Overlay", token: "bg-overlay-strong", value: "--overlay-strong", swatch: "--overlay-strong" },
  { element: "Content background", token: "bg-popover", value: "--popover", swatch: "--popover", swatchOutline: true },
  { element: "Title", token: "text-popover-foreground", value: "--popover-foreground", swatch: "--popover-foreground" },
  { element: "Description", token: "text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
  { element: "Content ring", token: "ring-foreground/10", value: "--foreground, 10%" },
  { element: "Media background", token: "bg-muted", value: "--muted", swatch: "--muted", swatchOutline: true },
  { element: "Footer background", token: "bg-muted/50", value: "--muted, 50%", swatch: "--muted", swatchOutline: true },
  { element: "Footer divider", token: "border-border", value: "--border", swatch: "--border", swatchOutline: true },
  { element: "Link (hover)", token: "hover:text-foreground", value: "--foreground", swatch: "--foreground" },
]