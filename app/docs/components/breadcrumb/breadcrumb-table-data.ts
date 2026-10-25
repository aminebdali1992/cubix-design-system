import type { TokenTableRow } from "@/components/docs/token-table"

export const breadcrumbPropRows = [
  {
    prop: "aria-label",
    type: "string",
    default: '"مسیر"',
    description: "Accessible name for the navigation landmark.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Usually a BreadcrumbList of items, separators, and the page.",
  },
]

export const listPropRows = [
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const itemPropRows = [
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const linkPropRows = [
  {
    prop: "href",
    type: "string",
    description: "Destination for the default anchor. Ignored when render is set.",
  },
  {
    prop: "render",
    type: "React.ReactElement",
    description:
      "Base UI / React Aria: render the link as another element, such as a Next.js Link.",
  },
  {
    prop: "asChild",
    type: "boolean",
    description: "Radix: merge props onto the child element instead of rendering an anchor.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const pagePropRows = [
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "The current page label. Not a link.",
  },
]

export const separatorPropRows = [
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Custom separator. Defaults to a chevron when omitted.",
  },
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const ellipsisPropRows = [
  {
    prop: "className",
    type: "string",
    description: "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const breadcrumbTypographyRows: TokenTableRow[] = [
  { element: "List (links, separator)", token: "text-label leading-none", value: "13px / 1, 400" },
  { element: "Link", token: "text-label leading-none", value: "13px / 1, 400" },
  { element: "Page (current)", token: "text-label leading-none font-normal", value: "13px / 1, 400" },
]

export const breadcrumbColorRows: TokenTableRow[] = [
  { element: "Link / separator", token: "text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
  { element: "Link hover / focus", token: "hover:text-foreground", value: "--foreground", swatch: "--foreground" },
  { element: "Page (current)", token: "text-foreground", value: "--foreground", swatch: "--foreground" },
  { element: "Focus ring", token: "focus-visible:ring-ring/50", value: "--ring / 50%", swatch: "--ring" },
]