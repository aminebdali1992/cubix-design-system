import type { TokenTableRow } from "@/components/docs/token-table"

export const labelPropRows = [
  {
    prop: "htmlFor",
    type: "string",
    description: "The id of the control this label is associated with.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "The label text or content.",
  },
]

export const labelTypographyRows: TokenTableRow[] = [
  { element: "Label", token: "text-label", value: "13px, 400" },
]

export const labelColorRows: TokenTableRow[] = [
  { element: "Text", token: "text-foreground", value: "--foreground", swatch: "--foreground" },
  { element: "Disabled", token: "opacity-50", value: "50% opacity" },
]