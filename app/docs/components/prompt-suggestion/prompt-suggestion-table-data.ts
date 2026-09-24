export const promptSuggestionsPropRows = [
  {
    prop: "orientation",
    type: '"horizontal" | "wrap"',
    default: '"horizontal"',
    description:
      "horizontal scrolls chips in one row; wrap flows chips onto multiple lines.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "PromptSuggestion chips or loading skeletons.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional classes for the suggestions row.",
  },
]

export const promptSuggestionPropRows = [
  {
    prop: "suggestion",
    type: "string",
    description:
      "Prompt text passed to onClick. Also used as the label when children are omitted.",
  },
  {
    prop: "onClick",
    type: "(suggestion: string) => void",
    description: "Called with the suggestion string when the chip is pressed.",
  },
  {
    prop: "active",
    type: "boolean",
    default: "false",
    description: "Marks the chip as selected and sets aria-pressed.",
  },
  {
    prop: "disabled",
    type: "boolean",
    description: "Prevents selection while keeping the chip visible.",
  },
  {
    prop: "variant",
    type: "Button variant",
    default: '"outline"',
    description: "Visual style forwarded to Button.",
  },
  {
    prop: "size",
    type: "Button size",
    default: '"sm"',
    description: "Chip size forwarded to Button.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description:
      "Optional custom content such as an icon plus label. Defaults to suggestion.",
  },
]

export const promptSuggestionsEmptyPropRows = [
  {
    prop: "children",
    type: "React.ReactNode",
    default: '"No suggestions yet."',
    description: "Empty-state copy shown when no chips are available.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional classes for the empty surface.",
  },
]
