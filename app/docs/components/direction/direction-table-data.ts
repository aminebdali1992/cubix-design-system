export const providerPropRows = [
  {
    prop: "direction",
    type: '"ltr" | "rtl"',
    default: '"ltr"',
    description: "The reading direction of the text.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "App content that should inherit the text direction.",
  },
]

export const useDirectionRows = [
  {
    prop: "return",
    type: '"ltr" | "rtl"',
    description: "The current text direction from the nearest DirectionProvider.",
  },
]
