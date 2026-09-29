export const toastManagerPropRows = [
  {
    prop: "toast.add",
    type: "(options) => string",
    description:
      "Creates a toast. Pass title, description, type, actionProps, and priority.",
  },
  {
    prop: "toast.promise",
    type: "(promise, options) => string",
    description:
      "Updates one toast through loading, success, and error states.",
  },
  {
    prop: "toast.close",
    type: "(id: string) => void",
    description: "Closes a toast by id.",
  },
  {
    prop: "type",
    type: '"success" | "info" | "warning" | "error" | "loading"',
    description: "Renders a status icon in the built-in toast list.",
  },
  {
    prop: "actionProps",
    type: "Button HTML attributes",
    description: "Props forwarded to ToastAction (for example children and onClick).",
  },
  {
    prop: "data",
    type: "{ icon?, actions?, className? }",
    description:
      "Per-toast customization: a custom icon, extra buttons below the description, and extra classes for the toast root.",
  },
  {
    prop: "priority",
    type: '"low" | "high"',
    description: "Controls stacking priority for important messages.",
  },
]

export const toasterPropRows = [
  {
    prop: "dir",
    type: '"ltr" | "rtl"',
    default: '"rtl"',
    description: "Direction of the toast stack. Also flips the swipe-to-dismiss side.",
  },
  {
    prop: "toastManager",
    type: "ToastManager",
    default: "toast",
    description: "Optional custom manager from createToastManager().",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "App content wrapped by the toast provider.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with viewport styles when customizing parts.",
  },
]
