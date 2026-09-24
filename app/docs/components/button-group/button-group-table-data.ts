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
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
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
    description:
      "Divider direction. Vertical is the usual split between side-by-side buttons.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const textPropRows = [
  {
    prop: "render",
    type: "React.ReactElement",
    description:
      "Base UI / React Aria: render the text slot as another element, such as a label.",
  },
  {
    prop: "asChild",
    type: "boolean",
    default: "false",
    description:
      "Radix: merge props onto the child element instead of a wrapping div.",
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
    description: "Label or helper text shown inside the group.",
  },
]
