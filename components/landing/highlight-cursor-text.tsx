"use client"

import { Fragment, useCallback, useRef } from "react"

import {
  HIGHLIGHT_RANGE,
  createHighlightMotion,
  measureTextLines,
  type HighlightFrame,
} from "@/components/landing/cursor-motion"
import { ScrollCursorPointer, useScrollCursor, type ScrollCursorMotion } from "@/components/landing/scroll-cursor"
import { cn } from "@/lib/utils"

export type HighlightSegment = string | { highlight: string }

const LINE_CLASS_NAME = "absolute rounded-[0.14em] bg-primary/30 dark:bg-primary/40"

type IndexedSegment =
  | { kind: "text"; text: string }
  | { kind: "highlight"; text: string; index: number }

function indexSegments(segments: HighlightSegment[]): IndexedSegment[] {
  let next = 0
  return segments.map((segment) =>
    typeof segment === "string"
      ? { kind: "text", text: segment }
      : { kind: "highlight", text: segment.highlight, index: next++ }
  )
}

/** Scroll-scrubbed highlight: the pointer sweeps each phrase and glides between them. */
export function HighlightCursorText({
  segments,
  className,
}: {
  segments: HighlightSegment[]
  className?: string
}) {
  const rootRef = useRef<HTMLSpanElement>(null)
  const overlayRef = useRef<HTMLSpanElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)
  const glyphRef = useRef<HTMLSpanElement>(null)
  const markRefs = useRef<Array<HTMLSpanElement | null>>([])
  const indexed = indexSegments(segments)
  const highlightCount = indexed.filter((segment) => segment.kind === "highlight").length

  const createMotion = useCallback((): ScrollCursorMotion<HighlightFrame> | null => {
    const root = rootRef.current
    const overlay = overlayRef.current
    if (!root || !overlay) return null
    let rtl = false
    let lineOwners: number[] = []
    let fills: HTMLSpanElement[] = []
    const marks = () => markRefs.current.slice(0, highlightCount)

    return {
      actionRange: HIGHLIGHT_RANGE,
      fadeOut: false,
      heading: (t, travelHeading) => (t >= HIGHLIGHT_RANGE[0] ? (rtl ? 90 : 0) : travelHeading),
      measure: () => {
        rtl = getComputedStyle(root).direction === "rtl"
        const origin = root.getBoundingClientRect()
        const perMark = marks().map((mark) => (mark ? measureTextLines(mark, origin) : []))
        const lines = perMark.flat()
        lineOwners = perMark.flatMap((markLines, owner) => markLines.map(() => owner))
        fills = lines.map((line) => {
          const fill = document.createElement("span")
          fill.className = LINE_CLASS_NAME
          Object.assign(fill.style, {
            left: `${line.x}px`,
            top: `${line.y}px`,
            width: `${line.width}px`,
            height: `${line.height}px`,
            transform: "scaleX(0)",
            transformOrigin: rtl ? "right" : "left",
          })
          return fill
        })
        overlay.replaceChildren(...fills)
        return lines.length ? createHighlightMotion(lines, rtl) : null
      },
      apply: (frame) => {
        fills.forEach((fill, i) => {
          fill.style.transform = `scaleX(${frame.fills[i]})`
        })
        marks().forEach((mark, owner) => {
          if (!mark) return
          mark.dataset.active = String(frame.fills.some((fill, i) => lineOwners[i] === owner && fill > 0))
        })
      },
      reset: () => {
        overlay.replaceChildren()
      },
    }
  }, [highlightCount])

  useScrollCursor(rootRef, cursorRef, glyphRef, createMotion)

  return (
    <span ref={rootRef} data-slot="highlight-cursor-text" className={cn("relative isolate block", className)}>
      <span ref={overlayRef} aria-hidden className="pointer-events-none absolute top-0 left-0" />
      <span className="relative z-10">
        {indexed.map((segment, i) =>
          segment.kind === "text" ? (
            <Fragment key={i}>{segment.text}</Fragment>
          ) : (
            <span
              key={i}
              ref={(el) => {
                markRefs.current[segment.index] = el
              }}
              data-slot="highlight-cursor-text-mark"
              className="transition-colors duration-300 data-[active=true]:text-foreground"
            >
              {segment.text}
            </span>
          )
        )}
      </span>
      <ScrollCursorPointer cursorRef={cursorRef} glyphRef={glyphRef} />
    </span>
  )
}
