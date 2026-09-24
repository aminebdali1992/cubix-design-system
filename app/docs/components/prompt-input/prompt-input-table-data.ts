export const promptInputPropRows = [
  {
    prop: "onSubmit",
    type: "(message: PromptInputMessage, event) => void | Promise<void>",
    description:
      "Called with text and files when the form submits. Clears on success; keeps input on throw.",
  },
  {
    prop: "accept",
    type: "string",
    description:
      'File accept filter for the hidden input, e.g. "image/*" or ".pdf,.txt".',
  },
  {
    prop: "multiple",
    type: "boolean",
    default: "false",
    description: "Allow selecting more than one file at a time.",
  },
  {
    prop: "maxFiles",
    type: "number",
    description: "Maximum attachment count. Extra files are rejected via onError.",
  },
  {
    prop: "maxFileSize",
    type: "number",
    description: "Maximum file size in bytes. Oversized files call onError.",
  },
  {
    prop: "globalDrop",
    type: "boolean",
    default: "false",
    description: "When true, document-level drops add files (opt-in).",
  },
  {
    prop: "onError",
    type: "(error: PromptInputError) => void",
    description:
      "Validation callback for accept, max_files, and max_file_size failures.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional classes for the form root.",
  },
]

export const promptInputProviderPropRows = [
  {
    prop: "initialInput",
    type: "string",
    default: '""',
    description: "Initial text lifted outside the form.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Composer and any controls that need shared text or files.",
  },
]

export const promptInputSubmitPropRows = [
  {
    prop: "status",
    type: '"ready" | "submitted" | "streaming" | "error"',
    default: '"ready"',
    description:
      "Submit icon state. submitted shows a spinner; streaming shows stop when onStop is set.",
  },
  {
    prop: "onStop",
    type: "() => void",
    description:
      "When status is submitted or streaming, click becomes stop instead of submit.",
  },
  {
    prop: "disabled",
    type: "boolean",
    description: "Disable the control. Empty composers usually disable submit.",
  },
]

export const promptInputTextareaPropRows = [
  {
    prop: "placeholder",
    type: "string",
    default: '"What would you like to know?"',
    description: "Placeholder for the message field.",
  },
  {
    prop: "disabled",
    type: "boolean",
    description: "Disable typing while the model is busy or the form is locked.",
  },
]
