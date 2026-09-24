"use client"

import {
  BotIcon,
  CircleAlertIcon,
  CopyIcon,
  DownloadIcon,
  FileTextIcon,
  RefreshCwIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/cubix/avatar"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/cubix/attachment"
import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "@/components/cubix/bubble"
import { Button } from "@/components/cubix/button"
import { Marker, MarkerContent, MarkerIcon } from "@/components/cubix/marker"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/cubix/message"
import { Spinner } from "@/components/cubix/spinner"

function UserAvatar() {
  return (
    <Avatar>
      <AvatarImage
        src="https://github.com/evilrabbit.png"
        alt="User"
      />
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

export function MessageDemo() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4">
      <Message>
        <MessageAvatar>
          <AssistantAvatar />
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="secondary">
            <BubbleContent>How can I help you today?</BubbleContent>
          </Bubble>
          <MessageFooter>It&apos;s 4:55 PM. On a Friday.</MessageFooter>
        </MessageContent>
      </Message>
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
      <Message>
        <MessageAvatar>
          <AssistantAvatar />
        </MessageAvatar>
        <MessageContent>
          <BubbleGroup>
            <Bubble variant="muted">
              <BubbleContent>
                It&apos;s always a one-line change.
              </BubbleContent>
            </Bubble>
            <Bubble variant="muted">
              <BubbleContent>Alright, let me take a look.</BubbleContent>
              <BubbleReactions aria-label="Reactions: heart">
                <span>❤️</span>
              </BubbleReactions>
            </Bubble>
          </BubbleGroup>
        </MessageContent>
      </Message>
      <Marker role="status">
        <MarkerContent className="shimmer">
          <span className="font-medium">Oliver</span> is typing...
        </MarkerContent>
      </Marker>
    </div>
  )
}

export function MessageReactionsDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Message>
        <MessageAvatar>
          <AssistantAvatar />
        </MessageAvatar>
        <MessageContent>
          <BubbleGroup>
            <Bubble variant="muted">
              <BubbleContent>
                Deploy shipped with the new message layout.
              </BubbleContent>
            </Bubble>
            <Bubble variant="muted">
              <BubbleContent>Alright, let me take a look.</BubbleContent>
              <BubbleReactions aria-label="Reactions: heart">
                <span>❤️</span>
              </BubbleReactions>
            </Bubble>
          </BubbleGroup>
        </MessageContent>
      </Message>
    </div>
  )
}

export function MessageTypingDemo() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4">
      <Message>
        <MessageAvatar>
          <AssistantAvatar />
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="secondary">
            <BubbleContent>Checking the deploy logs now.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Marker role="status">
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
      </Message>
    </div>
  )
}

export function MessageAlignDemo() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4">
      <Message>
        <MessageAvatar>
          <AssistantAvatar />
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="secondary">
            <BubbleContent>
              The build failed during dependency installation.
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageAvatar>
          <UserAvatar />
        </MessageAvatar>
        <MessageContent>
          <Bubble>
            <BubbleContent>Can you share the exact error?</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message>
        <MessageAvatar>
          <AssistantAvatar />
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="secondary">
            <BubbleContent>Here&apos;s the error from the logs</BubbleContent>
          </Bubble>
          <Bubble variant="destructive">
            <BubbleContent className="flex items-start gap-2">
              <CircleAlertIcon className="mt-0.5 size-4 shrink-0" />
              <div className="min-w-0 space-y-0.5">
                <p className="font-medium leading-snug">Deploy failed</p>
                <p className="text-sm leading-snug opacity-80">
                  Timeout after 30s while reaching the API.
                </p>
              </div>
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </div>
  )
}

export function MessageGroupDemo() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4">
      <MessageGroup>
        <Message>
          <MessageAvatar />
          <MessageContent>
            <Bubble variant="secondary">
              <BubbleContent>I checked the registry addresses.</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message>
          <MessageAvatar>
            <AssistantAvatar />
          </MessageAvatar>
          <MessageContent>
            <Bubble variant="secondary">
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
        </MessageContent>
      </Message>
    </div>
  )
}

export function MessageHeaderFooterDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Message>
        <MessageAvatar>
          <AssistantAvatar />
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Oliver</MessageHeader>
          <Bubble variant="secondary">
            <BubbleContent>
              Send the report to the team. Ping @cn if you need help.
            </BubbleContent>
          </Bubble>
          <MessageFooter>Delivered</MessageFooter>
        </MessageContent>
      </Message>
    </div>
  )
}

export function MessageActionsDemo() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6">
      <Message>
        <MessageAvatar>
          <AssistantAvatar />
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>
              The install failure is coming from the workspace package.
            </BubbleContent>
          </Bubble>
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
      <Message align="end">
        <MessageAvatar>
          <UserAvatar />
        </MessageAvatar>
        <MessageContent>
          <Bubble>
            <BubbleContent>Okay drop me a link. Taking a look...</BubbleContent>
          </Bubble>
          <MessageFooter className="gap-2">
            <span className="font-normal text-destructive">Failed to send</span>
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
    </div>
  )
}

export function MessageAttachmentDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Message>
        <MessageAvatar>
          <AssistantAvatar />
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>
              Done. Here&apos;s the PDF with the image added as the cover page.
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
        </MessageContent>
      </Message>
    </div>
  )
}
