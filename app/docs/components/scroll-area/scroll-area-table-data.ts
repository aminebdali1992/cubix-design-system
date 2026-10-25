import type { TokenTableRow } from "@/components/docs/token-table"

const classNameRow = {
  prop: "className",
  type: "string",
  description: "Additional Tailwind classes merged with the component styles (last one wins).",
}

export const scrollAreaPropRows = [
  { prop: "dir", type: '"rtl" | "ltr"', default: '"rtl"', description: "Text direction. RTL by default." },
  classNameRow,
  { prop: "children", type: "React.ReactNode", description: "Content rendered inside the scroll viewport." },
]

export const scrollBarPropRows = [
  { prop: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "Direction of the scrollbar." },
  classNameRow,
]

export const scrollAreaTypographyRows: TokenTableRow[] = [
  { element: "Content (examples)", token: "text-label font-normal", value: "13px, 400" },
]

export const scrollAreaColorRows: TokenTableRow[] = [
  { element: "Thumb", token: "bg-border", value: "--border", swatch: "--border" },
  { element: "Thumb hover", token: "hover:bg-foreground/30", value: "--foreground, 30%", swatch: "--foreground" },
  { element: "Container border", token: "border", value: "--border", swatch: "--border" },
  { element: "Focus ring", token: "ring-ring/50", value: "--ring, 50%", swatch: "--ring" },
]
