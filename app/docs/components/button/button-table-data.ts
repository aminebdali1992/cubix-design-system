export const propRows = [
  {
    prop: "variant",
    type: '"default" | "secondary" | "gray" | "destructive" | "destructive-secondary" | "outline" | "ghost" | "link"',
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
      "Soft primary tint for secondary actions that stay on-brand.",
  },
  {
    prop: "gray",
    type: "-",
    description: "Neutral gray fill for low-emphasis actions.",
  },
  {
    prop: "destructive",
    type: "-",
    description: "Solid danger fill for irreversible actions.",
  },
  {
    prop: "destructive-secondary",
    type: "-",
    description: "Soft danger tint for secondary destructive actions.",
  },
  {
    prop: "outline",
    type: "-",
    description:
      "Bordered button that pairs well with gray or ghost buttons.",
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
    type: "28px",
    description: "Extra-compact control for dense chrome.",
  },
  {
    prop: "sm",
    type: "32px",
    description: "Compact button for dense UIs.",
  },
  {
    prop: "default",
    type: "40px",
    description: "Standard height button.",
  },
  {
    prop: "lg",
    type: "48px",
    description: "Large button for prominent actions.",
  },
  {
    prop: "icon-xs",
    type: "28px",
    description: "Extra-small square button for icon-only actions.",
  },
  {
    prop: "icon-sm",
    type: "32px",
    description: "Small square button for icon-only actions.",
  },
  {
    prop: "icon",
    type: "40px",
    description: "Square button for icon-only actions.",
  },
  {
    prop: "icon-lg",
    type: "48px",
    description: "Large square button for icon-only actions.",
  },
]
