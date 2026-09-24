"use client"

import * as React from "react"
import { BotIcon } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/cubix/avatar"
import { Bubble, BubbleContent } from "@/components/cubix/bubble"
import { Button } from "@/components/cubix/button"
import { Marker, MarkerContent } from "@/components/cubix/marker"
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/cubix/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
} from "@/components/cubix/message-scroller"

type DemoMessage = {
  id: string
  role: "user" | "assistant" | "system"
  text: string
}

const seedThread: DemoMessage[] = [
  {
    id: "m1",
    role: "assistant",
    text: "How can I help you today?",
  },
  {
    id: "m2",
    role: "user",
    text: "I'm building a chat and the scroll jumps while the model streams.",
  },
  {
    id: "m3",
    role: "assistant",
    text: "Anchor each user turn, enable autoScroll for the live edge, and keep a peek of the previous item.",
  },
  {
    id: "m4",
    role: "user",
    text: "What about reopening a saved transcript?",
  },
  {
    id: "m5",
    role: "assistant",
    text: "Open on last-anchor so the reader lands on the last meaningful turn, not the absolute bottom.",
  },
]

const historyBatch: DemoMessage[] = [
  {
    id: "h1",
    role: "user",
    text: "Only the export queue worker changed in the last deploy.",
  },
  {
    id: "h2",
    role: "assistant",
    text: "The deploy moved large CSV jobs onto the shared retry policy.",
  },
  {
    id: "h3",
    role: "user",
    text: "Do we need to roll back?",
  },
  {
    id: "h4",
    role: "assistant",
    text: "Not yet. Queue depth is recovering after we reduced retry concurrency.",
  },
]

const openingThread: DemoMessage[] = [
  {
    id: "o1",
    role: "user",
    text: "This is the first message the user sent in the conversation.",
  },
  {
    id: "o2",
    role: "assistant",
    text: "Workspace creation rose 8%, but first invite completion only rose 2%.",
  },
  {
    id: "o3",
    role: "user",
    text: "This is the last message the user sent in the conversation.",
  },
  {
    id: "o4",
    role: "assistant",
    text: "Start with the invite step. Teams create workspaces but wait to add collaborators.",
  },
  {
    id: "o5",
    role: "assistant",
    text: "Recommended follow-up: compare invite drop-off by account size, check 24-hour return, and segment by template.",
  },
]

const jumpThread: DemoMessage[] = [
  {
    id: "j1",
    role: "user",
    text: "We're seeing activation dip after workspace creation.",
  },
  {
    id: "j2",
    role: "assistant",
    text: "The sharpest drop is between creating the workspace and inviting the first teammate.",
  },
  {
    id: "j3",
    role: "user",
    text: "What should I compare before we change onboarding?",
  },
  {
    id: "j4",
    role: "assistant",
    text: "Compare template users, blank-workspace users, and users who skip invites then return within 24 hours.",
  },
  {
    id: "j5",
    role: "user",
    text: "Can you turn that into an experiment?",
  },
  {
    id: "j6",
    role: "assistant",
    text: "Yes. Show a short checklist after workspace creation, then measure first invite completion.",
  },
]

const streamFullText =
  "That's the classic streaming scroll problem. With autoScroll enabled, the viewport follows tokens only while the reader stays at the live edge. Scroll away and the position is preserved."

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

function ScrollerShell({
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

function ThreadRow({
  message,
  anchorRole = "user",
}: {
  message: DemoMessage
  anchorRole?: "user" | "assistant" | "system"
}) {
  if (message.role === "system") {
    return (
      <MessageScrollerItem
        messageId={message.id}
        scrollAnchor={anchorRole === "system"}
      >
        <Marker variant="separator" role="status">
          <MarkerContent>{message.text}</MarkerContent>
        </Marker>
      </MessageScrollerItem>
    )
  }

  const isUser = message.role === "user"

  return (
    <MessageScrollerItem
      messageId={message.id}
      scrollAnchor={message.role === anchorRole}
    >
      <Message align={isUser ? "end" : "start"}>
        <MessageAvatar>
          {isUser ? <UserAvatar /> : <AssistantAvatar />}
        </MessageAvatar>
        <MessageContent>
          <Bubble variant={isUser ? "default" : "muted"}>
            <BubbleContent>{message.text}</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </MessageScrollerItem>
  )
}

function Transcript({
  messages,
  anchorRole = "user",
}: {
  messages: DemoMessage[]
  anchorRole?: "user" | "assistant" | "system"
}) {
  return messages.map((message) => (
    <ThreadRow key={message.id} message={message} anchorRole={anchorRole} />
  ))
}

function nextId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`
}

export function MessageScrollerDemo() {
  return (
    <ScrollerShell>
      <MessageScrollerProvider autoScroll scrollPreviousItemPeek={48}>
        <MessageScroller className="min-h-0 flex-1">
          <MessageScrollerViewport>
            <MessageScrollerContent className="px-4 py-6">
              <Transcript messages={seedThread} />
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton direction="start" />
          <MessageScrollerButton direction="end" />
        </MessageScroller>
      </MessageScrollerProvider>
    </ScrollerShell>
  )
}

export function MessageScrollerAnchorDemo() {
  const [anchorRole, setAnchorRole] = React.useState<"user" | "assistant">(
    "user"
  )
  const [messages, setMessages] = React.useState<DemoMessage[]>([
    {
      id: "a0",
      role: "assistant",
      text: "Send a message to see the selected role settle near the top.",
    },
  ])

  const sendTurn = () => {
    setMessages((prev) => [
      ...prev,
      {
        id: nextId("u"),
        role: "user",
        text: "Can you keep the new turn readable from the start?",
      },
      {
        id: nextId("a"),
        role: "assistant",
        text: "Yes. The anchored row moves near the top, with a peek of the previous turn above it.",
      },
    ])
  }

  return (
    <ScrollerShell className="flex h-[30rem] w-full flex-col overflow-hidden bg-background">
      <MessageScrollerProvider scrollPreviousItemPeek={64}>
        <div className="flex size-full min-h-0 flex-col">
          <MessageScroller className="min-h-0 flex-1">
            <MessageScrollerViewport>
              <MessageScrollerContent className="px-4 py-6">
                <Transcript messages={messages} anchorRole={anchorRole} />
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton direction="end" />
          </MessageScroller>
          <div className="flex shrink-0 flex-wrap items-center gap-2 border-t px-3 py-2">
            <Button
              size="xs"
              variant={anchorRole === "user" ? "default" : "outline"}
              onClick={() => setAnchorRole("user")}
            >
              Anchor user
            </Button>
            <Button
              size="xs"
              variant={anchorRole === "assistant" ? "default" : "outline"}
              onClick={() => setAnchorRole("assistant")}
            >
              Anchor assistant
            </Button>
            <Button size="xs" variant="secondary" onClick={sendTurn}>
              Send turn
            </Button>
          </div>
        </div>
      </MessageScrollerProvider>
    </ScrollerShell>
  )
}

export function MessageScrollerAutoScrollDemo() {
  const [messages, setMessages] = React.useState<DemoMessage[]>([
    {
      id: "s0",
      role: "user",
      text: "Show me streaming follow-output without fighting my scroll.",
    },
    {
      id: "s1",
      role: "assistant",
      text: "",
    },
  ])

  React.useEffect(() => {
    let index = 0
    const interval = window.setInterval(() => {
      index += 1
      setMessages((prev) =>
        prev.map((message) =>
          message.id === "s1"
            ? { ...message, text: streamFullText.slice(0, index) }
            : message
        )
      )
      if (index >= streamFullText.length) {
        window.clearInterval(interval)
      }
    }, 22)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <ScrollerShell className="flex h-80 w-full flex-col overflow-hidden bg-background">
      <MessageScrollerProvider autoScroll>
        <MessageScroller className="min-h-0 flex-1">
          <MessageScrollerViewport>
            <MessageScrollerContent className="px-4 py-6">
              <Transcript messages={messages} />
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton direction="end" />
        </MessageScroller>
      </MessageScrollerProvider>
    </ScrollerShell>
  )
}

export function MessageScrollerOpeningDemo() {
  return (
    <ScrollerShell>
      <MessageScrollerProvider
        defaultScrollPosition="last-anchor"
        scrollPreviousItemPeek={48}
      >
        <MessageScroller className="min-h-0 flex-1">
          <MessageScrollerViewport>
            <MessageScrollerContent className="px-4 py-6">
              <Transcript messages={openingThread} />
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton direction="start" />
          <MessageScrollerButton direction="end" />
        </MessageScroller>
      </MessageScrollerProvider>
    </ScrollerShell>
  )
}

export function MessageScrollerHistoryDemo() {
  const [messages, setMessages] = React.useState<DemoMessage[]>(seedThread)
  const [loaded, setLoaded] = React.useState(false)

  const loadEarlier = () => {
    if (loaded) return
    setMessages((prev) => [...historyBatch, ...prev])
    setLoaded(true)
  }

  return (
    <ScrollerShell>
      <MessageScrollerProvider
        defaultScrollPosition="end"
        scrollPreviousItemPeek={48}
      >
        <div className="flex size-full min-h-0 flex-col">
          <MessageScroller className="min-h-0 flex-1">
            <MessageScrollerViewport>
              <MessageScrollerContent className="px-4 py-6">
                <Transcript messages={messages} />
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton direction="start" />
            <MessageScrollerButton direction="end" />
          </MessageScroller>
          <div className="shrink-0 border-t px-3 py-2">
            <Button
              size="xs"
              variant="outline"
              disabled={loaded}
              onClick={loadEarlier}
            >
              {loaded ? "Earlier messages loaded" : "Load earlier messages"}
            </Button>
          </div>
        </div>
      </MessageScrollerProvider>
    </ScrollerShell>
  )
}

function JumpControls({ messages }: { messages: DemoMessage[] }) {
  const { scrollToMessage, scrollToEnd, scrollToStart } = useMessageScroller()
  const anchors = messages.filter((message) => message.role === "user")

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="xs" variant="outline" onClick={() => scrollToStart()}>
        Start
      </Button>
      {anchors.map((message, index) => (
        <Button
          key={message.id}
          size="xs"
          variant="outline"
          onClick={() => scrollToMessage(message.id)}
        >
          Turn {index + 1}
        </Button>
      ))}
      <Button size="xs" variant="outline" onClick={() => scrollToEnd()}>
        Latest
      </Button>
    </div>
  )
}

export function MessageScrollerJumpDemo() {
  return (
    <ScrollerShell>
      <MessageScrollerProvider scrollPreviousItemPeek={48}>
        <div className="flex size-full min-h-0 flex-col">
          <MessageScroller className="min-h-0 flex-1">
            <MessageScrollerViewport>
              <MessageScrollerContent className="px-4 py-6">
                <Transcript messages={jumpThread} />
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton direction="end" />
          </MessageScroller>
          <div className="shrink-0 border-t px-3 py-2">
            <JumpControls messages={jumpThread} />
          </div>
        </div>
      </MessageScrollerProvider>
    </ScrollerShell>
  )
}

function VisibilityOutline({ messages }: { messages: DemoMessage[] }) {
  const { currentAnchorId, visibleMessageIds } = useMessageScrollerVisibility()
  const { scrollToMessage } = useMessageScroller()
  const anchors = messages.filter((message) => message.role === "user")

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs text-muted-foreground">
        Current anchor:{" "}
        <span className="font-mono text-foreground">
          {currentAnchorId ?? "none"}
        </span>
        {" · "}
        Visible: {visibleMessageIds.length}
      </p>
      <div className="flex flex-wrap gap-2">
        {anchors.map((message, index) => (
          <Button
            key={message.id}
            size="xs"
            variant={currentAnchorId === message.id ? "default" : "outline"}
            onClick={() => scrollToMessage(message.id)}
          >
            Turn {index + 1}
          </Button>
        ))}
      </div>
    </div>
  )
}

export function MessageScrollerVisibilityDemo() {
  return (
    <ScrollerShell>
      <MessageScrollerProvider scrollPreviousItemPeek={48}>
        <div className="flex size-full min-h-0 flex-col">
          <MessageScroller className="min-h-0 flex-1">
            <MessageScrollerViewport>
              <MessageScrollerContent className="px-4 py-6">
                <Transcript messages={jumpThread} />
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton direction="end" />
          </MessageScroller>
          <div className="shrink-0 border-t px-3 py-2">
            <VisibilityOutline messages={jumpThread} />
          </div>
        </div>
      </MessageScrollerProvider>
    </ScrollerShell>
  )
}

function ScrollableFooter() {
  const { start, end } = useMessageScrollerScrollable()

  let label = "Both directions are available."
  if (!start && end) {
    label = "You are at the start. Scroll down for later turns."
  }
  if (start && !end) {
    label = "You are at the latest turn. Scroll up for earlier context."
  }
  if (!start && !end) {
    label = "The transcript fits in the viewport."
  }

  return <p className="text-xs text-muted-foreground">{label}</p>
}

export function MessageScrollerScrollableDemo() {
  return (
    <ScrollerShell className="flex h-72 w-full flex-col overflow-hidden bg-background">
      <MessageScrollerProvider>
        <div className="flex size-full min-h-0 flex-col">
          <MessageScroller className="min-h-0 flex-1">
            <MessageScrollerViewport>
              <MessageScrollerContent className="px-4 py-6">
                <Transcript messages={seedThread} />
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton direction="start" />
            <MessageScrollerButton direction="end" />
          </MessageScroller>
          <div className="shrink-0 border-t px-3 py-2">
            <ScrollableFooter />
          </div>
        </div>
      </MessageScrollerProvider>
    </ScrollerShell>
  )
}

export function MessageScrollerGroupDemo() {
  const [messages, setMessages] = React.useState<DemoMessage[]>([
    {
      id: "g1",
      role: "user",
      text: "@mary, the export line keeps matching Venus energy output.",
    },
    {
      id: "g2",
      role: "assistant",
      text: "I can check the math. Ping me again if Rocky joins.",
    },
  ])

  const addJoin = () => {
    setMessages((prev) => [
      ...prev,
      {
        id: nextId("join"),
        role: "system",
        text: "Marcus joined the chat",
      },
      {
        id: nextId("g"),
        role: "assistant",
        text: "Welcome Marcus. I will summarize the export thread so far.",
      },
    ])
  }

  return (
    <ScrollerShell>
      <MessageScrollerProvider scrollPreviousItemPeek={56}>
        <div className="flex size-full min-h-0 flex-col">
          <MessageScroller className="min-h-0 flex-1">
            <MessageScrollerViewport>
              <MessageScrollerContent className="px-4 py-6">
                <Transcript messages={messages} anchorRole="system" />
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton direction="end" />
          </MessageScroller>
          <div className="shrink-0 border-t px-3 py-2">
            <Button size="xs" variant="secondary" onClick={addJoin}>
              Marcus joins
            </Button>
          </div>
        </div>
      </MessageScrollerProvider>
    </ScrollerShell>
  )
}
