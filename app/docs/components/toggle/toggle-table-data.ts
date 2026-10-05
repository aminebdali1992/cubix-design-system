export const togglePropRows = [
  {
    prop: "variant",
    type: '"default" | "outline" | "segmented"',
    default: '"default"',
    description: "Visual style of the toggle.",
  },
  {
    prop: "size",
    type: '"default" | "sm" | "lg"',
    default: '"default"',
    description: "Size of the toggle.",
  },
  {
    prop: "pressed",
    type: "boolean",
    description: "Controlled pressed state.",
  },
  {
    prop: "defaultPressed",
    type: "boolean",
    description: "Uncontrolled initial pressed state.",
  },
  {
    prop: "onPressedChange",
    type: "(pressed: boolean) => void",
    description: "Called when the pressed state changes.",
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
