export const menubarPropRows = [
  {
    prop: "dir",
    type: '"ltr" | "rtl"',
    description:
      "Text direction. Portaled menus inherit this so RTL layout and alignment stay correct.",
  },
  {
    prop: "lang",
    type: "string",
    description:
      'Document language on the menubar and portaled content (e.g. "fa"). Enables IRANSans metrics and zero letter-spacing for Arab script.',
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "One or more MenubarMenu elements.",
  },
]

export const triggerPropRows = [
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "The trigger label shown in the menubar.",
  },
]

export const contentPropRows = [
  {
    prop: "side",
    type: '"top" | "right" | "bottom" | "left"',
    default: '"bottom"',
    description: "Preferred side of the trigger to render the menu on.",
  },
  {
    prop: "align",
    type: '"start" | "center" | "end"',
    default: '"start"',
    description: "Alignment along the opposite axis of side.",
  },
  {
    prop: "sideOffset",
    type: "number",
    default: "8",
    description: "Distance in pixels between the trigger and the menu.",
  },
  {
    prop: "alignOffset",
    type: "number",
    default: "-4",
    description: "Offset in pixels along the alignment axis.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
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
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
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
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
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
    description: "Value of this item. It is selected when it matches the group value.",
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
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const menubarKeyboardRows = [
  {
    key: "ArrowLeft / ArrowRight",
    action:
      "Moves focus between menu triggers in reading direction. With a menu open, opens the neighboring menu instead.",
  },
  {
    key: "Enter / Space / ArrowDown",
    action: "On a trigger, opens its menu and focuses the first item.",
  },
  {
    key: "ArrowDown / ArrowUp",
    action: "Moves focus to the next or previous item.",
  },
  {
    key: "Home / End",
    action: "Moves focus to the first or last item.",
  },
  {
    key: "Enter / Space",
    action: "Activates the focused item. Checkbox and radio items toggle and keep the menu open.",
  },
  {
    key: "Escape",
    action: "Closes the menu and returns focus to its trigger.",
  },
]
