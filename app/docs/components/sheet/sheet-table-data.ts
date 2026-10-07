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
    default: '"right"',
    description: "Edge of the screen where the sheet appears.",
  },
  {
    prop: "showCloseButton",
    type: "boolean",
    default: "true",
    description: "Show the built-in close (X) button in the top end corner.",
  },
  {
    prop: "dir",
    type: '"ltr" | "rtl"',
    default: '"rtl"',
    description: "Text direction of the portaled panel. Defaults to RTL for Persian-first layouts.",
  },
  {
    prop: "lang",
    type: "string",
    default: '"fa"',
    description: 'Language attribute applied when dir is "rtl". Pass dir="ltr" to omit it.',
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const headerFooterPropRows = [
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const titleDescriptionPropRows = [
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]
