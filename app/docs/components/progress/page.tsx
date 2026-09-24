import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  ProgressControlledDemo,
  ProgressDemo,
  ProgressFileUploadDemo,
  ProgressLabelDemo,
  ProgressValuesDemo,
} from "@/components/examples/progress-examples"

import {
  indicatorPropRows,
  labelPropRows,
  progressPropRows,
  trackPropRows,
  valuePropRows,
} from "./progress-table-data"

const description =
  "Displays an indicator showing the completion progress of a task."

export const metadata: Metadata = {
  title: "Progress",
  description,
}

const usageImport = `import { Progress } from "@/components/cubix/progress"`

const usageSnippet = `<Progress value={33} />`

const compositionSnippet = `Progress
├── ProgressLabel
├── ProgressValue
└── ProgressTrack
    └── ProgressIndicator`

const demoSnippet = `"use client"

import * as React from "react"
import { Progress } from "@/components/cubix/progress"

export function ProgressDemo() {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return <Progress value={progress} className="w-[60%]" />
}`

const valuesSnippet = `<div className="flex w-full flex-col gap-4">
  <Progress value={0} />
  <Progress value={25} />
  <Progress value={50} />
  <Progress value={75} />
  <Progress value={100} />
</div>`

const labelSnippet = `import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/cubix/progress"

<Progress value={56} className="w-full max-w-sm">
  <ProgressLabel>Upload progress</ProgressLabel>
  <ProgressValue />
</Progress>`

const controlledSnippet = `"use client"

import * as React from "react"
import { Progress } from "@/components/cubix/progress"

export function ProgressControlledDemo() {
  const [value, setValue] = React.useState(50)

  return (
    <div className="flex w-full flex-col gap-4">
      <Progress value={value} className="w-full" />
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
      />
    </div>
  )
}`

const fileUploadSnippet = `<ul className="flex flex-col gap-3">
  {files.map((file) => (
    <li key={file.id} className="flex items-center gap-3">
      <FileIcon className="size-5" />
      <span className="flex-1 truncate">{file.name}</span>
      <Progress value={file.progress} className="w-32" />
      <span className="text-muted-foreground">{file.timeRemaining}</span>
    </li>
  ))}
</ul>`

export default function ProgressDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Progress"
        description={description}
        slug="progress"
      />

      <ComponentPreview code={demoSnippet} previewClassName="min-h-32">
        <ProgressDemo />
      </ComponentPreview>

      <ComponentInstall name="progress" />

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
          Use{" "}
          <code className="font-mono text-sm">ProgressLabel</code> and{" "}
          <code className="font-mono text-sm">ProgressValue</code> to add a
          label and value display.
        </p>
        <CodeBlock code={labelSnippet} />
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Progress Bar
        </h2>
        <ComponentPreview code={valuesSnippet} previewClassName="min-h-40">
          <ProgressValuesDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Label</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use{" "}
          <code className="font-mono text-sm">ProgressLabel</code> and{" "}
          <code className="font-mono text-sm">ProgressValue</code> to add a
          label and value display.
        </p>
        <ComponentPreview code={labelSnippet} previewClassName="min-h-32">
          <ProgressLabelDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Controlled
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          A progress bar that can be controlled by a range input.
        </p>
        <ComponentPreview code={controlledSnippet} previewClassName="min-h-32">
          <ProgressControlledDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          File Upload List
        </h2>
        <ComponentPreview code={fileUploadSnippet} previewClassName="min-h-48">
          <ProgressFileUploadDemo />
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          See also the Base UI Progress documentation for primitive props.
        </p>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Progress
          </h3>
          <PropsTable data={progressPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            ProgressLabel
          </h3>
          <PropsTable data={labelPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            ProgressValue
          </h3>
          <PropsTable data={valuePropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            ProgressTrack
          </h3>
          <PropsTable data={trackPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            ProgressIndicator
          </h3>
          <PropsTable data={indicatorPropRows} />
        </div>
      </section>
    </article>
  )
}
