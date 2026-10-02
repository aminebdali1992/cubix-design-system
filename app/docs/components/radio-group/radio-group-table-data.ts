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
    description: "Shared name submitted with the form. Generated automatically when omitted.",
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
    prop: "aria-invalid",
    type: "boolean",
    default: "false",
    description:
      "Marks the group as invalid. On React Aria it also paints every radio; set aria-invalid on each item for Base UI and Radix.",
  },
  {
    prop: "dir",
    type: '"ltr" | "rtl"',
    default: "closest dir on the page (rtl if none)",
    description: "Reading direction. Sets which way ArrowLeft and ArrowRight move.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the group styles (last one wins).",
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
    description: "Associates the control with a Label through htmlFor for accessible naming.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables this radio independently of the group. Arrow keys skip it.",
  },
  {
    prop: "aria-invalid",
    type: "boolean",
    default: "false",
    description: "Adds a destructive border and ring. Show the error copy below the group.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged onto the radio control (last one wins).",
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
    description: "Unchecked stays full opacity; checked uses reduced opacity.",
  },
  {
    prop: "aria-invalid",
    type: "-",
    description: "Destructive border and ring. Show error copy below the group.",
  },
]

export const radioGroupKeyboardRows = [
  {
    key: "Tab",
    action:
      "Moves focus into the group onto the selected radio, or the first one when none is selected.",
  },
  {
    key: "Space",
    action: "Selects the focused radio when it is not selected yet.",
  },
  {
    key: "ArrowDown / ArrowUp",
    action: "Moves to and selects the next or previous enabled radio.",
  },
  {
    key: "ArrowLeft / ArrowRight",
    action:
      "Moves to and selects the next or previous enabled radio in reading direction, so the keys are mirrored in RTL.",
  },
]
