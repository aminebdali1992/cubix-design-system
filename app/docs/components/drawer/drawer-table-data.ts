export const drawerPropRows = [
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
    prop: "swipeDirection",
    type: '"up" | "right" | "down" | "left"',
    default: '"down"',
    description:
      "Side the drawer opens from (shadcn / Base UI). Radix and Aria map up→top and down→bottom.",
  },
  {
    prop: "direction",
    type: '"top" | "right" | "bottom" | "left"',
    default: '"bottom"',
    description:
      "Optional alias for older Vaul-style APIs. Prefer swipeDirection in new code.",
  },
  {
    prop: "showSwipeHandle",
    type: "boolean",
    default: "false",
    description: "Base UI only: render a swipe handle inside the popup.",
  },
  {
    prop: "snapPoints",
    type: "(number | string)[]",
    description:
      "Base/Radix: preset heights for vertical drawers. Aria ignores snap points.",
  },
  {
    prop: "modal",
    type: 'boolean | "trap-focus"',
    default: "true",
    description:
      "Base: when false, page stays interactive. Use trap-focus to keep focus inside while leaving pointer/scroll free.",
  },
  {
    prop: "disablePointerDismissal",
    type: "boolean",
    description: "Base: prevent closing on outside press (useful with modal={false}).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "The trigger and drawer content.",
  },
]

export const triggerClosePropRows = [
  {
    prop: "render",
    type: "React.ReactElement",
    description:
      "Render the trigger or close control as another Cubix element (e.g. a Button).",
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
    prop: "dir",
    type: '"ltr" | "rtl"',
    default: '"rtl"',
    description:
      "Text direction of the portaled panel. Defaults to RTL for Persian-first layouts.",
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
    description:
      "Additional Tailwind classes merged with the component styles (last one wins). Use h-*/max-h-* or w-*/max-w-* for custom sizes.",
  },
]

export const headerFooterPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const titleDescriptionPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]
