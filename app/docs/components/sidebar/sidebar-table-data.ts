export const providerPropRows = [
  {
    prop: "defaultOpen",
    type: "boolean",
    default: "true",
    description: "Initial open state when uncontrolled.",
  },
  {
    prop: "open",
    type: "boolean",
    description: "Controlled open state of the sidebar.",
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
      "Additional Tailwind classes merged with the wrapper styles (last one wins).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Sidebar and inset content.",
  },
]

export const sidebarPropRows = [
  {
    prop: "side",
    type: '"left" | "right"',
    default: '"left"',
    description: "Which side of the layout the sidebar appears on.",
  },
  {
    prop: "variant",
    type: '"sidebar" | "floating" | "inset"',
    default: '"sidebar"',
    description: "Visual style of the sidebar panel.",
  },
  {
    prop: "collapsible",
    type: '"offcanvas" | "icon" | "none"',
    default: '"offcanvas"',
    description: "How the sidebar collapses on desktop.",
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
    description: "Header, content, footer, and related parts.",
  },
]

export const menuButtonPropRows = [
  {
    prop: "isActive",
    type: "boolean",
    default: "false",
    description: "Marks the menu button as the active item.",
  },
  {
    prop: "variant",
    type: '"default" | "outline"',
    default: '"default"',
    description: "Visual variant of the menu button.",
  },
  {
    prop: "size",
    type: '"default" | "sm" | "lg"',
    default: '"default"',
    description: "Size of the menu button.",
  },
  {
    prop: "tooltip",
    type: "string | TooltipContent props",
    description:
      "Tooltip shown when the sidebar is collapsed to icons.",
  },
  {
    prop: "render",
    type: "React.ReactElement",
    description:
      "Compose the button onto a child element such as an anchor (Base UI).",
  },
  {
    prop: "asChild",
    type: "boolean",
    description:
      "Compose the button onto a child element such as an anchor (Radix UI).",
  },
]
