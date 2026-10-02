export const tooltipPropRows = [
  {
    prop: "dir",
    type: '"ltr" | "rtl"',
    default: "closest page dir, else rtl",
    description:
      "Text direction of the trigger and tooltip. Defaults to the closest dir on the page, and to right-to-left when there is none.",
  },
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
    prop: "delay",
    type: "number",
    default: "TooltipProvider delay, else 0",
    description: "Delay in milliseconds before this tooltip opens. Overrides TooltipProvider.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "The trigger and content elements.",
  },
]

export const providerPropRows = [
  {
    prop: "delay",
    type: "number",
    default: "0",
    description:
      "Default delay in milliseconds before any tooltip in the tree opens. Without a provider, tooltips open immediately.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Tooltip trees that share this delay setting.",
  },
]

export const triggerPropRows = [
  {
    prop: "render",
    type: "React.ReactElement",
    description: "Render the trigger as another element (for example a Button).",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const contentPropRows = [
  {
    prop: "side",
    type: '"top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"',
    default: '"top"',
    description: "Preferred side of the trigger to render the tooltip on.",
  },
  {
    prop: "sideOffset",
    type: "number",
    default: "4",
    description: "Distance in pixels between the trigger and the tooltip.",
  },
  {
    prop: "align",
    type: '"start" | "center" | "end"',
    default: '"center"',
    description: "Alignment of the tooltip relative to the trigger.",
  },
  {
    prop: "alignOffset",
    type: "number",
    default: "0",
    description: "Offset in pixels along the alignment axis.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]
