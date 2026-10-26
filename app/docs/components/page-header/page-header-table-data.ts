import type { TokenTableRow } from "@/components/docs/token-table"

const classNameRow = {
  prop: "className",
  type: "string",
  description: "Additional Tailwind classes merged with the component styles (last one wins).",
}

const divProps = {
  prop: "...props",
  type: "React.ComponentProps<'div'>",
  description: "Native div attributes are forwarded.",
}

export const pageHeaderRows = [
  {
    prop: "size",
    type: '"small" | "default" | "large" | "full"',
    default: '"default"',
    description:
      "Max width of the inner containers: 768px, 1200px, 1600px or none. full also reduces top padding and moves the tabs border to the full width.",
  },
  classNameRow,
  divProps,
]

export const pageHeaderTitleRows = [
  {
    prop: "as",
    type: '"h1" | "h2" | "h3" | "h4" | "h5" | "h6"',
    default: '"h1"',
    description: "Heading element to render. Styling stays the same.",
  },
  classNameRow,
]

export const pageHeaderBreadcrumbRows = [
  {
    prop: "children",
    type: "React.ReactNode",
    description: "A Cubix BreadcrumbList. Wrapped in the sized container.",
  },
  classNameRow,
]

export const pageHeaderDivRows = [classNameRow, divProps]

export const pageHeaderTypographyRows: TokenTableRow[] = [
  { element: "Title", token: "text-title font-medium", value: "15px / 22px, 500" },
  { element: "Description", token: "text-body font-normal", value: "14px / 23px, 400" },
  { element: "Breadcrumb items", token: "text-label font-normal", value: "13px / 18px, 400" },
]

export const pageHeaderColorRows: TokenTableRow[] = [
  { element: "Title", token: "text-foreground", value: "--foreground", swatch: "--foreground" },
  { element: "Description and icon", token: "text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
  { element: "Tabs border", token: "border-border", value: "--border", swatch: "--border", swatchOutline: true },
]
