import type { TokenTableRow } from "@/components/docs/token-table"

export const checkboxPropRows = [
  {
    prop: "checked",
    type: "boolean",
    description:
      "Controlled checked state. Pair with onCheckedChange when the parent owns the value.",
  },
  {
    prop: "defaultChecked",
    type: "boolean",
    default: "false",
    description: "Initial checked state for uncontrolled usage.",
  },
  {
    prop: "onCheckedChange",
    type: "(checked: boolean) => void",
    description: "Called with the next boolean value whenever the checkbox is toggled.",
  },
  {
    prop: "indeterminate",
    type: "boolean",
    default: "false",
    description:
      "Shows the mixed state (minus icon). Use for partial selection in grouped options.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the control and blocks interaction.",
  },
  {
    prop: "pending",
    type: "boolean",
    default: "false",
    description:
      "Shows a circular spinner in place of the box while a save is in flight. Blocks interaction and sets aria-busy.",
  },
  {
    prop: "required",
    type: "boolean",
    default: "false",
    description: "Marks the control as required for form validation.",
  },
  {
    prop: "name",
    type: "string",
    description: "Name submitted with the form when the checkbox is checked.",
  },
  {
    prop: "value",
    type: "string",
    default: '"on"',
    description: "Value submitted with the form when the checkbox is checked.",
  },
  {
    prop: "id",
    type: "string",
    description: "Associates the control with a Label through htmlFor for accessible naming.",
  },
  {
    prop: "aria-invalid",
    type: "boolean",
    default: "false",
    description:
      "Marks the control as invalid. Adds a destructive border and ring; link the error text with aria-describedby.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the control styles (last one wins).",
  },
]

export const checkboxStateRows = [
  {
    prop: "checked",
    type: "-",
    description: "Primary fill with a check icon.",
  },
  {
    prop: "indeterminate",
    type: "-",
    description: "Primary fill with a minus icon for partial selection.",
  },
  {
    prop: "disabled",
    type: "-",
    description: "Unchecked stays full opacity; checked or indeterminate use reduced opacity.",
  },
  {
    prop: "pending",
    type: "-",
    description: "Borderless control with a spinning loader; interaction is blocked.",
  },
  {
    prop: "aria-invalid",
    type: "-",
    description: "Destructive border and ring. Show error copy below the control.",
  },
]

export const checkboxTypographyRows: TokenTableRow[] = [
  { element: "Label", token: "text-label leading-none font-normal", value: "13px / 1, 400" },
  { element: "Description", token: "text-caption leading-normal font-normal", value: "12px / 1.5, 400" },
  { element: "Error message", token: "text-caption font-normal", value: "12px, 400" },
]

export const checkboxColorRows: TokenTableRow[] = [
  { element: "Border (unchecked)", token: "border-input", value: "--input", swatch: "--input" },
  { element: "Background (checked / indeterminate)", token: "bg-primary border-primary", value: "--primary", swatch: "--primary" },
  { element: "Check / minus icon", token: "text-primary-foreground", value: "--primary-foreground", swatch: "--primary-foreground", swatchOutline: true },
  { element: "Pending spinner", token: "text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
  { element: "Focus ring", token: "focus-visible:ring-secondary", value: "--secondary", swatch: "--secondary" },
  { element: "Invalid border", token: "aria-invalid:border-destructive", value: "--destructive", swatch: "--destructive" },
  { element: "Invalid ring", token: "aria-invalid:ring-destructive/20", value: "--destructive / 20%", swatch: "--destructive" },
]