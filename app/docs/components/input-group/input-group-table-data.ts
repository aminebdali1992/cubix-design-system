import type { TokenTableRow } from "@/components/docs/token-table"

export const inputGroupPropRows = [
  {
    prop: "variant",
    type: '"outline" | "filled"',
    default: '"outline"',
    description:
      "Surface style. Outline draws an input border; filled uses a borderless muted surface for toolbars, sidebars and search fields.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const addonPropRows = [
  {
    prop: "align",
    type: '"inline-start" | "inline-end" | "block-start" | "block-end"',
    default: '"inline-start"',
    description:
      "Visual position of the addon. Place the addon after the control in the DOM for focus management.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const buttonPropRows = [
  {
    prop: "size",
    type: '"xs" | "icon-xs" | "sm" | "icon-sm"',
    default: '"xs"',
    description: "Size of the button inside the input group.",
  },
  {
    prop: "variant",
    type: '"default" | "destructive" | "destructive-secondary" | "outline" | "secondary" | "gray" | "ghost" | "link"',
    default: '"ghost"',
    description: "Visual style of the button.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const controlPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const inputGroupTypographyRows: TokenTableRow[] = [
  { element: "Input", token: "text-label", value: "13px, 400" },
  { element: "Placeholder", token: "text-label", value: "13px, 400" },
  { element: "Addon / text", token: "text-label font-normal", value: "13px, 400" },
]

export const inputGroupColorRows: TokenTableRow[] = [
  { element: "Text", token: "text-foreground", value: "--foreground", swatch: "--foreground" },
  { element: "Addon & icons", token: "text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
  { element: "Border", token: "border-input", value: "--input", swatch: "--input", swatchOutline: true },
  { element: "Filled background", token: "bg-muted", value: "--muted", swatch: "--muted", swatchOutline: true },
  { element: "Focus border", token: "has-[:focus-visible]:border-primary", value: "--primary", swatch: "--primary" },
  { element: "Focus ring", token: "has-[:focus-visible]:ring-primary/20", value: "--primary / 20%", swatch: "--primary" },
  { element: "Invalid border", token: "has-[[aria-invalid=true]]:border-destructive", value: "--destructive", swatch: "--destructive" },
  { element: "Disabled background", token: "has-disabled:bg-muted", value: "--muted", swatch: "--muted", swatchOutline: true },
  { element: "Disabled opacity", token: "has-disabled:opacity-70", value: "70%" },
]