export const radioGroupPropRows = [
  {
    prop: "value",
    type: "string",
    description:
      "Controlled selected value. Pair with onValueChange when the parent owns the value.",
  },
  {
    prop: "defaultValue",
    type: "string",
    description: "Initial selected value for uncontrolled usage.",
  },
  {
    prop: "onValueChange",
    type: "(value: string) => void",
    description: "Called with the next value whenever a radio is selected.",
  },
  {
    prop: "name",
    type: "string",
    description:
      "Shared name submitted with the form. Generated automatically when omitted.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables every radio in the group.",
  },
  {
    prop: "required",
    type: "boolean",
    default: "false",
    description: "Marks the group as required for form validation.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the group styles (last one wins).",
  },
]

export const radioPropRows = [
  {
    prop: "value",
    type: "string",
    description: "Value submitted when this radio is selected. Required.",
  },
  {
    prop: "id",
    type: "string",
    description:
      "Associates the control with a Label through htmlFor for accessible naming.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables this radio independently of the group.",
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
      "Additional Tailwind classes merged onto the radio control (last one wins).",
  },
]

export const radioGroupStateRows = [
  {
    prop: "checked",
    type: "-",
    description: "Primary fill with a filled indicator dot.",
  },
  {
    prop: "disabled",
    type: "-",
    description:
      "Unchecked stays full opacity; checked uses reduced opacity.",
  },
  {
    prop: "aria-invalid",
    type: "-",
    description: "Expose with aria-invalid; show error copy below the control.",
  },
]

// Back-compat aliases
export const propRows = radioGroupPropRows
export const variantRows = radioGroupStateRows
