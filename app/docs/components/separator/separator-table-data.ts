export const separatorPropRows = [
  {
    prop: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: "The orientation of the separator.",
  },
  {
    prop: "decorative",
    type: "boolean",
    default: "true",
    description:
      "When true, the separator is purely visual and hidden from assistive tech (Radix UI).",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]
