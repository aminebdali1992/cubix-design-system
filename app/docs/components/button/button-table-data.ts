import type { TokenTableRow } from "@/components/docs/token-table"

export const propRows = [
  {
    prop: "variant",
    type: '"default" | "secondary" | "gray" | "destructive" | "warning" | "success" | "destructive-secondary" | "outline" | "ghost" | "link"',
    default: '"default"',
    description: "The visual style of the button.",
  },
  {
    prop: "size",
    type: '"default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"',
    default: '"default"',
    description: "The size of the button.",
  },
  {
    prop: "render",
    type: "React.ReactElement",
    description:
      "Render the button as another element, such as a Next.js Link. The button children are passed to it.",
  },
  {
    prop: "nativeButton",
    type: "boolean",
    default: "true",
    description:
      "Base UI: set to false when render points at a non-button host such as a Link. Accepted and ignored on React Aria and Radix so paste-ready code stays shared.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the button and prevents interaction.",
  },
  {
    prop: "type",
    type: '"button" | "submit" | "reset"',
    default: '"button"',
    description: "Native button type. Defaults to button so it does not submit enclosing forms.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const variantRows = [
  {
    prop: "default",
    type: "-",
    description: "Solid primary button. The main call-to-action style.",
  },
  {
    prop: "secondary",
    type: "-",
    description: "Soft primary tint for secondary actions that stay on-brand.",
  },
  {
    prop: "gray",
    type: "-",
    description: "Neutral gray fill for low-emphasis actions.",
  },
  {
    prop: "destructive",
    type: "-",
    description: "Solid danger fill for irreversible actions.",
  },
  {
    prop: "warning",
    type: "-",
    description: "Solid warning fill for actions that need caution.",
  },
  {
    prop: "success",
    type: "-",
    description: "Solid success fill for positive, confirming actions.",
  },
  {
    prop: "destructive-secondary",
    type: "-",
    description: "Soft danger tint for secondary destructive actions.",
  },
  {
    prop: "outline",
    type: "-",
    description: "Bordered button that pairs well with gray or ghost buttons.",
  },
  {
    prop: "ghost",
    type: "-",
    description: "No background until hover. Ideal for toolbars and menus.",
  },
  {
    prop: "link",
    type: "-",
    description: "Looks like a link but behaves like a button.",
  },
]

export const sizeRows = [
  {
    prop: "xs",
    type: "28px",
    description: "Extra-compact control for dense chrome.",
  },
  {
    prop: "sm",
    type: "32px",
    description: "Compact button for dense UIs.",
  },
  {
    prop: "default",
    type: "40px",
    description: "Standard height button.",
  },
  {
    prop: "lg",
    type: "48px",
    description: "Large button for prominent actions.",
  },
  {
    prop: "icon-xs",
    type: "28px",
    description: "Extra-small square button for icon-only actions.",
  },
  {
    prop: "icon-sm",
    type: "32px",
    description: "Small square button for icon-only actions.",
  },
  {
    prop: "icon",
    type: "40px",
    description: "Square button for icon-only actions.",
  },
  {
    prop: "icon-lg",
    type: "48px",
    description: "Large square button for icon-only actions.",
  },
]

export const buttonTypographyRows: TokenTableRow[] = [
  { element: "Label (xs, sm)", token: "text-caption leading-none font-normal", value: "12px / 1, 400" },
  { element: "Label (default)", token: "text-label leading-none font-normal", value: "13px / 1, 400" },
  { element: "Label (lg)", token: "text-description leading-none font-normal", value: "13px / 1, 400" },
  { element: "Link", token: "text-label font-normal underline-offset-[6px]", value: "13px / 1, 400" },
]

export const buttonColorRows: TokenTableRow[] = [
  { element: "Default", token: "bg-primary text-primary-foreground", value: "--primary", swatch: "--primary" },
  { element: "Default hover", token: "color-mix(--primary, black 10%)", value: "--primary + 10% black", swatch: "--primary" },
  { element: "Secondary", token: "bg-primary/10 text-primary", value: "--primary / 10%", swatch: "--primary" },
  { element: "Gray", token: "bg-secondary text-secondary-foreground", value: "--secondary", swatch: "--secondary", swatchOutline: true },
  { element: "Destructive", token: "bg-destructive text-destructive-foreground", value: "--destructive", swatch: "--destructive" },
  { element: "Warning", token: "bg-warning text-warning-foreground", value: "--warning", swatch: "--warning" },
  { element: "Success", token: "bg-success text-success-foreground", value: "--success", swatch: "--success" },
  { element: "Destructive secondary", token: "bg-destructive/10 text-destructive", value: "--destructive / 10%", swatch: "--destructive" },
  { element: "Outline", token: "border-border bg-background hover:bg-muted", value: "--border / --background", swatch: "--border", swatchOutline: true },
  { element: "Ghost hover", token: "hover:bg-muted hover:text-foreground", value: "--muted", swatch: "--muted", swatchOutline: true },
  { element: "Link", token: "text-primary", value: "--primary", swatch: "--primary" },
  { element: "Focus ring", token: "focus-visible:ring-primary/20", value: "--primary / 20%", swatch: "--primary" },
  { element: "Invalid", token: "aria-invalid:border-destructive ring-destructive/20", value: "--destructive", swatch: "--destructive" },
]