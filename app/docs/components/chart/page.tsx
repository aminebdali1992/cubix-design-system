import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  ChartAreaDemo,
  ChartBarDemo,
  ChartLineDemo,
  ChartPieDemo,
  ChartRadialDemo,
  ChartTooltipIndicatorsDemo,
} from "@/components/examples/chart-examples"
import {
  chartContainerPropRows,
  chartLegendContentPropRows,
  chartTooltipContentPropRows,
} from "./chart-table-data"

export const metadata: Metadata = {
  title: "Chart",
  description: "Beautiful charts built using Recharts.",
}

const usageImport = `import { Bar, BarChart } from "recharts"

import { ChartContainer, ChartTooltipContent } from "@/components/cubix/chart"`

const usageSnippet = `<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
  <BarChart data={chartData}>
    <Bar dataKey="value" />
    <ChartTooltip content={<ChartTooltipContent />} />
  </BarChart>
</ChartContainer>`

const dataSnippet = `const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]`

const configSnippet = `import { type ChartConfig } from "@/components/cubix/chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig`

const themingSnippet = `@layer base {
  :root {
    --chart-1: oklch(0.646 0.222 41.116);
    --chart-2: oklch(0.6 0.118 184.704);
  }

  .dark {
    --chart-1: oklch(0.488 0.243 264.376);
    --chart-2: oklch(0.696 0.17 162.48);
  }
}`

const usingColorsSnippet = `<Bar dataKey="desktop" fill="var(--color-desktop)" />`

const tooltipSnippet = `<ChartTooltip content={<ChartTooltipContent />} />`

const legendSnippet = `<ChartLegend content={<ChartLegendContent />} />`

const customTooltipSnippet = `const chartConfig = {
  visitors: {
    label: "Total Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig`

const compositionSnippet = `ChartContainer
├── ChartStyle
├── <Recharts chart>
│   ├── ChartTooltip
│   │   └── ChartTooltipContent
│   └── ChartLegend
│       └── ChartLegendContent`

export default function ChartDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Chart"
        description="Beautiful charts built using Recharts."
        slug="chart"
      />

      <ComponentPreview code={usageSnippet}>
        <ChartBarDemo />
      </ComponentPreview>

      <ComponentInstall name="chart" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">About</h2>
        <p className="leading-relaxed text-muted-foreground">
          Chart is a collection of composable helpers built on top of
          Recharts. We do not wrap Recharts, so you are never locked into an
          abstraction. The <code className="font-mono text-sm">chart</code>{" "}
          components only add theming, tooltips, and legends on top of the
          Recharts primitives you already know.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Composition
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Build your chart from Recharts components and only bring in the{" "}
          <code className="font-mono text-sm">chart</code> helpers where you
          need them:
        </p>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Your First Chart
        </h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Data</h3>
          <p className="leading-relaxed text-muted-foreground">
            Your data can be in any shape. Use the{" "}
            <code className="font-mono text-sm">dataKey</code> prop to map it
            to the chart.
          </p>
          <CodeBlock code={dataSnippet} />
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Chart Config
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            The chart config holds labels, icons, and color tokens. It is
            intentionally decoupled from chart data.
          </p>
          <CodeBlock code={configSnippet} />
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Bar Chart
          </h3>
          <ComponentPreview code={usageSnippet}>
            <ChartBarDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Line Chart
          </h3>
          <ComponentPreview code={usageSnippet}>
            <ChartLineDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Area Chart
          </h3>
          <ComponentPreview code={usageSnippet}>
            <ChartAreaDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Pie Chart
          </h3>
          <ComponentPreview code={usageSnippet}>
            <ChartPieDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Radial Chart
          </h3>
          <ComponentPreview code={usageSnippet}>
            <ChartRadialDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Tooltip Indicators
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Use the <code className="font-mono text-sm">indicator</code> prop
            on <code className="font-mono text-sm">ChartTooltipContent</code>{" "}
            to switch between dot, line, and dashed styles.
          </p>
          <CodeBlock code={tooltipSnippet} />
          <ComponentPreview code={tooltipSnippet}>
            <ChartTooltipIndicatorsDemo />
          </ComponentPreview>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Theming</h2>
        <p className="leading-relaxed text-muted-foreground">
          Charts have built-in support for theming. Define your colors as CSS
          variables (recommended) or use hex, hsl, or oklch values directly.
        </p>
        <CodeBlock code={themingSnippet} title="app/globals.css" />
        <p className="leading-relaxed text-muted-foreground">
          Reference theme colors in your components using{" "}
          <code className="font-mono text-sm">var(--color-KEY)</code>:
        </p>
        <CodeBlock code={usingColorsSnippet} />
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Tooltip</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use <code className="font-mono text-sm">ChartTooltip</code> and{" "}
          <code className="font-mono text-sm">ChartTooltipContent</code> to
          add a themed tooltip.
        </p>
        <CodeBlock code={tooltipSnippet} />
        <p className="leading-relaxed text-muted-foreground">
          Use <code className="font-mono text-sm">labelKey</code> and{" "}
          <code className="font-mono text-sm">nameKey</code> to use a custom
          key for the tooltip label and name:
        </p>
        <CodeBlock code={customTooltipSnippet} />
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Legend</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use <code className="font-mono text-sm">ChartLegend</code> and{" "}
          <code className="font-mono text-sm">ChartLegendContent</code> to
          add a themed legend.
        </p>
        <CodeBlock code={legendSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Accessibility
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Turn on the <code className="font-mono text-sm">accessibilityLayer</code>{" "}
          prop on any Recharts chart to add keyboard access and screen
          reader support.
        </p>
      </section>

      <section id="api-reference" className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            ChartContainer
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Wraps a Recharts{" "}
            <code className="font-mono text-sm">ResponsiveContainer</code>{" "}
            and provides the chart config through context.
          </p>
          <PropsTable data={chartContainerPropRows} />
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            ChartTooltipContent
          </h3>
          <PropsTable data={chartTooltipContentPropRows} />
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            ChartLegendContent
          </h3>
          <PropsTable data={chartLegendContentPropRows} />
        </div>
      </section>
    </article>
  )
}
