import type { TokenTableRow } from "@/components/docs/token-table"

export const skeletonPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Optional content rendered inside the skeleton.",
  },
]

export const skeletonColorRows: TokenTableRow[] = [
  { element: "Placeholder", token: "bg-muted", value: "--muted", swatch: "--muted", swatchOutline: true },
]