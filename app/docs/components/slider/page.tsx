import type { Metadata } from "next"
import type { ReactNode } from "react"

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
import { SliderControlledDemo } from "./examples/slider-controlled-demo"
import { SliderDemo } from "./examples/slider-demo"
import { SliderDisabledDemo } from "./examples/slider-disabled-demo"
import { SliderMultipleDemo } from "./examples/slider-multiple-demo"
import { SliderRangeDemo } from "./examples/slider-range-demo"
import { SliderVerticalDemo } from "./examples/slider-vertical-demo"
import { sliderColorRows, sliderPropRows, sliderTypographyRows } from "./slider-table-data"

const description = "An input where the user selects a value from within a given range."

export const metadata: Metadata = {
  title: "Slider",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/slider"
const EXAMPLES_DIR = "app/docs/components/slider/examples"

function loadSliderExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

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
  previewClassName = "min-h-32",
  children,
}: {
  title: string
  description: ReactNode
  code: string
  previewClassName?: string
  children: ReactNode
}) {
  return (
    <div className="space-y-4">
      <h3 className="scroll-m-20 font-semibold tracking-tight">{title}</h3>
      <p className="leading-relaxed text-muted-foreground">{description}</p>
      <ComponentPreview code={code} previewClassName={previewClassName}>
        <PreviewShell>{children}</PreviewShell>
      </ComponentPreview>
    </div>
  )
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-sm">{children}</code>
}

export default function SliderDocsPage() {
  const demoSource = loadSliderExample("slider-demo.tsx")

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Slider" description={description} slug="slider" />

      <ComponentPreview code={demoSource} previewClassName="min-h-32">
        <PreviewShell>
          <SliderDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="slider" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={extractDemoImports(demoSource)} title="Import" />
        <CodeBlock code={extractDemoJsx(demoSource)} title="Example" />
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Range"
          description="Use an array with two values for a range slider."
          code={loadSliderExample("slider-range-demo.tsx")}
        >
          <SliderRangeDemo />
        </ExampleSection>

        <ExampleSection
          title="Multiple thumbs"
          description="Use an array with multiple values for multiple thumbs."
          code={loadSliderExample("slider-multiple-demo.tsx")}
        >
          <SliderMultipleDemo />
        </ExampleSection>

        <ExampleSection
          title="Vertical"
          description={
            <>
              Use <Code>orientation=&quot;vertical&quot;</Code> for a vertical slider.
            </>
          }
          code={loadSliderExample("slider-vertical-demo.tsx")}
          previewClassName="min-h-52"
        >
          <SliderVerticalDemo />
        </ExampleSection>

        <ExampleSection
          title="Controlled"
          description="Drive the value from state and show it with Persian digits."
          code={loadSliderExample("slider-controlled-demo.tsx")}
        >
          <SliderControlledDemo />
        </ExampleSection>

        <ExampleSection
          title="Disabled"
          description={
            <>
              Use the <Code>disabled</Code> prop to disable the slider.
            </>
          }
          code={loadSliderExample("slider-disabled-demo.tsx")}
        >
          <SliderDisabledDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Slider</h3>
        <PropsTable data={sliderPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Typography</h3>
        <TokenTable data={sliderTypographyRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Colors</h3>
        <TokenTable data={sliderColorRows} />
      </section>
    </article>
  )
}