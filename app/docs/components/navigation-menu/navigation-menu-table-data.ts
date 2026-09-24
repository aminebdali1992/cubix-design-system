export const navigationMenuPropRows = [
  {
    prop: "align",
    type: '"start" | "center" | "end"',
    default: '"start"',
    description:
      "Alignment of the positioner relative to the trigger (Base UI).",
  },
  {
    prop: "viewport",
    type: "boolean",
    default: "true",
    description:
      "Whether to render the shared viewport (Radix UI). Set false for per-item popovers.",
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
    description: "The navigation list and related content.",
  },
]

export const triggerPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "The trigger label shown in the navigation menu.",
  },
]

export const linkPropRows = [
  {
    prop: "render",
    type: "React.ReactElement",
    description:
      "Compose the link onto a child element such as Next.js Link (Base UI).",
  },
  {
    prop: "asChild",
    type: "boolean",
    description:
      "Compose the link onto a child element such as Next.js Link (Radix UI).",
  },
  {
    prop: "active",
    type: "boolean",
    description: "Marks the link as the active navigation item.",
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
    description: "The link content.",
  },
]

export const contentPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "The panel content shown when a trigger is open.",
  },
]
