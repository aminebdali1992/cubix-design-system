import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  ToolCallClosedDemo,
  ToolCallCompletedDemo,
  ToolCallDemo,
  ToolCallDeniedDemo,
  ToolCallErrorDemo,
  ToolCallMessageDemo,
  ToolCallPendingDemo,
  ToolCallReadyDemo,
  ToolCallRunningDemo,
  ToolCallStackDemo,
  ToolCallStatusCycleDemo,
} from "@/components/examples/tool-call-examples"

import {
  toolCallHeaderPropRows,
  toolCallInputPropRows,
  toolCallOutputPropRows,
  toolCallPropRows,
} from "./tool-call-table-data"

const description =
  "Visualize tool and function invocations with status, args, and results."

export const metadata: Metadata = {
  title: "Tool Call",
  description,
}

const usageImport = `import {
  ToolCall,
  ToolCallContent,
  ToolCallHeader,
  ToolCallInput,
  ToolCallOutput,
} from "@/components/cubix/tool-call"`

const usageSnippet = `<ToolCall name="get_weather" status="output-available" defaultOpen>
  <ToolCallHeader label="Get weather" />
  <ToolCallContent>
    <ToolCallInput parameters={{ city: "Tehran" }} />
    <ToolCallOutput result={{ temperature: 28 }} />
  </ToolCallContent>
</ToolCall>`

const compositionSnippet = `ToolCall
├── ToolCallHeader
└── ToolCallContent
    ├── ToolCallInput
    └── ToolCallOutput`

const demoSnippet = usageSnippet

const pendingSnippet = `<ToolCall name="search_docs" status="input-streaming" defaultOpen>
  <ToolCallHeader label="Search docs" />
  <ToolCallContent>
    <ToolCallInput parameters={{ query: "rollback plan" }} />
  </ToolCallContent>
</ToolCall>`

const readySnippet = `<ToolCall name="list_monitors" status="input-available" defaultOpen>
  ...
</ToolCall>`

const approvalSnippet = `<ToolCall name="run_migration" status="approval-requested" defaultOpen>
  ...
</ToolCall>`

const completedSnippet = `<ToolCall name="get_weather" status="output-available" defaultOpen>
  <ToolCallHeader label="Get weather" />
  <ToolCallContent>
    <ToolCallInput parameters={...} />
    <ToolCallOutput result={...} />
  </ToolCallContent>
</ToolCall>`

const errorSnippet = `<ToolCall name="fetch_invoice" status="output-error" defaultOpen>
  <ToolCallOutput error="Upstream billing API timed out after 10s." />
</ToolCall>`

const deniedSnippet = `<ToolCall name="delete_workspace" status="output-denied" defaultOpen>
  <ToolCallOutput error="User denied this tool call." />
</ToolCall>`

const closedSnippet = `<ToolCall status="output-available" defaultOpen={false}>
  ...
</ToolCall>`

const messageSnippet = `<Message>
  <MessageContent>
    <ToolCall>...</ToolCall>
    <Bubble variant="muted">...</Bubble>
  </MessageContent>
</Message>`

export default function ToolCallDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Tool Call"
        description={description}
        slug="tool-call"
      />

      <p className="leading-relaxed text-muted-foreground">
        <code className="font-mono text-sm">ToolCall</code> shows a tool
        invocation inside the transcript: status badge, parameters, and result
        or error. Expand it when you need the payload details.
      </p>

      <ComponentPreview code={demoSnippet} previewClassName="min-h-56">
        <ToolCallDemo />
      </ComponentPreview>

      <ComponentInstall name="tool-call" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Composition
        </h2>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Features</h2>
        <ul className="list-disc space-y-2 ps-5 text-muted-foreground">
          <li>Collapsible card with clear status badge and iconography</li>
          <li>Pretty-printed parameters and results without a code-block dep</li>
          <li>Error and denied states with distinct surfaces</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Pending</h2>
        <ComponentPreview code={pendingSnippet} previewClassName="min-h-44">
          <ToolCallPendingDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Running</h2>
        <ComponentPreview code={readySnippet} previewClassName="min-h-44">
          <ToolCallReadyDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Awaiting Approval
        </h2>
        <ComponentPreview code={approvalSnippet} previewClassName="min-h-44">
          <ToolCallRunningDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Completed</h2>
        <ComponentPreview code={completedSnippet} previewClassName="min-h-56">
          <ToolCallCompletedDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Error</h2>
        <ComponentPreview code={errorSnippet} previewClassName="min-h-52">
          <ToolCallErrorDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Denied</h2>
        <ComponentPreview code={deniedSnippet} previewClassName="min-h-52">
          <ToolCallDeniedDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Collapsed</h2>
        <ComponentPreview code={closedSnippet} previewClassName="min-h-28">
          <ToolCallClosedDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Status cycle
        </h2>
        <ComponentPreview
          code={`<ToolCall status={status}>...</ToolCall>`}
          previewClassName="min-h-56"
        >
          <ToolCallStatusCycleDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Stack</h2>
        <ComponentPreview
          code={`{calls.map((call) => <ToolCall key={call.id} ... />)}`}
          previewClassName="min-h-48"
        >
          <ToolCallStackDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          In a message
        </h2>
        <ComponentPreview code={messageSnippet} previewClassName="min-h-64">
          <ToolCallMessageDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <h3 className="font-medium">ToolCall</h3>
        <PropsTable data={toolCallPropRows} />
        <h3 className="font-medium">ToolCallHeader</h3>
        <PropsTable data={toolCallHeaderPropRows} />
        <h3 className="font-medium">ToolCallInput</h3>
        <PropsTable data={toolCallInputPropRows} />
        <h3 className="font-medium">ToolCallOutput</h3>
        <PropsTable data={toolCallOutputPropRows} />
      </section>
    </article>
  )
}
