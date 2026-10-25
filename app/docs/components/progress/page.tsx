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
import { ProgressControlledDemo } from "./examples/progress-controlled-demo"
import { ProgressDemo } from "./examples/progress-demo"
import { ProgressFileUploadDemo } from "./examples/progress-file-upload-demo"
import { ProgressLabelDemo } from "./examples/progress-label-demo"
import { ProgressValuesDemo } from "./examples/progress-values-demo"
import {
  indicatorPropRows,
  labelPropRows,
  progressColorRows,
  progressPropRows,
  progressTypographyRows,
  trackPropRows,
  valuePropRows,
} from "./progress-table-data"

const description = "Displays an indicator showing the completion progress of a task."

export const metadata: Metadata = {
  title: "Progress",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/progress"
const EXAMPLES_DIR = "app/docs/components/progress/examples"

function loadProgressExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `Progress
├── ProgressLabel
├── ProgressValue
└── ProgressTrack
    └── ProgressIndicator`

/*
  Persian labels need lang="fa" so the IRANSans Cubix faces apply. Docs
  chrome only - not part of the paste-ready example source.
*/
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
  previewClassName,
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

export default function ProgressDocsPage() {
  const demoSource = loadProgressExample("progress-demo.tsx")
  const valuesSource = loadProgressExample("progress-values-demo.tsx")
  const labelSource = loadProgressExample("progress-label-demo.tsx")
  const controlledSource = loadProgressExample("progress-controlled-demo.tsx")
  const fileUploadSource = loadProgressExample("progress-file-upload-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Progress" description={description} slug="progress" />

      <ComponentPreview code={demoSource} previewClassName="min-h-32">
        <PreviewShell>
          <ProgressDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="progress" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Add <Code>ProgressLabel</Code> and <Code>ProgressValue</Code> as children to show a
          label and the current percentage. The indicator fills from the right in right-to-left
          layouts.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Values"
          description="Pass a number from 0 to 100 to value."
          code={valuesSource}
          previewClassName="min-h-40"
        >
          <ProgressValuesDemo />
        </ExampleSection>

        <ExampleSection
          title="Label"
          description={
            <>
              <Code>ProgressLabel</Code> names the bar for screen readers and{" "}
              <Code>ProgressValue</Code> shows the percentage at the end of the row.
            </>
          }
          code={labelSource}
        >
          <ProgressLabelDemo />
        </ExampleSection>

        <ExampleSection
          title="Controlled"
          description="Drive the value from state, here with a Cubix Slider."
          code={controlledSource}
        >
          <ProgressControlledDemo />
        </ExampleSection>

        <ExampleSection
          title="File upload list"
          description="A compact bar per file next to its name and remaining time."
          code={fileUploadSource}
          previewClassName="min-h-48"
        >
          <ProgressFileUploadDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Progress</h3>
        <PropsTable data={progressPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">ProgressLabel</h3>
        <PropsTable data={labelPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">ProgressValue</h3>
        <PropsTable data={valuePropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">ProgressTrack</h3>
        <PropsTable data={trackPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">ProgressIndicator</h3>
        <PropsTable data={indicatorPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Typography</h3>
        <TokenTable data={progressTypographyRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Colors</h3>
        <TokenTable data={progressColorRows} />
      </section>
    </article>
  )
}