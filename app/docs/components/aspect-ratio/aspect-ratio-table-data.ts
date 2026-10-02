export const aspectRatioPropRows = [
  {
    prop: "ratio",
    type: "number",
    description: "The width-to-height ratio of the container (e.g. 16 / 9 or 1).",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description:
      "Content displayed inside the ratio box. Position it with absolute inset-0 to fill the frame.",
  },
]
