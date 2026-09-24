export const tablePropRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "TableHeader, TableBody, TableFooter, and TableCaption.",
  },
]

export const rowPropRows = [
  {
    prop: "data-state",
    type: '"selected" | undefined',
    description: "Marks the row as selected for highlight styles.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]
