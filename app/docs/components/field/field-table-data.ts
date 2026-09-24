export const fieldSetPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const fieldLegendPropRows = [
  {
    prop: "variant",
    type: '"legend" | "label"',
    default: '"legend"',
    description:
      "Visual size of the legend. Use label for nested fieldsets that should match FieldLabel.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const fieldGroupPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const fieldPropRows = [
  {
    prop: "orientation",
    type: '"vertical" | "horizontal" | "responsive"',
    default: '"vertical"',
    description:
      "Layout of the label and control. responsive switches at the FieldGroup container breakpoint.",
  },
  {
    prop: "data-invalid",
    type: "boolean",
    description: "Marks the field as invalid and applies destructive text color.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const fieldContentPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const fieldLabelPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const fieldTitlePropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const fieldDescriptionPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const fieldSeparatorPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Optional label rendered over the separator line.",
  },
]

export const fieldErrorPropRows = [
  {
    prop: "errors",
    type: "Array<{ message?: string } | undefined>",
    description:
      "Validation messages to render. Multiple unique messages become a list.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Custom error content. When set, errors is ignored.",
  },
]
