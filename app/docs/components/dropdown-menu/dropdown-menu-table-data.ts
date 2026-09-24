export const menuPropRows = [
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
    description: "The trigger, content, and nested menu parts.",
  },
];

export const triggerPropRows = [
  {
    prop: "render",
    type: "React.ReactElement",
    description:
      "Render the trigger as another element (e.g. a Button).",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
];

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
    description: "Alignment along the opposite axis of `side`.",
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
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "...props",
    type: "React.ComponentProps<'div'>",
    description: "All native div attributes are forwarded to the menu panel.",
  },
];

export const itemPropRows = [
  {
    prop: "inset",
    type: "boolean",
    description: "Indent the item to align with items that have a leading icon.",
  },
  {
    prop: "variant",
    type: '"default" | "destructive"',
    default: '"default"',
    description: "Visual treatment. Use destructive for irreversible actions.",
  },
  {
    prop: "disabled",
    type: "boolean",
    description: "Prevents selection and removes the item from keyboard flow.",
  },
  {
    prop: "onSelect",
    type: "(event: Event) => void",
    description: "Called when the item is chosen. The menu closes afterwards.",
  },
];

export const checkboxItemPropRows = [
  {
    prop: "checked",
    type: "boolean",
    description: "Controlled checked state.",
  },
  {
    prop: "defaultChecked",
    type: "boolean",
    description: "Initial checked state when uncontrolled.",
  },
  {
    prop: "onCheckedChange",
    type: "(checked: boolean) => void",
    description: "Called when the checked state changes. The menu stays open.",
  },
  {
    prop: "disabled",
    type: "boolean",
    description: "Prevents toggling the item.",
  },
];

export const radioGroupPropRows = [
  {
    prop: "value",
    type: "string",
    description: "Controlled selected value.",
  },
  {
    prop: "defaultValue",
    type: "string",
    description: "Initial selected value when uncontrolled.",
  },
  {
    prop: "onValueChange",
    type: "(value: string) => void",
    description: "Called when a radio item is selected. The menu stays open.",
  },
];

export const radioItemPropRows = [
  {
    prop: "value",
    type: "string",
    description: "The unique value represented by this radio item.",
  },
  {
    prop: "disabled",
    type: "boolean",
    description: "Prevents selecting the item.",
  },
];
