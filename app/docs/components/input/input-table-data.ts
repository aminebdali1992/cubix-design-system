import type { TokenTableRow } from "@/components/docs/token-table"

export const inputPropRows = [
  {
    prop: "size",
    type: '"default" | "lg"',
    default: '"default"',
    description: "Control height and inline padding: default is 40px, lg is 48px (same as Cubix fields).",
  },
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
]

export const inputTypographyRows: TokenTableRow[] = [
  { element: "Input", token: "text-label", value: "13px, 400" },
  { element: "Placeholder", token: "text-label", value: "13px, 400" },
  { element: "File button", token: "file:text-description file:font-medium", value: "13px, 500" },
]

export const inputColorRows: TokenTableRow[] = [
  { element: "Text", token: "text-foreground", value: "--foreground", swatch: "--foreground" },
  { element: "Placeholder", token: "placeholder:text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
  { element: "Border", token: "border-input", value: "--input", swatch: "--input", swatchOutline: true },
  { element: "Background (dark)", token: "dark:bg-input/30", value: "--input / 30%", swatch: "--input" },
  { element: "Focus border", token: "focus-visible:border-primary", value: "--primary", swatch: "--primary" },
  { element: "Focus ring", token: "focus-visible:ring-primary/20", value: "--primary / 20%", swatch: "--primary" },
  { element: "Invalid border", token: "aria-invalid:border-destructive", value: "--destructive", swatch: "--destructive" },
  { element: "Disabled background", token: "disabled:bg-muted", value: "--muted", swatch: "--muted", swatchOutline: true },
  { element: "Disabled text", token: "disabled:text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
]
