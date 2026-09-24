"use client"

import * as React from "react"
import {
  BotIcon,
  CircleAlertIcon,
  CopyIcon,
  DownloadIcon,
  FileTextIcon,
  MessageSquareIcon,
  RefreshCwIcon,
  SquareIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "lucide-react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/cubix/attachment"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/cubix/avatar"
import {
  Bubble,
  BubbleContent,
  BubbleReactions,
} from "@/components/cubix/bubble"
import { Button } from "@/components/cubix/button"
import {
  Conversation,
  ConversationContent,
  ConversationDownload,
  ConversationEmptyState,
  ConversationScrollButton,
  type ConversationMessage,
} from "@/components/cubix/conversation"
import { Marker, MarkerContent, MarkerIcon } from "@/components/cubix/marker"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/cubix/message"
import { StreamingText } from "@/components/cubix/streaming-text"
import { Spinner } from "@/components/cubix/spinner"

const demoMessages: ConversationMessage[] = [
  { role: "assistant", text: "How can I help you today?" },
  { role: "user", text: "Summarize the latest deploy notes." },
  {
    role: "assistant",
    text: "Deploy shipped with the conversation shell, scroll-to-latest, and Markdown export.",
  },
]

const longThread: ConversationMessage[] = [
  { role: "user", text: "Can you walk me through the release checklist?" },
  {
    role: "assistant",
    text: "Sure. Start with the changelog, then run the smoke suite.",
  },
  { role: "user", text: "What about migrations?" },
  {
    role: "assistant",
    text: "Run them before traffic cutover, and keep a rollback script ready.",
  },
  { role: "user", text: "And monitoring?" },
  {
    role: "assistant",
    text: "Watch error rate, latency p95, and queue depth for the first hour.",
  },
  { role: "user", text: "Perfect. Anything else?" },
  {
    role: "assistant",
    text: "Post a short status update once the cutover is stable.",
  },
  { role: "user", text: "Thanks - I'll start with the changelog." },
  {
    role: "assistant",
    text: "Sounds good. Ping me if anything in the smoke suite fails.",
  },
  { role: "user", text: "One more thing - who owns the rollback?" },
  {
    role: "assistant",
    text: "Ops owns rollback. Keep the previous image tagged and ready.",
  },
]

const liveScript: ConversationMessage[] = [
  { role: "user", text: "Hello, how are you?" },
  {
    role: "assistant",
    text: "I'm good, thank you! How can I assist you today?",
  },
  { role: "user", text: "Walk me through a quick deploy check." },
  {
    role: "assistant",
    text: "Sure. Confirm the changelog, run smoke tests, then watch latency.",
  },
  { role: "user", text: "What should I watch first?" },
  {
    role: "assistant",
    text: "Error rate and p95 latency for the first fifteen minutes.",
  },
  { role: "user", text: "Got it. Thanks!" },
  {
    role: "assistant",
    text: "You're welcome. Ping me if anything spikes.",
  },
]

const streamFullText =
  "Deploy looks healthy. Error rate is flat, p95 is under 180ms, and the queue depth stayed below ten for the first hour."

function UserAvatar() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/evilrabbit.png" alt="User" />
      <AvatarFallback>ER</AvatarFallback>
    </Avatar>
  )
}

function AssistantAvatar() {
  return (
    <Avatar>
      <AvatarFallback className="bg-foreground text-background">
        <BotIcon className="size-4" />
      </AvatarFallback>
    </Avatar>
  )
}

function ConversationFrame({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={
        className ??
        "flex h-[28rem] w-full flex-col overflow-hidden bg-background"
      }
    >
      {children}
    </div>
  )
}

function ThreadMessage({
  message,
  index,
  withMeta = false,
  showReaction = false,
  showActions = false,
}: {
  message: ConversationMessage
  index: number
  withMeta?: boolean
  showReaction?: boolean
  showActions?: boolean
}) {
  const isUser = message.role === "user"

  return (
    <Message align={isUser ? "end" : "start"}>
      <MessageAvatar>
        {isUser ? <UserAvatar /> : <AssistantAvatar />}
      </MessageAvatar>
      <MessageContent>
        {!isUser && withMeta && index === 0 ? (
          <MessageHeader>Oliver</MessageHeader>
        ) : null}
        <Bubble variant={isUser ? "default" : "muted"}>
          <BubbleContent>{message.text}</BubbleContent>
          {showReaction ? (
            <BubbleReactions aria-label="Reactions: heart">
              <span>❤️</span>
            </BubbleReactions>
          ) : null}
        </Bubble>
        {withMeta && index === 0 ? (
          <MessageFooter>It&apos;s 4:55 PM</MessageFooter>
        ) : null}
        {withMeta && isUser && index === 1 ? (
          <MessageFooter>Delivered</MessageFooter>
        ) : null}
        {showActions && !isUser ? (
          <MessageFooter className="gap-1">
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label="Copy message"
              title="Copy"
            >
              <CopyIcon />
            </Button>
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label="Good response"
              title="Like"
            >
              <ThumbsUpIcon />
            </Button>
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label="Bad response"
              title="Dislike"
            >
              <ThumbsDownIcon />
            </Button>
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label="Regenerate"
              title="Regenerate"
            >
              <RefreshCwIcon />
            </Button>
          </MessageFooter>
        ) : null}
      </MessageContent>
    </Message>
  )
}

function ThreadMessages({
  messages,
  withMeta = false,
  showActionsOnLast = false,
}: {
  messages: ConversationMessage[]
  withMeta?: boolean
  showActionsOnLast?: boolean
}) {
  return messages.map((message, index) => (
    <ThreadMessage
      key={`${message.role}-${index}-${message.text.slice(0, 12)}`}
      message={message}
      index={index}
      withMeta={withMeta}
      showReaction={
        withMeta &&
        message.role === "assistant" &&
        index === messages.length - 1
      }
      showActions={
        showActionsOnLast &&
        message.role === "assistant" &&
        index === messages.length - 1
      }
    />
  ))
}

export function ConversationDemo() {
  return (
    <ConversationFrame>
      <Conversation className="min-h-0">
        <ConversationContent>
          <ThreadMessages messages={demoMessages} withMeta />
          <Marker role="status">
            <MarkerContent className="shimmer">
              <span className="font-medium">Oliver</span> is typing...
            </MarkerContent>
          </Marker>
        </ConversationContent>
        <ConversationDownload messages={demoMessages} />
        <ConversationScrollButton />
      </Conversation>
    </ConversationFrame>
  )
}

export function ConversationEmptyDemo() {
  return (
    <ConversationFrame className="flex h-72 w-full flex-col overflow-hidden bg-background">
      <Conversation className="min-h-0">
        <ConversationContent className="min-h-full justify-center">
          <ConversationEmptyState
            icon={<MessageSquareIcon />}
            title="Start a conversation"
            description="Type a message below to begin chatting."
          />
        </ConversationContent>
      </Conversation>
    </ConversationFrame>
  )
}

export function ConversationScrollDemo() {
  return (
    <ConversationFrame>
      <Conversation className="min-h-0">
        <ConversationContent>
          <ThreadMessages messages={longThread} />
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
    </ConversationFrame>
  )
}

export function ConversationDownloadDemo() {
  return (
    <ConversationFrame className="flex h-80 w-full flex-col overflow-hidden bg-background">
      <Conversation className="min-h-0">
        <ConversationContent>
          <ThreadMessages messages={demoMessages} />
        </ConversationContent>
        <ConversationDownload messages={demoMessages} />
        <ConversationScrollButton />
      </Conversation>
    </ConversationFrame>
  )
}

export function ConversationTypingDemo() {
  return (
    <ConversationFrame className="flex h-72 w-full flex-col overflow-hidden bg-background">
      <Conversation className="min-h-0">
        <ConversationContent>
          <Message align="end">
            <MessageAvatar>
              <UserAvatar />
            </MessageAvatar>
            <MessageContent>
              <Bubble>
                <BubbleContent>Summarize the latest deploy notes.</BubbleContent>
              </Bubble>
              <MessageFooter>Delivered</MessageFooter>
            </MessageContent>
          </Message>
          <Marker role="status">
            <MarkerContent className="shimmer">
              <span className="font-medium">Oliver</span> is typing...
            </MarkerContent>
          </Marker>
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
    </ConversationFrame>
  )
}

export function ConversationGeneratingDemo() {
  return (
    <ConversationFrame className="flex h-72 w-full flex-col overflow-hidden bg-background">
      <Conversation className="min-h-0">
        <ConversationContent>
          <Message align="end">
            <MessageAvatar>
              <UserAvatar />
            </MessageAvatar>
            <MessageContent>
              <Bubble>
                <BubbleContent>Check the deploy logs for timeouts.</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
          <Message>
            <Marker role="status">
              <MarkerIcon>
                <Spinner />
              </MarkerIcon>
              <MarkerContent className="shimmer">
                Generating a response...
              </MarkerContent>
            </Marker>
          </Message>
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
    </ConversationFrame>
  )
}

export function ConversationTokenStreamDemo() {
  const [text, setText] = React.useState("")
  const [done, setDone] = React.useState(false)

  React.useEffect(() => {
    let index = 0
    setText("")
    setDone(false)

    const interval = window.setInterval(() => {
      index += 1
      setText(streamFullText.slice(0, index))
      if (index >= streamFullText.length) {
        setDone(true)
        window.clearInterval(interval)
      }
    }, 18)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <ConversationFrame className="flex h-80 w-full flex-col overflow-hidden bg-background">
      <Conversation className="min-h-0">
        <ConversationContent>
          <Message align="end">
            <MessageAvatar>
              <UserAvatar />
            </MessageAvatar>
            <MessageContent>
              <Bubble>
                <BubbleContent>How does the deploy look so far?</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
          <Message>
            <MessageAvatar>
              <AssistantAvatar />
            </MessageAvatar>
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>
                  <StreamingText isStreaming={!done}>{text}</StreamingText>
                </BubbleContent>
              </Bubble>
              {done ? (
                <MessageFooter className="gap-1">
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    aria-label="Copy message"
                    title="Copy"
                  >
                    <CopyIcon />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    aria-label="Good response"
                    title="Like"
                  >
                    <ThumbsUpIcon />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    aria-label="Bad response"
                    title="Dislike"
                  >
                    <ThumbsDownIcon />
                  </Button>
                </MessageFooter>
              ) : (
                <MessageFooter>
                  <Button
                    variant="ghost"
                    size="xs"
                    aria-label="Stop generating"
                  >
                    <SquareIcon className="size-3 fill-current" />
                    Stop
                  </Button>
                </MessageFooter>
              )}
            </MessageContent>
          </Message>
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
    </ConversationFrame>
  )
}

export function ConversationStoppedDemo() {
  return (
    <ConversationFrame className="flex h-72 w-full flex-col overflow-hidden bg-background">
      <Conversation className="min-h-0">
        <ConversationContent>
          <Message align="end">
            <MessageAvatar>
              <UserAvatar />
            </MessageAvatar>
            <MessageContent>
              <Bubble>
                <BubbleContent>
                  Write a long postmortem for the outage.
                </BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
          <Message>
            <MessageAvatar>
              <AssistantAvatar />
            </MessageAvatar>
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>
                  At 14:12 UTC the API gateway started returning 502s after the
                  canary rollout...
                </BubbleContent>
              </Bubble>
              <MessageFooter className="gap-2">
                <span className="font-normal text-muted-foreground">
                  Generation stopped
                </span>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Continue generating"
                  title="Continue"
                >
                  <RefreshCwIcon />
                </Button>
              </MessageFooter>
            </MessageContent>
          </Message>
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
    </ConversationFrame>
  )
}

export function ConversationFailedDemo() {
  return (
    <ConversationFrame className="flex h-[26rem] w-full flex-col overflow-hidden bg-background">
      <Conversation className="min-h-0">
        <ConversationContent>
          <Message align="end">
            <MessageAvatar>
              <UserAvatar />
            </MessageAvatar>
            <MessageContent>
              <Bubble>
                <BubbleContent>Retry the failed install for me.</BubbleContent>
              </Bubble>
              <MessageFooter className="gap-2">
                <span className="font-normal text-destructive">
                  Failed to send
                </span>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  title="Retry"
                  aria-label="Retry"
                >
                  <RefreshCwIcon />
                </Button>
              </MessageFooter>
            </MessageContent>
          </Message>
          <Message>
            <MessageAvatar>
              <AssistantAvatar />
            </MessageAvatar>
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>I started the retry.</BubbleContent>
              </Bubble>
              <Bubble variant="destructive">
                <BubbleContent className="flex items-start gap-2">
                  <CircleAlertIcon className="mt-0.5 size-4 shrink-0" />
                  <div className="min-w-0 space-y-0.5">
                    <p className="font-medium leading-snug">
                      Generation failed
                    </p>
                    <p className="text-sm leading-snug opacity-80">
                      The model timed out after 30s. Try again.
                    </p>
                  </div>
                </BubbleContent>
              </Bubble>
              <MessageFooter className="gap-1">
                <Button
                  variant="ghost"
                  size="xs"
                  aria-label="Regenerate response"
                >
                  <RefreshCwIcon className="size-3.5" />
                  Retry
                </Button>
              </MessageFooter>
            </MessageContent>
          </Message>
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
    </ConversationFrame>
  )
}

export function ConversationAttachmentDemo() {
  return (
    <ConversationFrame className="flex h-[26rem] w-full flex-col overflow-hidden bg-background">
      <Conversation className="min-h-0">
        <ConversationContent>
          <Message align="end">
            <MessageAvatar>
              <UserAvatar />
            </MessageAvatar>
            <MessageContent>
              <Bubble>
                <BubbleContent>
                  Can you add a cover page to this report?
                </BubbleContent>
              </Bubble>
              <Attachment state="done">
                <AttachmentMedia>
                  <FileTextIcon />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
                  <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
                </AttachmentContent>
              </Attachment>
            </MessageContent>
          </Message>
          <Message>
            <MessageAvatar>
              <AssistantAvatar />
            </MessageAvatar>
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>
                  Done. Here&apos;s the PDF with the image added as the cover
                  page.
                </BubbleContent>
              </Bubble>
              <Attachment state="done">
                <AttachmentMedia>
                  <FileTextIcon />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
                  <AttachmentDescription>PDF · 2.6 MB</AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  <AttachmentAction
                    type="button"
                    title="Download"
                    aria-label="Download"
                    size="icon-sm"
                    variant="secondary"
                  >
                    <DownloadIcon />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>
              <MessageFooter className="gap-1">
                <Button
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Copy message"
                  title="Copy"
                >
                  <CopyIcon />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Good response"
                  title="Like"
                >
                  <ThumbsUpIcon />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Bad response"
                  title="Dislike"
                >
                  <ThumbsDownIcon />
                </Button>
              </MessageFooter>
            </MessageContent>
          </Message>
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
    </ConversationFrame>
  )
}

export function ConversationActionsDemo() {
  return (
    <ConversationFrame className="flex h-80 w-full flex-col overflow-hidden bg-background">
      <Conversation className="min-h-0">
        <ConversationContent>
          <ThreadMessages messages={demoMessages} showActionsOnLast />
        </ConversationContent>
        <ConversationDownload messages={demoMessages} />
        <ConversationScrollButton />
      </Conversation>
    </ConversationFrame>
  )
}

export function ConversationGroupDemo() {
  return (
    <ConversationFrame className="flex h-[26rem] w-full flex-col overflow-hidden bg-background">
      <Conversation className="min-h-0">
        <ConversationContent>
          <Marker variant="separator" role="separator">
            <MarkerContent>Today</MarkerContent>
          </Marker>
          <MessageGroup>
            <Message>
              <MessageAvatar />
              <MessageContent>
                <Bubble variant="muted">
                  <BubbleContent>I checked the registry addresses.</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
            <Message>
              <MessageAvatar>
                <AssistantAvatar />
              </MessageAvatar>
              <MessageContent>
                <Bubble variant="muted">
                  <BubbleContent>
                    They look correct. Want me to retry the install?
                  </BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
          </MessageGroup>
          <Message align="end">
            <MessageAvatar>
              <UserAvatar />
            </MessageAvatar>
            <MessageContent>
              <Bubble>
                <BubbleContent>Yes, please retry it.</BubbleContent>
              </Bubble>
              <MessageFooter>Delivered</MessageFooter>
            </MessageContent>
          </Message>
          <Message>
            <MessageAvatar>
              <AssistantAvatar />
            </MessageAvatar>
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>Retrying now. I&apos;ll report back.</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
    </ConversationFrame>
  )
}

export function ConversationLiveDemo() {
  const [visibleMessages, setVisibleMessages] = React.useState<
    ConversationMessage[]
  >([])

  React.useEffect(() => {
    let currentIndex = 0
    setVisibleMessages([])

    const interval = window.setInterval(() => {
      if (currentIndex < liveScript.length) {
        const next = liveScript[currentIndex]
        if (next) {
          setVisibleMessages((prev) => [...prev, next])
        }
        currentIndex += 1
      } else {
        window.clearInterval(interval)
      }
    }, 650)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <ConversationFrame>
      <Conversation className="min-h-0">
        <ConversationContent>
          {visibleMessages.length === 0 ? (
            <ConversationEmptyState
              icon={<MessageSquareIcon />}
              title="Start a conversation"
              description="Messages will appear here as the thread progresses."
            />
          ) : (
            <ThreadMessages messages={visibleMessages} />
          )}
        </ConversationContent>
        <ConversationDownload messages={visibleMessages} />
        <ConversationScrollButton />
      </Conversation>
    </ConversationFrame>
  )
}

/** @deprecated Use ConversationLiveDemo */
export const ConversationStreamingDemo = ConversationLiveDemo
