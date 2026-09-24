export const selectPropRows = [
  {
    prop: "value",
    type: "string",
    description: "Controlled selected value. Use with `onValueChange`.",
  },
  {
    prop: "defaultValue",
    type: "string",
    description: "Default selected value for uncontrolled usage.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the select and prevents interaction.",
  },
  {
    prop: "name",
    type: "string",
    description: "Name submitted with the parent form.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description:
      "SelectTrigger, SelectContent, and SelectItem parts of the control.",
  },
];
