import type { TokenTableRow } from "@/components/docs/token-table"

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
    type: '"default" | "secondary" | "gray" | "destructive" | "destructive-secondary" | "outline" | "ghost" | "link"',
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

export const attachmentTypographyRows: TokenTableRow[] = [
  { element: "Title (default)", token: "text-description font-medium leading-tight", value: "13px / 1.25, 500" },
  { element: "Title (sm, xs)", token: "text-caption font-medium leading-tight", value: "12px / 1.25, 500" },
  { element: "Description", token: "text-caption", value: "12px / 16px, 400" },
]

export const attachmentColorRows: TokenTableRow[] = [
  { element: "Background", token: "bg-card", value: "--card", swatch: "--card", swatchOutline: true },
  { element: "Title", token: "text-card-foreground", value: "--card-foreground", swatch: "--card-foreground" },
  { element: "Description", token: "text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
  { element: "Border", token: "border-border", value: "--border", swatch: "--border", swatchOutline: true },
  { element: "Media background", token: "bg-muted", value: "--muted", swatch: "--muted", swatchOutline: true },
  { element: "Media icon", token: "text-foreground", value: "--foreground", swatch: "--foreground" },
  { element: "Hover background", token: "hover:bg-muted/50", value: "--muted, 50%", swatch: "--muted", swatchOutline: true },
  { element: "Focus ring", token: "ring-secondary", value: "--secondary, 3px", swatch: "--secondary", swatchOutline: true },
  { element: "Error border", token: "border-destructive/30", value: "--destructive, 30%" },
  { element: "Error media background", token: "bg-destructive/10", value: "--destructive, 10%" },
  { element: "Error media icon", token: "text-destructive", value: "--destructive", swatch: "--destructive" },
  { element: "Error description", token: "text-destructive/80", value: "--destructive, 80%", swatch: "--destructive" },
]
