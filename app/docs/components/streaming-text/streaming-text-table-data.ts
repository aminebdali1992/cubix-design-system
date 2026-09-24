export const streamingTextPropRows = [
  {
    prop: "isStreaming",
    type: "boolean",
    default: "false",
    description:
      "When true, marks the surface as live and shows the caret unless disabled.",
  },
  {
    prop: "caret",
    type: '"block" | "line" | "circle" | false',
    default: '"line"',
    description: "Built-in caret style, or false to hide the automatic caret.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Streamed text or composed content. Grows as tokens arrive.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional classes for the streaming text root.",
  },
]

export const streamingTextCaretPropRows = [
  {
    prop: "variant",
    type: '"block" | "line" | "circle"',
    default: '"line"',
    description: "Built-in caret appearance when rendering without children.",
  },
  {
    prop: "force",
    type: "boolean",
    default: "false",
    description:
      "Render even when the parent is not streaming. Useful for custom previews.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Optional custom caret contents instead of the built-in shape.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional classes for the caret.",
  },
]
