"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

type StreamingTextCaretStyle = "block" | "line" | "circle"

type StreamingTextContextValue = {
  isStreaming: boolean
  caret: StreamingTextCaretStyle | false
}

const StreamingTextContext =
  React.createContext<StreamingTextContextValue | null>(null)

function useStreamingText() {
  const context = React.useContext(StreamingTextContext)
  if (!context) {
    throw new Error("StreamingText parts must be used within StreamingText.")
  }
  return context
}

const streamingTextCaretVariants = cva(
  "streaming-caret-blink pointer-events-none inline-block shrink-0 select-none",
  {
    variants: {
      variant: {
        line: "mx-px h-[1.1em] w-px translate-y-[0.12em] bg-foreground/80",
        block:
          "mx-px h-[1em] w-[0.35ch] translate-y-[0.14em] rounded-sm bg-foreground/75",
        circle:
          "mx-1 mb-[0.15em] size-1 self-end rounded-full bg-foreground/70",
      },
    },
    defaultVariants: {
      variant: "line",
    },
  }
)

function StreamingTextCaret({
  className,
  variant,
  force,
  children,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof streamingTextCaretVariants> & {
    force?: boolean
  }) {
  const context = React.useContext(StreamingTextContext)
  const isStreaming = context?.isStreaming ?? false
  const resolvedVariant =
    variant ??
    (context?.caret == null || context.caret === false
      ? "line"
      : context.caret)

  if (!force && context && (!isStreaming || context.caret === false)) {
    return null
  }

  return (
    <span
      data-slot="streaming-text-caret"
      data-variant={children ? "custom" : resolvedVariant}
      aria-hidden="true"
      className={cn(
        children
          ? "streaming-caret-blink ms-1 inline-flex shrink-0 items-center"
          : streamingTextCaretVariants({ variant: resolvedVariant }),
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

function StreamingText({
  className,
  isStreaming = false,
  caret = "line",
  children,
  ...props
}: React.ComponentProps<"div"> & {
  isStreaming?: boolean
  caret?: StreamingTextCaretStyle | false
}) {
  const contextValue = React.useMemo(
    () => ({ isStreaming, caret }),
    [isStreaming, caret]
  )

  return (
    <StreamingTextContext.Provider value={contextValue}>
      <div
        data-slot="streaming-text"
        data-streaming={isStreaming ? "" : undefined}
        data-caret={caret === false ? "false" : caret}
        aria-busy={isStreaming || undefined}
        aria-live={isStreaming ? "polite" : undefined}
        className={cn(
          "relative min-w-0 text-description leading-relaxed wrap-break-word whitespace-pre-wrap",
          className
        )}
        {...props}
      >
        {children}
        {caret !== false ? <StreamingTextCaret variant={caret} /> : null}
      </div>
    </StreamingTextContext.Provider>
  )
}

export {
  StreamingText,
  StreamingTextCaret,
  useStreamingText,
  streamingTextCaretVariants,
  type StreamingTextCaretStyle,
}
