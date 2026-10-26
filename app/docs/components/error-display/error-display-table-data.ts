import type { TokenTableRow } from "@/components/docs/token-table"

export const propRows = [
  { prop: "variant", type: "warning | destructive", default: "warning", description: "Color tone of the icon and error message. Use destructive for blocking failures." },
  { prop: "title", type: "React.ReactNode", description: "Shown in the card header next to the warning icon." },
  { prop: "errorMessage", type: "string", description: "Raw error string rendered in a tinted message block." },
  { prop: "supportFormParams", type: "SupportFormParams", description: "Typed params for the support form URL (projectRef, orgSlug, category, subject, message, error, sid). The component builds the URL." },
  { prop: "supportBaseUrl", type: "string", description: "Base URL of the support form. Defaults to /support/new." },
  { prop: "supportLabel", type: "React.ReactNode", default: "Contact support (Persian)", description: "Overrides the label of the support button." },
  { prop: "children", type: "React.ReactNode", description: "Troubleshooting content rendered between the error message and the footer." },
  { prop: "icon", type: "React.ReactNode", default: "WarningIcon", description: "Overrides the header icon." },
  { prop: "onRender", type: "() => void", description: "Fired once on mount, for example for telemetry." },
  { prop: "onSupportClick", type: "() => void", description: "Fired when the support button is clicked." },
  { prop: "className", type: "string", description: "Classes for the root Card." },
]

export const errorDisplayTypographyRows: TokenTableRow[] = [
  { element: "Title", token: "text-label font-normal", value: "13px / 18px, 400" },
  { element: "Error message", token: "font-sans text-caption font-normal", value: "12px / 16px, 400" },
  { element: "Troubleshooting content", token: "text-description font-normal", value: "13px / 22px, 400" },
  { element: "Support button label (sm)", token: "text-caption leading-none font-normal", value: "12px / 1, 400" },
]

export const errorDisplayColorRows: TokenTableRow[] = [
  { element: "Card surface", token: "bg-card text-card-foreground", value: "--card", swatch: "--card", swatchOutline: true },
  { element: "Card ring", token: "ring-foreground/10", value: "--foreground / 10%", swatch: "--foreground" },
  { element: "Dividers", token: "border-border", value: "--border", swatch: "--border", swatchOutline: true },
  { element: "Icon", token: "text-destructive", value: "--destructive", swatch: "--destructive" },
  { element: "Error message block", token: "bg-muted text-foreground", value: "--muted / --foreground", swatch: "--muted", swatchOutline: true },
  { element: "Troubleshooting content", token: "text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
  { element: "Footer", token: "bg-muted/50", value: "--muted / 50%", swatch: "--muted", swatchOutline: true },
  { element: "Support button (default)", token: "bg-primary text-primary-foreground", value: "--primary", swatch: "--primary" },
  { element: "Destructive icon box", token: "bg-destructive text-background", value: "--destructive", swatch: "--destructive" },
  { element: "Destructive message", token: "bg-destructive/10 border-destructive/40 text-destructive", value: "--destructive", swatch: "--destructive" },
]
