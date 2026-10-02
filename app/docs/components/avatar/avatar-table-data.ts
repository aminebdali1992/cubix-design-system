export const avatarPropRows = [
  {
    prop: "size",
    type: '"sm" | "default" | "lg" | "xl" | "2xl"',
    default: '"default"',
    description: "The size of the avatar: 24, 32, 40, 48 or 64 px.",
  },
  {
    prop: "ring",
    type: "boolean",
    default: "false",
    description: "Draws a 1px border-token ring around the avatar with a 2px gap from the circle.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const imagePropRows = [
  {
    prop: "src",
    type: "string",
    description: "Image URL. When it fails to load, the fallback is shown.",
  },
  {
    prop: "alt",
    type: "string",
    description: "Required accessible name for the person in the image.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const fallbackPropRows = [
  {
    prop: "delay",
    type: "number",
    default: "0",
    description: "Milliseconds to wait before showing the fallback while the image loads.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Usually initials shown when the image is missing.",
  },
]

export const badgePropRows = [
  {
    prop: "render",
    type: "React.ReactElement",
    description:
      "Render the badge as another element, such as a button, for real actions. On Radix, use asChild instead.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Optional icon inside the badge. Empty badges are status dots.",
  },
  {
    prop: "aria-label",
    type: "string",
    description: "Name for a status or action when the badge has no text.",
  },
]

export const groupPropRows = [
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Avatar items, optionally followed by AvatarGroupCount.",
  },
  {
    prop: "aria-label",
    type: "string",
    description: "Name for the group. Required when the group is a set of people.",
  },
]

export const groupCountPropRows = [
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Overflow count text such as +3, or an icon.",
  },
]
