export const cardPropRows = [
  {
    prop: "size",
    type: '"default" | "sm"',
    default: '"default"',
    description:
      "Spacing scale for the card. sm tightens padding, gaps, and title size.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins). Use [--card-spacing:--spacing(n)] to override inset.",
  },
  {
    prop: "...props",
    type: "React.ComponentProps<'div'>",
    description:
      "All native div attributes (role, id, aria-*, ...) are forwarded to the rendered element.",
  },
]

export const subcomponentRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "...props",
    type: "React.ComponentProps<'div'>",
    description:
      "All native div attributes are forwarded to the rendered element.",
  },
]
