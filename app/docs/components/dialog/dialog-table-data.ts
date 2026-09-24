export const dialogPropRows = [
  {
    prop: "children",
    type: "React.ReactNode",
    description:
      "The trigger and content elements. State is managed internally (uncontrolled).",
  },
];

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
];

export const contentPropRows = [
  {
    prop: "showCloseButton",
    type: "boolean",
    default: "true",
    description: "Show the built-in close (X) button in the top-right corner.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "...props",
    type: "React.ComponentProps<'dialog'>",
    description:
      "All native dialog attributes are forwarded to the rendered element.",
  },
];

export const subcomponentRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
];
