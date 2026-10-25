import type { TokenTableRow } from "@/components/docs/token-table"

export const buttonGroupPropRows = [
  {
    prop: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: "Layout direction of the grouped controls.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Buttons, inputs, separators, text, or nested ButtonGroups.",
  },
]

export const separatorPropRows = [
  {
    prop: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"vertical"',
    description: "Divider direction. Vertical is the usual split between side-by-side buttons.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const textPropRows = [
  {
    prop: "render",
    type: "React.ReactElement",
    description:
      "Render the text slot as another element, such as a label. Same API on Base UI, React Aria, and Radix.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Label or helper text shown inside the group.",
  },
]

export const buttonGroupTypographyRows: TokenTableRow[] = [
  { element: "Buttons", token: "Button sizes (text-caption / text-label)", value: "12-13px / 1, 400" },
  { element: "ButtonGroupText", token: "text-description font-normal", value: "13px, 400" },
]

export const buttonGroupColorRows: TokenTableRow[] = [
  { element: "ButtonGroupText background", token: "bg-muted", value: "--muted", swatch: "--muted", swatchOutline: true },
  { element: "ButtonGroupText border", token: "border-border", value: "--border", swatch: "--border", swatchOutline: true },
  { element: "Separator", token: "bg-input", value: "--input", swatch: "--input", swatchOutline: true },
  { element: "Buttons", token: "Button variants", value: "See Button colors" },
]