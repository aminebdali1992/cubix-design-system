export const selectPropRows = [
  {
    prop: "value",
    type: "string | null",
    description: "Controlled selected value. null shows the placeholder. Use with onValueChange.",
  },
  {
    prop: "defaultValue",
    type: "string | null",
    description: "Initial selected value for uncontrolled usage.",
  },
  {
    prop: "onValueChange",
    type: "(value: string | null) => void",
    description: "Called when the user picks an item.",
  },
  {
    prop: "open",
    type: "boolean",
    description: "Controlled open state of the popup. Use with onOpenChange.",
  },
  {
    prop: "defaultOpen",
    type: "boolean",
    default: "false",
    description: "Initial open state for uncontrolled usage.",
  },
  {
    prop: "onOpenChange",
    type: "(open: boolean) => void",
    description: "Called when the popup opens or closes.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the select and prevents interaction.",
  },
  {
    prop: "required",
    type: "boolean",
    default: "false",
    description: "Marks the select as required in a form.",
  },
  {
    prop: "name",
    type: "string",
    description: "Name submitted with the parent form.",
  },
  {
    prop: "items",
    type: "Record<string, ReactNode> | { value: string | null; label: ReactNode }[]",
    description:
      "Optional value-to-label map. Labels are read from SelectItem by default; pass items when the items render inside your own component.",
  },
  {
    prop: "dir",
    type: '"ltr" | "rtl"',
    description:
      "Text direction of the trigger and popup. Defaults to the closest dir on the page.",
  },
  {
    prop: "lang",
    type: "string",
    description: "Language of the popup. Defaults to the closest lang on the page.",
  },
]

export const triggerPropRows = [
  {
    prop: "size",
    type: '"sm" | "default" | "lg"',
    default: '"default"',
    description: "Trigger height: sm 32px, default 40px (same as Cubix fields), lg 48px.",
  },
  {
    prop: "aria-label",
    type: "string",
    description: "Accessible name when there is no visible label linked with id and htmlFor.",
  },
  {
    prop: "aria-invalid",
    type: "boolean",
    description: "Shows the destructive border. Pair it with an error message.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const valuePropRows = [
  {
    prop: "placeholder",
    type: "React.ReactNode",
    description: "Shown in the trigger while no item is selected.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const contentPropRows = [
  {
    prop: "side",
    type: '"top" | "right" | "bottom" | "left"',
    default: '"bottom"',
    description: "Side of the trigger the popup opens on.",
  },
  {
    prop: "align",
    type: '"start" | "center" | "end"',
    default: '"start"',
    description: "Alignment against the trigger. start follows the reading direction.",
  },
  {
    prop: "sideOffset",
    type: "number",
    default: "4",
    description: "Distance from the trigger in pixels.",
  },
  {
    prop: "alignOffset",
    type: "number",
    default: "0",
    description: "Offset from the aligned edge in pixels.",
  },
  {
    prop: "alignItemWithTrigger",
    type: "boolean",
    default: "false",
    description:
      "Base UI and Radix: overlap the selected item with the trigger. Ignored on React Aria, which always opens below.",
  },
]

export const itemPropRows = [
  {
    prop: "value",
    type: "string",
    description: "Value of the item. Must be unique and not empty.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Prevents the item from being selected.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Label of the item, also shown in the trigger when selected.",
  },
]
