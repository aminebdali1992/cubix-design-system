export const sheetPropRows = [
  {
    prop: "open",
    type: "boolean",
    description: "Controlled open state. Omit to use uncontrolled mode.",
  },
  {
    prop: "defaultOpen",
    type: "boolean",
    default: "false",
    description: "Initial open state when uncontrolled.",
  },
  {
    prop: "onOpenChange",
    type: "(open: boolean) => void",
    description: "Called when the open state changes.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "The trigger and sheet content.",
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
    prop: "children",
    type: "React.ReactNode",
    description: "The trigger content.",
  },
]

export const contentPropRows = [
  {
    prop: "side",
    type: '"top" | "right" | "bottom" | "left"',
    default: '"right"',
    description: "Edge of the screen where the sheet appears.",
  },
  {
    prop: "showCloseButton",
    type: "boolean",
    default: "true",
    description: "Whether to show the close button in the top-right corner.",
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
    description: "Header, body, and footer content of the sheet.",
  },
]

export const headerFooterPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Content for the header or footer region.",
  },
]

export const titleDescriptionPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Accessible title or description text.",
  },
]
