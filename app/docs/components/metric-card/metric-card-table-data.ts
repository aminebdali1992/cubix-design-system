import type { TokenTableRow } from "@/components/docs/token-table"

const classNameRow = {
  prop: "className",
  type: "string",
  description: "Additional Tailwind classes merged with the component styles (last one wins).",
}

export const metricCardRows = [
  {
    prop: "isLoading",
    type: "boolean",
    default: "false",
    description: "Shows skeletons in place of the value, differential and sparkline.",
  },
  {
    prop: "isDisabled",
    type: "boolean",
    default: "false",
    description: "Dims the card. Shared with children through useMetricCard().",
  },
  classNameRow,
  {
    prop: "...props",
    type: "React.ComponentProps<'div'>",
    description: "Native div attributes are forwarded to the Cubix Card root.",
  },
]

export const metricCardHeaderRows = [
  {
    prop: "href",
    type: "string",
    description:
      "Renders a chevron link at the end side. Omit it when the whole card is already a link.",
  },
  {
    prop: "linkTooltip",
    type: "React.ReactNode",
    description: "Tooltip for the chevron. Shows the chevron even without href.",
  },
  {
    prop: "children",
    type: "React.ReactNode",
    description: "Usually MetricCardIcon and MetricCardLabel.",
  },
  classNameRow,
]

export const metricCardLabelRows = [
  {
    prop: "tooltip",
    type: "React.ReactNode",
    description: "Adds a help icon after the label that opens a Cubix Tooltip.",
  },
  classNameRow,
]

export const metricCardContentRows = [
  {
    prop: "orientation",
    type: '"vertical" | "horizontal"',
    default: '"vertical"',
    description: "Stacks the value and differential, or places them on one line.",
  },
  classNameRow,
]

export const metricCardDifferentialRows = [
  {
    prop: "variant",
    type: '"default" | "positive" | "negative"',
    default: '"default"',
    description: "Colors the change: success for positive, destructive for negative.",
  },
  classNameRow,
]

export const metricCardSparklineRows = [
  {
    prop: "data",
    type: "Array<{ value: number; [key: string]: unknown }>",
    description: "Points to plot. Add a timestamp to show the date in the tooltip. Renders nothing when empty.",
  },
  {
    prop: "dataKey",
    type: "string",
    default: '"value"',
    description: "Key of the plotted value in each point.",
  },
  classNameRow,
]

export const metricCardSimpleRows = [classNameRow]

export const metricCardTypographyRows: TokenTableRow[] = [
  { element: "Label", token: "text-label font-normal", value: "13px / 18px, 400" },
  { element: "Value", token: "text-xl font-normal tabular-nums", value: "20px, 400" },
  { element: "Differential", token: "text-label font-normal tabular-nums", value: "13px / 18px, 400" },
  { element: "Sparkline tooltip", token: "text-label font-normal", value: "13px / 18px, 400" },
]

export const metricCardColorRows: TokenTableRow[] = [
  { element: "Background", token: "bg-card", value: "--card", swatch: "--card", swatchOutline: true },
  { element: "Background (hover)", token: "hover:bg-muted/40", value: "--muted", swatch: "--muted", swatchOutline: true },
  { element: "Border", token: "border-border", value: "--border", swatch: "--border", swatchOutline: true },
  { element: "Label, icon and chevron", token: "text-muted-foreground", value: "--muted-foreground", swatch: "--muted-foreground" },
  { element: "Value", token: "text-foreground", value: "--foreground", swatch: "--foreground" },
  { element: "Positive differential", token: "text-success-text", value: "--success-text", swatch: "--success-text" },
  { element: "Negative differential", token: "text-destructive", value: "--destructive", swatch: "--destructive" },
  { element: "Sparkline stroke and fill", token: "var(--primary)", value: "--primary", swatch: "--primary" },
  { element: "Skeleton", token: "bg-muted", value: "--muted", swatch: "--muted", swatchOutline: true },
]
