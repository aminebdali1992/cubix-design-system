export const messageScrollerProviderPropRows = [
  {
    prop: "autoScroll",
    type: "boolean",
    default: "false",
    description:
      "Follow streamed output while the reader stays at the live edge.",
  },
  {
    prop: "defaultScrollPosition",
    type: '"start" | "end" | "last-anchor"',
    default: '"start"',
    description: "Where a mounted transcript opens.",
  },
  {
    prop: "scrollPreviousItemPeek",
    type: "number",
    description:
      "Pixels of the previous item kept visible above a newly anchored turn.",
  },
  {
    prop: "scrollEdgeThreshold",
    type: "number",
    description: "Distance from an edge that still counts as being at that edge.",
  },
  {
    prop: "scrollMargin",
    type: "number",
    description: "Default scroll margin used by programmatic scroll commands.",
  },
]

export const messageScrollerPropRows = [
  {
    prop: "className",
    type: "string",
    description: "Additional classes for the scroller frame.",
  },
]

export const messageScrollerViewportPropRows = [
  {
    prop: "preserveScrollOnPrepend",
    type: "boolean",
    default: "true",
    description:
      "Keep the visible row stable when earlier messages are prepended.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional classes for the scrollable viewport.",
  },
]

export const messageScrollerContentPropRows = [
  {
    prop: "className",
    type: "string",
    description: "Additional classes for the transcript container.",
  },
  {
    prop: "spacerClassName",
    type: "string",
    description: "Optional classes for the content spacer used by anchoring.",
  },
]

export const messageScrollerItemPropRows = [
  {
    prop: "messageId",
    type: "string",
    description:
      "Stable id for jump targets, visibility tracking, and prepend restore.",
  },
  {
    prop: "scrollAnchor",
    type: "boolean",
    default: "false",
    description: "Mark this row as the start of a turn for anchoring.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional classes for the transcript row.",
  },
]

export const messageScrollerButtonPropRows = [
  {
    prop: "direction",
    type: '"start" | "end"',
    default: '"end"',
    description: "Which edge the button scrolls toward.",
  },
  {
    prop: "behavior",
    type: "ScrollBehavior",
    description: "Native scroll behavior for the button action.",
  },
  {
    prop: "variant",
    type: "Button variant",
    default: '"secondary"',
    description: "Passed through to the Cubix Button render target.",
  },
  {
    prop: "size",
    type: "Button size",
    default: '"icon-sm"',
    description: "Passed through to the Cubix Button render target.",
  },
]
