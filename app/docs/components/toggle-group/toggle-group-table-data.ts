export const toggleGroupPropRows = [
  {
    prop: "variant",
    type: '"default" | "outline"',
    default: '"default"',
    description: "Visual style applied to all items unless overridden.",
  },
  {
    prop: "size",
    type: '"default" | "sm" | "lg"',
    default: '"default"',
    description: "Size applied to all items unless overridden.",
  },
  {
    prop: "spacing",
    type: "number",
    default: "2",
    description:
      "Gap between items. Use 0 for connected items with shared borders.",
  },
  {
    prop: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: "Layout orientation of the group.",
  },
  {
    prop: "multiple",
    type: "boolean",
    default: "false",
    description:
      "When true, more than one item can be pressed (Base UI). Radix uses type=\"multiple\".",
  },
  {
    prop: "value",
    type: "string[]",
    description: "Controlled pressed values.",
  },
  {
    prop: "defaultValue",
    type: "string[]",
    description: "Uncontrolled initial pressed values.",
  },
  {
    prop: "onValueChange",
    type: "(value: string[]) => void",
    description: "Called when the pressed values change.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "When true, interaction is disabled for the group.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const toggleGroupItemPropRows = [
  {
    prop: "value",
    type: "string",
    description: "Unique value for this item within the group.",
  },
  {
    prop: "variant",
    type: '"default" | "outline"',
    description: "Overrides the group variant for this item.",
  },
  {
    prop: "size",
    type: '"default" | "sm" | "lg"',
    description: "Overrides the group size for this item.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "When true, this item cannot be pressed.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]
