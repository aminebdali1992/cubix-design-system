export const sourcesPropRows = [
  {
    prop: "count",
    type: "number",
    default: "0",
    description: "Number of cited sources shown in the default trigger label.",
  },
  {
    prop: "open",
    type: "boolean",
    description: "Controlled open state for the citation list.",
  },
  {
    prop: "defaultOpen",
    type: "boolean",
    default: "false",
    description: "Initial open state when uncontrolled.",
  },
  {
    prop: "onOpenChange",
    type: "(open: boolean) => void",
    description: "Called when the list opens or closes.",
  },
]

export const sourcesTriggerPropRows = [
  {
    prop: "label",
    type: "React.ReactNode",
    description:
      'Custom trigger text. Defaults to "1 source" or "N sources" from count.',
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Optional custom trigger content.",
  },
]

export const sourcePropRows = [
  {
    prop: "href",
    type: "string",
    description: "Destination URL opened in a new tab.",
  },
  {
    prop: "title",
    type: "React.ReactNode",
    description: "Primary citation title. Falls back to hostname or href.",
  },
  {
    prop: "description",
    type: "React.ReactNode",
    description: "Optional supporting snippet under the title.",
  },
  {
    prop: "hostname",
    type: "string",
    description: "Override hostname used for the subtitle and favicon.",
  },
  {
    prop: "showFavicon",
    type: "boolean",
    default: "true",
    description: "Show a favicon badge derived from the hostname.",
  },
]

export const sourcePreviewPropRows = [
  {
    prop: "href",
    type: "string",
    description: "Linked source opened from the hover card.",
  },
  {
    prop: "title",
    type: "React.ReactNode",
    description: "Title shown in the hover card.",
  },
  {
    prop: "description",
    type: "React.ReactNode",
    description: "Short preview text inside the hover card.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Inline citation marker content, e.g. [1].",
  },
]
