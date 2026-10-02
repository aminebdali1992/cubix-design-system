export const accordionPropRows = [
  {
    prop: "multiple",
    type: "boolean",
    default: "false",
    description:
      "Keep more than one item open. Without it, opening an item closes the open one, and the open trigger closes its own item.",
  },
  {
    prop: "value",
    type: "string[]",
    description:
      "Controlled open items. Use an array in both modes and pass at most one value in single mode.",
  },
  {
    prop: "defaultValue",
    type: "string[]",
    description: "Items open on first render when uncontrolled.",
  },
  {
    prop: "onValueChange",
    type: "(value: string[]) => void",
    description: "Called with the open items whenever an item opens or closes.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Disable every item in the accordion.",
  },
  {
    prop: "dir",
    type: '"ltr" | "rtl"',
    description: "Text direction of the accordion. Defaults to the closest dir on the page.",
  },
  {
    prop: "lang",
    type: "string",
    description: "Language of the accordion. Defaults to the closest lang on the page.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the root styles (last one wins).",
  },
]

export const accordionItemPropRows = [
  {
    prop: "value",
    type: "string",
    description: "Unique value used in value, defaultValue and onValueChange. Required.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description:
      "Disable the trigger and keep the item in its current state. Arrow key navigation skips it.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the item styles (last one wins).",
  },
]

export const accordionTriggerPropRows = [
  {
    prop: "children",
    type: "ReactNode",
    description:
      "Heading text. The chevron is added at the inline end and turns when the item opens.",
  },
  {
    prop: "icon",
    type: "ReactNode",
    description:
      "Icon rendered at the inline start, before the heading text, and hidden from assistive technology. SVGs default to 24px unless they set their own size- class.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the trigger button styles (last one wins).",
  },
]

export const accordionContentPropRows = [
  {
    prop: "children",
    type: "ReactNode",
    description: "Content revealed when the item opens.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the inner content wrapper (last one wins). The outer panel keeps the height animation.",
  },
]

export const accordionKeyboardRows = [
  {
    key: "Enter / Space",
    action: "Open or close the focused item.",
  },
  {
    key: "Tab / Shift + Tab",
    action: "Move to the next or previous focusable element on the page.",
  },
  {
    key: "ArrowDown / ArrowUp",
    action:
      "Move focus to the next or previous enabled trigger of the same accordion, wrapping at the ends.",
  },
  {
    key: "Home / End",
    action: "Move focus to the first or last enabled trigger.",
  },
]
