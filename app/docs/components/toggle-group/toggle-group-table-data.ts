import type { TokenTableRow } from "@/components/docs/token-table"

export const toggleGroupPropRows = [
  {
    prop: "variant",
    type: '"default" | "outline" | "segmented"',
    default: '"default"',
    description: "Visual style applied to all items unless overridden.",
  },
  {
    prop: "size",
    type: '"default" | "xs" | "sm" | "lg"',
    default: '"default"',
    description: "Size applied to all items unless overridden.",
  },
  {
    prop: "spacing",
    type: "number",
    default: "2",
    description:
      "Gap between items. Use 0 for connected items with shared borders.",
  },
  {
    prop: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: "Layout orientation of the group.",
  },
  {
    prop: "dir",
    type: '"rtl" | "ltr"',
    default: '"rtl"',
    description: "Reading direction of the group and its arrow key navigation.",
  },
  {
    prop: "multiple",
    type: "boolean",
    default: "false",
    description: "When true, more than one item can be pressed.",
  },
  {
    prop: "value",
    type: "string[]",
    description: "Controlled pressed values.",
  },
  {
    prop: "defaultValue",
    type: "string[]",
    description: "Uncontrolled initial pressed values.",
  },
  {
    prop: "onValueChange",
    type: "(value: string[]) => void",
    description: "Called when the pressed values change.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "When true, interaction is disabled for the group.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const toggleGroupItemPropRows = [
  {
    prop: "value",
    type: "string",
    description: "Unique value for this item within the group.",
  },
  {
    prop: "variant",
    type: '"default" | "outline" | "segmented"',
    description: "Overrides the group variant for this item.",
  },
  {
    prop: "size",
    type: '"default" | "xs" | "sm" | "lg"',
    description: "Overrides the group size for this item.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "When true, this item cannot be pressed.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const toggleGroupTypographyRows: TokenTableRow[] = [
  { element: "Item (default)", token: "text-label leading-none font-normal", value: "13px / 1, 400" },
  { element: "Item (lg)", token: "text-description leading-none font-normal", value: "13px / 1, 400" },
  { element: "Item (xs)", token: "text-caption leading-none font-normal", value: "12px / 1, 400" },
  { element: "Item (sm)", token: "text-caption leading-none font-normal", value: "12px / 1, 400" },
]

export const toggleGroupColorRows: TokenTableRow[] = [
  { element: "Item (hover)", token: "bg-muted", value: "--muted", swatch: "--muted" },
  { element: "Item (hover text)", token: "text-foreground", value: "--foreground", swatch: "--foreground" },
  { element: "Item (pressed)", token: "bg-muted", value: "--muted", swatch: "--muted" },
  { element: "Item (outline border)", token: "border-input", value: "--input", swatch: "--input", swatchOutline: true },
  { element: "Segmented (track)", token: "bg-muted", value: "--muted", swatch: "--muted" },
  { element: "Segmented (inactive text)", token: "text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
  { element: "Segmented (pressed)", token: "bg-card", value: "--card", swatch: "--card", swatchOutline: true },
  { element: "Segmented (pressed border)", token: "border-border", value: "--border", swatch: "--border", swatchOutline: true },
  { element: "Item (focus ring)", token: "ring-ring/50", value: "--ring, 50%", swatch: "--ring" },
  { element: "Item (invalid)", token: "border-destructive", value: "--destructive", swatch: "--destructive" },
]
