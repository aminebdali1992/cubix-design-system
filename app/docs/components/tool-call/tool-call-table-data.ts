export const toolCallPropRows = [
  {
    prop: "name",
    type: "string",
    description: "Tool or function name shown in the header.",
  },
  {
    prop: "status",
    type: "ToolCallStatus",
    default: '"input-available"',
    description:
      "Lifecycle state: Pending, Running, Awaiting Approval, Responded, Completed, Error, Denied.",
  },
  {
    prop: "open",
    type: "boolean",
    description: "Controlled open state for the collapsible details.",
  },
  {
    prop: "defaultOpen",
    type: "boolean",
    description:
      "Initial open state. Defaults open for pending, approval, and error.",
  },
  {
    prop: "onOpenChange",
    type: "(open: boolean) => void",
    description: "Called when the panel opens or closes.",
  },
]

export const toolCallHeaderPropRows = [
  {
    prop: "label",
    type: "React.ReactNode",
    description:
      "Optional human-readable title. When set, the tool name appears as a subtitle.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Optional custom header content instead of the default layout.",
  },
]

export const toolCallInputPropRows = [
  {
    prop: "parameters",
    type: "unknown",
    description:
      "Tool arguments. Objects are pretty-printed as JSON. Alias: input.",
  },
  {
    prop: "input",
    type: "unknown",
    description: "Alias for parameters.",
  },
  {
    prop: "title",
    type: "React.ReactNode",
    default: '"Parameters"',
    description: "Section label above the parameters.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Custom parameters body instead of auto-formatted JSON.",
  },
]

export const toolCallOutputPropRows = [
  {
    prop: "result",
    type: "unknown",
    description:
      "Successful tool result. Objects are pretty-printed as JSON. Alias: output.",
  },
  {
    prop: "output",
    type: "unknown",
    description: "Alias for result.",
  },
  {
    prop: "error",
    type: "React.ReactNode",
    description: "Error content. Forces the Error section title when set. Alias: errorText.",
  },
  {
    prop: "errorText",
    type: "React.ReactNode",
    description: "Alias for error.",
  },
  {
    prop: "title",
    type: "React.ReactNode",
    description: 'Section label. Defaults to "Result" or "Error".',
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Custom output body instead of result/error helpers.",
  },
]
