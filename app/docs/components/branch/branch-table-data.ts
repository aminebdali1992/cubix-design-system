import type { TokenTableRow } from "@/components/docs/token-table"

export const branchPropRows = [
  {
    prop: "branch",
    type: "number",
    description: "Controlled branch index. Pair with onBranchChange.",
  },
  {
    prop: "defaultBranch",
    type: "number",
    default: "0",
    description: "Initial branch index when uncontrolled.",
  },
  {
    prop: "onBranchChange",
    type: "(branchIndex: number) => void",
    description: "Called when the active branch changes.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const branchContentPropRows = [
  {
    prop: "children",
    type: "React.ReactNode",
    description: "One child per reply branch. Only the active branch is shown.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const branchSelectorPropRows = [
  {
    prop: "force",
    type: "boolean",
    default: "false",
    description:
      "Always render the selector, even when there is only one branch.",
  },
  {
    prop: "aria-label",
    type: "string",
    default: '"نسخه‌های پاسخ"',
    description: "Accessible name for the selector group.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const branchPreviousPropRows = [
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Optional custom icon or label. Defaults to a chevron.",
  },
  {
    prop: "aria-label",
    type: "string",
    default: '"نسخه قبلی" / "نسخه بعدی"',
    description: "Accessible name for the previous or next control.",
  },
]

export const branchPagePropRows = [
  {
    prop: "children",
    type: "React.ReactNode",
    description: 'Optional custom label. Defaults to "۱ از ۳" style paging.',
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const useBranchRows = [
  {
    prop: "currentBranch",
    type: "number",
    description: "Active branch index (0-based).",
  },
  {
    prop: "totalBranches",
    type: "number",
    description: "Number of children registered by BranchContent.",
  },
  {
    prop: "goToPrevious",
    type: "() => void",
    description: "Cycle to the previous branch, wrapping at the start.",
  },
  {
    prop: "goToNext",
    type: "() => void",
    description: "Cycle to the next branch, wrapping at the end.",
  },
]

export const branchTypographyRows: TokenTableRow[] = [
  { element: "Page label", token: "text-caption font-normal tabular-nums", value: "12px, 400" },
]

export const branchColorRows: TokenTableRow[] = [
  { element: "Selector background", token: "bg-muted/40", value: "--muted", swatch: "--muted" },
  { element: "Selector border", token: "border-border", value: "--border", swatch: "--border", swatchOutline: true },
  { element: "Chevron / page label", token: "text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
  { element: "Chevron hover", token: "hover:bg-background hover:text-foreground", value: "--background / --foreground", swatch: "--foreground" },
]
