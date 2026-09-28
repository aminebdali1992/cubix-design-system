export const dropdownMenuPropRows = [
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
    description: "Initial open state when uncontrolled.",
  },
  {
    prop: "onOpenChange",
    type: "(open: boolean) => void",
    description: "Called when the open state changes.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "A DropdownMenuTrigger and a DropdownMenuContent.",
  },
]

export const triggerPropRows = [
  {
    prop: "render",
    type: "React.ReactElement",
    description:
      "Renders the trigger as another element, e.g. render={<Button variant=\"outline\" />}. Base UI merges onto the element. React Aria renders its own pressable button and applies the Button's variant, size, className and aria-label. Radix UI uses asChild with the Button as the child instead.",
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
      "Trigger content. Click, Enter, Space or ArrowDown opens the menu.",
  },
]

export const contentPropRows = [
  {
    prop: "side",
    type: '"top" | "right" | "bottom" | "left"',
    default: '"bottom"',
    description:
      "Preferred side of the trigger to open on. The menu flips when there is not enough room.",
  },
  {
    prop: "align",
    type: '"start" | "center" | "end"',
    default: '"start"',
    description:
      "Alignment against the trigger. start follows the text direction, so in RTL the menu lines up with the right edge of the trigger.",
  },
  {
    prop: "sideOffset",
    type: "number",
    default: "4",
    description: "Distance in pixels between the trigger and the menu.",
  },
  {
    prop: "alignOffset",
    type: "number",
    default: "0",
    description: "Offset in pixels along the alignment axis.",
  },
  {
    prop: "dir",
    type: '"ltr" | "rtl"',
    description:
      "Overrides the direction inherited from DropdownMenu for this menu.",
  },
  {
    prop: "lang",
    type: "string",
    description:
      "Overrides the language inherited from DropdownMenu for this menu.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins). The menu is as wide as its content, with a minimum of 150px.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Menu items, groups, separators and submenus.",
  },
]

export const itemPropRows = [
  {
    prop: "inset",
    type: "boolean",
    description: "Adds start padding to align with items that have an icon.",
  },
  {
    prop: "variant",
    type: '"default" | "destructive"',
    default: '"default"',
    description:
      "Visual style of the menu item. Use destructive for irreversible actions.",
  },
  {
    prop: "disabled",
    type: "boolean",
    description:
      "Disables the menu item. Base UI keeps it focusable with the arrow keys. Radix UI and React Aria skip it.",
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
      "Item content. An icon placed before the text sits at the start of the item. Selecting the item closes the menu.",
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
    description:
      "Initial checked state when uncontrolled. The state is kept when the menu closes and opens again.",
  },
  {
    prop: "onCheckedChange",
    type: "(checked: boolean) => void",
    description:
      "Called when the checked state changes. Base UI keeps the menu open after toggling. Radix UI and React Aria close it.",
  },
  {
    prop: "indicator",
    type: '"check" | "control"',
    default: '"control"',
    description:
      'What shows at the end of the item: the Cubix Checkbox ("control") or a plain tick that only appears when checked ("check").',
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
    description:
      "Initial value when uncontrolled. The selection is kept when the menu closes and opens again.",
  },
  {
    prop: "onValueChange",
    type: "(value: string) => void",
    description:
      "Called when the selected value changes. Base UI keeps the menu open after a change. Radix UI and React Aria close it.",
  },
  {
    prop: "indicator",
    type: '"check" | "control"',
    default: '"control"',
    description:
      'Indicator for every item in the group: the Cubix Radio ("control") or a plain tick ("check"). An item\'s own indicator prop overrides it.',
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
      "DropdownMenuRadioItem elements.",
  },
]

export const radioItemPropRows = [
  {
    prop: "value",
    type: "string",
    description:
      "Value of this item (required). It is selected when it matches the group value.",
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

export const labelPropRows = [
  {
    prop: "inset",
    type: "boolean",
    description: "Adds start padding to align with items that have an icon.",
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
      "Label text. Place it first inside a DropdownMenuGroup or DropdownMenuRadioGroup so it names the group for screen readers.",
  },
]

export const subTriggerPropRows = [
  {
    prop: "inset",
    type: "boolean",
    description: "Adds start padding for alignment.",
  },
  {
    prop: "disabled",
    type: "boolean",
    description: "Disables the submenu trigger.",
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
      "Trigger content. A chevron is added at the end. Hover, click, Enter or the arrow key toward the end side (ArrowLeft in RTL) opens the submenu.",
  },
]

export const subContentPropRows = [
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
      "Submenu items. The submenu opens toward the end side of the parent menu (the left in RTL) and flips when there is not enough room.",
  },
]
