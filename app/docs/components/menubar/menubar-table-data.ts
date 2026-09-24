export const menubarPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "One or more MenubarMenu elements.",
  },
]

export const triggerPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "The trigger label shown in the menubar.",
  },
]

export const contentPropRows = [
  {
    prop: "side",
    type: '"top" | "right" | "bottom" | "left"',
    default: '"bottom"',
    description: "Preferred side of the trigger to render the menu on.",
  },
  {
    prop: "align",
    type: '"start" | "center" | "end"',
    default: '"start"',
    description: "Alignment along the opposite axis of side.",
  },
  {
    prop: "sideOffset",
    type: "number",
    default: "8",
    description: "Distance in pixels between the trigger and the menu.",
  },
  {
    prop: "alignOffset",
    type: "number",
    default: "-4",
    description: "Offset in pixels along the alignment axis.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const itemPropRows = [
  {
    prop: "inset",
    type: "boolean",
    description: "Adds left padding to align with items that have indicators.",
  },
  {
    prop: "variant",
    type: '"default" | "destructive"',
    default: '"default"',
    description: "Visual style of the menu item.",
  },
  {
    prop: "disabled",
    type: "boolean",
    description: "Disables the menu item.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const checkboxItemPropRows = [
  {
    prop: "checked",
    type: "boolean",
    description: "Controlled checked state of the checkbox item.",
  },
  {
    prop: "inset",
    type: "boolean",
    description: "Adds left padding for alignment.",
  },
  {
    prop: "disabled",
    type: "boolean",
    description: "Disables the checkbox item.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const radioGroupPropRows = [
  {
    prop: "value",
    type: "string",
    description: "Controlled value of the selected radio item.",
  },
  {
    prop: "defaultValue",
    type: "string",
    description: "Initial value when uncontrolled.",
  },
  {
    prop: "onValueChange",
    type: "(value: string) => void",
    description: "Called when the selected value changes.",
  },
]
