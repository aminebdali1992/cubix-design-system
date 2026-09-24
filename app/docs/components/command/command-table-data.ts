export const commandPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "CommandInput and CommandList.",
  },
]

export const dialogPropRows = [
  {
    prop: "open",
    type: "boolean",
    description: "Controlled open state of the dialog.",
  },
  {
    prop: "onOpenChange",
    type: "(open: boolean) => void",
    description: "Called when the open state changes.",
  },
  {
    prop: "title",
    type: "string",
    default: '"Command Palette"',
    description: "Accessible title, visually hidden.",
  },
  {
    prop: "description",
    type: "string",
    default: '"Search for a command to run..."',
    description: "Accessible description, visually hidden.",
  },
  {
    prop: "showCloseButton",
    type: "boolean",
    default: "false",
    description: "Show the dialog close button.",
  },
]

export const inputPropRows = [
  {
    prop: "placeholder",
    type: "string",
    description: "Placeholder text for the search field.",
  },
  {
    prop: "value",
    type: "string",
    description: "Controlled search value.",
  },
  {
    prop: "onValueChange",
    type: "(search: string) => void",
    description: "Called when the search value changes.",
  },
]

export const groupPropRows = [
  {
    prop: "heading",
    type: "string",
    description: "Optional group label.",
  },
]

export const itemPropRows = [
  {
    prop: "disabled",
    type: "boolean",
    description: "Disable the item.",
  },
  {
    prop: "onSelect",
    type: "(value: string) => void",
    description: "Called when the item is selected.",
  },
  {
    prop: "value",
    type: "string",
    description: "Search value. Defaults to the item text.",
  },
]
