export const inputGroupPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const addonPropRows = [
  {
    prop: "align",
    type: '"inline-start" | "inline-end" | "block-start" | "block-end"',
    default: '"inline-start"',
    description:
      "Visual position of the addon. Place the addon after the control in the DOM for focus management.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const buttonPropRows = [
  {
    prop: "size",
    type: '"xs" | "icon-xs" | "sm" | "icon-sm"',
    default: '"xs"',
    description: "Size of the button inside the input group.",
  },
  {
    prop: "variant",
    type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
    default: '"ghost"',
    description: "Visual style of the button.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const controlPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]
