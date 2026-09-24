export const drawerPropRows = [
  {
    prop: "swipeDirection",
    type: '"up" | "right" | "down" | "left"',
    default: '"down"',
    description: "Edge of the screen the drawer opens from.",
  },
  {
    prop: "showSwipeHandle",
    type: "boolean",
    default: "false",
    description: "Render a swipe handle inside DrawerContent.",
  },
  {
    prop: "modal",
    type: 'boolean | "trap-focus"',
    default: "true",
    description:
      "When false, allow interacting with the rest of the page. Use trap-focus to keep focus inside without blocking pointer events.",
  },
  {
    prop: "disablePointerDismissal",
    type: "boolean",
    description: "Prevent closing when pressing outside the drawer.",
  },
  {
    prop: "snapPoints",
    type: "(number | string)[]",
    description:
      "Preset heights for vertical drawers. Values between 0 and 1 are viewport fractions; larger numbers are pixels; strings support px and rem.",
  },
  {
    prop: "snapPoint",
    type: "number | string | null",
    description: "Controlled active snap point.",
  },
  {
    prop: "onSnapPointChange",
    type: "(snapPoint: number | string | null) => void",
    description: "Called when the active snap point changes.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Trigger and content elements for the drawer.",
  },
]

export const triggerClosePropRows = [
  {
    prop: "render",
    type: "React.ReactElement",
    description:
      "Render the trigger or close control as another element (e.g. a Button).",
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
      "Additional Tailwind classes merged with the component styles. Use h-*, max-h-*, w-*, or max-w-* to size the drawer.",
  },
]

export const subcomponentRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]
