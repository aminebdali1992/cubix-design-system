export const textareaPropRows = [
  {
    prop: "aria-invalid",
    type: "boolean",
    description:
      "Marks the textarea as invalid and applies destructive border and ring styles automatically.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description:
      "Disables the textarea and prevents interaction. Uses a muted fill and opacity-70 so the value stays readable.",
  },
  {
    prop: "placeholder",
    type: "string",
    description: "Hint text shown when the textarea is empty (styled with muted-foreground).",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins). Use for custom height, fill, or resize.",
  },
  {
    prop: "...props",
    type: "React.ComponentProps<'textarea'>",
    description:
      "All native textarea attributes (value, onChange, required, rows, maxLength, ...) are forwarded to the rendered element.",
  },
]

export const textareaControlPropRows = [
  {
    prop: "children",
    type: "React.ReactNode",
    description:
      'Wrap Textarea with an icon marked data-icon="inline-start" (same as Button / Text Field). The icon aligns to the top for multiline content.',
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the control styles (last one wins).",
  },
]
