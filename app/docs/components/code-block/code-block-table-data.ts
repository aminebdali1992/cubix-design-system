export const codeBlockPropRows = [
  {
    prop: "code",
    type: "string",
    description: "Source text to highlight. Required.",
  },
  {
    prop: "language",
    type: "string",
    default: '"plaintext"',
    description:
      "Language id or alias resolved by sugar-high (ts, js, python, json, shell, ...).",
  },
  {
    prop: "showLineNumbers",
    type: "boolean",
    default: "false",
    description: "Show CSS counter line numbers beside each line.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Optional header and actions rendered above the code body.",
  },
]

export const codeBlockCopyButtonPropRows = [
  {
    prop: "onCopy",
    type: "() => void",
    description: "Called after the code is copied successfully.",
  },
  {
    prop: "onError",
    type: "(error: Error) => void",
    description: "Called when the clipboard write fails.",
  },
  {
    prop: "timeout",
    type: "number",
    default: "2000",
    description: "How long the check icon stays visible after a copy.",
  },
]

export const codeBlockLanguageSelectorPropRows = [
  {
    prop: "value",
    type: "string",
    description: "Controlled language value. Pair with onValueChange.",
  },
  {
    prop: "defaultValue",
    type: "string",
    description: "Initial language when uncontrolled.",
  },
  {
    prop: "onValueChange",
    type: "(value: string | null) => void",
    description: "Called when the selected language changes.",
  },
]
