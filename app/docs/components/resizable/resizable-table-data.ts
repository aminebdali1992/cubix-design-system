import type { TokenTableRow } from "@/components/docs/token-table"

const classNameRow = {
  prop: "className",
  type: "string",
  description: "Additional Tailwind classes merged with the component styles (last one wins).",
}

export const panelGroupPropRows = [
  { prop: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Direction of the panel group layout." },
  { prop: "dir", type: '"rtl" | "ltr"', default: '"rtl"', description: "Text direction. RTL by default, so the first panel sits on the right." },
  { prop: "onLayoutChange", type: "(layout: Layout) => void", description: "Called when panel sizes change." },
  classNameRow,
  { prop: "children", type: "React.ReactNode", description: "ResizablePanel and ResizableHandle elements." },
]

export const panelPropRows = [
  { prop: "defaultSize", type: "string | number", description: 'Initial size, such as "50%" or a pixel value.' },
  { prop: "minSize", type: "string | number", description: "Minimum size the panel can be resized to." },
  { prop: "maxSize", type: "string | number", description: "Maximum size the panel can be resized to." },
  { prop: "id", type: "string", description: "Stable id used for controlled layouts and persistence." },
  classNameRow,
  { prop: "children", type: "React.ReactNode", description: "Panel content." },
]

export const handlePropRows = [
  { prop: "withHandle", type: "boolean", default: "true", description: "Shows the centered drag anchor on the separator. Set false for a plain line." },
  classNameRow,
]

export const resizableTypographyRows: TokenTableRow[] = [
  { element: "Panel label (examples)", token: "text-label font-normal", value: "13px, 400" },
]

export const resizableColorRows: TokenTableRow[] = [
  { element: "Separator line", token: "bg-border", value: "--border", swatch: "--border" },
  { element: "Drag anchor", token: "bg-border", value: "--border", swatch: "--border" },
  { element: "Container border", token: "border", value: "--border", swatch: "--border" },
  { element: "Focus ring", token: "ring-ring", value: "--ring", swatch: "--ring" },
]
