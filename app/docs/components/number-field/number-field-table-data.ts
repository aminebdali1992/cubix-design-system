export const numberFieldPropRows = [
  {
    prop: "size",
    type: '"default" | "lg"',
    default: '"default"',
    description:
      "Height for the input: default 40px, lg 48px. Inherited by NumberFieldInput and NumberFieldControl unless overridden. Use className for other heights.",
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
    description: "Marks the field as invalid and shows NumberFieldError when present.",
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

export const numberFieldInputPropRows = [
  {
    prop: "type",
    type: '"text"',
    default: '"text"',
    description:
      "Always displays Persian digits (۰-۹). Latin or Arabic-Indic digits typed or pasted are converted. inputMode is always numeric and spellCheck is always false.",
  },
  {
    prop: "size",
    type: '"default" | "lg"',
    description:
      "Overrides the size from NumberField. Default 40px, lg 48px. Use className for other heights.",
  },
  {
    prop: "inputMode",
    type: '"numeric"',
    default: '"numeric"',
    description: "Locked to numeric so mobile keyboards show a number pad.",
  },
  {
    prop: "min",
    type: "number | string",
    description: "Minimum value used by NumberFieldStepper when decreasing.",
  },
  {
    prop: "max",
    type: "number | string",
    description: "Maximum value used by NumberFieldStepper when increasing.",
  },
  {
    prop: "step",
    type: "number | string",
    default: "1",
    description:
      "Step size used by ArrowUp / ArrowDown on the input and by NumberFieldStepper unless the stepper overrides it.",
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
      "Native input attributes (value, onChange, name, required, ...) are forwarded. type, inputMode, and spellCheck stay locked for numeric entry.",
  },
]

export const numberFieldControlPropRows = [
  {
    prop: "size",
    type: '"default" | "lg"',
    description:
      "Overrides the size from NumberField. Icon inset and height match the default and lg sizes.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description:
      'Wrap NumberFieldInput with icons marked data-icon="inline-start" or "inline-end" (same as Button), and optionally NumberFieldStepper.',
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the control styles (last one wins).",
  },
]

export const numberFieldStepperPropRows = [
  {
    prop: "step",
    type: "number",
    description:
      "Overrides the input step attribute for the arrow buttons only. Set step on NumberFieldInput to keep keyboard and buttons in sync. Defaults to 1 when neither is set.",
  },
  {
    prop: "incrementLabel",
    type: "string",
    default: '"افزایش"',
    description: "Accessible name for the increase button.",
  },
  {
    prop: "decrementLabel",
    type: "string",
    default: '"کاهش"',
    description: "Accessible name for the decrease button.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the stepper styles (last one wins).",
  },
]

export const numberFieldPartPropRows = [
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
