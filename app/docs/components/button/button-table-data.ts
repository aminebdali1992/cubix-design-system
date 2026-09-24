export const propRows = [
  {
    prop: "variant",
    type: '"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"',
    default: '"default"',
    description: "The visual style of the button.",
  },
  {
    prop: "size",
    type: '"default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"',
    default: '"default"',
    description: "The size of the button.",
  },
  {
    prop: "render",
    type: "React.ReactElement",
    description:
      "Base UI / React Aria: render the button as another element, such as a Next.js Link. Pass nativeButton={false} on Base UI when that element is not a native button.",
  },
  {
    prop: "asChild",
    type: "boolean",
    description:
      "Radix: merge props onto the child element instead of rendering a button.",
  },
  {
    prop: "nativeButton",
    type: "boolean",
    default: "true",
    description:
      "Base UI: set to false when render points at a non-button host such as an anchor or Link.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the button and prevents interaction.",
  },
  {
    prop: "aria-invalid",
    type: "boolean",
    description:
      "Marks the button as invalid and applies destructive border and ring styles.",
  },
  {
    prop: "type",
    type: '"button" | "submit" | "reset"',
    default: '"button"',
    description:
      "Native button type. Defaults to button so it does not submit enclosing forms.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const variantRows = [
  {
    prop: "default",
    type: "-",
    description: "Solid primary button. The main call-to-action style.",
  },
  {
    prop: "secondary",
    type: "-",
    description:
      "A softer alternative to the default variant for secondary actions.",
  },
  {
    prop: "destructive",
    type: "-",
    description: "For destructive actions such as deleting data.",
  },
  {
    prop: "outline",
    type: "-",
    description:
      "Bordered button that pairs well with secondary or ghost buttons.",
  },
  {
    prop: "ghost",
    type: "-",
    description: "No background until hover. Ideal for toolbars and menus.",
  },
  {
    prop: "link",
    type: "-",
    description: "Looks like a link but behaves like a button.",
  },
]

export const sizeRows = [
  {
    prop: "xs",
    type: "h-6",
    description: "Extra-compact control for dense chrome.",
  },
  {
    prop: "sm",
    type: "h-7",
    description: "Compact button for dense UIs.",
  },
  {
    prop: "default",
    type: "h-8",
    description: "Standard height button.",
  },
  {
    prop: "lg",
    type: "h-9",
    description: "Large button for prominent actions.",
  },
  {
    prop: "icon-xs",
    type: "size-6",
    description: "Extra-small square button for icon-only actions.",
  },
  {
    prop: "icon-sm",
    type: "size-7",
    description: "Small square button for icon-only actions.",
  },
  {
    prop: "icon",
    type: "size-8",
    description: "Square button for icon-only actions.",
  },
  {
    prop: "icon-lg",
    type: "size-9",
    description: "Large square button for icon-only actions.",
  },
]
