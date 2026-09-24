"use client"

import * as React from "react"
import { BotIcon, CircleAlertIcon, RefreshCwIcon } from "lucide-react"

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
  MessageFooter,
} from "@/components/cubix/message"
import {
  StreamingText,
  StreamingTextCaret,
  type StreamingTextCaretStyle,
} from "@/components/cubix/streaming-text"
import {
  Thinking,
  ThinkingContent,
  ThinkingTrigger,
} from "@/components/cubix/thinking"

const fullReply =
  "Start with the changelog, run the smoke suite, migrate before cutover, then watch error rate and p95 latency for the first hour."

const longReply =
  "Deploy looks healthy.\n\nError rate is flat, p95 is under 180ms, and the queue depth stayed below ten for the first hour.\n\nKeep rollback ready, but the trend points toward recovery."

function AssistantAvatar() {
  return (
    <Avatar>
      <AvatarFallback className="bg-foreground text-background">
        <BotIcon className="size-4" />
      </AvatarFallback>
    </Avatar>
  )
}

function useStreamedText(source: string, speed = 18, enabled = true) {
  const [text, setText] = React.useState("")
  const [isStreaming, setIsStreaming] = React.useState(enabled)
  const [key, setKey] = React.useState(0)

  React.useEffect(() => {
    if (!enabled) {
      setText(source)
      setIsStreaming(false)
      return
    }

    let index = 0
    setText("")
    setIsStreaming(true)

    const interval = window.setInterval(() => {
      index += 1
      setText(source.slice(0, index))
      if (index >= source.length) {
        window.clearInterval(interval)
        setIsStreaming(false)
      }
    }, speed)

    return () => window.clearInterval(interval)
  }, [source, speed, enabled, key])

  return {
    text,
    isStreaming,
    setIsStreaming,
    setText,
    replay: () => setKey((value) => value + 1),
  }
}

export function StreamingTextDemo() {
  const { text, isStreaming, replay } = useStreamedText(fullReply)

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-3">
      <StreamingText isStreaming={isStreaming}>{text}</StreamingText>
      <Button size="xs" variant="outline" className="self-start" onClick={replay}>
        Replay
      </Button>
    </div>
  )
}

export function StreamingTextIdleDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <StreamingText isStreaming={false}>{fullReply}</StreamingText>
    </div>
  )
}

export function StreamingTextEmptyDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <StreamingText isStreaming caret="line">
        {""}
      </StreamingText>
      <p className="mt-2 text-xs text-muted-foreground">
        Waiting for the first token.
      </p>
    </div>
  )
}

export function StreamingTextCaretDemo() {
  const styles: StreamingTextCaretStyle[] = ["line", "block", "circle"]
  const { text, isStreaming, replay } = useStreamedText(
    "Caret styles mark the live edge while tokens arrive.",
    24
  )

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4">
      {styles.map((style) => (
        <div key={style} className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">{style}</p>
          <StreamingText isStreaming={isStreaming} caret={style}>
            {text}
          </StreamingText>
        </div>
      ))}
      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">none</p>
        <StreamingText isStreaming={isStreaming} caret={false}>
          {text}
        </StreamingText>
      </div>
      <Button size="xs" variant="outline" className="self-start" onClick={replay}>
        Replay
      </Button>
    </div>
  )
}

export function StreamingTextCustomCaretDemo() {
  const { text, isStreaming, replay } = useStreamedText(
    "Compose a custom caret when the default styles are not enough.",
    20
  )

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-3">
      <StreamingText isStreaming={isStreaming} caret={false}>
        {text}
        {isStreaming ? (
          <StreamingTextCaret
            force
            className="ms-1 inline-flex h-4 items-center rounded-sm bg-primary px-1 text-xs font-medium text-primary-foreground animate-pulse"
          >
            gen
          </StreamingTextCaret>
        ) : null}
      </StreamingText>
      <Button size="xs" variant="outline" className="self-start" onClick={replay}>
        Replay
      </Button>
    </div>
  )
}

export function StreamingTextMultilineDemo() {
  const { text, isStreaming, replay } = useStreamedText(longReply, 12)

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-3">
      <StreamingText isStreaming={isStreaming}>{text}</StreamingText>
      <Button size="xs" variant="outline" className="self-start" onClick={replay}>
        Replay
      </Button>
    </div>
  )
}

export function StreamingTextStoppedDemo() {
  const stopAt = Math.floor(fullReply.length * 0.55)
  const [text, setText] = React.useState("")
  const [isStreaming, setIsStreaming] = React.useState(true)
  const [key, setKey] = React.useState(0)
  const streamingRef = React.useRef(true)

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
      setText(fullReply.slice(0, index))
      if (index >= stopAt) {
        window.clearInterval(interval)
        streamingRef.current = false
        setIsStreaming(false)
      }
    }, 16)

    return () => window.clearInterval(interval)
  }, [key, stopAt])

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-3">
      <StreamingText isStreaming={isStreaming}>{text}</StreamingText>
      {!isStreaming ? (
        <p className="text-xs text-muted-foreground">
          Stream stopped before the reply finished.
        </p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <Button
          size="xs"
          variant="outline"
          disabled={!isStreaming}
          onClick={() => {
            streamingRef.current = false
            setIsStreaming(false)
          }}
        >
          Stop
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

export function StreamingTextErrorDemo() {
  return (
    <div className="mx-auto w-full max-w-md space-y-3">
      <StreamingText isStreaming={false}>
        Deploy looks healthy. Error rate is flat, p95 is under
      </StreamingText>
      <div className="flex items-start gap-2 text-sm text-destructive">
        <CircleAlertIcon className="mt-0.5 size-4 shrink-0" />
        <div className="min-w-0 space-y-2">
          <p>Stream interrupted before the reply completed.</p>
          <Button size="xs" variant="outline" className="gap-1.5">
            <RefreshCwIcon className="size-3.5" />
            Retry
          </Button>
        </div>
      </div>
    </div>
  )
}

export function StreamingTextMessageDemo() {
  const { text, isStreaming, replay } = useStreamedText(fullReply, 16)

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-3">
      <Message>
        <MessageAvatar>
          <AssistantAvatar />
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>
              <StreamingText isStreaming={isStreaming}>{text}</StreamingText>
            </BubbleContent>
          </Bubble>
          {!isStreaming ? (
            <MessageFooter className="gap-1">
              <Button size="icon-xs" variant="ghost" aria-label="Retry">
                <RefreshCwIcon />
              </Button>
            </MessageFooter>
          ) : (
            <MessageFooter>
              <Button size="xs" variant="ghost">
                Stop
              </Button>
            </MessageFooter>
          )}
        </MessageContent>
      </Message>
      <Button size="xs" variant="outline" className="self-start" onClick={replay}>
        Replay
      </Button>
    </div>
  )
}

export function StreamingTextWithThinkingDemo() {
  const [phase, setPhase] = React.useState<"thinking" | "streaming" | "done">(
    "thinking"
  )
  const [reasoning, setReasoning] = React.useState("")
  const [reply, setReply] = React.useState("")
  const [key, setKey] = React.useState(0)

  const reasoningScript =
    "Compare invite completion with workspace creation, then keep the answer short."

  React.useEffect(() => {
    let thinkInterval = 0
    let streamInterval = 0
    let index = 0
    setPhase("thinking")
    setReasoning("")
    setReply("")

    thinkInterval = window.setInterval(() => {
      index += 1
      setReasoning(reasoningScript.slice(0, index))
      if (index >= reasoningScript.length) {
        window.clearInterval(thinkInterval)
        setPhase("streaming")
        let replyIndex = 0
        streamInterval = window.setInterval(() => {
          replyIndex += 1
          setReply(fullReply.slice(0, replyIndex))
          if (replyIndex >= fullReply.length) {
            window.clearInterval(streamInterval)
            setPhase("done")
          }
        }, 14)
      }
    }, 16)

    return () => {
      window.clearInterval(thinkInterval)
      window.clearInterval(streamInterval)
    }
  }, [key])

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-3">
      <Message>
        <MessageAvatar>
          <AssistantAvatar />
        </MessageAvatar>
        <MessageContent>
          <Thinking
            isStreaming={phase === "thinking"}
            defaultOpen={phase !== "done"}
          >
            <ThinkingTrigger />
            <ThinkingContent>
              <p>{reasoning || "\u00a0"}</p>
            </ThinkingContent>
          </Thinking>
          {phase !== "thinking" ? (
            <Bubble variant="muted">
              <BubbleContent>
                <StreamingText isStreaming={phase === "streaming"}>
                  {reply}
                </StreamingText>
              </BubbleContent>
            </Bubble>
          ) : null}
        </MessageContent>
      </Message>
      <Button
        size="xs"
        variant="outline"
        className="self-start"
        onClick={() => setKey((value) => value + 1)}
      >
        Replay
      </Button>
    </div>
  )
}
