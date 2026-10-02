export const popoverPropRows = [
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
    prop: "dir",
    type: '"ltr" | "rtl"',
    default: '"rtl"',
    description:
      "Text direction for the popover. Defaults to RTL. When omitted, follows the closest dir on the page.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "The trigger and content elements.",
  },
]

export const triggerClosePropRows = [
  {
    prop: "render",
    type: "React.ReactElement",
    description: "Render the trigger or close control as another Cubix element (e.g. a Button).",
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
    type: '"top" | "right" | "bottom" | "left"',
    default: '"bottom"',
    description: "Preferred side of the trigger to render the popover on.",
  },
  {
    prop: "align",
    type: '"start" | "center" | "end"',
    default: '"center"',
    description: "Logical alignment along the opposite axis of side (ابتدا / انتها in RTL).",
  },
  {
    prop: "sideOffset",
    type: "number",
    default: "4",
    description: "Distance in pixels between the trigger and the popover.",
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
  {
    prop: "...props",
    type: "React.ComponentProps<'div'>",
    description: "All native div attributes are forwarded to the popover panel.",
  },
]

export const subcomponentRows = [
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]
