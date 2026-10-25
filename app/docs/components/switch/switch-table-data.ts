import type { TokenTableRow } from "@/components/docs/token-table"

export const propRows = [
  {
    prop: "checked",
    type: "boolean",
    default: "false",
    description: "Controlled checked state of the switch. Use with onCheckedChange.",
  },
  {
    prop: "defaultChecked",
    type: "boolean",
    default: "false",
    description: "Default checked state for uncontrolled usage.",
  },
  {
    prop: "onCheckedChange",
    type: "(checked: boolean) => void",
    description: "Called with the next checked value whenever the switch is toggled.",
  },
  {
    prop: "size",
    type: '"default" | "sm"',
    default: '"default"',
    description: "The size of the switch. sm is 28x16px, default is 36x20px.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the switch.",
  },
  {
    prop: "name",
    type: "string",
    description: "The name attribute passed when submitting a form.",
  },
  {
    prop: "value",
    type: "string",
    default: "on",
    description: "The value attribute passed when submitting a form.",
  },
  {
    prop: "aria-invalid",
    type: "boolean",
    default: "false",
    description:
      "When true, marks the switch invalid for assistive technology. The switch itself looks unchanged; show the error in helper text.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const stateRows = [
  {
    prop: "on",
    type: "-",
    description: "The track uses the primary color and the thumb sits at the inline end.",
  },
  {
    prop: "off",
    type: "-",
    description: "The track uses the input color and the thumb sits at the inline start.",
  },
  {
    prop: "disabled",
    type: "-",
    description: "Disabled switches cannot be interacted with and are dimmed.",
  },
  {
    prop: "invalid",
    type: "-",
    description: "Exposed to assistive technology only. Show the error message in helper text.",
  },
]

export const switchTypographyRows: TokenTableRow[] = [
  { element: "Label", token: "text-label", value: "13px, 400" },
  { element: "Description", token: "text-description", value: "13px, 400" },
]

export const switchColorRows: TokenTableRow[] = [
  { element: "Track (off)", token: "bg-input", value: "--input", swatch: "--input", swatchOutline: true },
  { element: "Track (on)", token: "bg-primary", value: "--primary", swatch: "--primary" },
  { element: "Thumb", token: "bg-background", value: "--background", swatch: "--background", swatchOutline: true },
  { element: "Focus ring (off)", token: "ring-secondary", value: "--secondary", swatch: "--secondary", swatchOutline: true },
  { element: "Focus ring (on)", token: "ring-primary/20", value: "--primary, 20%", swatch: "--primary" },
  { element: "Invalid border (1px)", token: "outline-destructive", value: "--destructive", swatch: "--destructive" },
  { element: "Invalid ring", token: "ring-destructive/20", value: "--destructive, 20%", swatch: "--destructive" },
  { element: "Label", token: "text-foreground", value: "--foreground", swatch: "--foreground" },
  { element: "Description", token: "text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
]