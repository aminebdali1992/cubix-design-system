import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  MessageActionsDemo,
  MessageAlignDemo,
  MessageAttachmentDemo,
  MessageDemo,
  MessageGroupDemo,
  MessageHeaderFooterDemo,
  MessageReactionsDemo,
  MessageTypingDemo,
} from "@/components/examples/message-examples"

import {
  messageAvatarPropRows,
  messageContentPropRows,
  messageFooterPropRows,
  messageGroupPropRows,
  messageHeaderPropRows,
  messagePropRows,
} from "./message-table-data"

const description =
  "Displays a message in a conversation, with optional avatar, header, footer, and alignment."

export const metadata: Metadata = {
  title: "Message",
  description,
}

const usageImport = `import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/cubix/avatar"
import { Bubble, BubbleContent } from "@/components/cubix/bubble"
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/cubix/message"`

const usageSnippet = `<Message>
  <MessageAvatar>
    <Avatar>
      <AvatarImage src="https://github.com/vercel.png" alt="@cx" />
      <AvatarFallback>CX</AvatarFallback>
    </Avatar>
  </MessageAvatar>
  <MessageContent>
    <Bubble>
      <BubbleContent>How can I help you today?</BubbleContent>
    </Bubble>
  </MessageContent>
</Message>`

const compositionSnippet = `Message
├── MessageAvatar
└── MessageContent
    ├── MessageHeader
    ├── Bubble
    └── MessageFooter`

const groupCompositionSnippet = `MessageGroup
├── Message
└── Message`

const demoSnippet = `<Message>
  <MessageAvatar>...</MessageAvatar>
  <MessageContent>
    <Bubble variant="secondary">
      <BubbleContent>How can I help you today?</BubbleContent>
    </Bubble>
    <MessageFooter>It's 4:55 PM. On a Friday.</MessageFooter>
  </MessageContent>
</Message>
<Marker role="status">
  <MarkerContent className="shimmer">
    <span className="font-medium">Oliver</span> is typing...
  </MarkerContent>
</Marker>`

const typingSnippet = `<Marker role="status">
  <MarkerContent className="shimmer">
    <span className="font-medium">Oliver</span> is typing...
  </MarkerContent>
</Marker>

<Message>
  <Marker role="status">
    <MarkerIcon>
      <Spinner />
    </MarkerIcon>
    <MarkerContent className="shimmer">Checking the logs...</MarkerContent>
  </Marker>
</Message>`

const reactionsSnippet = `<Bubble variant="muted">
  <BubbleContent>Alright, let me take a look.</BubbleContent>
  <BubbleReactions aria-label="Reactions: heart">
    <span>❤️</span>
  </BubbleReactions>
</Bubble>`

const alignSnippet = `<Bubble variant="destructive">
  <BubbleContent className="flex items-start gap-2">
    <CircleAlertIcon className="mt-0.5 size-4 shrink-0" />
    <div className="min-w-0 space-y-0.5">
      <p className="font-medium leading-snug">Deploy failed</p>
      <p className="text-sm leading-snug opacity-80">
        Timeout after 30s while reaching the API.
      </p>
    </div>
  </BubbleContent>
</Bubble>`

const groupSnippet = `<MessageGroup>
  <Message>
    <MessageAvatar />
    <MessageContent>
      <Bubble variant="secondary">
        <BubbleContent>I checked the registry addresses.</BubbleContent>
      </Bubble>
    </MessageContent>
  </Message>
  <Message>
    <MessageAvatar>...</MessageAvatar>
    <MessageContent>
      <Bubble variant="secondary">
        <BubbleContent>They look correct. Want me to retry the install?</BubbleContent>
      </Bubble>
    </MessageContent>
  </Message>
</MessageGroup>`

const headerFooterSnippet = `<Message>
  <MessageAvatar>...</MessageAvatar>
  <MessageContent>
    <MessageHeader>Oliver</MessageHeader>
    <Bubble variant="secondary">
      <BubbleContent>Send the report to the team.</BubbleContent>
    </Bubble>
    <MessageFooter>Delivered</MessageFooter>
  </MessageContent>
</Message>`

const actionsSnippet = `<Message align="end">
  <MessageContent>
    <Bubble>
      <BubbleContent>Okay drop me a link. Taking a look...</BubbleContent>
    </Bubble>
    <MessageFooter className="gap-2">
      <span className="font-normal text-destructive">Failed to send</span>
      <Button variant="ghost" size="icon-xs" aria-label="Retry">
        <RefreshCwIcon />
      </Button>
    </MessageFooter>
  </MessageContent>
</Message>`

const attachmentSnippet = `<Attachment state="done">
  <AttachmentMedia>
    <FileTextIcon />
  </AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
    <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
  </AttachmentContent>
  <AttachmentActions>
    <AttachmentAction
      type="button"
      aria-label="Download"
      size="icon-sm"
      variant="secondary"
    >
      <DownloadIcon />
    </AttachmentAction>
  </AttachmentActions>
</Attachment>`

export default function MessageDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Message"
        description={description}
        slug="message"
      />

      <p className="leading-relaxed text-muted-foreground">
        The{" "}
        <code className="font-mono text-sm">Message</code> component lays out a
        single message in a conversation. It handles the avatar, alignment,
        header, and footer around the message surface. Render the visible
        surface with{" "}
        <code className="font-mono text-sm">Bubble</code>.
      </p>

      <ComponentPreview code={demoSnippet} previewClassName="min-h-80">
        <MessageDemo />
      </ComponentPreview>

      <ComponentInstall name="message" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong>{" "}
            <code className="font-mono">Message</code> owns the row layout -
            avatar, alignment, header, and footer. Render the visible message
            surface inside it with{" "}
            <code className="font-mono">Bubble</code>.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Composition
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the following composition to build a message:
        </p>
        <CodeBlock code={compositionSnippet} />
        <p className="leading-relaxed text-muted-foreground">
          Use{" "}
          <code className="font-mono text-sm">MessageGroup</code> to stack
          consecutive messages from the same sender:
        </p>
        <CodeBlock code={groupCompositionSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Features</h2>
        <ul className="list-disc space-y-2 ps-5 text-muted-foreground">
          <li>
            Start and end alignment for sender and receiver rows via the{" "}
            <code className="font-mono text-sm">align</code> prop
          </li>
          <li>
            Avatar slot that anchors to the bottom of the message and stays
            clear of the footer
          </li>
          <li>
            Header and footer slots for sender names, status, and message
            actions
          </li>
          <li>
            Group wrapper for stacking consecutive messages from the same
            sender
          </li>
          <li>
            Customizable styling through the{" "}
            <code className="font-mono text-sm">className</code> prop on every
            part
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Avatar</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use{" "}
          <code className="font-mono text-sm">MessageAvatar</code> to render an
          avatar next to the message. Set{" "}
          <code className="font-mono text-sm">align=&quot;end&quot;</code> on
          the message to align the avatar to the end of the row.
        </p>
        <ComponentPreview code={alignSnippet} previewClassName="min-h-72">
          <MessageAlignDemo />
        </ComponentPreview>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="px-4 py-2 text-left font-medium">align</th>
                <th className="px-4 py-2 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2 font-mono text-xs">start</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Align the message to the start of the conversation.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">end</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Align the message to the end of the conversation.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Group</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use{" "}
          <code className="font-mono text-sm">MessageGroup</code> to stack
          consecutive messages from the same sender. Render an empty{" "}
          <code className="font-mono text-sm">MessageAvatar</code> on earlier
          messages to keep them aligned with the avatar on the last one.
        </p>
        <ComponentPreview code={groupSnippet} previewClassName="min-h-56">
          <MessageGroupDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Header and Footer
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Use{" "}
          <code className="font-mono text-sm">MessageHeader</code> for a sender
          name and{" "}
          <code className="font-mono text-sm">MessageFooter</code> for metadata
          such as a delivery or read status.
        </p>
        <ComponentPreview
          code={headerFooterSnippet}
          previewClassName="min-h-40"
        >
          <MessageHeaderFooterDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Actions</h2>
        <p className="leading-relaxed text-muted-foreground">
          Place message-level actions in{" "}
          <code className="font-mono text-sm">MessageFooter</code>, such as
          copy, retry, or feedback buttons. Give icon-only actions an{" "}
          <code className="font-mono text-sm">aria-label</code>. For a failed
          send, show{" "}
          <code className="font-mono text-sm">Failed to send</code> in{" "}
          <code className="font-mono text-sm">text-destructive</code> with a
          retry control.
        </p>
        <ComponentPreview code={actionsSnippet} previewClassName="min-h-56">
          <MessageActionsDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Attachment
        </h2>
        <ComponentPreview code={attachmentSnippet} previewClassName="min-h-48">
          <MessageAttachmentDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Status</h2>
        <p className="leading-relaxed text-muted-foreground">
          For typing indicators and in-progress updates, use a{" "}
          <code className="font-mono text-sm">Marker</code> with{" "}
          <code className="font-mono text-sm">role=&quot;status&quot;</code> so
          assistive tech announces the update as it appears.
        </p>
        <ComponentPreview code={typingSnippet} previewClassName="min-h-48">
          <MessageTypingDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Reactions
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Place{" "}
          <code className="font-mono text-sm">BubbleReactions</code> inside a{" "}
          <code className="font-mono text-sm">Bubble</code> to show emoji
          reactions on the message surface. Use{" "}
          <code className="font-mono text-sm">aria-label</code> to describe the
          reactions.
        </p>
        <ComponentPreview code={reactionsSnippet} previewClassName="min-h-48">
          <MessageReactionsDemo />
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Message</h3>
          <p className="text-sm text-muted-foreground">
            The message row wrapper.
          </p>
          <PropsTable data={messagePropRows} />
        </div>
        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            MessageGroup
          </h3>
          <p className="text-sm text-muted-foreground">
            Groups consecutive messages from the same sender.
          </p>
          <PropsTable data={messageGroupPropRows} />
        </div>
        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            MessageAvatar
          </h3>
          <p className="text-sm text-muted-foreground">
            The avatar slot, aligned to the bottom of the message.
          </p>
          <PropsTable data={messageAvatarPropRows} />
        </div>
        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            MessageContent
          </h3>
          <p className="text-sm text-muted-foreground">
            Wraps the header, message surface, and footer.
          </p>
          <PropsTable data={messageContentPropRows} />
        </div>
        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            MessageHeader
          </h3>
          <PropsTable data={messageHeaderPropRows} />
        </div>
        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            MessageFooter
          </h3>
          <PropsTable data={messageFooterPropRows} />
        </div>
      </section>
    </article>
  )
}
