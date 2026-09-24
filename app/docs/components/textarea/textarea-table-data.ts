export const textareaPropRows = [
  {
    prop: "aria-invalid",
    type: "boolean",
    description:
      "Marks the textarea as invalid and applies destructive border/ring styles automatically.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the textarea and prevents interaction.",
  },
  {
    prop: "placeholder",
    type: "string",
    description:
      "Hint text shown when the textarea is empty (styled with muted-foreground).",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "...props",
    type: "React.ComponentProps<'textarea'>",
    description:
      "All native textarea attributes (value, onChange, required, rows, maxLength, ...) are forwarded to the rendered element.",
  },
];
