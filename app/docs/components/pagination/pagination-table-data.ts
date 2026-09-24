export const paginationPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Usually a PaginationContent of items and links.",
  },
]

export const contentPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "PaginationItem elements that wrap links and controls.",
  },
]

export const itemPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description:
      "A PaginationLink, PaginationPrevious, PaginationNext, or PaginationEllipsis.",
  },
]

export const linkPropRows = [
  {
    prop: "isActive",
    type: "boolean",
    default: "false",
    description: "Marks the link as the current page.",
  },
  {
    prop: "size",
    type: '"default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"',
    default: '"icon"',
    description: "Button size variant applied to the link.",
  },
  {
    prop: "href",
    type: "string",
    description: "Destination URL for the page link.",
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
    description: "The page number or label shown in the link.",
  },
]

export const previousNextPropRows = [
  {
    prop: "text",
    type: "string",
    default: '"Previous" | "Next"',
    description:
      "Visible label next to the chevron. Hidden below the sm breakpoint.",
  },
  {
    prop: "href",
    type: "string",
    description: "Destination URL for previous or next navigation.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const ellipsisPropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]
