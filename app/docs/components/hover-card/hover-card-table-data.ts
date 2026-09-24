export const hoverCardPropRows = [
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
    description: "The trigger and content elements.",
  },
]

export const triggerPropRows = [
  {
    prop: "delay",
    type: "number",
    default: "600",
    description:
      "Milliseconds to wait before opening (Base UI). On Radix, use openDelay on HoverCard.",
  },
  {
    prop: "closeDelay",
    type: "number",
    default: "300",
    description:
      "Milliseconds to wait before closing (Base UI). On Radix, use closeDelay on HoverCard.",
  },
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
    prop: "side",
    type: '"top" | "right" | "bottom" | "left"',
    default: '"bottom"',
    description: "Preferred side of the trigger to render the card on.",
  },
  {
    prop: "align",
    type: '"start" | "center" | "end"',
    default: '"center"',
    description: "Alignment along the opposite axis of side.",
  },
  {
    prop: "sideOffset",
    type: "number",
    default: "4",
    description: "Distance in pixels between the trigger and the card.",
  },
  {
    prop: "alignOffset",
    type: "number",
    default: "4",
    description: "Offset in pixels along the alignment axis (Base UI).",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]
