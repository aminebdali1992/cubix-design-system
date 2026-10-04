export const attachmentPropRows = [
  {
    prop: "state",
    type: '"idle" | "uploading" | "processing" | "error" | "done"',
    default: '"done"',
    description: "Upload lifecycle. Drives border, color, and the title shimmer.",
  },
  {
    prop: "size",
    type: '"default" | "sm" | "xs"',
    default: '"default"',
    description: "Attachment size.",
  },
  {
    prop: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: "Lay the media beside or above the content.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the root styles (last one wins).",
  },
]

export const attachmentMediaPropRows = [
  {
    prop: "variant",
    type: '"icon" | "image"',
    default: '"icon"',
    description: "Whether the media holds an icon or an image.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the media styles (last one wins).",
  },
]

export const classNameOnlyRows = [
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const attachmentActionPropRows = [
  {
    prop: "variant",
    type: '"default" | "foreground" | "secondary" | "gray" | "destructive" | "destructive-secondary" | "outline" | "ghost" | "link"',
    default: '"ghost"',
    description: "Visual style of the action button.",
  },
  {
    prop: "size",
    type: "Button size",
    default: '"icon-xs"',
    description: "Size of the action button.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the button styles (last one wins).",
  },
]

export const attachmentTriggerPropRows = [
  {
    prop: "render",
    type: "React.ReactElement",
    description: "Render the trigger as another element, such as a link.",
  },
  {
    prop: "...props",
    type: "React.ComponentProps<'button'>",
    description: "Native button attributes, including aria-label.",
  },
]
