import type { TokenTableRow } from "@/components/docs/token-table"

export const propRows = [
  { prop: "value", type: "string[]", description: "Current row values. One field is rendered per value." },
  { prop: "onValueChange", type: "(value: string[]) => void", description: "Called with the next values after typing, adding, removing or pasting." },
  { prop: "addLabel", type: "React.ReactNode", description: "Label of the add button under the rows." },
  { prop: "placeholder", type: "string", description: "Placeholder of every row input." },
  { prop: "removeLabel", type: "string", default: '"حذف ردیف"', description: "Accessible label of each icon-only remove button." },
  { prop: "errors", type: "(React.ReactNode | undefined)[]", description: "Per-row error messages by index. A row with an error is marked aria-invalid and shows the message under it through the field's own TextFieldError or EmailFieldError." },
  { prop: "disabled", type: "boolean", default: "false", description: "Disables every input and both buttons." },
  { prop: "pasteSeparator", type: "RegExp", description: "Splits pasted text into several rows, e.g. /[\\s,]+/." },
  { prop: "minimumRows", type: "number", default: "0", description: "Remove buttons are disabled while the row count is at or below this number." },
  { prop: "fieldType", type: '"text" | "email"', default: '"text"', description: "Field used for each row: TextField for text, EmailField for email addresses." },
  { prop: "fieldSize", type: '"default" | "lg"', default: '"default"', description: "Height of the row fields: 40px or 48px. The remove button follows it." },
  { prop: "inputType", type: "React.HTMLInputTypeAttribute", default: '"text"', description: "Native type of text rows, e.g. url. An inputType of email is treated as a fieldType of email." },
  { prop: "rowLabel", type: "(index: number) => string", default: '"مقدار ۱", "مقدار ۲", ...', description: "Accessible name of each row field, rendered as a visually hidden label." },
  { prop: "inputAutoComplete", type: "string", description: "autoComplete of every row input." },
  { prop: "addButtonVariant", type: "Button variant", default: '"outline"', description: "Variant of the add button." },
  { prop: "addButtonSize", type: "Button size", default: '"sm"', description: "Size of the add button." },
  { prop: "removeButtonVariant", type: "Button variant", default: '"outline"', description: "Variant of the remove buttons." },
  { prop: "removeButtonSize", type: "Button size", default: '"icon" / "icon-lg"', description: "Size of the remove buttons. Defaults to the size that matches fieldSize (40px or 48px)." },
  { prop: "className", type: "string", description: "Classes for the root." },
  { prop: "rowsClassName / rowClassName", type: "string", description: "Classes for the rows container and each row." },
  { prop: "inputClassName", type: "string", description: "Classes for every row input." },
  { prop: "addButtonClassName / removeButtonClassName", type: "string", description: "Classes for the add and remove buttons." },
]

export const singleValueFieldArrayTypographyRows: TokenTableRow[] = [
  { element: "Label", token: "text-label font-normal", value: "13px / 18px, 400" },
  { element: "Field value and placeholder", token: "text-label leading-none font-normal", value: "13px / 13px, 400" },
  { element: "Add button label (sm)", token: "text-caption leading-none font-normal", value: "12px / 1, 400" },
  { element: "Helper text", token: "text-caption font-normal", value: "12px / 16px, 400" },
  { element: "Row error", token: "text-caption font-normal", value: "12px / 16px, 400" },
]

export const singleValueFieldArrayColorRows: TokenTableRow[] = [
  { element: "Field border", token: "border-input", value: "--input", swatch: "--input", swatchOutline: true },
  { element: "Field value", token: "text-foreground", value: "--foreground", swatch: "--foreground" },
  { element: "Placeholder and helper text", token: "text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
  { element: "Add and remove buttons (outline)", token: "border-border bg-background hover:bg-muted", value: "--border / --background", swatch: "--border", swatchOutline: true },
  { element: "Submit button (default)", token: "bg-primary text-primary-foreground", value: "--primary", swatch: "--primary" },
  { element: "Focus ring", token: "focus-visible:border-ring ring-ring/50", value: "--ring / 50%", swatch: "--ring" },
  { element: "Invalid input", token: "aria-invalid:border-destructive", value: "--destructive", swatch: "--destructive" },
  { element: "Row error", token: "text-destructive", value: "--destructive", swatch: "--destructive" },
  { element: "Disabled input", token: "disabled:bg-input/50 disabled:opacity-50", value: "--input / 50%", swatch: "--input", swatchOutline: true },
]
