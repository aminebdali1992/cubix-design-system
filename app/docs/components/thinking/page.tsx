import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  ThinkingClosedDemo,
  ThinkingControlledDemo,
  ThinkingCustomLabelDemo,
  ThinkingDemo,
  ThinkingEmptyDemo,
  ThinkingErrorDemo,
  ThinkingLabelsDemo,
  ThinkingLifecycleDemo,
  ThinkingMessageDemo,
  ThinkingReceiptDemo,
  ThinkingStoppedDemo,
  ThinkingStreamingDemo,
} from "@/components/examples/thinking-examples"

import {
  thinkingContentPropRows,
  thinkingPropRows,
  thinkingTriggerPropRows,
} from "./thinking-table-data"

const description =
  "Collapsible block for model reasoning and chain-of-thought while a reply is prepared."

export const metadata: Metadata = {
  title: "Thinking",
  description,
}

const usageImport = `import {
  Thinking,
  ThinkingContent,
  ThinkingTrigger,
} from "@/components/cubix/thinking"`

const usageSnippet = `<Thinking isStreaming={isStreaming}>
  <ThinkingTrigger />
  <ThinkingContent>
    {reasoningText}
  </ThinkingContent>
</Thinking>`

const compositionSnippet = `Thinking
├── ThinkingTrigger
└── ThinkingContent`

const demoSnippet = `<Thinking defaultOpen duration={8}>
  <ThinkingTrigger />
  <ThinkingContent>
    The user asked for a release checklist summary...
  </ThinkingContent>
</Thinking>`

const streamingSnippet = `<Thinking isStreaming={isStreaming} defaultOpen>
  <ThinkingTrigger />
  <ThinkingContent>{streamedReasoning}</ThinkingContent>
</Thinking>`

const lifecycleSnippet = `<Thinking isStreaming={isStreaming}>
  <ThinkingTrigger />
  <ThinkingContent>{streamedReasoning}</ThinkingContent>
</Thinking>`

const closedSnippet = `<Thinking isStreaming defaultOpen={false}>
  <ThinkingTrigger />
  <ThinkingContent>...</ThinkingContent>
</Thinking>`

const labelsSnippet = `<Thinking duration={1}>
  <ThinkingTrigger />
  <ThinkingContent>...</ThinkingContent>
</Thinking>`

const customSnippet = `<ThinkingTrigger
  getThinkingMessage={(streaming, duration) =>
    streaming ? (
      <span className="shimmer">Working through the checklist...</span>
    ) : (
      <span>Reviewed options in {duration}s</span>
    )
  }
/>`

const messageSnippet = `<Message>
  <MessageAvatar>...</MessageAvatar>
  <MessageContent>
    <Thinking defaultOpen duration={6}>
      <ThinkingTrigger />
      <ThinkingContent>...</ThinkingContent>
    </Thinking>
    <Bubble variant="muted">
      <BubbleContent>...</BubbleContent>
    </Bubble>
  </MessageContent>
</Message>`

const controlledSnippet = `<Thinking open={open} onOpenChange={setOpen} duration={9}>
  <ThinkingTrigger />
  <ThinkingContent>...</ThinkingContent>
</Thinking>`

const stoppedSnippet = `<Thinking isStreaming={isStreaming} defaultOpen>
  <ThinkingTrigger
    getThinkingMessage={(streaming, duration) =>
      streaming ? (
        <span className="shimmer">Thinking...</span>
      ) : (
        <span>Thinking stopped after {duration}s</span>
      )
    }
  />
  <ThinkingContent>{partialReasoning}</ThinkingContent>
</Thinking>`

const emptySnippet = `<Thinking isStreaming defaultOpen>
  <ThinkingTrigger />
  <ThinkingContent>
    Waiting for the first reasoning token...
  </ThinkingContent>
</Thinking>

<Thinking isStreaming defaultOpen={false}>
  <ThinkingTrigger />
</Thinking>`

const errorSnippet = `<Thinking defaultOpen duration={4}>
  <ThinkingTrigger
    getThinkingMessage={() => (
      <span className="text-destructive">Thinking failed</span>
    )}
  />
  <ThinkingContent>
    Error: reasoning stream closed after 30s.
  </ThinkingContent>
</Thinking>`

const receiptSnippet = `<Thinking defaultOpen={false} duration={11}>
  <ThinkingTrigger />
  <ThinkingContent>...</ThinkingContent>
</Thinking>`

export default function ThinkingDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Thinking"
        description={description}
        slug="thinking"
      />

      <p className="leading-relaxed text-muted-foreground">
        <code className="font-mono text-sm">Thinking</code> shows extended
        model reasoning in a collapsible fold. It opens while streaming,
        tracks duration, shimmers the live label, then settles to a quiet
        receipt. Manual toggles pin the reader&apos;s choice so auto-close
        never fights them.
      </p>

      <ComponentPreview code={demoSnippet} previewClassName="min-h-56">
        <ThinkingDemo />
      </ComponentPreview>

      <ComponentInstall name="thinking" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong>{" "}
            <code className="font-mono">Thinking</code> is for one continuous
            reasoning stream. Render the final answer with{" "}
            <code className="font-mono">Message</code> and{" "}
            <code className="font-mono">Bubble</code> beside it.
          </p>
        </div>
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
          <li>Auto-opens while the model is thinking</li>
          <li>Shimmer label during the live stream</li>
          <li>Measures think duration from isStreaming, or accept a controlled duration</li>
          <li>Auto-collapses once after the stream ends</li>
          <li>Manual open or close pins the reader choice</li>
          <li>Supports controlled open state from outside</li>
          <li>Stopped, empty, error, and quiet-receipt presentations</li>
          <li>Fits inside a Message row above the answer bubble</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Streaming</h2>
        <p className="leading-relaxed text-muted-foreground">
          Pass{" "}
          <code className="font-mono text-sm">isStreaming</code> while tokens
          arrive. The trigger shows Thinking... with shimmer and the panel
          stays open.
        </p>
        <ComponentPreview code={streamingSnippet} previewClassName="min-h-48">
          <ThinkingStreamingDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Lifecycle
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          When streaming ends, duration is recorded and the panel auto-closes
          after a short delay unless the reader already toggled it.
        </p>
        <ComponentPreview code={lifecycleSnippet} previewClassName="min-h-56">
          <ThinkingLifecycleDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Keep closed while streaming
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Set{" "}
          <code className="font-mono text-sm">defaultOpen=&#123;false&#125;</code>{" "}
          to suppress auto-open. The reader can still expand the fold.
        </p>
        <ComponentPreview code={closedSnippet} previewClassName="min-h-40">
          <ThinkingClosedDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Duration labels
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Labels cover active thinking, singular and plural seconds, and the
          unknown-duration fallback.
        </p>
        <ComponentPreview code={labelsSnippet} previewClassName="min-h-72">
          <ThinkingLabelsDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Custom label
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Override the trigger copy with{" "}
          <code className="font-mono text-sm">getThinkingMessage</code>.
        </p>
        <ComponentPreview code={customSnippet} previewClassName="min-h-56">
          <ThinkingCustomLabelDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Inside a message
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Place Thinking above the answer bubble inside{" "}
          <code className="font-mono text-sm">MessageContent</code>.
        </p>
        <ComponentPreview code={messageSnippet} previewClassName="min-h-72">
          <ThinkingMessageDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Controlled
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Drive the fold from outside with{" "}
          <code className="font-mono text-sm">open</code> and{" "}
          <code className="font-mono text-sm">onOpenChange</code>.
        </p>
        <ComponentPreview code={controlledSnippet} previewClassName="min-h-56">
          <ThinkingControlledDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Stopped mid-think
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          If the reader stops generation, keep the partial reasoning and switch
          the trigger to a stopped receipt.
        </p>
        <ComponentPreview code={stoppedSnippet} previewClassName="min-h-56">
          <ThinkingStoppedDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Empty / waiting
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Before the first token, show a waiting panel - or render only the
          trigger with no content yet.
        </p>
        <ComponentPreview code={emptySnippet} previewClassName="min-h-48">
          <ThinkingEmptyDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Error</h2>
        <p className="leading-relaxed text-muted-foreground">
          Surface a failed reasoning pass with a destructive label and retry
          action inside the content.
        </p>
        <ComponentPreview code={errorSnippet} previewClassName="min-h-56">
          <ThinkingErrorDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Quiet receipt
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          After a completed think, leave the fold collapsed so the chat stays
          readable. Expand only when the reader wants the details.
        </p>
        <ComponentPreview code={receiptSnippet} previewClassName="min-h-40">
          <ThinkingReceiptDemo />
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Thinking</h3>
          <PropsTable data={thinkingPropRows} />
        </div>
        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            ThinkingTrigger
          </h3>
          <PropsTable data={thinkingTriggerPropRows} />
        </div>
        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            ThinkingContent
          </h3>
          <PropsTable data={thinkingContentPropRows} />
        </div>
      </section>
    </article>
  )
}
