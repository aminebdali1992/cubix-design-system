import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  StreamingTextCaretDemo,
  StreamingTextCustomCaretDemo,
  StreamingTextDemo,
  StreamingTextEmptyDemo,
  StreamingTextErrorDemo,
  StreamingTextIdleDemo,
  StreamingTextMessageDemo,
  StreamingTextMultilineDemo,
  StreamingTextStoppedDemo,
  StreamingTextWithThinkingDemo,
} from "@/components/examples/streaming-text-examples"

import {
  streamingTextCaretPropRows,
  streamingTextPropRows,
} from "./streaming-text-table-data"

const description =
  "Progressive text surface for token-by-token model output during a stream."

export const metadata: Metadata = {
  title: "Streaming Text",
  description,
}

const usageImport = `import { StreamingText } from "@/components/cubix/streaming-text"`

const usageSnippet = `<StreamingText isStreaming={isStreaming}>
  {text}
</StreamingText>`

const compositionSnippet = `StreamingText
└── StreamingTextCaret`

const demoSnippet = `<StreamingText isStreaming={isStreaming}>
  {text}
</StreamingText>`

const idleSnippet = `<StreamingText isStreaming={false}>
  {completedText}
</StreamingText>`

const emptySnippet = `<StreamingText isStreaming caret="line">
  {""}
</StreamingText>`

const caretSnippet = `<StreamingText isStreaming caret="line">{text}</StreamingText>
<StreamingText isStreaming caret="block">{text}</StreamingText>
<StreamingText isStreaming caret="circle">{text}</StreamingText>
<StreamingText isStreaming caret={false}>{text}</StreamingText>`

const customCaretSnippet = `<StreamingText isStreaming={isStreaming} caret={false}>
  {text}
  {isStreaming ? (
    <StreamingTextCaret force className="...">
      gen
    </StreamingTextCaret>
  ) : null}
</StreamingText>`

const multilineSnippet = `<StreamingText isStreaming={isStreaming}>
  {multilineText}
</StreamingText>`

const stoppedSnippet = `<StreamingText isStreaming={isStreaming}>
  {partialText}
</StreamingText>`

const errorSnippet = `<StreamingText isStreaming={false}>
  {truncatedText}
</StreamingText>
{/* error + retry below */}`

const messageSnippet = `<Bubble variant="muted">
  <BubbleContent>
    <StreamingText isStreaming={isStreaming}>
      {text}
    </StreamingText>
  </BubbleContent>
</Bubble>`

const withThinkingSnippet = `<Thinking isStreaming={phase === "thinking"}>
  <ThinkingTrigger />
  <ThinkingContent>{reasoning}</ThinkingContent>
</Thinking>
<Bubble variant="muted">
  <BubbleContent>
    <StreamingText isStreaming={phase === "streaming"}>
      {reply}
    </StreamingText>
  </BubbleContent>
</Bubble>`

export default function StreamingTextDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Streaming Text"
        description={description}
        slug="streaming-text"
      />

      <p className="leading-relaxed text-muted-foreground">
        <code className="font-mono text-sm">StreamingText</code> is the live
        answer surface. Pass growing text from your stream, keep{" "}
        <code className="font-mono text-sm">isStreaming</code> true while tokens
        arrive, and the caret marks the live edge. Pair it with{" "}
        <code className="font-mono text-sm">Bubble</code> for the message chrome
        and <code className="font-mono text-sm">Thinking</code> for reasoning.
      </p>

      <ComponentPreview code={demoSnippet} previewClassName="min-h-40">
        <StreamingTextDemo />
      </ComponentPreview>

      <ComponentInstall name="streaming-text" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong>{" "}
            <code className="font-mono">StreamingText</code> does not own the
            transport. Your chat hook appends tokens; this component renders the
            progressive text and caret.
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
          <li>Renders growing token output from your stream</li>
          <li>Built-in block, line, and circle carets</li>
          <li>Hides the caret automatically when streaming ends</li>
          <li>Supports multiline plain text with preserved newlines</li>
          <li>Composable custom caret slot</li>
          <li>Accessible live region while tokens arrive</li>
          <li>Fits inside Bubble and Message rows</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Completed reply
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          When the stream is done, set{" "}
          <code className="font-mono text-sm">isStreaming=&#123;false&#125;</code>{" "}
          so the caret disappears.
        </p>
        <ComponentPreview code={idleSnippet} previewClassName="min-h-32">
          <StreamingTextIdleDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Waiting for tokens
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Before the first character arrives, keep{" "}
          <code className="font-mono text-sm">isStreaming</code> true with empty
          content so the caret still shows activity.
        </p>
        <ComponentPreview code={emptySnippet} previewClassName="min-h-28">
          <StreamingTextEmptyDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Caret styles
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Choose block, line, or circle - or disable the automatic caret.
        </p>
        <ComponentPreview code={caretSnippet} previewClassName="min-h-72">
          <StreamingTextCaretDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Custom caret
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Set{" "}
          <code className="font-mono text-sm">caret=&#123;false&#125;</code> and
          compose <code className="font-mono text-sm">StreamingTextCaret</code>{" "}
          yourself.
        </p>
        <ComponentPreview code={customCaretSnippet} previewClassName="min-h-40">
          <StreamingTextCustomCaretDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Multiline</h2>
        <p className="leading-relaxed text-muted-foreground">
          Newlines are preserved with{" "}
          <code className="font-mono text-sm">whitespace-pre-wrap</code>.
        </p>
        <ComponentPreview code={multilineSnippet} previewClassName="min-h-56">
          <StreamingTextMultilineDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Stopped mid-stream
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Keep the partial text when the reader stops generation.
        </p>
        <ComponentPreview code={stoppedSnippet} previewClassName="min-h-48">
          <StreamingTextStoppedDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Interrupted stream
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Show the truncated reply with an error and retry action below.
        </p>
        <ComponentPreview code={errorSnippet} previewClassName="min-h-44">
          <StreamingTextErrorDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Inside a message
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Nest StreamingText inside{" "}
          <code className="font-mono text-sm">BubbleContent</code> and switch
          footer actions between Stop and Retry.
        </p>
        <ComponentPreview code={messageSnippet} previewClassName="min-h-56">
          <StreamingTextMessageDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          With Thinking
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Run Thinking first, then stream the answer text in the bubble.
        </p>
        <ComponentPreview code={withThinkingSnippet} previewClassName="min-h-72">
          <StreamingTextWithThinkingDemo />
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            StreamingText
          </h3>
          <PropsTable data={streamingTextPropRows} />
        </div>
        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            StreamingTextCaret
          </h3>
          <PropsTable data={streamingTextCaretPropRows} />
        </div>
      </section>
    </article>
  )
}
