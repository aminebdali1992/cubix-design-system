export const contextMenuPropRows = [
  {
    prop: "dir",
    type: '"ltr" | "rtl"',
    description:
      "Text direction. Portaled menus inherit this so RTL layout and alignment stay correct. Defaults to the closest dir on the page.",
  },
  {
    prop: "lang",
    type: "string",
    description:
      'Document language on the trigger and portaled content (e.g. "fa"). Enables IRANSans metrics and zero letter-spacing for Arab script.',
  },
  {
    prop: "open",
    type: "boolean",
    description: "Controlled open state. Omit to use uncontrolled mode.",
  },
  {
    prop: "defaultOpen",
    type: "boolean",
    default: "false",
    description:
      "Initial open state when uncontrolled (Base UI and React Aria; Radix UI has no defaultOpen).",
  },
  {
    prop: "onOpenChange",
    type: "(open: boolean) => void",
    description: "Called when the open state changes.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "A ContextMenuTrigger and a ContextMenuContent.",
  },
]

export const triggerPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description:
      "The area that opens the menu on right click, long press, Shift+F10 or the ContextMenu key. It is focusable so keyboard users can reach it.",
  },
]

export const contentPropRows = [
  {
    prop: "dir",
    type: '"ltr" | "rtl"',
    description:
      "Overrides the direction inherited from ContextMenu for this menu.",
  },
  {
    prop: "lang",
    type: "string",
    description:
      "Overrides the language inherited from ContextMenu for this menu.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description:
      "Menu items. The menu opens at the pointer and flips to stay in view.",
  },
]

export const itemPropRows = [
  {
    prop: "inset",
    type: "boolean",
    description: "Adds start padding to align with items that have indicators.",
  },
  {
    prop: "variant",
    type: '"default" | "destructive"',
    default: '"default"',
    description: "Visual style of the menu item.",
  },
  {
    prop: "disabled",
    type: "boolean",
    description: "Disables the menu item.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const checkboxItemPropRows = [
  {
    prop: "checked",
    type: "boolean",
    description: "Controlled checked state of the checkbox item.",
  },
  {
    prop: "defaultChecked",
    type: "boolean",
    description: "Initial checked state when uncontrolled.",
  },
  {
    prop: "onCheckedChange",
    type: "(checked: boolean) => void",
    description: "Called when the checked state changes.",
  },
  {
    prop: "indicator",
    type: '"check" | "control"',
    description:
      'What shows when checked: the Cubix Checkbox ("control", default) or a plain tick ("check").',
  },
  {
    prop: "inset",
    type: "boolean",
    description: "Adds start padding for alignment.",
  },
  {
    prop: "disabled",
    type: "boolean",
    description: "Disables the checkbox item.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const radioGroupPropRows = [
  {
    prop: "value",
    type: "string",
    description: "Controlled value of the selected radio item.",
  },
  {
    prop: "defaultValue",
    type: "string",
    description: "Initial value when uncontrolled.",
  },
  {
    prop: "indicator",
    type: '"check" | "control"',
    description:
      'Indicator for every item in the group: the Cubix Radio ("control", default) or a plain tick ("check"). An item\'s own indicator prop overrides it.',
  },
  {
    prop: "onValueChange",
    type: "(value: string) => void",
    description: "Called when the selected value changes.",
  },
]

export const radioItemPropRows = [
  {
    prop: "value",
    type: "string",
    description:
      "Value of this item. It is selected when it matches the group value.",
  },
  {
    prop: "indicator",
    type: '"check" | "control"',
    description:
      'Overrides the group indicator for this item: the Cubix Radio ("control") or a plain tick ("check").',
  },
  {
    prop: "inset",
    type: "boolean",
    description: "Adds start padding for alignment.",
  },
  {
    prop: "disabled",
    type: "boolean",
    description: "Disables the radio item.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]
