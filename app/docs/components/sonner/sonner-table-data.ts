export const toasterPropRows = [
  {
    prop: "theme",
    type: '"light" | "dark" | "system"',
    default: '"system"',
    description:
      "Toast theme. Cubix wires this to next-themes by default.",
  },
  {
    prop: "position",
    type: '"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"',
    default: '"bottom-right"',
    description: "Default position for toasts rendered by this toaster.",
  },
  {
    prop: "richColors",
    type: "boolean",
    default: "false",
    description: "Use richer colors for success, info, warning, and error.",
  },
  {
    prop: "expand",
    type: "boolean",
    default: "false",
    description: "Expand stacked toasts by default.",
  },
  {
    prop: "duration",
    type: "number",
    description: "Default duration in milliseconds before a toast auto-dismisses.",
  },
  {
    prop: "closeButton",
    type: "boolean",
    default: "false",
    description: "Show a close button on toasts.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the toaster styles (last one wins).",
  },
]
