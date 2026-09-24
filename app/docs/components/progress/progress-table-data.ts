export const progressPropRows = [
  {
    prop: "value",
    type: "number | null",
    description:
      "Current progress. Use null for an indeterminate state (Base UI).",
  },
  {
    prop: "max",
    type: "number",
    default: "100",
    description: "Maximum value of the progress bar.",
  },
  {
    prop: "min",
    type: "number",
    default: "0",
    description: "Minimum value of the progress bar (Base UI).",
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
    description:
      "Optional ProgressLabel and ProgressValue rendered above the track.",
  },
]

export const labelPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "The label text for the progress bar.",
  },
]

export const valuePropRows = [
  {
    prop: "children",
    type: "((formattedValue: string | null, value: number | null) => React.ReactNode) | null",
    description:
      "Optional render function for custom formatting (Base UI). Defaults to a percentage string.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const trackPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Usually a ProgressIndicator.",
  },
]

export const indicatorPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]
