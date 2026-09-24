export const panelGroupPropRows = [
  {
    prop: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: "Direction of the panel group layout.",
  },
  {
    prop: "onLayoutChange",
    type: "(layout: Layout) => void",
    description: "Called when panel sizes change.",
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
    description: "ResizablePanel and ResizableHandle elements.",
  },
]

export const panelPropRows = [
  {
    prop: "defaultSize",
    type: "string | number",
    description: 'Initial size, such as "50%" or a pixel value.',
  },
  {
    prop: "minSize",
    type: "string | number",
    description: "Minimum size the panel can be resized to.",
  },
  {
    prop: "maxSize",
    type: "string | number",
    description: "Maximum size the panel can be resized to.",
  },
  {
    prop: "id",
    type: "string",
    description: "Stable id used for controlled layouts and persistence.",
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
    description: "Panel content.",
  },
]

export const handlePropRows = [
  {
    prop: "withHandle",
    type: "boolean",
    default: "true",
    description:
      "Shows the centered drag anchor on the separator. Set false for a plain line.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]
