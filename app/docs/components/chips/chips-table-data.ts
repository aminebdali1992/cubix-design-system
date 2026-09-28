export const chipsPropRows = [
  {
    prop: "multiple",
    type: "boolean",
    default: "false",
    description:
      "Keep more than one chip selected. Without it, selecting a chip deselects the selected one, and the selected chip deselects itself.",
  },
  {
    prop: "value",
    type: "string[]",
    description:
      "Controlled selected chips. Use an array in both modes and pass at most one value in single mode.",
  },
  {
    prop: "defaultValue",
    type: "string[]",
    description: "Chips selected on first render when uncontrolled.",
  },
  {
    prop: "onValueChange",
    type: "(value: string[]) => void",
    description: "Called with the selected chips whenever a chip is toggled.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Disable every chip in the group.",
  },
  {
    prop: "dir",
    type: '"ltr" | "rtl"',
    description:
      "Text direction of the group. Defaults to the closest dir on the page.",
  },
  {
    prop: "lang",
    type: "string",
    description:
      "Language of the group. Defaults to the closest lang on the page.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the root styles (last one wins).",
  },
]

export const chipPropRows = [
  {
    prop: "value",
    type: "string",
    description:
      "Unique value used in value, defaultValue and onValueChange. Required.",
  },
  {
    prop: "icon",
    type: "ReactNode",
    description:
      "Icon rendered at the inline start, before the label, and hidden from assistive technology.",
  },
  {
    prop: "avatar",
    type: "ReactNode",
    description:
      "Avatar rendered at the inline start in place of the icon, sized to the chip.",
  },
  {
    prop: "variant",
    type: '"default" | "secondary" | "gray" | "outline"',
    default: '"default"',
    description:
      "How the chip looks when selected, matching the Button variant of the same name.",
  },
  {
    prop: "size",
    type: '"xs" | "sm" | "default" | "lg"',
    default: '"sm"',
    description:
      "Chip height, matching the Button size of the same name: 28, 32, 40 or 48px.",
  },
  {
    prop: "onRemove",
    type: "(event: React.MouseEvent<HTMLButtonElement>) => void",
    description:
      "Renders a remove button at the inline end. Removing does not change selection; handle the value update yourself.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Disable the chip and keep it in its current state.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the chip styles (last one wins).",
  },
]

export const chipsKeyboardRows = [
  {
    key: "Enter / Space",
    action: "Toggle the focused chip.",
  },
  {
    key: "Tab / Shift + Tab",
    action: "Move to the next or previous focusable element on the page.",
  },
  {
    key: "ArrowRight / ArrowLeft",
    action:
      "Move focus to the next or previous enabled chip, wrapping at the ends.",
  },
  {
    key: "Home / End",
    action: "Move focus to the first or last enabled chip.",
  },
]
