"use client"

import { useCallback, useRef } from "react"

import { MOVE_RANGE, createMoveMotion, type MoveFrame } from "@/components/landing/cursor-motion"
import { ScrollCursorPointer, useScrollCursor, type ScrollCursorMotion } from "@/components/landing/scroll-cursor"
import { cn } from "@/lib/utils"

/** Scroll-scrubbed: the pointer grabs a displaced word and drags it into its place in the line. */
export function DragIntoPlace({ children, className }: { children: string; className?: string }) {
  const rootRef = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)
  const glyphRef = useRef<HTMLSpanElement>(null)

  const createMotion = useCallback((): ScrollCursorMotion<MoveFrame> | null => {
    const root = rootRef.current
    const text = textRef.current
    if (!root || !text) return null
    return {
      actionRange: MOVE_RANGE,
      fadeOut: true,
      measure: () =>
        createMoveMotion(
          { width: text.offsetWidth, height: text.offsetHeight },
          getComputedStyle(root).direction === "rtl",
          window.innerWidth
        ),
      apply: (frame) => {
        text.style.transform = frame.textTransform
      },
      reset: () => {
        text.style.transform = ""
      },
    }
  }, [])

  useScrollCursor(rootRef, cursorRef, glyphRef, createMotion)

  return (
    <span ref={rootRef} data-slot="drag-into-place" className={cn("relative isolate inline-block max-w-full", className)}>
      <span ref={textRef} className="relative z-10 inline-block max-w-full wrap-anywhere">
        {children}
      </span>
      <ScrollCursorPointer cursorRef={cursorRef} glyphRef={glyphRef} />
    </span>
  )
}
