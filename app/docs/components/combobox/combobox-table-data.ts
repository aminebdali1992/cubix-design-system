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
    description: "Highlight the first matching item while filtering.",
  },
  {
    prop: "itemToStringLabel",
    type: "(item: T) => string",
    description:
      "Text for an object item, shown in the input and used for filtering. Objects shaped { value, label } use label automatically.",
  },
  {
    prop: "itemToStringValue",
    type: "(item: T) => string",
    description:
      "String submitted with a form for an object item. Objects shaped { value, label } use value automatically.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Disable the combobox.",
  },
  {
    prop: "dir",
    type: '"ltr" | "rtl"',
    description:
      "Text direction of the popup. Defaults to the closest dir on the page.",
  },
  {
    prop: "lang",
    type: "string",
    description:
      "Language of the popup. Defaults to the closest lang on the page.",
  },
]

export const inputPropRows = [
  {
    prop: "showTrigger",
    type: "boolean",
    default: "true",
    description:
      "Show the chevron button at the end of the input. Defaults to false inside ComboboxContent.",
  },
  {
    prop: "showClear",
    type: "boolean",
    default: "false",
    description: "Show a button that clears the selected value.",
  },
  {
    prop: "size",
    type: '"default" | "lg"',
    default: '"default"',
    description:
      "Height and inline padding, matching Text Field: default 40px, lg 48px. ComboboxChips takes the same prop for its minimum height. Use className for other heights.",
  },
  {
    prop: "placeholder",
    type: "string",
    description: "Placeholder text for the input.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Disable the input and its buttons.",
  },
  {
    prop: "aria-invalid",
    type: "boolean | \"true\" | \"false\"",
    description: "Show the invalid state.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the input group styles (last one wins).",
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
    default: "4",
    description: "Distance in pixels from the anchor.",
  },
  {
    prop: "alignOffset",
    type: "number",
    default: "0",
    description: "Offset in pixels along the alignment axis.",
  },
  {
    prop: "anchor",
    type: "RefObject<HTMLElement>",
    description:
      "Custom anchor, used with chips for multi-select. Defaults to the input group, or the trigger when the input is inside the popup.",
  },
]

export const itemPropRows = [
  {
    prop: "value",
    type: "T",
    description: "The item value. Required.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Keep the item visible but not selectable.",
  },
]
