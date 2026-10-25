import type { TokenTableRow } from "@/components/docs/token-table"

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

export const textareaTypographyRows: TokenTableRow[] = [
  { element: "Value", token: "text-label", value: "13px, 400, leading-relaxed" },
  { element: "Placeholder", token: "text-label", value: "13px, 400" },
]

export const textareaColorRows: TokenTableRow[] = [
  { element: "Border", token: "border-input", value: "--input", swatch: "--input", swatchOutline: true },
  { element: "Text", token: "text-foreground", value: "--foreground", swatch: "--foreground" },
  { element: "Placeholder / icon", token: "text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
  { element: "Focus border", token: "border-primary", value: "--primary", swatch: "--primary" },
  { element: "Focus ring", token: "ring-primary/20", value: "--primary, 20%", swatch: "--primary" },
  { element: "Invalid border", token: "border-destructive", value: "--destructive", swatch: "--destructive" },
  { element: "Disabled background", token: "bg-muted", value: "--muted", swatch: "--muted", swatchOutline: true },
  { element: "Resize grip", token: "text-border", value: "--border", swatch: "--border" },
]