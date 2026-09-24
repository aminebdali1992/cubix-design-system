import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  ConversationActionsDemo,
  ConversationAttachmentDemo,
  ConversationDemo,
  ConversationDownloadDemo,
  ConversationEmptyDemo,
  ConversationFailedDemo,
  ConversationGeneratingDemo,
  ConversationGroupDemo,
  ConversationLiveDemo,
  ConversationScrollDemo,
  ConversationStoppedDemo,
  ConversationTokenStreamDemo,
  ConversationTypingDemo,
} from "@/components/examples/conversation-examples"

import {
  conversationContentPropRows,
  conversationDownloadPropRows,
  conversationEmptyPropRows,
  conversationPropRows,
  conversationScrollPropRows,
} from "./conversation-table-data"

const description =
  "Top-level chat shell that sticks to the latest turn, with empty, scroll, streaming, and download controls."

export const metadata: Metadata = {
  title: "Conversation",
  description,
}

const usageImport = `import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
  ConversationDownload,
} from "@/components/cubix/conversation"`

const usageSnippet = `<Conversation>
  <ConversationContent>
    <Message>...</Message>
  </ConversationContent>
  <ConversationDownload messages={messages} />
  <ConversationScrollButton />
</Conversation>`

const compositionSnippet = `Conversation
├── ConversationContent
│   ├── ConversationEmptyState
│   ├── Marker…
│   ├── MessageGroup…
│   └── Message…
├── ConversationDownload
└── ConversationScrollButton`

const demoSnippet = `<Conversation>
  <ConversationContent>
    <Message align="start">...</Message>
    <Message align="end">...</Message>
    <Marker role="status">
      <MarkerContent className="shimmer">
        <span className="font-medium">Oliver</span> is typing...
      </MarkerContent>
    </Marker>
  </ConversationContent>
  <ConversationDownload messages={messages} />
  <ConversationScrollButton />
</Conversation>`

const emptySnippet = `<Conversation>
  <ConversationContent className="min-h-full justify-center">
    <ConversationEmptyState
      icon={<MessageSquareIcon />}
      title="Start a conversation"
      description="Type a message below to begin chatting."
    />
  </ConversationContent>
</Conversation>`

const scrollSnippet = `<Conversation>
  <ConversationContent>
    {/* Long thread */}
  </ConversationContent>
  <ConversationScrollButton />
</Conversation>`

const downloadSnippet = `<ConversationDownload
  messages={[
    { role: "assistant", text: "How can I help you today?" },
    { role: "user", text: "Summarize the latest deploy notes." },
  ]}
/>`

const typingSnippet = `<Marker role="status">
  <MarkerContent className="shimmer">
    <span className="font-medium">Oliver</span> is typing...
  </MarkerContent>
</Marker>`

const generatingSnippet = `<Message>
  <Marker role="status">
    <MarkerIcon>
      <Spinner />
    </MarkerIcon>
    <MarkerContent className="shimmer">
      Generating a response...
    </MarkerContent>
  </Marker>
</Message>`

const tokenStreamSnippet = `<Bubble variant="muted">
  <BubbleContent>
    {streamedText}
    {!done ? <span className="..." aria-hidden /> : null}
  </BubbleContent>
</Bubble>
<MessageFooter>
  <Button variant="ghost" size="xs">Stop</Button>
</MessageFooter>`

const stoppedSnippet = `<MessageFooter className="gap-2">
  <span className="font-normal text-muted-foreground">
    Generation stopped
  </span>
  <Button variant="ghost" size="icon-xs" aria-label="Continue">
    <RefreshCwIcon />
  </Button>
</MessageFooter>`

const failedSnippet = `<Bubble variant="destructive">
  <BubbleContent>
    Generation failed - the model timed out after 30s.
  </BubbleContent>
</Bubble>
<MessageFooter>
  <Button variant="ghost" size="xs">Retry</Button>
</MessageFooter>`

const attachmentSnippet = `<MessageContent>
  <Bubble variant="muted">
    <BubbleContent>Done. Here's the PDF...</BubbleContent>
  </Bubble>
  <Attachment state="done">...</Attachment>
</MessageContent>`

const actionsSnippet = `<MessageFooter className="gap-1">
  <Button variant="ghost" size="icon-xs" aria-label="Copy">
    <CopyIcon />
  </Button>
  <Button variant="ghost" size="icon-xs" aria-label="Like">
    <ThumbsUpIcon />
  </Button>
  <Button variant="ghost" size="icon-xs" aria-label="Dislike">
    <ThumbsDownIcon />
  </Button>
  <Button variant="ghost" size="icon-xs" aria-label="Regenerate">
    <RefreshCwIcon />
  </Button>
</MessageFooter>`

const groupSnippet = `<Marker variant="separator">
  <MarkerContent>Today</MarkerContent>
</Marker>
<MessageGroup>
  <Message>
    <MessageAvatar />
    <MessageContent>...</MessageContent>
  </Message>
  <Message>
    <MessageAvatar>...</MessageAvatar>
    <MessageContent>...</MessageContent>
  </Message>
</MessageGroup>`

const liveSnippet = `<Conversation>
  <ConversationContent>
    {messages.length === 0 ? (
      <ConversationEmptyState ... />
    ) : (
      messages.map((message) => <Message key={...}>...</Message>)
    )}
  </ConversationContent>
  <ConversationDownload messages={messages} />
  <ConversationScrollButton />
</Conversation>`

export default function ConversationDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Conversation"
        description={description}
        slug="conversation"
      />

      <p className="leading-relaxed text-muted-foreground">
        <code className="font-mono text-sm">Conversation</code> is the scroll
        shell around a chat transcript. It sticks to the latest turn while
        content grows, shows a jump-to-latest control when the reader scrolls
        away, and can export the thread as Markdown. Pair it with{" "}
        <code className="font-mono text-sm">Message</code>,{" "}
        <code className="font-mono text-sm">Bubble</code>,{" "}
        <code className="font-mono text-sm">Marker</code>, and{" "}
        <code className="font-mono text-sm">Attachment</code> for every AI turn
        state.
      </p>

      <ComponentPreview
        code={demoSnippet}
        previewClassName="min-h-[28rem] p-0 sm:p-0"
      >
        <ConversationDemo />
      </ComponentPreview>

      <ComponentInstall name="conversation" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong>{" "}
            <code className="font-mono">Conversation</code> owns the viewport -
            stick-to-bottom, empty state, scroll, and download.{" "}
            <code className="font-mono">Message</code> owns each row inside it.
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
          <li>Sticks to the bottom as new messages arrive</li>
          <li>Smooth resize follow while streamed content grows</li>
          <li>Scroll button when the reader leaves the latest turn</li>
          <li>Optional Markdown download of the thread</li>
          <li>Empty state for cold starts</li>
          <li>
            Hosts typing, generating, streaming, stopped, failed, attachment,
            and action rows via Message parts
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Empty state
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Render{" "}
          <code className="font-mono text-sm">ConversationEmptyState</code>{" "}
          when the thread has no messages yet.
        </p>
        <ComponentPreview
          code={emptySnippet}
          previewClassName="min-h-72 p-0 sm:p-0"
        >
          <ConversationEmptyDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Scroll button
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Scroll up in the preview to reveal{" "}
          <code className="font-mono text-sm">ConversationScrollButton</code>.
        </p>
        <ComponentPreview
          code={scrollSnippet}
          previewClassName="min-h-[28rem] p-0 sm:p-0"
        >
          <ConversationScrollDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Download</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use{" "}
          <code className="font-mono text-sm">ConversationDownload</code> to
          export the thread as Markdown. Pass plain{" "}
          <code className="font-mono text-sm">{"{ role, text }"}</code> messages
          - no AI SDK types required.
        </p>
        <ComponentPreview
          code={downloadSnippet}
          previewClassName="min-h-80 p-0 sm:p-0"
        >
          <ConversationDownloadDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Typing</h2>
        <p className="leading-relaxed text-muted-foreground">
          Show a peer typing indicator with{" "}
          <code className="font-mono text-sm">Marker</code> while the shell
          stays stuck to the bottom.
        </p>
        <ComponentPreview
          code={typingSnippet}
          previewClassName="min-h-72 p-0 sm:p-0"
        >
          <ConversationTypingDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Generating
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Before the first token arrives, render a spinner status row inside
          the transcript.
        </p>
        <ComponentPreview
          code={generatingSnippet}
          previewClassName="min-h-72 p-0 sm:p-0"
        >
          <ConversationGeneratingDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Streaming
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Grow a single assistant bubble as tokens arrive. Offer Stop while
          streaming, then switch to copy and feedback actions when done.
        </p>
        <ComponentPreview
          code={tokenStreamSnippet}
          previewClassName="min-h-80 p-0 sm:p-0"
        >
          <ConversationTokenStreamDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Stopped</h2>
        <p className="leading-relaxed text-muted-foreground">
          When the user stops generation mid-reply, keep the partial text and
          offer a continue control.
        </p>
        <ComponentPreview
          code={stoppedSnippet}
          previewClassName="min-h-72 p-0 sm:p-0"
        >
          <ConversationStoppedDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Failed turns
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Cover both failed user sends and failed model generations with retry
          actions.
        </p>
        <ComponentPreview
          code={failedSnippet}
          previewClassName="min-h-[26rem] p-0 sm:p-0"
        >
          <ConversationFailedDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Attachments
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Nest{" "}
          <code className="font-mono text-sm">Attachment</code> under{" "}
          <code className="font-mono text-sm">MessageContent</code> for files
          sent by the user or returned by the assistant.
        </p>
        <ComponentPreview
          code={attachmentSnippet}
          previewClassName="min-h-[26rem] p-0 sm:p-0"
        >
          <ConversationAttachmentDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Response actions
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          After a completed assistant turn, expose copy, feedback, and
          regenerate in the message footer.
        </p>
        <ComponentPreview
          code={actionsSnippet}
          previewClassName="min-h-80 p-0 sm:p-0"
        >
          <ConversationActionsDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Message groups
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Nest{" "}
          <code className="font-mono text-sm">MessageGroup</code> for stacked
          turns from the same sender. Use a separator marker for day breaks.
          Empty{" "}
          <code className="font-mono text-sm">MessageAvatar</code> keeps earlier
          bubbles aligned with the final avatar.
        </p>
        <ComponentPreview
          code={groupSnippet}
          previewClassName="min-h-[26rem] p-0 sm:p-0"
        >
          <ConversationGroupDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Live thread
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          As whole messages append, the shell follows the latest turn. Scroll
          away to reveal the jump button.
        </p>
        <ComponentPreview
          code={liveSnippet}
          previewClassName="min-h-[28rem] p-0 sm:p-0"
        >
          <ConversationLiveDemo />
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Conversation
          </h3>
          <PropsTable data={conversationPropRows} />
        </div>
        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            ConversationContent
          </h3>
          <PropsTable data={conversationContentPropRows} />
        </div>
        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            ConversationEmptyState
          </h3>
          <PropsTable data={conversationEmptyPropRows} />
        </div>
        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            ConversationScrollButton
          </h3>
          <PropsTable data={conversationScrollPropRows} />
        </div>
        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            ConversationDownload
          </h3>
          <PropsTable data={conversationDownloadPropRows} />
        </div>
      </section>
    </article>
  )
}
