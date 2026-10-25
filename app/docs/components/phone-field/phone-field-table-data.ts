import type { TokenTableRow } from "@/components/docs/token-table"

export const phoneFieldPropRows = [
  {
    prop: "size",
    type: '"default" | "lg"',
    default: '"default"',
    description:
      "Height for the input: default 40px, lg 48px. Inherited by PhoneFieldInput and PhoneFieldControl unless overridden. Use className for other heights.",
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
    description: "Marks the field as invalid and shows PhoneFieldError when present.",
  },
  {
    prop: "name",
    type: "string",
    description:
      "Identifies the field when a form is submitted. Forwarded to the input on every base.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the root styles (last one wins).",
  },
]

export const phoneFieldInputPropRows = [
  {
    prop: "type",
    type: '"tel"',
    default: '"tel"',
    description:
      "Locked to tel. Cannot be changed. inputMode is always tel and spellCheck is always false.",
  },
  {
    prop: "size",
    type: '"default" | "lg"',
    description:
      "Overrides the size from PhoneField. Default 40px, lg 48px. Use className for other heights.",
  },
  {
    prop: "autoComplete",
    type: "string",
    default: '"tel"',
    description:
      "Defaults to tel. Override only when a different telephone autocomplete token is required (for example tel-national).",
  },
  {
    prop: "placeholder",
    type: "string",
    description: "Hint text shown when the input is empty.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the input styles (last one wins).",
  },
  {
    prop: "...props",
    type: "Omit<React.ComponentProps<'input'>, 'type' | 'inputMode' | 'spellCheck'>",
    description:
      "Native input attributes (value, onChange, name, required, ...) are forwarded. type, inputMode, and spellCheck stay locked for telephone.",
  },
]

export const phoneFieldControlPropRows = [
  {
    prop: "size",
    type: '"default" | "lg"',
    description:
      "Overrides the size from PhoneField. Icon inset and height match the default and lg sizes.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description:
      'Wrap PhoneFieldInput with icons marked data-icon="inline-start" or "inline-end" (same as Button), and optionally PhoneFieldClear.',
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the control styles (last one wins).",
  },
]

export const phoneFieldClearPropRows = [
  {
    prop: "aria-label",
    type: "string",
    default: '"Clear"',
    description: "Accessible name for the clear button. Required when no visible text is present.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the clear button styles (last one wins).",
  },
]

export const phoneFieldPartPropRows = [
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the part styles (last one wins).",
  },
  {
    prop: "...props",
    type: "HTML attributes",
    description: "Native attributes for the rendered element are forwarded.",
  },
]

export const phoneFieldTypographyRows: TokenTableRow[] = [
  { element: "Label", token: "text-label", value: "13px, 400" },
  { element: "Input value", token: "text-label", value: "13px, 400" },
  { element: "Placeholder", token: "text-label", value: "13px, 400" },
  { element: "Description", token: "text-caption", value: "12px, 400" },
  { element: "Error", token: "text-caption", value: "12px, 400" },
]

export const phoneFieldColorRows: TokenTableRow[] = [
  { element: "Text", token: "text-foreground", value: "--foreground", swatch: "--foreground" },
  { element: "Placeholder", token: "placeholder:text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
  { element: "Border", token: "border-input", value: "--input", swatch: "--input", swatchOutline: true },
  { element: "Focus border", token: "focus-visible:border-primary", value: "--primary", swatch: "--primary" },
  { element: "Focus ring", token: "ring-primary/20", value: "--primary / 20%", swatch: "--primary" },
  { element: "Icon & clear button", token: "text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
  { element: "Clear button hover", token: "hover:text-foreground", value: "--foreground", swatch: "--foreground" },
  { element: "Description", token: "text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
  { element: "Invalid border & error", token: "border-destructive", value: "--destructive", swatch: "--destructive" },
  { element: "Disabled background", token: "bg-muted", value: "--muted", swatch: "--muted", swatchOutline: true },
]