"use client"

import * as React from "react"
import { BotIcon } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
} from "@/components/cubix/avatar"
import { Bubble, BubbleContent } from "@/components/cubix/bubble"
import { Button } from "@/components/cubix/button"
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/cubix/message"
import {
  Thinking,
  ThinkingContent,
  ThinkingTrigger,
} from "@/components/cubix/thinking"

const sampleReasoning = (
  <div className="space-y-2">
    <p>The user asked for a release checklist summary.</p>
    <p>
      I should cover changelog review, smoke tests, migrations before cutover,
      and the first-hour monitors.
    </p>
    <p>Keep the answer short enough to scan during a deploy window.</p>
  </div>
)

const streamingScript =
  "I need to compare invite completion against workspace creation, then suggest the smallest experiment that protects teams who already know who to invite."

function AssistantAvatar() {
  return (
    <Avatar>
      <AvatarFallback className="bg-foreground text-background">
        <BotIcon className="size-4" />
      </AvatarFallback>
    </Avatar>
  )
}

export function ThinkingDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Thinking defaultOpen duration={8}>
        <ThinkingTrigger />
        <ThinkingContent>{sampleReasoning}</ThinkingContent>
      </Thinking>
    </div>
  )
}

export function ThinkingStreamingDemo() {
  const [text, setText] = React.useState("")

  React.useEffect(() => {
    let index = 0
    setText("")
    const interval = window.setInterval(() => {
      index += 1
      setText(streamingScript.slice(0, index))
      if (index >= streamingScript.length) {
        window.clearInterval(interval)
      }
    }, 18)
    return () => window.clearInterval(interval)
  }, [])

  const stillStreaming = text.length < streamingScript.length

  return (
    <div className="mx-auto w-full max-w-md">
      <Thinking isStreaming={stillStreaming} defaultOpen>
        <ThinkingTrigger />
        <ThinkingContent>
          <p>{text || "\u00a0"}</p>
        </ThinkingContent>
      </Thinking>
    </div>
  )
}

export function ThinkingLifecycleDemo() {
  const [isStreaming, setIsStreaming] = React.useState(true)
  const [text, setText] = React.useState("")
  const [key, setKey] = React.useState(0)

  React.useEffect(() => {
    let index = 0
    setIsStreaming(true)
    setText("")

    const interval = window.setInterval(() => {
      index += 1
      setText(streamingScript.slice(0, index))
      if (index >= streamingScript.length) {
        window.clearInterval(interval)
        setIsStreaming(false)
      }
    }, 20)

    return () => window.clearInterval(interval)
  }, [key])

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-3">
      <Thinking key={key} isStreaming={isStreaming}>
        <ThinkingTrigger />
        <ThinkingContent>
          <p>{text || "\u00a0"}</p>
        </ThinkingContent>
      </Thinking>
      <Button
        size="xs"
        variant="outline"
        className="self-start"
        onClick={() => setKey((value) => value + 1)}
      >
        Replay lifecycle
      </Button>
    </div>
  )
}

export function ThinkingClosedDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Thinking isStreaming defaultOpen={false}>
        <ThinkingTrigger />
        <ThinkingContent>
          <p>
            Streaming is active, but defaultOpen is false so the panel stays
            closed until the reader opens it.
          </p>
        </ThinkingContent>
      </Thinking>
    </div>
  )
}

export function ThinkingLabelsDemo() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4">
      <Thinking defaultOpen={false} duration={0}>
        <ThinkingTrigger />
        <ThinkingContent>
          <p>Duration 0 still reads as an active thinking state.</p>
        </ThinkingContent>
      </Thinking>
      <Thinking defaultOpen={false} duration={1}>
        <ThinkingTrigger />
        <ThinkingContent>
          <p>Singular second label.</p>
        </ThinkingContent>
      </Thinking>
      <Thinking defaultOpen={false} duration={12}>
        <ThinkingTrigger />
        <ThinkingContent>
          <p>Plural seconds label after a longer think.</p>
        </ThinkingContent>
      </Thinking>
      <Thinking defaultOpen={false}>
        <ThinkingTrigger />
        <ThinkingContent>
          <p>Fallback label when duration is unknown.</p>
        </ThinkingContent>
      </Thinking>
    </div>
  )
}

export function ThinkingCustomLabelDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Thinking defaultOpen duration={5}>
        <ThinkingTrigger
          getThinkingMessage={(streaming, duration) =>
            streaming ? (
              <span className="shimmer">Working through the checklist...</span>
            ) : (
              <span>Reviewed options in {duration ?? "a few"}s</span>
            )
          }
        />
        <ThinkingContent>{sampleReasoning}</ThinkingContent>
      </Thinking>
    </div>
  )
}

export function ThinkingMessageDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Message>
        <MessageAvatar>
          <AssistantAvatar />
        </MessageAvatar>
        <MessageContent>
          <Thinking defaultOpen duration={6}>
            <ThinkingTrigger />
            <ThinkingContent>{sampleReasoning}</ThinkingContent>
          </Thinking>
          <Bubble variant="muted">
            <BubbleContent>
              Start with the changelog, run smoke tests, migrate before cutover,
              then watch error rate and p95 for the first hour.
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </div>
  )
}

export function ThinkingControlledDemo() {
  const [open, setOpen] = React.useState(true)

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <Button
          size="xs"
          variant={open ? "default" : "outline"}
          onClick={() => setOpen(true)}
        >
          Open
        </Button>
        <Button
          size="xs"
          variant={!open ? "default" : "outline"}
          onClick={() => setOpen(false)}
        >
          Close
        </Button>
      </div>
      <Thinking open={open} onOpenChange={setOpen} duration={9}>
        <ThinkingTrigger />
        <ThinkingContent>{sampleReasoning}</ThinkingContent>
      </Thinking>
    </div>
  )
}

export function ThinkingStoppedDemo() {
  const [isStreaming, setIsStreaming] = React.useState(true)
  const [text, setText] = React.useState("")
  const [key, setKey] = React.useState(0)
  const stopAt = Math.floor(streamingScript.length * 0.45)
  const streamingRef = React.useRef(isStreaming)
  streamingRef.current = isStreaming

  React.useEffect(() => {
    let index = 0
    streamingRef.current = true
    setIsStreaming(true)
    setText("")

    const interval = window.setInterval(() => {
      if (!streamingRef.current) {
        window.clearInterval(interval)
        return
      }
      index += 1
      setText(streamingScript.slice(0, index))
      if (index >= stopAt) {
        window.clearInterval(interval)
        streamingRef.current = false
        setIsStreaming(false)
      }
    }, 18)

    return () => window.clearInterval(interval)
  }, [key, stopAt])

  const handleStop = () => {
    streamingRef.current = false
    setIsStreaming(false)
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-3">
      <Thinking key={key} isStreaming={isStreaming} defaultOpen>
        <ThinkingTrigger
          getThinkingMessage={(streaming, duration) =>
            streaming ? (
              <span className="shimmer">Thinking...</span>
            ) : (
              <span>
                Thinking stopped
                {duration !== undefined ? ` after ${duration}s` : ""}
              </span>
            )
          }
        />
        <ThinkingContent>
          <p>{text}</p>
          {!isStreaming ? (
            <p className="mt-2 text-xs text-muted-foreground">
              Generation was stopped before the reasoning finished.
            </p>
          ) : null}
        </ThinkingContent>
      </Thinking>
      <div className="flex flex-wrap gap-2">
        <Button
          size="xs"
          variant="outline"
          disabled={!isStreaming}
          onClick={handleStop}
        >
          Stop now
        </Button>
        <Button
          size="xs"
          variant="secondary"
          onClick={() => setKey((value) => value + 1)}
        >
          Replay
        </Button>
      </div>
    </div>
  )
}

export function ThinkingEmptyDemo() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4">
      <Thinking isStreaming defaultOpen>
        <ThinkingTrigger />
        <ThinkingContent>
          <p className="text-muted-foreground/70 italic">
            Waiting for the first reasoning token...
          </p>
        </ThinkingContent>
      </Thinking>
      <Thinking isStreaming defaultOpen={false}>
        <ThinkingTrigger />
      </Thinking>
    </div>
  )
}

export function ThinkingErrorDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Thinking defaultOpen duration={4}>
        <ThinkingTrigger
          getThinkingMessage={() => (
            <span className="text-destructive">Thinking failed</span>
          )}
        />
        <ThinkingContent>
          <div className="space-y-2">
            <p>
              The model started a reasoning pass, then timed out before a
              usable plan was ready.
            </p>
            <p className="text-destructive">
              Error: reasoning stream closed after 30s with no final summary.
            </p>
            <Button size="xs" variant="outline" className="mt-1">
              Retry thinking
            </Button>
          </div>
        </ThinkingContent>
      </Thinking>
    </div>
  )
}

export function ThinkingReceiptDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Thinking defaultOpen={false} duration={11}>
        <ThinkingTrigger />
        <ThinkingContent>{sampleReasoning}</ThinkingContent>
      </Thinking>
      <p className="mt-3 text-xs text-muted-foreground">
        Completed think shown as a quiet receipt. Expand to read the
        reasoning.
      </p>
    </div>
  )
}

