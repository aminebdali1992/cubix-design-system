import type { TokenTableRow } from "@/components/docs/token-table"

const classNameRow = {
  prop: "className",
  type: "string",
  description: "Additional Tailwind classes merged with the component styles (last one wins).",
}

export const paginationPropRows = [
  {
    prop: "aria-label",
    type: "string",
    default: '"صفحه‌بندی"',
    description: "Accessible name of the navigation landmark.",
  },
  { prop: "dir", type: '"rtl" | "ltr"', default: '"rtl"', description: "Text direction. RTL by default." },
  classNameRow,
]

export const contentPropRows = [classNameRow]

export const itemPropRows = [classNameRow]

export const linkPropRows = [
  { prop: "isActive", type: "boolean", default: "false", description: "Marks the link as the current page (aria-current=\"page\")." },
  { prop: "size", type: '"sm" | "default"', default: '"sm"', description: "32px or 40px square, matching Button sizes." },
  { prop: "disabled", type: "boolean", default: "false", description: "Sets aria-disabled, removes it from the tab order and dims it." },
  { prop: "href", type: "string", description: "Destination URL for the page." },
  classNameRow,
]

export const previousNextPropRows = [
  { prop: "text", type: "React.ReactNode", default: '"قبلی" | "بعدی"', description: "Visible label next to the chevron. Pass null for icon only." },
  { prop: "size", type: '"sm" | "default"', default: '"sm"', description: "Height of the button (32px or 40px)." },
  { prop: "disabled", type: "boolean", default: "false", description: "Disable at the first or last page." },
  { prop: "href", type: "string", description: "Destination URL." },
  classNameRow,
]

export const ellipsisPropRows = [
  { prop: "size", type: '"sm" | "default"', default: '"sm"', description: "Matches the size of the surrounding links." },
  classNameRow,
]

export const paginationTypographyRows: TokenTableRow[] = [
  { element: "Link, sm", token: "text-caption leading-none font-normal", value: "12px / 1, 400" },
  { element: "Link, default", token: "text-label leading-none font-normal", value: "13px / 1, 400" },
]

export const paginationColorRows: TokenTableRow[] = [
  { element: "Link text", token: "text-foreground", value: "--foreground", swatch: "--foreground" },
  { element: "Hover background", token: "hover:bg-muted", value: "--muted", swatch: "--muted", swatchOutline: true },
  { element: "Active background", token: "bg-background", value: "--background", swatch: "--background", swatchOutline: true },
  { element: "Active border", token: "border-border", value: "--border", swatch: "--border" },
  { element: "Ellipsis", token: "text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
  { element: "Focus ring", token: "ring-ring/50", value: "--ring, 50%", swatch: "--ring" },
]
