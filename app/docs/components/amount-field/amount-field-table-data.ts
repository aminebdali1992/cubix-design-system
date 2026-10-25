import type { TokenTableRow } from "@/components/docs/token-table"

export const amountFieldPropRows = [
  {
    prop: "size",
    type: '"default" | "lg"',
    default: '"default"',
    description:
      "Height for the input: default 40px, lg 48px. Inherited by AmountFieldInput and AmountFieldControl unless overridden. Use className for other heights.",
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
    description: "Marks the field as invalid and shows AmountFieldError when present.",
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

export const amountFieldInputPropRows = [
  {
    prop: "type",
    type: '"text"',
    default: '"text"',
    description:
      "Always displays Persian digits (۰-۹) with thousand separators (٬). Latin digits typed or pasted are converted. Letters are blocked. inputMode is always numeric and spellCheck is always false.",
  },
  {
    prop: "size",
    type: '"default" | "lg"',
    description:
      "Overrides the size from AmountField. Default 40px, lg 48px. Use className for other heights.",
  },
  {
    prop: "inputMode",
    type: '"numeric"',
    default: '"numeric"',
    description: "Locked to numeric so mobile keyboards show a number pad.",
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
      "Native input attributes (value, onChange, name, required, ...) are forwarded. type, inputMode, and spellCheck stay locked for amount entry. Use parseAmountFieldValue to read a numeric amount from the formatted string.",
  },
]

export const amountFieldControlPropRows = [
  {
    prop: "size",
    type: '"default" | "lg"',
    description:
      "Overrides the size from AmountField. Icon inset and height match the default and lg sizes.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description:
      'Wrap AmountFieldInput with icons marked data-icon="inline-start" or "inline-end" (same as Button), and optionally AmountFieldCurrency.',
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the control styles (last one wins).",
  },
]

export const amountFieldCurrencyPropRows = [
  {
    prop: "unit",
    type: '"تومان" | "ریال"',
    description: "Currency label beside the amount. Only تومان or ریال.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the currency styles (last one wins).",
  },
]

export const amountFieldPartPropRows = [
  {
    prop: "amountInWords",
    type: "boolean",
    default: "false",
    description:
      "On AmountFieldDescription only. When true, spells the entered amount in Persian words. If the currency is تومان, words use ریال (×10); if ریال, words use تومان (÷10). When the input is empty, children are shown instead (or the description hides if there are none). Leave false for a normal static help text.",
  },
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

export const amountFieldTypographyRows: TokenTableRow[] = [
  { element: "Label", token: "text-label leading-none", value: "13px / 13px, 400" },
  { element: "Input", token: "text-label leading-none", value: "13px / 13px, 400" },
  { element: "Currency", token: "text-caption", value: "12px / 16px, 400" },
  { element: "Description", token: "text-caption", value: "12px / 16px, 400" },
  { element: "Error", token: "text-caption", value: "12px / 16px, 400" },
]

export const amountFieldColorRows: TokenTableRow[] = [
  { element: "Label", token: "text-foreground", value: "--foreground", swatch: "--foreground" },
  { element: "Input text", token: "text-foreground", value: "--foreground", swatch: "--foreground" },
  { element: "Placeholder", token: "placeholder:text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
  { element: "Icon", token: "text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
  { element: "Currency", token: "text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
  { element: "Description", token: "text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
  { element: "Border", token: "border-input", value: "--input", swatch: "--input", swatchOutline: true },
  { element: "Background (dark)", token: "dark:bg-input/30", value: "--input, 30%" },
  { element: "Focus border", token: "focus-visible:border-primary", value: "--primary", swatch: "--primary" },
  { element: "Focus ring", token: "ring-primary/20", value: "--primary, 20%" },
  { element: "Invalid border", token: "aria-invalid:border-destructive", value: "--destructive", swatch: "--destructive" },
  { element: "Error", token: "text-destructive", value: "--destructive", swatch: "--destructive" },
  { element: "Disabled background", token: "disabled:bg-muted", value: "--muted", swatch: "--muted", swatchOutline: true },
  { element: "Disabled text", token: "disabled:text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
]