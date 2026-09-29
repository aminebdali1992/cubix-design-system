export const badgePropRows = [
  {
    prop: "variant",
    type: '"default" | "secondary" | "destructive" | "outline" | "ghost" | "link" | "dot"',
    default: '"default"',
    description: "The visual style of the badge.",
  },
  {
    prop: "size",
    type: '"default" | "lg"',
    default: '"default"',
    description: "The size of the badge: default is 20px tall, lg is 24px tall.",
  },
  {
    prop: "render",
    type: "React.ReactElement",
    description:
      "Render the badge as another element, such as a link. On Radix, use asChild instead.",
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
    description: "Badge label, optional icon, or spinner.",
  },
]
