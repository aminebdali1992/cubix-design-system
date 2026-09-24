export const thinkingPropRows = [
  {
    prop: "isStreaming",
    type: "boolean",
    default: "false",
    description:
      "When true, the trigger shows Thinking... and the panel auto-opens unless pinned closed.",
  },
  {
    prop: "open",
    type: "boolean",
    description: "Controlled open state.",
  },
  {
    prop: "defaultOpen",
    type: "boolean",
    description:
      "Initial open state. Defaults to isStreaming. Set false to keep closed while streaming.",
  },
  {
    prop: "onOpenChange",
    type: "(open: boolean) => void",
    description: "Called when the open state changes. Manual toggles pin the reader's choice.",
  },
  {
    prop: "duration",
    type: "number",
    description:
      "Controlled think duration in seconds. When omitted, duration is measured from isStreaming.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional classes for the thinking root.",
  },
]

export const thinkingTriggerPropRows = [
  {
    prop: "getThinkingMessage",
    type: "(isStreaming, duration?) => ReactNode",
    description: "Override the default Thinking... / Thought for Ns label.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Replace the default trigger contents entirely.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional classes for the trigger.",
  },
]

export const thinkingContentPropRows = [
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Reasoning text or composed content shown while expanded.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional classes for the content panel.",
  },
]
