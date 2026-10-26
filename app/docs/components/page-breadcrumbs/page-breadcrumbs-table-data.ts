import type { TokenTableRow } from "@/components/docs/token-table"

export const propRows = [
  { prop: "actions", type: "React.ReactNode", description: "Content at the end of the row, usually a PageBreadcrumbsActions with buttons. Sits on the left in RTL." },
  { prop: "children", type: "React.ReactNode", description: "A BreadcrumbList with items, separators and the current page." },
  { prop: "className", type: "string", description: "Classes for the inner Breadcrumb nav." },
  { prop: "containerClassName", type: "string", description: "Classes for the full-width bordered row." },
  { prop: "slotClassName", type: "string", description: "Classes for the outer wrapper." },
  { prop: "aria-label", type: "string", default: "'مسیر'", description: "Accessible name of the navigation landmark, inherited from Breadcrumb." },
]

export const actionsPropRows = [
  { prop: "className", type: "string", description: "Classes for the actions group. It pushes itself to the end of the row with ms-auto." },
  { prop: "children", type: "React.ReactNode", description: "Buttons or other controls for the page." },
]

export const pageBreadcrumbsTypographyRows: TokenTableRow[] = [
  { element: "Breadcrumb link and separator", token: "text-label leading-none font-normal", value: "13px / 13px, 400" },
  { element: "Current page", token: "text-label leading-none font-normal", value: "13px / 13px, 400" },
  { element: "Action button label (sm)", token: "text-caption leading-none font-normal", value: "12px / 1, 400" },
]

export const pageBreadcrumbsColorRows: TokenTableRow[] = [
  { element: "Bottom border", token: "border-border", value: "--border", swatch: "--border", swatchOutline: true },
  { element: "Breadcrumb link and separator", token: "text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
  { element: "Link hover and current page", token: "text-foreground", value: "--foreground", swatch: "--foreground" },
  { element: "Primary action", token: "bg-primary text-primary-foreground", value: "--primary", swatch: "--primary" },
  { element: "Outline action", token: "border-border bg-background hover:bg-muted", value: "--border / --background", swatch: "--border", swatchOutline: true },
  { element: "Focus ring", token: "ring-ring/50", value: "--ring / 50%", swatch: "--ring" },
]
