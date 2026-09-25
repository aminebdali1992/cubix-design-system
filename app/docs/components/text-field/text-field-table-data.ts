export const textFieldPropRows = [
  {
    prop: "size",
    type: '"default" | "lg"',
    default: '"default"',
    description:
      "Height for the input: default 40px, lg 48px. Inherited by TextFieldInput and TextFieldControl unless overridden. Use className for other heights.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description:
      "Disables the field and prevents interaction. Forwarded to the control on every base.",
  },
  {
    prop: "invalid",
    type: "boolean",
    default: "false",
    description:
      "Marks the field as invalid and shows TextFieldError when present.",
  },
  {
    prop: "name",
    type: "string",
    description:
      "Identifies the field when a form is submitted (Base UI root; use the input name on Radix).",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the root styles (last one wins).",
  },
]

export const textFieldInputPropRows = [
  {
    prop: "size",
    type: '"default" | "lg"',
    description:
      "Overrides the size from TextField. Default 40px, lg 48px. Use className for other heights.",
  },
  {
    prop: "placeholder",
    type: "string",
    description: "Hint text shown when the input is empty.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the input styles (last one wins).",
  },
  {
    prop: "...props",
    type: "React.ComponentProps<'input'>",
    description:
      "Native input attributes (value, onChange, name, required, autoComplete, ...) are forwarded. Prefer specialized field components for email, phone, password, and similar inputs.",
  },
]

export const textFieldControlPropRows = [
  {
    prop: "size",
    type: '"default" | "lg"',
    description:
      "Overrides the size from TextField. Icon inset and height match the default and lg sizes.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description:
      'Wrap TextFieldInput with icons marked data-icon="inline-start" or "inline-end" (same as Button), and optionally TextFieldClear.',
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the control styles (last one wins).",
  },
]

export const textFieldClearPropRows = [
  {
    prop: "aria-label",
    type: "string",
    default: '"Clear"',
    description:
      "Accessible name for the clear button. Required when no visible text is present.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the clear button styles (last one wins).",
  },
]

export const textFieldPartPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the part styles (last one wins).",
  },
  {
    prop: "...props",
    type: "HTML attributes",
    description: "Native attributes for the rendered element are forwarded.",
  },
]
