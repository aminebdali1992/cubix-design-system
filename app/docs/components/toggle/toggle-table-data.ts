import type { TokenTableRow } from "@/components/docs/token-table"

export const togglePropRows = [
  {
    prop: "variant",
    type: '"default" | "outline" | "segmented"',
    default: '"default"',
    description: "Visual style of the toggle.",
  },
  {
    prop: "size",
    type: '"default" | "xs" | "sm" | "lg"',
    default: '"default"',
    description: "Size of the toggle.",
  },
  {
    prop: "pressed",
    type: "boolean",
    description: "Controlled pressed state.",
  },
  {
    prop: "defaultPressed",
    type: "boolean",
    description: "Uncontrolled initial pressed state.",
  },
  {
    prop: "onPressedChange",
    type: "(pressed: boolean) => void",
    description: "Called when the pressed state changes.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "When true, interaction is disabled.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const toggleTypographyRows: TokenTableRow[] = [
  { element: "Toggle (default)", token: "text-label leading-none font-normal", value: "13px / 1, 400" },
  { element: "Toggle (lg)", token: "text-description leading-none font-normal", value: "13px / 1, 400" },
  { element: "Toggle (xs)", token: "text-caption leading-none font-normal", value: "12px / 1, 400" },
  { element: "Toggle (sm)", token: "text-caption leading-none font-normal", value: "12px / 1, 400" },
]

export const toggleColorRows: TokenTableRow[] = [
  { element: "Toggle (hover)", token: "bg-muted", value: "--muted", swatch: "--muted" },
  { element: "Toggle (hover text)", token: "text-foreground", value: "--foreground", swatch: "--foreground" },
  { element: "Toggle (pressed)", token: "bg-muted", value: "--muted", swatch: "--muted" },
  { element: "Toggle (outline border)", token: "border-input", value: "--input", swatch: "--input", swatchOutline: true },
  { element: "Segmented (inactive text)", token: "text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
  { element: "Segmented (pressed)", token: "bg-card", value: "--card", swatch: "--card", swatchOutline: true },
  { element: "Segmented (pressed border)", token: "border-border", value: "--border", swatch: "--border", swatchOutline: true },
  { element: "Toggle (focus ring)", token: "ring-ring/50", value: "--ring, 50%", swatch: "--ring" },
  { element: "Toggle (invalid)", token: "border-destructive", value: "--destructive", swatch: "--destructive" },
]