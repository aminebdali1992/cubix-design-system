export const collapsiblePropRows = [
  {
    prop: "open",
    type: "boolean",
    description: "Controlled open state of the panel.",
  },
  {
    prop: "defaultOpen",
    type: "boolean",
    description: "Initial open state when uncontrolled.",
  },
  {
    prop: "onOpenChange",
    type: "(open: boolean) => void",
    description: "Called when the open state changes.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const triggerPropRows = [
  {
    prop: "render",
    type: "React.ReactElement",
    description:
      "Compose the trigger onto a child element such as Button (Base UI).",
  },
  {
    prop: "asChild",
    type: "boolean",
    description:
      "Compose the trigger onto a child element such as Button (Radix UI).",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
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
    description: "Content revealed when the panel is open.",
  },
]
