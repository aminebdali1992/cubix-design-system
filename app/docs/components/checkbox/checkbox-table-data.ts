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
    description:
      "Called with the next boolean value whenever the checkbox is toggled.",
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
    description:
      "Associates the control with a Label through htmlFor for accessible naming.",
  },
  {
    prop: "aria-invalid",
    type: "boolean",
    default: "false",
    description:
      "Marks the control as invalid for assistive tech. Pair with error text for visual feedback.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the control styles (last one wins).",
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
    description:
      "Unchecked stays full opacity; checked or indeterminate use reduced opacity.",
  },
  {
    prop: "pending",
    type: "-",
    description:
      "Borderless control with a spinning loader; interaction is blocked.",
  },
  {
    prop: "aria-invalid",
    type: "-",
    description: "Expose with aria-invalid; show error copy below the control.",
  },
]

// Back-compat aliases for any older imports
export const propRows = checkboxPropRows
export const variantRows = checkboxStateRows
