"use client"

import * as React from "react"
import { BrainIcon, ChevronDownIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/cubix/collapsible"
import { cn } from "@/lib/utils"

const AUTO_CLOSE_DELAY = 1000
const MS_IN_S = 1000

type ThinkingContextValue = {
  isStreaming: boolean
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  duration: number | undefined
}

const ThinkingContext = React.createContext<ThinkingContextValue | null>(null)

function useThinking() {
  const context = React.useContext(ThinkingContext)
  if (!context) {
    throw new Error("Thinking components must be used within Thinking.")
  }
  return context
}

function useControllableState<T>({
  prop,
  defaultProp,
  onChange,
}: {
  prop?: T
  defaultProp: T
  onChange?: (value: T) => void
}) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultProp)
  const isControlled = prop !== undefined
  const value = isControlled ? (prop as T) : uncontrolled

  const setValue = React.useCallback(
    (next: T) => {
      if (!isControlled) {
        setUncontrolled(next)
      }
      onChange?.(next)
    },
    [isControlled, onChange]
  )

  return [value, setValue] as const
}

function Thinking({
  className,
  isStreaming = false,
  open,
  defaultOpen,
  onOpenChange,
  duration: durationProp,
  children,
  ...props
}: React.ComponentProps<typeof Collapsible> & {
  isStreaming?: boolean
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  duration?: number
}) {
  const resolvedDefaultOpen = defaultOpen ?? isStreaming
  const isExplicitlyClosed = defaultOpen === false

  const [isOpen, setIsOpen] = useControllableState<boolean>({
    prop: open,
    defaultProp: resolvedDefaultOpen,
    onChange: onOpenChange,
  })
  const [duration, setDuration] = useControllableState<number | undefined>({
    prop: durationProp,
    defaultProp: undefined,
  })

  const hasEverStreamedRef = React.useRef(isStreaming)
  const userPinnedRef = React.useRef(false)
  const [hasAutoClosed, setHasAutoClosed] = React.useState(false)
  const startTimeRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    if (isStreaming) {
      hasEverStreamedRef.current = true
      if (startTimeRef.current === null) {
        startTimeRef.current = Date.now()
      }
    } else if (startTimeRef.current !== null) {
      setDuration(Math.ceil((Date.now() - startTimeRef.current) / MS_IN_S))
      startTimeRef.current = null
    }
  }, [isStreaming, setDuration])

  React.useEffect(() => {
    if (
      isStreaming &&
      !isOpen &&
      !isExplicitlyClosed &&
      !userPinnedRef.current
    ) {
      setIsOpen(true)
    }
  }, [isStreaming, isOpen, setIsOpen, isExplicitlyClosed])

  React.useEffect(() => {
    if (
      hasEverStreamedRef.current &&
      !isStreaming &&
      isOpen &&
      !hasAutoClosed &&
      !userPinnedRef.current
    ) {
      const timer = window.setTimeout(() => {
        setIsOpen(false)
        setHasAutoClosed(true)
      }, AUTO_CLOSE_DELAY)

      return () => window.clearTimeout(timer)
    }
  }, [isStreaming, isOpen, setIsOpen, hasAutoClosed])

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      userPinnedRef.current = true
      setIsOpen(nextOpen)
    },
    [setIsOpen]
  )

  const contextValue = React.useMemo(
    () => ({ duration, isOpen, isStreaming, setIsOpen }),
    [duration, isOpen, isStreaming, setIsOpen]
  )

  return (
    <ThinkingContext.Provider value={contextValue}>
      <Collapsible
        data-slot="thinking"
        data-streaming={isStreaming ? "" : undefined}
        className={cn("not-prose", className)}
        {...props}
        open={isOpen}
        onOpenChange={handleOpenChange}
      >
        {children}
      </Collapsible>
    </ThinkingContext.Provider>
  )
}

function defaultGetThinkingMessage(
  isStreaming: boolean,
  duration?: number
): React.ReactNode {
  if (isStreaming || duration === 0) {
    return <span className="shimmer">Thinking...</span>
  }
  if (duration === undefined) {
    return <span>Thought for a few seconds</span>
  }
  if (duration === 1) {
    return <span>Thought for 1 second</span>
  }
  return <span>Thought for {duration} seconds</span>
}

function ThinkingTrigger({
  className,
  children,
  getThinkingMessage = defaultGetThinkingMessage,
  ...props
}: React.ComponentProps<typeof CollapsibleTrigger> & {
  getThinkingMessage?: (
    isStreaming: boolean,
    duration?: number
  ) => React.ReactNode
}) {
  const { isStreaming, isOpen, duration } = useThinking()

  return (
    <CollapsibleTrigger
      data-slot="thinking-trigger"
      className={cn(
        "flex w-full items-center gap-2 text-caption text-muted-foreground transition-colors hover:text-foreground outline-none focus-visible:text-foreground",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <BrainIcon className="size-4 shrink-0" />
          <span className="min-w-0 flex-1 text-start">
            {getThinkingMessage(isStreaming, duration)}
          </span>
          <ChevronDownIcon
            className={cn(
              "size-4 shrink-0 transition-transform",
              isOpen ? "rotate-180" : "rotate-0"
            )}
          />
        </>
      )}
    </CollapsibleTrigger>
  )
}

function ThinkingContent({
  className,
  ...props
}: React.ComponentProps<typeof CollapsibleContent>) {
  return (
    <CollapsibleContent
      data-slot="thinking-content"
      className={cn(
        "mt-3 text-caption leading-relaxed text-muted-foreground outline-none",
        className
      )}
      {...props}
    />
  )
}

export {
  Thinking,
  ThinkingTrigger,
  ThinkingContent,
  useThinking,
  defaultGetThinkingMessage,
}
