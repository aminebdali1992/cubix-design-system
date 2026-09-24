export const conversationPropRows = [
  {
    prop: "className",
    type: "string",
    description: "Additional classes for the conversation root.",
  },
  {
    prop: "initial",
    type: '"smooth" | "instant" | false',
    default: '"smooth"',
    description: "Scroll behavior when the conversation first mounts.",
  },
  {
    prop: "resize",
    type: '"smooth" | "instant" | false',
    default: '"smooth"',
    description: "Scroll behavior when content size changes.",
  },
]

export const conversationContentPropRows = [
  {
    prop: "className",
    type: "string",
    description: "Additional classes for the scrollable content area.",
  },
]

export const conversationEmptyPropRows = [
  {
    prop: "title",
    type: "string",
    default: '"No messages yet"',
    description: "Empty-state heading.",
  },
  {
    prop: "description",
    type: "string",
    default: '"Start a conversation to see messages here."',
    description: "Supporting empty-state copy.",
  },
  {
    prop: "icon",
    type: "React.ReactNode",
    description: "Optional icon above the empty-state title.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Replace the default empty layout with custom content.",
  },
]

export const conversationScrollPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional classes for the jump-to-latest button. Hidden while at the bottom.",
  },
]

export const conversationDownloadPropRows = [
  {
    prop: "messages",
    type: "ConversationMessage[]",
    description: "Messages to export as Markdown. Each item needs role and text.",
  },
  {
    prop: "filename",
    type: "string",
    default: '"conversation.md"',
    description: "Download filename.",
  },
  {
    prop: "formatMessage",
    type: "(message, index) => string",
    description: "Optional formatter for each Markdown line.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Optional custom icon or label inside the download button.",
  },
]
