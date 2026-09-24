import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  MessageScrollerAnchorDemo,
  MessageScrollerAutoScrollDemo,
  MessageScrollerDemo,
  MessageScrollerGroupDemo,
  MessageScrollerHistoryDemo,
  MessageScrollerJumpDemo,
  MessageScrollerOpeningDemo,
  MessageScrollerScrollableDemo,
  MessageScrollerVisibilityDemo,
} from "@/components/examples/message-scroller-examples"

import {
  messageScrollerButtonPropRows,
  messageScrollerContentPropRows,
  messageScrollerItemPropRows,
  messageScrollerPropRows,
  messageScrollerProviderPropRows,
  messageScrollerViewportPropRows,
} from "./message-scroller-table-data"

const description =
  "Chat transcript scroller for turn anchoring, streaming follow, history restore, and jump controls."

export const metadata: Metadata = {
  title: "Message Scroller",
  description,
}

const usageImport = `import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/cubix/message-scroller"`

const usageSnippet = `<MessageScrollerProvider autoScroll>
  <MessageScroller>
    <MessageScrollerViewport>
      <MessageScrollerContent>
        {messages.map((message) => (
          <MessageScrollerItem
            key={message.id}
            messageId={message.id}
            scrollAnchor={message.role === "user"}
          >
            <Message>...</Message>
          </MessageScrollerItem>
        ))}
      </MessageScrollerContent>
    </MessageScrollerViewport>
    <MessageScrollerButton />
  </MessageScroller>
</MessageScrollerProvider>`

const compositionSnippet = `MessageScrollerProvider
└── MessageScroller
    ├── MessageScrollerViewport
    │   └── MessageScrollerContent
    │       └── MessageScrollerItem…
    ├── MessageScrollerButton (start)
    └── MessageScrollerButton (end)`

const demoSnippet = usageSnippet

const anchorSnippet = `<MessageScrollerItem
  messageId={message.id}
  scrollAnchor={message.role === "user"}
>
  <Message>...</Message>
</MessageScrollerItem>`

const autoScrollSnippet = `<MessageScrollerProvider autoScroll>
  <MessageScroller>{/* streamed turns */}</MessageScroller>
</MessageScrollerProvider>`

const openingSnippet = `<MessageScrollerProvider defaultScrollPosition="last-anchor">
  <MessageScroller>{/* saved transcript */}</MessageScroller>
</MessageScrollerProvider>`

const historySnippet = `<MessageScrollerViewport preserveScrollOnPrepend>
  <MessageScrollerContent>
    {/* Prepend older rows above the current transcript */}
  </MessageScrollerContent>
</MessageScrollerViewport>`

const jumpSnippet = `const { scrollToMessage, scrollToEnd, scrollToStart } = useMessageScroller()

scrollToMessage("j3")
scrollToEnd()
scrollToStart()`

const visibilitySnippet = `const { currentAnchorId, visibleMessageIds } = useMessageScrollerVisibility()`

const scrollableSnippet = `const { start, end } = useMessageScrollerScrollable()`

const groupSnippet = `<MessageScrollerItem messageId="marcus-joined" scrollAnchor>
  <Marker variant="separator">
    <MarkerContent>Marcus joined the chat</MarkerContent>
  </Marker>
</MessageScrollerItem>`

export default function MessageScrollerDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Message Scroller"
        description={description}
        slug="message-scroller"
      />

      <p className="leading-relaxed text-muted-foreground">
        <code className="font-mono text-sm">MessageScroller</code> owns the
        transcript viewport: turn anchoring, live-edge follow, opening
        position, prepend restore, jump commands, and visibility. It does not
        own messages, transport, or the prompt composer - pair it with{" "}
        <code className="font-mono text-sm">Message</code> and{" "}
        <code className="font-mono text-sm">Bubble</code>.
      </p>

      <ComponentPreview
        code={demoSnippet}
        previewClassName="min-h-[28rem] p-0 sm:p-0"
      >
        <MessageScrollerDemo />
      </ComponentPreview>

      <ComponentInstall name="message-scroller" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong>{" "}
            <code className="font-mono">MessageScroller</code> fills its parent.
            Place it in a height-constrained container. Wrap every direct
            content child in{" "}
            <code className="font-mono">MessageScrollerItem</code>.
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
          <li>Anchors new turns near the top with previous-item peek</li>
          <li>Follows streamed output only while the reader is at the live edge</li>
          <li>Opens saved threads on start, end, or last-anchor</li>
          <li>Preserves place when earlier history is prepended</li>
          <li>Jumps to any messageId from outside the list</li>
          <li>Tracks current anchor and visible rows on demand</li>
          <li>Start and end scroll buttons that stay inert until useful</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Anchoring turns
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Mark the row that starts a turn with{" "}
          <code className="font-mono text-sm">scrollAnchor</code>. Send a turn
          and toggle which role settles near the top.
        </p>
        <ComponentPreview
          code={anchorSnippet}
          previewClassName="min-h-[30rem] p-0 sm:p-0"
        >
          <MessageScrollerAnchorDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Following the live edge
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          With{" "}
          <code className="font-mono text-sm">autoScroll</code>, tokens stay in
          view while the reader remains at the bottom. Scroll away and the
          position is preserved.
        </p>
        <ComponentPreview
          code={autoScrollSnippet}
          previewClassName="min-h-80 p-0 sm:p-0"
        >
          <MessageScrollerAutoScrollDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Opening saved threads
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Use{" "}
          <code className="font-mono text-sm">
            defaultScrollPosition=&quot;last-anchor&quot;
          </code>{" "}
          so a saved transcript opens on the last meaningful turn.
        </p>
        <ComponentPreview
          code={openingSnippet}
          previewClassName="min-h-[28rem] p-0 sm:p-0"
        >
          <MessageScrollerOpeningDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Loading earlier messages
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Prepend older rows without jumping the reader. Stable{" "}
          <code className="font-mono text-sm">messageId</code> values keep the
          visible row locked.
        </p>
        <ComponentPreview
          code={historySnippet}
          previewClassName="min-h-[28rem] p-0 sm:p-0"
        >
          <MessageScrollerHistoryDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Jumping to messages
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Drive the transcript from outside with{" "}
          <code className="font-mono text-sm">useMessageScroller</code>.
        </p>
        <ComponentPreview
          code={jumpSnippet}
          previewClassName="min-h-[28rem] p-0 sm:p-0"
        >
          <MessageScrollerJumpDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Tracking position
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          <code className="font-mono text-sm">useMessageScrollerVisibility</code>{" "}
          reports the current anchor and visible ids. Tracking only runs while
          something subscribes.
        </p>
        <ComponentPreview
          code={visibilitySnippet}
          previewClassName="min-h-[28rem] p-0 sm:p-0"
        >
          <MessageScrollerVisibilityDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Scrollable edges
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          <code className="font-mono text-sm">useMessageScrollerScrollable</code>{" "}
          reports whether the viewport can still move toward start or end.
        </p>
        <ComponentPreview
          code={scrollableSnippet}
          previewClassName="min-h-72 p-0 sm:p-0"
        >
          <MessageScrollerScrollableDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Group chat anchors
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Anchors are role-independent. Mark a join marker as the turn boundary
          when a participant enters.
        </p>
        <ComponentPreview
          code={groupSnippet}
          previewClassName="min-h-[28rem] p-0 sm:p-0"
        >
          <MessageScrollerGroupDemo />
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            MessageScrollerProvider
          </h3>
          <PropsTable data={messageScrollerProviderPropRows} />
        </div>
        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            MessageScroller
          </h3>
          <PropsTable data={messageScrollerPropRows} />
        </div>
        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            MessageScrollerViewport
          </h3>
          <PropsTable data={messageScrollerViewportPropRows} />
        </div>
        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            MessageScrollerContent
          </h3>
          <PropsTable data={messageScrollerContentPropRows} />
        </div>
        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            MessageScrollerItem
          </h3>
          <PropsTable data={messageScrollerItemPropRows} />
        </div>
        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            MessageScrollerButton
          </h3>
          <PropsTable data={messageScrollerButtonPropRows} />
        </div>
      </section>
    </article>
  )
}
