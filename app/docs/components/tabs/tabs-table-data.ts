export const tabsPropRows = [
  {
    prop: "value",
    type: "string",
    description: "Controlled active tab value. Use with `onValueChange`.",
  },
  {
    prop: "defaultValue",
    type: "string",
    description: "Default active tab value for uncontrolled usage.",
  },
  {
    prop: "onValueChange",
    type: "(value: string) => void",
    description: "Called when a tab trigger selects a new value.",
  },
  {
    prop: "dir",
    type: '"ltr" | "rtl"',
    default: "closest dir on the page (rtl if none)",
    description: "The reading direction. It sets the arrow-key direction and where the list sits.",
  },
  {
    prop: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: "The orientation of the tabs list and triggers.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the root styles.",
  },
]

export const tabsListPropRows = [
  {
    prop: "variant",
    type: '"line"',
    default: '"line"',
    description:
      "The visual style of the tabs list. Tabs are always the underline style; use Segmented Control for a filled pill switcher.",
  },
  {
    prop: "aria-label",
    type: "string",
    description: "Names the group of tabs for screen readers.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the list styles.",
  },
]

export const tabsTriggerPropRows = [
  {
    prop: "value",
    type: "string",
    description: "The tab value selected by this trigger.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the trigger and prevents interaction.",
  },
  {
    prop: "onRemove",
    type: "() => void",
    description:
      "Adds a remove control at the end of the trigger. Called when it is clicked, or when Delete or Backspace is pressed on the focused tab. Focus moves to the neighboring tab.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the trigger styles.",
  },
]

export const tabsKeyboardRows = [
  {
    key: "Tab",
    action: "Moves focus into the list onto the active tab, then out to the active panel.",
  },
  {
    key: "ArrowLeft / ArrowRight",
    action:
      "Moves to the next or previous tab in reading direction, so the keys are mirrored in RTL. Selection follows focus.",
  },
  {
    key: "ArrowUp / ArrowDown",
    action: "Moves to the previous or next tab when orientation is vertical.",
  },
  {
    key: "Home / End",
    action: "Moves to the first or last enabled tab.",
  },
  {
    key: "Delete / Backspace",
    action: "Removes the focused tab when it has onRemove. Focus moves to the neighboring tab.",
  },
]

export const tabsContentPropRows = [
  {
    prop: "value",
    type: "string",
    description: "The tab value that controls when this panel is shown.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the content styles.",
  },
]
