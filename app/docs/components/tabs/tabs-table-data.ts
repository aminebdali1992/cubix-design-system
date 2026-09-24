export const tabsPropRows = [
  {
    prop: "value",
    type: "string",
    description: "Controlled active tab value. Use with `onValueChange`.",
  },
  {
    prop: "defaultValue",
    type: "string",
    description: "Default active tab value for uncontrolled usage.",
  },
  {
    prop: "onValueChange",
    type: "(value: string) => void",
    description: "Called when a tab trigger selects a new value.",
  },
  {
    prop: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: "The orientation of the tabs list and triggers.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the root styles.",
  },
];

export const tabsListPropRows = [
  {
    prop: "variant",
    type: '"default" | "line"',
    default: '"default"',
    description: "The visual style of the tabs list.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the list styles.",
  },
];

export const tabsTriggerPropRows = [
  {
    prop: "value",
    type: "string",
    description: "The tab value selected by this trigger.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the trigger and prevents interaction.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the trigger styles.",
  },
];

export const tabsContentPropRows = [
  {
    prop: "value",
    type: "string",
    description: "The tab value that controls when this panel is shown.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the content styles.",
  },
];
