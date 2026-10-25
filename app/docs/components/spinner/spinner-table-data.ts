import type { TokenTableRow } from "@/components/docs/token-table"

export const spinnerPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes. Use size-* utilities to change the spinner size.",
  },
  {
    prop: "aria-label",
    type: "string",
    default: '"Loading"',
    description: "Accessible name announced by assistive technology.",
  },
]

export const spinnerTypographyRows: TokenTableRow[] = [
  { element: "Label (example)", token: "text-label", value: "13px, 400" },
  { element: "Amount (example)", token: "text-description", value: "13px, 400, tabular-nums" },
]

export const spinnerColorRows: TokenTableRow[] = [
  { element: "Icon", token: "currentColor", value: "Inherits the parent text color" },
  { element: "Label (example)", token: "text-foreground", value: "--foreground", swatch: "--foreground" },
  { element: "Amount (example)", token: "text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
  { element: "Container (example)", token: "bg-muted", value: "--muted", swatch: "--muted", swatchOutline: true },
]