export const radioGroupPropRows = [
  {
    prop: "value",
    type: "string",
    description:
      "Controlled selected value. Use with `onValueChange`.",
  },
  {
    prop: "defaultValue",
    type: "string",
    description: "Initial selected value for uncontrolled usage.",
  },
  {
    prop: "onValueChange",
    type: "(value: string) => void",
    description: "Called with the next value whenever a radio is selected.",
  },
  {
    prop: "name",
    type: "string",
    description:
      "Shared name submitted with the form. Generated automatically when omitted.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables every radio in the group.",
  },
  {
    prop: "required",
    type: "boolean",
    default: "false",
    description: "Marks the group as required for native form validation.",
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
    description:
      "All native div attributes (id, aria-label, aria-labelledby, ...) are forwarded to the radiogroup.",
  },
];

export const radioPropRows = [
  {
    prop: "value",
    type: "string",
    description: "Value submitted when this radio is selected. Required.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables this radio independently of the group.",
  },
  {
    prop: "aria-invalid",
    type: "boolean",
    default: "false",
    description: "When true, indicates the radio is in an invalid state.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged onto the radio wrapper (last one wins).",
  },
  {
    prop: "...props",
    type: "React.ComponentProps<'input'>",
    description:
      "All native radio attributes (id, form, tabindex, aria-*, ...) are forwarded to the rendered input.",
  },
];

export const variantRows = [
  {
    prop: "default",
    type: "-",
    description: "Checked state with primary background and a filled indicator.",
  },
  {
    prop: "disabled",
    type: "-",
    description: "Disabled radios cannot be interacted with.",
  },
];
