export const hoverCardPropRows = [
  { prop: "open", type: "boolean", description: "Controlled open state. Omit to use uncontrolled mode." },
  { prop: "defaultOpen", type: "boolean", default: "false", description: "Initial open state when uncontrolled." },
  { prop: "onOpenChange", type: "(open: boolean) => void", description: "Called when the open state changes." },
  { prop: "openDelay", type: "number", default: "600", description: "Milliseconds to wait after hover or focus before opening." },
  { prop: "closeDelay", type: "number", default: "300", description: "Milliseconds to wait after the pointer leaves before closing." },
  {
    prop: "dir",
    type: '"ltr" | "rtl"',
    default: '"rtl"',
    description: "Text direction for the card. Defaults to RTL. When omitted, follows the closest dir on the page.",
  },
  { prop: "children", type: "React.ReactNode", description: "The trigger and content elements." },
]

export const triggerPropRows = [
  {
    prop: "render",
    type: "React.ReactElement",
    description: "Render the trigger as another element, such as a Cubix Button or a link. Works on all three bases.",
  },
  { prop: "href", type: "string", description: "Link target when the trigger renders its default anchor." },
  { prop: "className", type: "string", description: "Additional Tailwind classes merged with the component styles (last one wins)." },
]

export const contentPropRows = [
  { prop: "side", type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: "Preferred side of the trigger to render the card on." },
  { prop: "align", type: '"start" | "center" | "end"', default: '"center"', description: "Logical alignment along the other axis (start is the right edge in RTL)." },
  { prop: "sideOffset", type: "number", default: "4", description: "Distance in pixels between the trigger and the card." },
  { prop: "alignOffset", type: "number", default: "0", description: "Offset in pixels away from the aligned edge." },
  { prop: "className", type: "string", description: "Additional Tailwind classes merged with the component styles (last one wins)." },
]
