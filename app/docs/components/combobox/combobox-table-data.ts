export const comboboxPropRows = [
  {
    prop: "items",
    type: "T[]",
    description: "The collection used to render and filter the list.",
  },
  {
    prop: "value",
    type: "T | T[] | null",
    description: "Controlled selected value. Use an array when multiple is set.",
  },
  {
    prop: "defaultValue",
    type: "T | T[] | null",
    description: "Initial selected value when uncontrolled.",
  },
  {
    prop: "onValueChange",
    type: "(value: T | T[] | null) => void",
    description: "Called when the selected value changes.",
  },
  {
    prop: "multiple",
    type: "boolean",
    default: "false",
    description: "Allow more than one selected item.",
  },
  {
    prop: "autoHighlight",
    type: "boolean",
    default: "false",
    description: "Automatically highlight the first matching item while filtering.",
  },
  {
    prop: "itemToStringValue",
    type: "(item: T) => string",
    description: "Map an object item to the string used for filtering and display.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Disable the combobox.",
  },
]

export const inputPropRows = [
  {
    prop: "showTrigger",
    type: "boolean",
    default: "true",
    description: "Show the dropdown trigger inside the input group.",
  },
  {
    prop: "showClear",
    type: "boolean",
    default: "false",
    description: "Show a button that clears the selected value.",
  },
  {
    prop: "placeholder",
    type: "string",
    description: "Placeholder text for the input.",
  },
  {
    prop: "disabled",
    type: "boolean",
    description: "Disable the input.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const contentPropRows = [
  {
    prop: "side",
    type: '"top" | "bottom" | "left" | "right" | "inline-start" | "inline-end"',
    default: '"bottom"',
    description: "Preferred side of the popup.",
  },
  {
    prop: "align",
    type: '"start" | "center" | "end"',
    default: '"start"',
    description: "Alignment of the popup relative to the anchor.",
  },
  {
    prop: "sideOffset",
    type: "number",
    default: "6",
    description: "Distance in pixels from the anchor.",
  },
  {
    prop: "anchor",
    type: "RefObject<HTMLElement>",
    description: "Custom anchor, used with chips for multi-select.",
  },
]
