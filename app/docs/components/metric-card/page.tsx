import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import { TokenTable } from "@/components/docs/token-table"
import {
  extractDemoImports,
  extractDemoJsx,
  readDocsExampleSource,
} from "@/lib/docs/example-source"
import {
  metricCardColorRows,
  metricCardContentRows,
  metricCardDifferentialRows,
  metricCardHeaderRows,
  metricCardLabelRows,
  metricCardRows,
  metricCardSimpleRows,
  metricCardSparklineRows,
  metricCardTypographyRows,
} from "./metric-card-table-data"
import { MetricCardDemo } from "./examples/metric-card-demo"
import { MetricCardIconDemo } from "./examples/metric-card-icon-demo"
import { MetricCardMinimalDemo } from "./examples/metric-card-minimal-demo"
import { MetricCardMinimalHorizontalDemo } from "./examples/metric-card-minimal-horizontal-demo"

const description = "A card to display pull-out metrics at a glance."

export const metadata: Metadata = {
  title: "Metric Card",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/metric-card"
const EXAMPLES_DIR = "app/docs/components/metric-card/examples"

function loadExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `MetricCard
├── MetricCardHeader
│   ├── MetricCardIcon
│   └── MetricCardLabel
├── MetricCardContent
│   ├── MetricCardValue
│   └── MetricCardDifferential
└── MetricCardSparkline`

function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex w-full justify-center">
      {children}
    </div>
  )
}

function ExampleSection({
  title,
  description,
  code,
  children,
}: {
  title: string
  description: ReactNode
  code: string
  children: ReactNode
}) {
  return (
    <div className="space-y-4">
      <h3 className="scroll-m-20 font-semibold tracking-tight">{title}</h3>
      <p className="leading-relaxed text-muted-foreground">{description}</p>
      <ComponentPreview code={code}>
        <PreviewShell>{children}</PreviewShell>
      </ComponentPreview>
    </div>
  )
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-sm">{children}</code>
}

export default function MetricCardPage() {
  const demoSource = loadExample("metric-card-demo.tsx")
  const minimalSource = loadExample("metric-card-minimal-demo.tsx")
  const horizontalSource = loadExample("metric-card-minimal-horizontal-demo.tsx")
  const iconSource = loadExample("metric-card-icon-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Metric Card" description={description} slug="metric-card" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <MetricCardDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="metric-card" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          <Code>MetricCard</Code> wraps the Cubix Card and shares <Code>isLoading</Code> with its
          parts: <Code>MetricCardValue</Code>, <Code>MetricCardDifferential</Code> and{" "}
          <Code>MetricCardSparkline</Code> switch to Cubix Skeletons while loading. Format numbers
          with <Code>toLocaleString(&quot;fa-IR&quot;)</Code> for Persian digits.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          The label tooltip opens from a focusable help button with{" "}
          <Code>aria-label=&quot;اطلاعات بیشتر&quot;</Code>, so it works with the keyboard and
          screen readers. The header chevron is a real link with a visually hidden label, and it
          mirrors in RTL. The value uses <Code>tabular-nums</Code> so digits do not shift. The
          sparkline is decorative; put the key number in <Code>MetricCardValue</Code> rather than
          relying on the chart.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Minimal"
          description="Label, value and differential only."
          code={minimalSource}
        >
          <MetricCardMinimalDemo />
        </ExampleSection>

        <ExampleSection
          title="Minimal horizontal"
          description={
            <>
              Pass <Code>orientation=&quot;horizontal&quot;</Code> to put the value and differential
              on one line.
            </>
          }
          code={horizontalSource}
        >
          <MetricCardMinimalHorizontalDemo />
        </ExampleSection>

        <ExampleSection
          title="With icon, link and tooltip"
          description={
            <>
              Add <Code>MetricCardIcon</Code> before the label, a <Code>tooltip</Code> on the label,
              an <Code>href</Code> on the header and a sparkline at the bottom.
            </>
          }
          code={iconSource}
        >
          <MetricCardIconDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Parts render{" "}
            <Code>data-slot=&quot;metric-card-*&quot;</Code> attributes for targeting in tests and
            parent selectors. Read the shared state in custom parts with{" "}
            <Code>useMetricCard()</Code>. Use the same props on Base UI, React Aria, and Radix.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">MetricCard</h3>
        <PropsTable data={metricCardRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">MetricCardHeader</h3>
        <PropsTable data={metricCardHeaderRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">MetricCardIcon</h3>
        <PropsTable data={metricCardSimpleRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">MetricCardLabel</h3>
        <PropsTable data={metricCardLabelRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">MetricCardContent</h3>
        <PropsTable data={metricCardContentRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">MetricCardValue</h3>
        <PropsTable data={metricCardSimpleRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">MetricCardDifferential</h3>
        <PropsTable data={metricCardDifferentialRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">MetricCardSparkline</h3>
        <PropsTable data={metricCardSparklineRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Typography</h3>
        <TokenTable data={metricCardTypographyRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Colors</h3>
        <TokenTable data={metricCardColorRows} />
      </section>
    </article>
  )
}
