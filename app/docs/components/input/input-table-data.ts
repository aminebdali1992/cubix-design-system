export const inputPropRows = [
  {
    prop: "type",
    type: 'string (e.g. "text" | "email" | "password" | "file" | "search")',
    default: '"text"',
    description: "The native input type. File inputs get styled file-button treatment.",
  },
  {
    prop: "aria-invalid",
    type: "boolean",
    description:
      "Marks the field as invalid and applies destructive border/ring styles automatically.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the input and prevents interaction.",
  },
  {
    prop: "placeholder",
    type: "string",
    description: "Hint text shown when the input is empty (styled with muted-foreground).",
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
      "All native input attributes (value, onChange, required, min, max, ...) are forwarded to the rendered element.",
  },
];
