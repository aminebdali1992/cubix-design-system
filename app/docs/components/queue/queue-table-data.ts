export const queuePropRows = [
  {
    prop: "className",
    type: "string",
    description: "Optional styles for the queue card shell.",
  },
]

export const queueSectionPropRows = [
  {
    prop: "defaultOpen",
    type: "boolean",
    default: "true",
    description: "Initial open state for the section.",
  },
  {
    prop: "open",
    type: "boolean",
    description: "Controlled open state.",
  },
  {
    prop: "onOpenChange",
    type: "(open: boolean) => void",
    description: "Called when the section opens or closes.",
  },
]

export const queueSectionLabelPropRows = [
  {
    prop: "label",
    type: "string",
    description: "Section label text, e.g. Queued or Todo.",
  },
  {
    prop: "count",
    type: "number",
    description: "Optional count shown before the label.",
  },
  {
    prop: "icon",
    type: "React.ReactNode",
    description: "Optional leading icon beside the label.",
  },
]

export const queueItemIndicatorPropRows = [
  {
    prop: "completed",
    type: "boolean",
    default: "false",
    description: "Filled muted dot for completed items.",
  },
]

export const queueItemContentPropRows = [
  {
    prop: "completed",
    type: "boolean",
    default: "false",
    description: "Applies muted strikethrough styling.",
  },
]
