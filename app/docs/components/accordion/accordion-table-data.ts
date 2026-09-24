export const accordionPropRows = [
  {
    prop: "multiple",
    type: "boolean",
    default: "false",
    description:
      "When true, more than one item can stay open at a time.",
  },
  {
    prop: "value",
    type: "string[]",
    description:
      "Controlled open values.",
  },
  {
    prop: "defaultValue",
    type: "string[]",
    description: "Initial open value(s) for uncontrolled usage.",
  },
  {
    prop: "onValueChange",
    type: "(value: string[]) => void",
    description: "Called when the open value(s) change.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the root styles (last one wins).",
  },
];

export const accordionItemPropRows = [
  {
    prop: "value",
    type: "string",
    description: "Unique value used to control this item. Required.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the trigger and prevents this item from opening.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the item styles (last one wins).",
  },
];

export const accordionTriggerPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the trigger styles (last one wins).",
  },
  {
    prop: "...props",
    type: "React.ComponentProps<'button'>",
    description: "All native button attributes are forwarded to the trigger.",
  },
];

export const accordionContentPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the content styles (last one wins).",
  },
  {
    prop: "...props",
    type: "React.ComponentProps<'div'>",
    description: "All native div attributes are forwarded to the content panel.",
  },
];
