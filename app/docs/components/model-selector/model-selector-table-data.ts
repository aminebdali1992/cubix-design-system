export const modelSelectorPropRows = [
  {
    prop: "open",
    type: "boolean",
    description: "Controlled open state for the dialog.",
  },
  {
    prop: "onOpenChange",
    type: "(open: boolean) => void",
    description: "Called when the dialog opens or closes.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Trigger and content composition.",
  },
]

export const modelSelectorContentPropRows = [
  {
    prop: "title",
    type: "React.ReactNode",
    default: '"Select a model"',
    description: "Visually hidden dialog title for accessibility.",
  },
  {
    prop: "showCloseButton",
    type: "boolean",
    default: "false",
    description: "Show the dialog close control. Off by default for palette UX.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Command input and list parts.",
  },
]

export const modelSelectorItemPropRows = [
  {
    prop: "value",
    type: "string",
    description: "Searchable value used by the command filter.",
  },
  {
    prop: "checked",
    type: "boolean",
    default: "false",
    description: "Shows the selected checkmark for the current model.",
  },
  {
    prop: "disabled",
    type: "boolean",
    description: "Prevents selecting an unavailable model.",
  },
  {
    prop: "onSelect",
    type: "(value: string) => void",
    description: "Called when the item is chosen via click or keyboard.",
  },
]

export const modelSelectorLogoPropRows = [
  {
    prop: "provider",
    type: "ModelSelectorProvider",
    description:
      "Provider id used to load the logo from models.dev (e.g. openai, anthropic).",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional classes for the logo image.",
  },
]
