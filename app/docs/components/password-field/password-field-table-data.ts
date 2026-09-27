export const passwordFieldPropRows = [
  {
    prop: "size",
    type: '"default" | "lg"',
    default: '"default"',
    description:
      "Height for the input: default 40px, lg 48px. Inherited by PasswordFieldInput and PasswordFieldControl unless overridden. Use className for other heights.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description:
      "Disables the field, input, and visibility toggle. Forwarded on every base.",
  },
  {
    prop: "invalid",
    type: "boolean",
    default: "false",
    description:
      "Marks the field as invalid and shows PasswordFieldError when present.",
  },
  {
    prop: "visible",
    type: "boolean",
    description:
      "Controlled visibility. When true, the input type is text; when false, password. Pair with onVisibleChange.",
  },
  {
    prop: "defaultVisible",
    type: "boolean",
    default: "false",
    description:
      "Initial visibility for uncontrolled use. Defaults to hidden (password).",
  },
  {
    prop: "onVisibleChange",
    type: "(visible: boolean) => void",
    description:
      "Called when PasswordFieldToggle changes visibility.",
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

export const passwordFieldInputPropRows = [
  {
    prop: "type",
    type: '"password" | "text"',
    default: '"password"',
    description:
      "Locked to password when hidden and text when PasswordFieldToggle reveals the value. Cannot be set manually. spellCheck is always false.",
  },
  {
    prop: "size",
    type: '"default" | "lg"',
    description:
      "Overrides the size from PasswordField. Default 40px, lg 48px. Use className for other heights.",
  },
  {
    prop: "autoComplete",
    type: "string",
    default: '"current-password"',
    description:
      'Defaults to current-password. Use "new-password" for create or reset flows.',
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
    type: "Omit<React.ComponentProps<'input'>, 'type' | 'spellCheck'>",
    description:
      "Native input attributes (value, onChange, name, required, ...) are forwarded. type and spellCheck stay locked.",
  },
]

export const passwordFieldControlPropRows = [
  {
    prop: "size",
    type: '"default" | "lg"',
    description:
      "Overrides the size from PasswordField. Icon inset and height match the default and lg sizes.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description:
      'Wrap PasswordFieldInput with icons marked data-icon="inline-start" or "inline-end" (same as Button), and PasswordFieldToggle.',
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the control styles (last one wins).",
  },
]

export const passwordFieldTogglePropRows = [
  {
    prop: "showLabel",
    type: "string",
    default: '"نمایش رمز عبور"',
    description:
      "Accessible name while the password is hidden. Used as aria-label on the toggle.",
  },
  {
    prop: "hideLabel",
    type: "string",
    default: '"مخفی کردن رمز عبور"',
    description:
      "Accessible name while the password is visible. Used as aria-label on the toggle.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the toggle button styles (last one wins).",
  },
]

export const passwordFieldPartPropRows = [
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
