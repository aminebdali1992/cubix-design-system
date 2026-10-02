export const toastManagerPropRows = [
  {
    prop: "toast.add",
    type: "(options) => string",
    description: "Creates a toast from the options below and returns its id.",
  },
  {
    prop: "toast.promise",
    type: "(promise, options) => Promise<T>",
    description:
      "Shows a loading toast, then a success or error toast when the promise settles. Each state accepts a string, options, or a function of the result.",
  },
  {
    prop: "toast.close",
    type: "(id: string) => void",
    description: "Closes a toast by id.",
  },
  {
    prop: "title",
    type: "React.ReactNode",
    description: "Heading of the toast.",
  },
  {
    prop: "description",
    type: "React.ReactNode",
    description: "Supporting text below the title.",
  },
  {
    prop: "type",
    type: '"success" | "info" | "warning" | "error" | "loading"',
    description: "Renders a status icon. Loading toasts stay open until replaced or closed.",
  },
  {
    prop: "actionProps",
    type: "{ children?, onClick?, className? }",
    description: "Renders an action button next to the content.",
  },
  {
    prop: "data",
    type: "{ icon?, actions?, className? }",
    description:
      "Per-toast customization: a custom icon, extra buttons below the description, and extra classes for the toast root.",
  },
  {
    prop: "timeout",
    type: "number",
    default: "5000",
    description: "Milliseconds before the toast closes on its own.",
  },
  {
    prop: "priority",
    type: '"low" | "high"',
    default: '"low"',
    description:
      "Low priority toasts are announced politely. High priority toasts interrupt the screen reader; use them for errors.",
  },
  {
    prop: "onClose",
    type: "() => void",
    description: "Called when the toast closes.",
  },
]

export const toasterPropRows = [
  {
    prop: "dir",
    type: '"ltr" | "rtl"',
    default: '"rtl"',
    description:
      "Direction of the toast stack. Sets dir and lang on the viewport and flips the swipe-to-dismiss side.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "App content rendered before the toast viewport.",
  },
]

export const toastKeyboardRows = [
  {
    key: "F6",
    action: "Moves focus to the toast stack and pauses the close timers.",
  },
  {
    key: "Tab / Shift+Tab",
    action: "Moves focus between toasts and their buttons.",
  },
  {
    key: "Enter / Space",
    action: "Activates the focused action or close button.",
  },
  {
    key: "Escape",
    action: "Closes the focused toast.",
  },
]
