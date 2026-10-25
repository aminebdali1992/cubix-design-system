import type { TokenTableRow } from "@/components/docs/token-table"

export const badgePropRows = [
  {
    prop: "variant",
    type: '"default" | "secondary" | "destructive" | "outline" | "ghost" | "link" | "dot"',
    default: '"default"',
    description: "The visual style of the badge.",
  },
  {
    prop: "size",
    type: '"default" | "lg"',
    default: '"default"',
    description: "The size of the badge: default is 20px tall, lg is 24px tall.",
  },
  {
    prop: "render",
    type: "React.ReactElement",
    description:
      "Render the badge as another element, such as a link. The badge children are passed to it.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Badge label, optional icon, or spinner.",
  },
]

export const badgeTypographyRows: TokenTableRow[] = [
  { element: "Label (default, lg)", token: "text-caption font-normal leading-none", value: "12px / 1, 400" },
  { element: "Link", token: "text-caption font-normal underline-offset-[6px]", value: "12px / 1, 400" },
]

export const badgeColorRows: TokenTableRow[] = [
  { element: "Default", token: "bg-primary text-primary-foreground", value: "--primary", swatch: "--primary" },
  { element: "Secondary", token: "bg-secondary text-secondary-foreground", value: "--secondary", swatch: "--secondary" },
  { element: "Destructive", token: "bg-destructive/10 text-destructive", value: "--destructive", swatch: "--destructive" },
  { element: "Outline border", token: "border-border text-foreground", value: "--border", swatch: "--border", swatchOutline: true },
  { element: "Ghost / Outline hover", token: "hover:bg-muted hover:text-muted-foreground", value: "--muted", swatch: "--muted", swatchOutline: true },
  { element: "Link", token: "text-primary", value: "--primary", swatch: "--primary" },
  { element: "Dot", token: "bg-primary", value: "--primary", swatch: "--primary" },
  { element: "Focus ring", token: "ring-ring/50", value: "--ring, 3px", swatch: "--ring" },
]