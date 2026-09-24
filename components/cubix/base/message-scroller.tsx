"use client"

import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { ArrowDownIcon } from "lucide-react"

import { Button } from "@/components/cubix/button"
import { cn } from "@/lib/utils"

const EDGE_THRESHOLD = 8
const DEFAULT_PEEK = 64
const KEYS_THAT_INTERRUPT = new Set([
  "ArrowDown",
  "ArrowUp",
  "End",
  "Home",
  "PageDown",
  "PageUp",
  " ",
])

export type MessageScrollerDefaultScrollPosition =
  | "start"
  | "end"
  | "last-anchor"

export type MessageScrollerScrollAlign = "start" | "center" | "end" | "nearest"

export type MessageScrollerScrollOptions = {
  align?: MessageScrollerScrollAlign
  behavior?: ScrollBehavior
  scrollMargin?: number
}

export type MessageScrollerScrollable = {
  start: boolean
  end: boolean
}

export type MessageScrollerVisibilityState = {
  currentAnchorId: string | null
  visibleMessageIds: string[]
}

type MessageScrollerContextValue = {
  autoScroll: boolean
  defaultScrollPosition: MessageScrollerDefaultScrollPosition
  scrollEdgeThreshold: number
  scrollPreviousItemPeek: number
  scrollMargin: number
  preserveScrollOnPrepend: boolean
  setPreserveScrollOnPrepend: (value: boolean) => void
  viewportRef: React.RefObject<HTMLDivElement | null>
  contentRef: React.RefObject<HTMLDivElement | null>
  registerItem: (
    id: string,
    node: HTMLElement | null,
    previous: HTMLElement | null
  ) => void
  scrollToEnd: (options?: MessageScrollerScrollOptions) => boolean
  scrollToStart: (options?: MessageScrollerScrollOptions) => boolean
  scrollToMessage: (
    messageId: string,
    options?: MessageScrollerScrollOptions
  ) => boolean
  interruptFollow: () => void
  syncAfterScroll: () => void
  pendingDefaultScroll: boolean
}

const MessageScrollerContext =
  React.createContext<MessageScrollerContextValue | null>(null)

function useScroller() {
  const context = React.useContext(MessageScrollerContext)
  if (!context) {
    throw new Error("MessageScroller parts must be used within a Provider.")
  }
  return context
}

function getItems(content: HTMLElement) {
  return Array.from(content.children).filter(
    (node): node is HTMLElement =>
      node instanceof HTMLElement &&
      Boolean(node.dataset.messageId) &&
      node.dataset.messageScrollerSpacer !== ""
  )
}

function distanceFromEnd(viewport: HTMLElement) {
  return viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight
}

export function useMessageScroller() {
  const { scrollToEnd, scrollToMessage, scrollToStart } = useScroller()
  return React.useMemo(
    () => ({ scrollToEnd, scrollToMessage, scrollToStart }),
    [scrollToEnd, scrollToMessage, scrollToStart]
  )
}

export function useMessageScrollerScrollable() {
  const { viewportRef, scrollEdgeThreshold } = useScroller()
  const [state, setState] = React.useState<MessageScrollerScrollable>({
    start: false,
    end: false,
  })

  React.useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const update = () => {
      setState({
        start: viewport.scrollTop > scrollEdgeThreshold,
        end: distanceFromEnd(viewport) > scrollEdgeThreshold,
      })
    }

    update()
    viewport.addEventListener("scroll", update, { passive: true })
    const observer = new ResizeObserver(update)
    observer.observe(viewport)
    return () => {
      viewport.removeEventListener("scroll", update)
      observer.disconnect()
    }
  }, [scrollEdgeThreshold, viewportRef])

  return state
}

export function useMessageScrollerVisibility() {
  const { contentRef, viewportRef, scrollMargin, scrollPreviousItemPeek } =
    useScroller()
  const [state, setState] = React.useState<MessageScrollerVisibilityState>({
    currentAnchorId: null,
    visibleMessageIds: [],
  })

  React.useEffect(() => {
    const content = contentRef.current
    const viewport = viewportRef.current
    if (!content || !viewport) return

    const update = () => {
      const bounds = viewport.getBoundingClientRect()
      const peekTop = bounds.top + scrollMargin + scrollPreviousItemPeek
      const visible: string[] = []
      let currentAnchorId: string | null = null

      for (const item of getItems(content)) {
        const id = item.dataset.messageId
        if (!id) continue
        const rect = item.getBoundingClientRect()
        if (rect.bottom > peekTop && rect.top < bounds.bottom) {
          visible.push(id)
        }
        if (
          item.dataset.scrollAnchor === "true" &&
          rect.top <= peekTop + 0.5
        ) {
          currentAnchorId = id
        }
      }

      setState({ currentAnchorId, visibleMessageIds: visible })
    }

    update()
    viewport.addEventListener("scroll", update, { passive: true })
    const observer = new MutationObserver(update)
    observer.observe(content, { childList: true, subtree: true })
    return () => {
      viewport.removeEventListener("scroll", update)
      observer.disconnect()
    }
  }, [contentRef, scrollMargin, scrollPreviousItemPeek, viewportRef])

  return state
}

export function MessageScrollerProvider({
  children,
  autoScroll = false,
  defaultScrollPosition = "end",
  scrollEdgeThreshold = EDGE_THRESHOLD,
  scrollPreviousItemPeek = DEFAULT_PEEK,
  scrollMargin = 0,
}: {
  children?: React.ReactNode
  autoScroll?: boolean
  defaultScrollPosition?: MessageScrollerDefaultScrollPosition
  scrollEdgeThreshold?: number
  scrollPreviousItemPeek?: number
  scrollMargin?: number
}) {
  const viewportRef = React.useRef<HTMLDivElement | null>(null)
  const contentRef = React.useRef<HTMLDivElement | null>(null)
  const itemsRef = React.useRef(new Map<string, HTMLElement>())
  const followRef = React.useRef(autoScroll)
  const appliedDefaultRef = React.useRef(false)
  const [pendingDefaultScroll, setPendingDefaultScroll] = React.useState(true)
  const [preserveScrollOnPrepend, setPreserveScrollOnPrepend] =
    React.useState(true)

  React.useEffect(() => {
    followRef.current = autoScroll
  }, [autoScroll])

  const scrollToStart = React.useCallback(
    (options?: MessageScrollerScrollOptions) => {
      const viewport = viewportRef.current
      if (!viewport) return false
      followRef.current = false
      viewport.scrollTo({
        top: 0,
        behavior: options?.behavior ?? "auto",
      })
      return true
    },
    []
  )

  const scrollToEnd = React.useCallback(
    (options?: MessageScrollerScrollOptions) => {
      const viewport = viewportRef.current
      if (!viewport) return false
      followRef.current = autoScroll
      viewport.scrollTo({
        top: viewport.scrollHeight,
        behavior: options?.behavior ?? "auto",
      })
      return true
    },
    [autoScroll]
  )

  const scrollToMessage = React.useCallback(
    (messageId: string, options?: MessageScrollerScrollOptions) => {
      const viewport = viewportRef.current
      const node = itemsRef.current.get(messageId)
      if (!viewport || !node) return false

      followRef.current = false
      const align = options?.align ?? "start"
      const margin = options?.scrollMargin ?? scrollMargin
      const peek = align === "start" ? scrollPreviousItemPeek : 0
      const viewportRect = viewport.getBoundingClientRect()
      const nodeRect = node.getBoundingClientRect()
      const current = viewport.scrollTop
      const offset = nodeRect.top - viewportRect.top + current
      let top = offset - margin - peek

      if (align === "center") {
        top = offset - (viewport.clientHeight - nodeRect.height) / 2
      } else if (align === "end") {
        top = offset - viewport.clientHeight + nodeRect.height + margin
      } else if (align === "nearest") {
        const start = current + margin
        const end = current + viewport.clientHeight - margin
        const nodeBottom = offset + nodeRect.height
        if (offset >= start && nodeBottom <= end) {
          top = current
        } else if (offset < start) {
          top = offset - margin - peek
        } else {
          top = nodeBottom - viewport.clientHeight + margin
        }
      }

      viewport.scrollTo({
        top: Math.max(0, top),
        behavior: options?.behavior ?? "auto",
      })
      return true
    },
    [scrollMargin, scrollPreviousItemPeek]
  )

  const interruptFollow = React.useCallback(() => {
    followRef.current = false
  }, [])

  const syncAfterScroll = React.useCallback(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    if (distanceFromEnd(viewport) <= scrollEdgeThreshold && autoScroll) {
      followRef.current = true
    }
  }, [autoScroll, scrollEdgeThreshold])

  const registerItem = React.useCallback(
    (id: string, node: HTMLElement | null, previous: HTMLElement | null) => {
      if (node) {
        itemsRef.current.set(id, node)
        return
      }
      if (previous && itemsRef.current.get(id) === previous) {
        itemsRef.current.delete(id)
      }
    },
    []
  )

  const applyDefaultPosition = React.useCallback(() => {
    const viewport = viewportRef.current
    const content = contentRef.current
    if (!viewport || !content || appliedDefaultRef.current) return
    if (getItems(content).length === 0) return

    appliedDefaultRef.current = true
    if (defaultScrollPosition === "start") {
      scrollToStart({ behavior: "auto" })
    } else if (defaultScrollPosition === "last-anchor") {
      const anchors = getItems(content).filter(
        (item) => item.dataset.scrollAnchor === "true"
      )
      const last = anchors.at(-1)
      if (last?.dataset.messageId) {
        scrollToMessage(last.dataset.messageId, {
          align: "start",
          behavior: "auto",
        })
      } else {
        scrollToEnd({ behavior: "auto" })
      }
    } else {
      scrollToEnd({ behavior: "auto" })
    }
    setPendingDefaultScroll(false)
  }, [defaultScrollPosition, scrollToEnd, scrollToMessage, scrollToStart])

  React.useLayoutEffect(() => {
    applyDefaultPosition()
  }, [applyDefaultPosition])

  React.useEffect(() => {
    const content = contentRef.current
    const viewport = viewportRef.current
    if (!content || !viewport) return

    let previousFirst: HTMLElement | null = getItems(content)[0] ?? null
    let previousHeight = viewport.scrollHeight

    const restorePrepend = () => {
      if (!preserveScrollOnPrepend) return
      const nextFirst = getItems(content)[0] ?? null
      const grewUp =
        nextFirst &&
        previousFirst &&
        nextFirst !== previousFirst &&
        viewport.scrollHeight > previousHeight
      if (grewUp) {
        viewport.scrollTop += viewport.scrollHeight - previousHeight
      }
      previousFirst = nextFirst
      previousHeight = viewport.scrollHeight
    }

    const onChange = () => {
      applyDefaultPosition()
      restorePrepend()
      if (followRef.current) {
        viewport.scrollTop = viewport.scrollHeight
      }
    }

    const mutations = new MutationObserver(onChange)
    mutations.observe(content, { childList: true, subtree: true })
    const resize = new ResizeObserver(onChange)
    resize.observe(content)
    return () => {
      mutations.disconnect()
      resize.disconnect()
    }
  }, [applyDefaultPosition, preserveScrollOnPrepend])

  const value = React.useMemo<MessageScrollerContextValue>(
    () => ({
      autoScroll,
      defaultScrollPosition,
      scrollEdgeThreshold,
      scrollPreviousItemPeek,
      scrollMargin,
      preserveScrollOnPrepend,
      setPreserveScrollOnPrepend,
      viewportRef,
      contentRef,
      registerItem,
      scrollToEnd,
      scrollToStart,
      scrollToMessage,
      interruptFollow,
      syncAfterScroll,
      pendingDefaultScroll,
    }),
    [
      autoScroll,
      defaultScrollPosition,
      interruptFollow,
      pendingDefaultScroll,
      preserveScrollOnPrepend,
      registerItem,
      scrollEdgeThreshold,
      scrollMargin,
      scrollPreviousItemPeek,
      scrollToEnd,
      scrollToMessage,
      scrollToStart,
      syncAfterScroll,
    ]
  )

  return (
    <MessageScrollerContext.Provider value={value}>
      {children}
    </MessageScrollerContext.Provider>
  )
}

function MessageScroller({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { pendingDefaultScroll } = useScroller()
  return (
    <div
      data-slot="message-scroller"
      data-pending-scroll={pendingDefaultScroll ? "" : undefined}
      className={cn(
        "group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

function MessageScrollerViewport({
  className,
  preserveScrollOnPrepend = true,
  onKeyDown,
  onScroll,
  onTouchMove,
  onWheel,
  ...props
}: React.ComponentProps<"div"> & {
  preserveScrollOnPrepend?: boolean
}) {
  const {
    setPreserveScrollOnPrepend,
    viewportRef,
    interruptFollow,
    syncAfterScroll,
    pendingDefaultScroll,
    scrollEdgeThreshold,
  } = useScroller()

  React.useEffect(() => {
    setPreserveScrollOnPrepend(preserveScrollOnPrepend)
  }, [preserveScrollOnPrepend, setPreserveScrollOnPrepend])

  const assignViewport = React.useCallback(
    (node: HTMLDivElement | null) => {
      viewportRef.current = node
    },
    [viewportRef]
  )

  return (
    <div
      ref={assignViewport}
      data-slot="message-scroller-viewport"
      data-pending-scroll={pendingDefaultScroll ? "" : undefined}
      role="region"
      aria-label="Messages"
      tabIndex={0}
      onScroll={(event) => {
        const viewport = event.currentTarget
        if (distanceFromEnd(viewport) > scrollEdgeThreshold) {
          interruptFollow()
        }
        syncAfterScroll()
        onScroll?.(event)
      }}
      onWheel={(event) => {
        interruptFollow()
        onWheel?.(event)
      }}
      onTouchMove={(event) => {
        interruptFollow()
        onTouchMove?.(event)
      }}
      onKeyDown={(event) => {
        if (KEYS_THAT_INTERRUPT.has(event.key)) {
          interruptFollow()
        }
        onKeyDown?.(event)
      }}
      className={cn(
        "cubix-scrollbar size-full min-h-0 min-w-0 overflow-y-auto overscroll-contain contain-content [scrollbar-gutter:stable] data-autoscrolling:[&::-webkit-scrollbar-thumb]:bg-transparent data-pending-scroll:invisible",
        className
      )}
      {...props}
    />
  )
}

function MessageScrollerContent({
  className,
  spacerClassName,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  spacerClassName?: string
}) {
  const { contentRef } = useScroller()

  const assignContent = React.useCallback(
    (node: HTMLDivElement | null) => {
      contentRef.current = node
    },
    [contentRef]
  )

  return (
    <div
      ref={assignContent}
      data-slot="message-scroller-content"
      role="log"
      aria-relevant="additions"
      className={cn("flex h-max min-h-full flex-col gap-6", className)}
      {...props}
    >
      {children}
      <div
        aria-hidden
        hidden
        data-message-scroller-spacer=""
        className={spacerClassName}
      />
    </div>
  )
}

function MessageScrollerItem({
  className,
  messageId,
  scrollAnchor = false,
  ...props
}: React.ComponentProps<"div"> & {
  messageId?: string
  scrollAnchor?: boolean
}) {
  const { registerItem } = useScroller()
  const previousRef = React.useRef<HTMLElement | null>(null)

  const assignItem = React.useCallback(
    (node: HTMLDivElement | null) => {
      if (messageId) {
        registerItem(messageId, node, previousRef.current)
      }
      previousRef.current = node
    },
    [messageId, registerItem]
  )

  return (
    <div
      ref={assignItem}
      data-slot="message-scroller-item"
      data-message-id={messageId}
      data-scroll-anchor={scrollAnchor ? "true" : "false"}
      className={cn(
        "min-w-0 shrink-0 [contain-intrinsic-size:auto_10rem] [content-visibility:auto]",
        className
      )}
      {...props}
    />
  )
}

function MessageScrollerButton({
  direction = "end",
  className,
  children,
  render,
  variant = "secondary",
  size = "icon-sm",
  behavior = "smooth",
  ...props
}: React.ComponentProps<"button"> &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size"> & {
    direction?: "start" | "end"
    behavior?: ScrollBehavior
    render?: React.ReactElement
  }) {
  const { scrollToEnd, scrollToStart } = useScroller()
  const scrollable = useMessageScrollerScrollable()
  const active = direction === "start" ? scrollable.start : scrollable.end

  const element = useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        type: "button",
        inert: !active,
        tabIndex: active ? 0 : -1,
        onClick: (event) => {
          if (!active) return
          event.currentTarget.blur()
          if (direction === "start") {
            scrollToStart({ behavior })
          } else {
            scrollToEnd({ behavior })
          }
        },
        children: children ?? (
          <>
            <ArrowDownIcon className="size-4" />
            <span className="sr-only">
              {direction === "end" ? "Scroll to end" : "Scroll to start"}
            </span>
          </>
        ),
        className: cn(
          "absolute left-1/2 z-10 -translate-x-1/2 border-border bg-background text-foreground transition-[translate,scale,opacity] duration-200 hover:bg-muted hover:text-foreground data-[active=false]:pointer-events-none data-[active=false]:scale-95 data-[active=false]:opacity-0 data-[active=false]:duration-400 data-[active=false]:ease-[cubic-bezier(0.7,0,0.84,0)] data-[active=true]:translate-y-0 data-[active=true]:scale-100 data-[active=true]:opacity-100 data-[active=true]:ease-[cubic-bezier(0.23,1,0.32,1)] data-[direction=end]:bottom-4 data-[direction=end]:data-[active=false]:translate-y-full data-[direction=start]:top-4 data-[direction=start]:data-[active=false]:-translate-y-full data-[direction=start]:[&_svg]:rotate-180",
          className
        ),
      },
      props
    ),
    render: render ?? <Button variant={variant} size={size} />,
    state: {
      slot: "message-scroller-button",
      direction,
      active,
    },
  })

  return element
}

export {
  MessageScroller,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerButton,
}
