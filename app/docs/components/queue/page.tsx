import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  QueueAttachmentsDemo,
  QueueCollapsedDemo,
  QueueDemo,
  QueueEmptyDemo,
  QueueMessagesDemo,
  QueuePromptInputDemo,
  QueueTodosDemo,
} from "@/components/examples/queue-examples"

import {
  queueItemContentPropRows,
  queueItemIndicatorPropRows,
  queuePropRows,
  queueSectionLabelPropRows,
  queueSectionPropRows,
} from "./queue-table-data"

const description =
  "Queue and manage pending prompts while the model is still responding."

export const metadata: Metadata = {
  title: "Queue",
  description,
}

const usageImport = `import {
  Queue,
  QueueItem,
  QueueItemAction,
  QueueItemActions,
  QueueItemContent,
  QueueItemIndicator,
  QueueItemRow,
  QueueList,
  QueueSection,
  QueueSectionContent,
  QueueSectionLabel,
  QueueSectionTrigger,
} from "@/components/cubix/queue"`

const usageSnippet = `<Queue>
  <QueueSection>
    <QueueSectionTrigger>
      <QueueSectionLabel count={messages.length} label="Queued" />
    </QueueSectionTrigger>
    <QueueSectionContent>
      <QueueList>
        {messages.map((message) => (
          <QueueItem key={message.id}>
            <QueueItemRow>
              <QueueItemIndicator />
              <QueueItemContent>{summary}</QueueItemContent>
              <QueueItemActions>
                <QueueItemAction aria-label="Remove">...</QueueItemAction>
              </QueueItemActions>
            </QueueItemRow>
          </QueueItem>
        ))}
      </QueueList>
    </QueueSectionContent>
  </QueueSection>
</Queue>`

const compositionSnippet = `Queue
└── QueueSection
    ├── QueueSectionTrigger
    │   └── QueueSectionLabel
    └── QueueSectionContent
        └── QueueList
            └── QueueItem
                ├── QueueItemRow
                │   ├── QueueItemIndicator
                │   ├── QueueItemContent
                │   └── QueueItemActions
                │       └── QueueItemAction
                ├── QueueItemDescription
                └── QueueItemAttachment
                    ├── QueueItemImage
                    └── QueueItemFile`

const demoSnippet = usageSnippet

const messagesSnippet = `<QueueSectionLabel count={2} label="Queued" />`

const todosSnippet = `<QueueItemIndicator completed />
<QueueItemContent completed>{title}</QueueItemContent>`

const collapsedSnippet = `<QueueSection defaultOpen={false}>...</QueueSection>`

const attachmentsSnippet = `<QueueItemAttachment>
  <QueueItemImage src={url} />
  <QueueItemFile>{filename}</QueueItemFile>
</QueueItemAttachment>`

const promptSnippet = `<div className="overflow-hidden rounded-xl border">
  <Queue className="rounded-none border-0 border-b">...</Queue>
  <PromptInput className="[&_[data-slot=input-group]]:rounded-none">
    ...
  </PromptInput>
</div>`

export default function QueueDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Queue"
        description={description}
        slug="queue"
      />

      <p className="leading-relaxed text-muted-foreground">
        <code className="font-mono text-sm">Queue</code> is a presentational
        shell for pending prompts and todos. Own the arrays in your app, then
        compose sections, list rows, and hover actions.
      </p>

      <ComponentPreview code={demoSnippet} previewClassName="min-h-72">
        <QueueDemo />
      </ComponentPreview>

      <ComponentInstall name="queue" />

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
          <li>Collapsible Queued and Todo sections</li>
          <li>Pending and completed item states</li>
          <li>Attachments, hover actions, and Prompt Input pairing</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Messages</h2>
        <ComponentPreview code={messagesSnippet} previewClassName="min-h-44">
          <QueueMessagesDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Todos</h2>
        <ComponentPreview code={todosSnippet} previewClassName="min-h-52">
          <QueueTodosDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Collapsed</h2>
        <ComponentPreview code={collapsedSnippet} previewClassName="min-h-28">
          <QueueCollapsedDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Attachments
        </h2>
        <ComponentPreview code={attachmentsSnippet} previewClassName="min-h-44">
          <QueueAttachmentsDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Empty</h2>
        <ComponentPreview
          code={`<Queue><QueueEmpty>...</QueueEmpty></Queue>`}
          previewClassName="min-h-36"
        >
          <QueueEmptyDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          With Prompt Input
        </h2>
        <ComponentPreview code={promptSnippet} previewClassName="min-h-64">
          <QueuePromptInputDemo />
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <h3 className="font-medium">Queue</h3>
        <PropsTable data={queuePropRows} />
        <h3 className="font-medium">QueueSection</h3>
        <PropsTable data={queueSectionPropRows} />
        <h3 className="font-medium">QueueSectionLabel</h3>
        <PropsTable data={queueSectionLabelPropRows} />
        <h3 className="font-medium">QueueItemIndicator</h3>
        <PropsTable data={queueItemIndicatorPropRows} />
        <h3 className="font-medium">QueueItemContent</h3>
        <PropsTable data={queueItemContentPropRows} />
      </section>
    </article>
  )
}
