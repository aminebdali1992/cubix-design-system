export const chartContainerPropRows = [
  {
    prop: "config",
    type: "ChartConfig",
    description:
      "Maps data keys to a label, icon, and color or theme. Decoupled from chart data.",
  },
  {
    prop: "children",
    type: "ResponsiveContainer children",
    description: "One Recharts chart, such as BarChart, LineChart, or PieChart.",
  },
  {
    prop: "className",
    type: "string",
    description:
      "Additional Tailwind classes merged with the component styles (last one wins).",
  },
]

export const chartTooltipContentPropRows = [
  {
    prop: "indicator",
    type: '"dot" | "line" | "dashed"',
    default: '"dot"',
    description: "Shape of the color indicator next to each tooltip row.",
  },
  {
    prop: "hideLabel",
    type: "boolean",
    default: "false",
    description: "Hide the tooltip label.",
  },
  {
    prop: "hideIndicator",
    type: "boolean",
    default: "false",
    description: "Hide the color indicator.",
  },
  {
    prop: "labelKey",
    type: "string",
    description: "The config or data key to use for the label.",
  },
  {
    prop: "nameKey",
    type: "string",
    description: "The config or data key to use for the name.",
  },
]

export const chartLegendContentPropRows = [
  {
    prop: "hideIcon",
    type: "boolean",
    default: "false",
    description: "Hide the icon or color swatch for each legend item.",
  },
  {
    prop: "nameKey",
    type: "string",
    description: "The config or data key to use for the legend names.",
  },
]
