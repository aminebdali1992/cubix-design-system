import type { TokenTableRow } from "@/components/docs/token-table"

const classNameRow = {
  prop: "className",
  type: "string",
  description: "Additional Tailwind classes merged with the component styles (last one wins).",
}

export const pageSectionRows = [
  {
    prop: "orientation",
    type: '"vertical" | "horizontal"',
    default: '"vertical"',
    description:
      "vertical stacks meta and content. horizontal puts the summary beside the content (1fr / 2fr) once the container reaches @3xl.",
  },
  classNameRow,
  {
    prop: "...props",
    type: "React.ComponentProps<'div'>",
    description: "Native div attributes are forwarded to the root.",
  },
]

export const pageSectionMetaRows = [
  {
    prop: "children",
    type: "React.ReactNode",
    description:
      "PageSectionSummary (flex-1) and an optional PageSectionAside (shrink-0). Wrapped in an @container so it switches to a row at @xl.",
  },
  classNameRow,
]

export const pageSectionTitleRows = [
  {
    prop: "...props",
    type: "React.ComponentProps<'h2'>",
    description: "Renders an h2. Pass a different level through className only for styling; keep the heading order valid.",
  },
  classNameRow,
]

export const pageSectionDivRows = [
  classNameRow,
  {
    prop: "...props",
    type: "React.ComponentProps<'div'>",
    description: "Native div attributes are forwarded.",
  },
]

export const pageSectionTypographyRows: TokenTableRow[] = [
  { element: "Title", token: "text-base font-medium", value: "16px, 500" },
  { element: "Description", token: "text-label font-normal", value: "13px / 18px, 400" },
]

export const pageSectionColorRows: TokenTableRow[] = [
  { element: "Title", token: "text-foreground", value: "--foreground", swatch: "--foreground" },
  { element: "Description", token: "text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
  { element: "Content card border", token: "border-border", value: "--border", swatch: "--border", swatchOutline: true },
]
