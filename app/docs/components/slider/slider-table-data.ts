import type { TokenTableRow } from "@/components/docs/token-table"

export const sliderPropRows = [
  {
    prop: "defaultValue",
    type: "number | number[]",
    description:
      "Uncontrolled initial value. Use a single-item array for one thumb, or multiple values for a range.",
  },
  {
    prop: "value",
    type: "number | number[]",
    description: "Controlled value. Thumb count matches the array length.",
  },
  {
    prop: "onValueChange",
    type: "(value: number | number[], eventDetails?) => void",
    description: "Called while the value changes (for example during drag).",
  },
  {
    prop: "onValueCommitted",
    type: "(value: number | number[], eventDetails?) => void",
    description:
      "Called when a change is committed (Base UI). Radix uses onValueCommit.",
  },
  {
    prop: "min",
    type: "number",
    default: "0",
    description: "Minimum allowed value.",
  },
  {
    prop: "max",
    type: "number",
    default: "100",
    description: "Maximum allowed value.",
  },
  {
    prop: "step",
    type: "number",
    default: "1",
    description: "Step increment when adjusting the value.",
  },
  {
    prop: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: "Layout orientation of the slider.",
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

export const sliderTypographyRows: TokenTableRow[] = [
  { element: "Label (example)", token: "text-label", value: "13px, 400" },
  { element: "Value (example)", token: "text-description", value: "13px, 400, tabular-nums" },
]

export const sliderColorRows: TokenTableRow[] = [
  { element: "Track", token: "bg-muted", value: "--muted", swatch: "--muted", swatchOutline: true },
  { element: "Range", token: "bg-primary", value: "--primary", swatch: "--primary" },
  { element: "Thumb", token: "bg-background", value: "--background", swatch: "--background", swatchOutline: true },
  { element: "Thumb border", token: "border-primary", value: "--primary", swatch: "--primary" },
  { element: "Thumb ring (hover / focus)", token: "ring-primary/20", value: "--primary, 20%", swatch: "--primary" },
]