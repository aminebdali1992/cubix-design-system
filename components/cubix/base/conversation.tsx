"use client"

import * as React from "react"
import { ArrowDownIcon, DownloadIcon } from "lucide-react"
import { StickToBottom, useStickToBottomContext } from "use-stick-to-bottom"

import { Button } from "@/components/cubix/button"
import { cn } from "@/lib/utils"

function Conversation({
  className,
  ...props
}: React.ComponentProps<typeof StickToBottom>) {
  return (
    <StickToBottom
      data-slot="conversation"
      className={cn("relative flex-1 overflow-y-hidden", className)}
      initial="smooth"
      resize="smooth"
      role="log"
      aria-live="polite"
      {...props}
    />
  )
}

function ConversationContent({
  className,
  ...props
}: React.ComponentProps<typeof StickToBottom.Content>) {
  return (
    <StickToBottom.Content
      data-slot="conversation-content"
      className={cn("flex flex-col gap-8 p-4", className)}
      {...props}
      scrollClassName={cn("cubix-scrollbar", props.scrollClassName)}
    />
  )
}

function ConversationEmptyState({
  className,
  title = "No messages yet",
  description = "Start a conversation to see messages here.",
  icon,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  title?: string
  description?: string
  icon?: React.ReactNode
}) {
  return (
    <div
      data-slot="conversation-empty-state"
      className={cn(
        "flex size-full flex-col items-center justify-center gap-3 p-8 text-center",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          {icon ? (
            <div className="text-muted-foreground [&_svg:not([class*='size-'])]:size-6">
              {icon}
            </div>
          ) : null}
          <div className="space-y-1">
            <h3 className="text-caption font-medium">{title}</h3>
            {description ? (
              <p className="text-caption text-muted-foreground">{description}</p>
            ) : null}
          </div>
        </>
      )}
    </div>
  )
}

function ConversationScrollButton({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext()

  const handleScrollToBottom = React.useCallback(() => {
    void scrollToBottom()
  }, [scrollToBottom])

  if (isAtBottom) {
    return null
  }

  return (
    <Button
      data-slot="conversation-scroll-button"
      type="button"
      variant="outline"
      size="icon"
      aria-label="Scroll to latest message"
      className={cn(
        "absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full dark:bg-background dark:hover:bg-muted",
        className
      )}
      onClick={handleScrollToBottom}
      {...props}
    >
      <ArrowDownIcon className="size-4" />
    </Button>
  )
}

type ConversationMessage = {
  role: string
  text: string
}

function messagesToMarkdown(
  messages: ConversationMessage[],
  formatMessage: (
    message: ConversationMessage,
    index: number
  ) => string = (message) => {
    const role = message.role.charAt(0).toUpperCase() + message.role.slice(1)
    return `**${role}:** ${message.text}`
  }
) {
  return messages
    .map((message, index) => formatMessage(message, index))
    .join("\n\n")
}

function ConversationDownload({
  messages,
  filename = "conversation.md",
  formatMessage,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "onClick"> & {
  messages: ConversationMessage[]
  filename?: string
  formatMessage?: (message: ConversationMessage, index: number) => string
}) {
  const handleDownload = React.useCallback(() => {
    const markdown = messagesToMarkdown(messages, formatMessage)
    const blob = new Blob([markdown], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.append(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }, [messages, filename, formatMessage])

  return (
    <Button
      data-slot="conversation-download"
      type="button"
      variant="outline"
      size="icon"
      aria-label="Download conversation"
      title="Download conversation"
      className={cn(
        "absolute top-4 end-4 z-10 rounded-full dark:bg-background dark:hover:bg-muted",
        className
      )}
      onClick={handleDownload}
      {...props}
    >
      {children ?? <DownloadIcon className="size-4" />}
    </Button>
  )
}

export {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
  ConversationDownload,
  messagesToMarkdown,
  type ConversationMessage,
}
