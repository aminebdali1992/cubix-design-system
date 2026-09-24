export const messagePropRows = [
  {
    prop: "align",
    type: '"start" | "end"',
    default: '"start"',
    description: "The alignment of the message in the conversation.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional classes to apply to the row.",
  },
]

export const messageGroupPropRows = [
  {
    prop: "className",
    type: "string",
    description: "Additional classes to apply to the group root.",
  },
]

export const messageAvatarPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional classes to apply to the avatar slot. Aligns to the bottom of the message surface.",
  },
]

export const messageContentPropRows = [
  {
    prop: "className",
    type: "string",
    description: "Additional classes to apply to the content slot.",
  },
]

export const messageHeaderPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional classes to apply to the header. Stays aligned to the start regardless of align.",
  },
]

export const messageFooterPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional classes to apply to the footer. Aligns to the message side.",
  },
]
