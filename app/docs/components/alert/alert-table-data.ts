export const alertPropRows = [
  {
    prop: "variant",
    type: '"default" | "destructive"',
    default: '"default"',
    description: "The visual style of the alert.",
  },
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
      "All native div attributes (role, id, aria-*, ...) are forwarded to the rendered element.",
  },
];

export const alertTitleRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
];

export const alertDescriptionRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
];

export const alertActionRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
];
