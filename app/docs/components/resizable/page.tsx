import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  ResizableControlledDemo,
  ResizableDemo,
  ResizableHandleDemo,
  ResizableHorizontalDemo,
  ResizableVerticalDemo,
} from "@/components/examples/resizable-examples"

import {
  handlePropRows,
  panelGroupPropRows,
  panelPropRows,
} from "./resizable-table-data"

const description = "Accessible resizable panel groups and layouts."

export const metadata: Metadata = {
  title: "Resizable",
  description,
}

const usageImport = `import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/cubix/resizable"`

const usageSnippet = `<ResizablePanelGroup orientation="horizontal">
  <ResizablePanel>One</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>Two</ResizablePanel>
</ResizablePanelGroup>`

const compositionSnippet = `ResizablePanelGroup
├── ResizablePanel
├── ResizableHandle
└── ResizablePanel`

const demoSnippet = `<ResizablePanelGroup
  orientation="horizontal"
  className="max-w-md rounded-lg border md:min-w-[450px]"
>
  <ResizablePanel defaultSize="50%">
    <div className="flex h-[200px] items-center justify-center p-6">
      <span className="font-semibold">One</span>
    </div>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize="50%">
    <ResizablePanelGroup orientation="vertical">
      <ResizablePanel defaultSize="25%">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Two</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="75%">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Three</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  </ResizablePanel>
</ResizablePanelGroup>`

const horizontalSnippet = `<ResizablePanelGroup
  orientation="horizontal"
  className="min-h-[200px] rounded-lg border"
>
  <ResizablePanel defaultSize="25%">
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold">Sidebar</span>
    </div>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize="75%">
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold">Content</span>
    </div>
  </ResizablePanel>
</ResizablePanelGroup>`

const verticalSnippet = `<ResizablePanelGroup
  orientation="vertical"
  className="min-h-[200px] rounded-lg border"
>
  <ResizablePanel defaultSize="25%">
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold">Header</span>
    </div>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize="75%">
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold">Content</span>
    </div>
  </ResizablePanel>
</ResizablePanelGroup>`

const handleSnippet = `<ResizablePanelGroup
  orientation="horizontal"
  className="min-h-[200px] rounded-lg border"
>
  <ResizablePanel defaultSize="25%">
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold">Sidebar</span>
    </div>
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize="75%">
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold">Content</span>
    </div>
  </ResizablePanel>
</ResizablePanelGroup>`

const controlledSnippet = `"use client"

import * as React from "react"
import type { Layout } from "react-resizable-panels"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/cubix/resizable"

export function ResizableControlledDemo() {
  const [layout, setLayout] = React.useState<Layout>({})

  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="min-h-[200px] rounded-lg border"
      onLayoutChange={setLayout}
    >
      <ResizablePanel defaultSize="30%" id="left" minSize="20%">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">
            {Math.round(layout.left ?? 30)}%
          </span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="70%" id="right" minSize="30%">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">
            {Math.round(layout.right ?? 70)}%
          </span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}`

export default function ResizableDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Resizable"
        description={description}
        slug="resizable"
      />

      <ComponentPreview code={demoSnippet} previewClassName="min-h-80">
        <ResizableDemo />
      </ComponentPreview>

      <ComponentInstall name="resizable" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">About</h2>
        <p className="leading-relaxed text-muted-foreground">
          Built on{" "}
          <code className="font-mono text-sm">react-resizable-panels</code> for
          accessible, keyboard-friendly panel layouts.
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
          Use the following composition to build a{" "}
          <code className="font-mono text-sm">ResizablePanelGroup</code>:
        </p>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Horizontal
        </h2>
        <ComponentPreview code={horizontalSnippet} previewClassName="min-h-56">
          <ResizableHorizontalDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Vertical</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use{" "}
          <code className="font-mono text-sm">orientation=&quot;vertical&quot;</code>{" "}
          for vertical resizing.
        </p>
        <ComponentPreview code={verticalSnippet} previewClassName="min-h-56">
          <ResizableVerticalDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Handle</h2>
        <p className="leading-relaxed text-muted-foreground">
          The handle anchor is shown by default in the middle of the separator.
          Pass{" "}
          <code className="font-mono text-sm">withHandle={"{false}"}</code> for
          a plain line only.
        </p>
        <ComponentPreview code={handleSnippet} previewClassName="min-h-56">
          <ResizableHandleDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Controlled
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Track panel sizes with{" "}
          <code className="font-mono text-sm">onLayoutChange</code> and stable{" "}
          <code className="font-mono text-sm">id</code> values.
        </p>
        <ComponentPreview code={controlledSnippet} previewClassName="min-h-56">
          <ResizableControlledDemo />
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          See also the{" "}
          <code className="font-mono text-sm">react-resizable-panels</code>{" "}
          documentation for additional primitive props.
        </p>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            ResizablePanelGroup
          </h3>
          <PropsTable data={panelGroupPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            ResizablePanel
          </h3>
          <PropsTable data={panelPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            ResizableHandle
          </h3>
          <PropsTable data={handlePropRows} />
        </div>
      </section>
    </article>
  )
}
