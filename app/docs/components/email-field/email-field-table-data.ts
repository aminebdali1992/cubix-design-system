export const emailFieldPropRows = [
  {
    prop: "size",
    type: '"default" | "lg"',
    default: '"default"',
    description:
      "Height for the input: default 40px, lg 48px. Inherited by EmailFieldInput and EmailFieldControl unless overridden. Use className for other heights.",
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
      "Marks the field as invalid and shows EmailFieldError when present.",
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

export const emailFieldInputPropRows = [
  {
    prop: "type",
    type: '"email"',
    default: '"email"',
    description:
      "Locked to email. Cannot be changed. inputMode is always email and spellCheck is always false.",
  },
  {
    prop: "size",
    type: '"default" | "lg"',
    description:
      "Overrides the size from EmailField. Default 40px, lg 48px. Use className for other heights.",
  },
  {
    prop: "autoComplete",
    type: "string",
    default: '"email"',
    description:
      "Defaults to email. Override only when a different email autocomplete token is required.",
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
    type: "Omit<React.ComponentProps<'input'>, 'type' | 'inputMode' | 'spellCheck'>",
    description:
      "Native input attributes (value, onChange, name, required, ...) are forwarded. type, inputMode, and spellCheck stay locked for email.",
  },
]

export const emailFieldControlPropRows = [
  {
    prop: "size",
    type: '"default" | "lg"',
    description:
      "Overrides the size from EmailField. Icon inset and height match the default and lg sizes.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description:
      'Wrap EmailFieldInput with icons marked data-icon="inline-start" or "inline-end" (same as Button), and optionally EmailFieldClear.',
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the control styles (last one wins).",
  },
]

export const emailFieldClearPropRows = [
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

export const emailFieldPartPropRows = [
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
