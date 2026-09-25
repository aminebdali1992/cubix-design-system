"use client"

import * as React from "react"
import {
  CodeIcon,
  EyeIcon,
  Maximize2Icon,
  MonitorIcon,
  SmartphoneIcon,
  TabletIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import type { BlockItem } from "@/app/blocks/blocks-data"
import { BlockCodePanel } from "@/components/blocks/block-code-panel"

type Viewport = "desktop" | "tablet" | "mobile"
type ViewMode = "preview" | "code"

const VIEWPORT_WIDTH_PX: Record<Viewport, number | "full"> = {
  desktop: "full",
  tablet: 768,
  mobile: 390,
}

function BlockPreviewToolbar({
  mode,
  onModeChange,
  viewport,
  onViewportChange,
}: {
  mode: ViewMode
  onModeChange: (mode: ViewMode) => void
  viewport: Viewport
  onViewportChange: (viewport: Viewport) => void
}) {
  const viewports: {
    id: Viewport
    label: string
    icon: React.ReactNode
    className?: string
  }[] = [
    {
      id: "desktop",
      label: "Desktop viewport",
      icon: <MonitorIcon className="size-3.5" />,
      className: "hidden lg:inline-flex",
    },
    {
      id: "tablet",
      label: "Tablet viewport",
      icon: <TabletIcon className="size-3.5" />,
      className: "hidden lg:inline-flex",
    },
    {
      id: "mobile",
      label: "Mobile viewport",
      icon: <SmartphoneIcon className="size-3.5" />,
    },
  ]

  const modes: {
    id: ViewMode
    label: string
    icon: React.ReactNode
  }[] = [
    {
      id: "preview",
      label: "Preview",
      icon: <EyeIcon className="size-3.5" />,
    },
    {
      id: "code",
      label: "Code",
      icon: <CodeIcon className="size-3.5" />,
    },
  ]

  return (
    <div className="flex items-center gap-2">
      {mode === "preview" ? (
        <>
          <div
            role="group"
            aria-label="Preview viewport"
            className="hidden h-8 items-center rounded-full border border-border/80 bg-background p-0.5 shadow-xs md:flex"
          >
            {viewports.map((item) => {
              const active = viewport === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-label={item.label}
                  aria-pressed={active}
                  onClick={() => onViewportChange(item.id)}
                  className={cn(
                    "inline-flex size-7 items-center justify-center rounded-full text-muted-foreground outline-none transition-colors",
                    "hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40",
                    active && "bg-muted text-foreground shadow-xs",
                    item.className
                  )}
                >
                  {item.icon}
                </button>
              )
            })}
          </div>

          <button
            type="button"
            aria-label="Open preview in fullscreen"
            disabled
            className={cn(
              "inline-flex size-8 items-center justify-center rounded-full border border-border/80 bg-background text-muted-foreground shadow-xs outline-none",
              "hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40",
              "disabled:pointer-events-none disabled:opacity-50"
            )}
          >
            <Maximize2Icon className="size-3.5" />
          </button>
        </>
      ) : null}

      <div
        role="tablist"
        aria-label="Block view"
        className="flex h-8 items-center rounded-full border border-border/80 bg-background p-0.5 shadow-xs"
      >
        {modes.map((item) => {
          const active = mode === item.id
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onModeChange(item.id)}
              className={cn(
                "inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-caption font-medium outline-none transition-colors",
                "focus-visible:ring-2 focus-visible:ring-ring/40",
                active
                  ? "bg-muted text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

const PREVIEW_MIN_WIDTH = 320
const RESIZE_HANDLE_GUTTER = 16
const DESKTOP_SNAP_DISTANCE = 24
const MOBILE_TABLET_BREAKPOINT = (390 + 768) / 2

function resolveViewportForWidth(width: number, stageWidth: number): Viewport {
  if (stageWidth > 0 && width >= stageWidth - DESKTOP_SNAP_DISTANCE) {
    return "desktop"
  }
  if (width > MOBILE_TABLET_BREAKPOINT) {
    return "tablet"
  }
  return "mobile"
}

function BlockPreviewFrame({
  viewport,
  onViewportChange,
  children,
}: {
  viewport: Viewport
  onViewportChange: (viewport: Viewport) => void
  children?: React.ReactNode
}) {
  const stageRef = React.useRef<HTMLDivElement>(null)
  const dragRef = React.useRef<{ startX: number; startWidth: number } | null>(
    null
  )
  const skipWidthResetRef = React.useRef(false)
  const [stageWidth, setStageWidth] = React.useState(0)
  const [customWidth, setCustomWidth] = React.useState<number | null>(null)
  const [dragging, setDragging] = React.useState(false)

  const resizable = viewport === "tablet" || viewport === "mobile"

  React.useEffect(() => {
    if (skipWidthResetRef.current) {
      skipWidthResetRef.current = false
      return
    }
    setCustomWidth(null)
  }, [viewport])

  React.useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      setStageWidth(entry.contentRect.width)
    })
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  const maxWidth = Math.max(
    (stageWidth || 0) - (resizable ? RESIZE_HANDLE_GUTTER : 0),
    PREVIEW_MIN_WIDTH
  )

  const preset =
    VIEWPORT_WIDTH_PX[viewport] === "full"
      ? stageWidth
      : Math.min(
          VIEWPORT_WIDTH_PX[viewport],
          maxWidth || VIEWPORT_WIDTH_PX[viewport]
        )

  const frameWidth = !resizable
    ? stageWidth
    : Math.min(Math.max(customWidth ?? preset, PREVIEW_MIN_WIDTH), maxWidth || preset)

  function clampWidth(next: number) {
    return Math.min(Math.max(next, PREVIEW_MIN_WIDTH), maxWidth || next)
  }

  function syncViewportFromResize(nextViewport: Viewport) {
    if (nextViewport === viewport) return
    skipWidthResetRef.current = true
    if (nextViewport === "desktop") {
      setCustomWidth(null)
    }
    onViewportChange(nextViewport)
  }

  function snapToDesktop(handle?: HTMLDivElement, pointerId?: number) {
    dragRef.current = null
    setDragging(false)
    syncViewportFromResize("desktop")
    if (
      handle &&
      pointerId !== undefined &&
      handle.hasPointerCapture(pointerId)
    ) {
      handle.releasePointerCapture(pointerId)
    }
  }

  function applyResizedWidth(
    next: number,
    handle?: HTMLDivElement,
    pointerId?: number
  ) {
    const nextViewport = resolveViewportForWidth(next, stageWidth)

    if (nextViewport === "desktop") {
      snapToDesktop(handle, pointerId)
      return
    }

    setCustomWidth(clampWidth(next))
    syncViewportFromResize(nextViewport)
  }

  function onHandlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (!resizable) return
    event.preventDefault()
    dragRef.current = {
      startX: event.clientX,
      startWidth: frameWidth,
    }
    setDragging(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function onHandlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragRef.current) return
    const delta = event.clientX - dragRef.current.startX
    applyResizedWidth(
      dragRef.current.startWidth + delta,
      event.currentTarget,
      event.pointerId
    )
  }

  function onHandlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragRef.current) return
    dragRef.current = null
    setDragging(false)
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  function onHandleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (!resizable) return
    const step = event.shiftKey ? 24 : 8
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      applyResizedWidth(frameWidth - step)
    } else if (event.key === "ArrowRight") {
      event.preventDefault()
      applyResizedWidth(frameWidth + step)
    } else if (event.key === "Home") {
      event.preventDefault()
      applyResizedWidth(PREVIEW_MIN_WIDTH)
    } else if (event.key === "End") {
      event.preventDefault()
      snapToDesktop()
    }
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div ref={stageRef} className="absolute inset-0 p-0 md:p-2">
        <div
          className={cn(
            "relative h-full max-w-full",
            "will-change-[width]",
            !dragging &&
              "transition-[width] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          )}
          style={{
            width: stageWidth > 0 ? `${frameWidth}px` : "100%",
          }}
        >
          <div
            className={cn(
              "box-border h-full overflow-hidden bg-background",
              "md:rounded-lg md:border md:border-border/70 md:shadow-sm"
            )}
          >
            <div className="cubix-scrollbar relative h-full overflow-auto">
              {children}
            </div>
          </div>

          {resizable ? (
            <div
              role="separator"
              aria-orientation="vertical"
              aria-label="Resize preview width"
              aria-valuemin={PREVIEW_MIN_WIDTH}
              aria-valuemax={Math.round(maxWidth || frameWidth)}
              aria-valuenow={Math.round(frameWidth)}
              tabIndex={0}
              onPointerDown={onHandlePointerDown}
              onPointerMove={onHandlePointerMove}
              onPointerUp={onHandlePointerUp}
              onPointerCancel={onHandlePointerUp}
              onKeyDown={onHandleKeyDown}
              className={cn(
                "absolute inset-y-0 left-full z-10 flex w-4 cursor-ew-resize touch-none items-center justify-center outline-none",
                "focus-visible:ring-2 focus-visible:ring-ring/40"
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "h-10 w-1 rounded-full bg-muted-foreground/30 transition-colors",
                  dragging
                    ? "bg-muted-foreground/55"
                    : "hover:bg-muted-foreground/45"
                )}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export type BlockListItem = BlockItem & {
  preview?: React.ReactNode
}

function BlockPreviewCard({ block }: { block: BlockListItem }) {
  const [viewport, setViewport] = React.useState<Viewport>("desktop")
  const [mode, setMode] = React.useState<ViewMode>("preview")

  return (
    <article className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="min-w-0 flex-1 text-body font-semibold leading-tight">
          {block.title}
        </h2>
        <BlockPreviewToolbar
          mode={mode}
          onModeChange={setMode}
          viewport={viewport}
          onViewportChange={setViewport}
        />
      </div>

      <div
        className={cn(
          "relative w-full overflow-hidden rounded-xl border border-border/80 shadow-xs",
          "aspect-[10/16] md:aspect-[4/5] lg:aspect-video",
          mode === "preview" ? "bg-muted/40" : "bg-background"
        )}
      >
        {mode === "preview" ? (
          <BlockPreviewFrame
            viewport={viewport}
            onViewportChange={setViewport}
          >
            {block.preview}
          </BlockPreviewFrame>
        ) : (
          <div className="absolute inset-0">
            <BlockCodePanel
              files={block.files ?? []}
              className="h-full rounded-none border-0 shadow-none"
            />
          </div>
        )}
      </div>

      <p className="mt-1 text-caption text-muted-foreground">{block.description}</p>
    </article>
  )
}

export function BlockList({ blocks }: { blocks: BlockListItem[] }) {
  return (
    <div className="flex flex-col gap-16">
      {blocks.map((block) => (
        <BlockPreviewCard key={block.id} block={block} />
      ))}
    </div>
  )
}
