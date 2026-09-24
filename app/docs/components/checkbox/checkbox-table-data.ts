export const propRows = [
  {
    prop: "checked",
    type: "boolean",
    default: "false",
    description:
      "Controlled checked state of the checkbox. Use with `onCheckedChange`.",
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
      "Called with the next checked value whenever the checkbox is toggled.",
  },
  {
    prop: "required",
    type: "boolean",
    description:
      "Adds the required attribute when validating as part of a group of checkboxes.",
  },
  {
    prop: "name",
    type: "string",
    default: "-",
    description:
      "The name attribute passed when submitting a form as part of a group.",
  },
  {
    prop: "value",
    type: "string",
    default: "on",
    description:
      "The value attribute passed when submitting a form as part of a group.",
  },
  {
    prop: "indeterminate",
    type: "boolean",
    default: "false",
    description:
      "When true, shows the indeterminate state.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the checkbox.",
  },
  {
    prop: "aria-invalid",
    type: "boolean",
    default: "false",
    description:
      "When true, indicates the checkbox is in an invalid state.",
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
    description: "Checked state with primary background and foreground.",
  },
  {
    prop: "indeterminate",
    type: "-",
    description:
      "Visual indeterminate state. Use when the checkbox represents a partial selection (e.g. grouped options).",
  },
  {
    prop: "disabled",
    type: "-",
    description: "Disabled checkboxes cannot be interacted with.",
  },
];
