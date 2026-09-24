export const propRows = [
  {
    prop: "checked",
    type: "boolean",
    default: "false",
    description:
      "Controlled checked state of the switch. Use with `onCheckedChange`.",
  },
  {
    prop: "defaultChecked",
    type: "boolean",
    default: "false",
    description: "Default checked state for uncontrolled usage.",
  },
  {
    prop: "onCheckedChange",
    type: "(checked: boolean) => void",
    description:
      "Called with the next checked value whenever the switch is toggled.",
  },
  {
    prop: "size",
    type: '"default" | "sm"',
    default: '"default"',
    description: "The size of the switch.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the switch.",
  },
  {
    prop: "name",
    type: "string",
    description: "The name attribute passed when submitting a form.",
  },
  {
    prop: "value",
    type: "string",
    default: "on",
    description: "The value attribute passed when submitting a form.",
  },
  {
    prop: "aria-invalid",
    type: "boolean",
    default: "false",
    description: "When true, indicates the switch is in an invalid state.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "...props",
    type: "React.ComponentProps<'input'>",
    description:
      "All native input attributes (id, form, tabindex, aria-*, ...) are forwarded to the rendered element.",
  },
];

export const variantRows = [
  {
    prop: "default",
    type: "-",
    description: "On state uses the primary background; off uses the input track.",
  },
  {
    prop: "disabled",
    type: "-",
    description: "Disabled switches cannot be interacted with.",
  },
];
