"use client"

import { useEffect, type RefObject } from "react"

import {
  CURSOR_HOTSPOT,
  RESTING_HEADING,
  angleDifference,
  clamp,
  cursorHeading,
  followDistance,
  measureMotionPath,
  turnToward,
  type FollowState,
  type MotionPath,
  type Point,
} from "@/components/landing/cursor-motion"

const MAX_FRAME_SECONDS = 0.05
const TURN_DAMPING = 0.55
const FADE_IN_PROGRESS = 0.08
const FADE_OUT_PROGRESS = 0.12
const HEADING_PROBE = 0.001
const EDGE_SNAP = 1e-7
const INTERACTION_EVENTS = ["wheel", "touchstart", "pointerdown", "keydown"] as const

export type CursorFrame = { point: Point; scale: number; pathPoint?: Point }

export type ScrollCursorMotion<F extends CursorFrame> = {
  /** Scroll-progress edges where the pointer starts and finishes acting. */
  actionRange: readonly [number, number]
  /** Re-reads layout and returns the frame function, or null when there is nothing to animate. */
  measure: () => ((t: number) => F) | null
  /** Writes the non-pointer side effects of a frame (highlight fills, word transform). */
  apply: (frame: F) => void
  /** Overrides the pointer rotation; defaults to facing the direction of travel. */
  heading?: (t: number, travelHeading: number) => number
  fadeOut: boolean
  reset: () => void
}

/**
 * Scroll-scrubbed pointer: progress runs from the element entering the viewport bottom until it
 * reaches the middle, and the pointer follows that target with a speed cap so it glides.
 */
export function useScrollCursor<F extends CursorFrame>(
  rootRef: RefObject<HTMLElement | null>,
  cursorRef: RefObject<HTMLElement | null>,
  glyphRef: RefObject<HTMLElement | null>,
  createMotion: () => ScrollCursorMotion<F> | null
) {
  useEffect(() => {
    const root = rootRef.current
    const cursor = cursorRef.current
    const glyph = glyphRef.current
    const motion = createMotion()
    if (!root || !cursor || !glyph || !motion) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frameAt: ((t: number) => F) | null = null
    let path: MotionPath | null = null
    let startY = 0
    let span = 1
    let needsMeasure = true
    let frame: number | null = null
    let lastTime: number | undefined
    let follow: FollowState | undefined
    let lastTarget: number | undefined
    let progress = 0
    let heading = RESTING_HEADING
    let travelHeading = RESTING_HEADING
    let lastPoint: Point = { x: 0, y: 0 }
    let snap = true

    const measure = () => {
      needsMeasure = false
      const origin = root.getBoundingClientRect()
      const viewport = document.documentElement.clientHeight || window.innerHeight
      startY = origin.top + window.scrollY - viewport
      span = Math.max(1, (root.clientHeight + viewport) / 2)
      const at = motion.measure()
      frameAt = at
      path = at
        ? measureMotionPath((t) => {
            const sample = at(t)
            return sample.pathPoint ?? sample.point
          })
        : null
      lastTarget = undefined
      if (follow && path) follow = { value: path.distanceAt(progress), velocity: 0 }
    }

    const paint = (now: number) => {
      frame = null
      if (needsMeasure) measure()
      const at = frameAt
      if (!path || !at) return

      const reduced = reducedMotion.matches
      const dt = lastTime === undefined ? 0 : clamp((now - lastTime) / 1000, 0, MAX_FRAME_SECONDS)
      const scroll = reduced ? 1 : clamp((window.scrollY - startY) / span)
      const fresh = follow === undefined || snap
      const target = path.distanceAt(scroll)
      if (!fresh && lastTarget === target && follow?.value === target && (scroll === 0 || scroll === 1)) {
        lastTime = undefined
        return
      }

      const targetVelocity = lastTarget === undefined || dt === 0 ? 0 : (target - lastTarget) / dt
      lastTarget = target
      follow =
        follow === undefined || reduced || snap
          ? { value: target, velocity: 0 }
          : followDistance(follow, target, dt, targetVelocity)
      const raw = path.progressAt(follow.value)
      progress = motion.actionRange.find((edge) => Math.abs(raw - edge) < EDGE_SNAP) ?? raw

      const current = at(progress)
      motion.apply(current)

      const point = current.point
      const before = fresh ? at(Math.max(0, progress - HEADING_PROBE)).point : lastPoint
      const after = fresh ? at(Math.min(1, progress + HEADING_PROBE)).point : point
      if (Math.hypot(after.x - before.x, after.y - before.y) > 0.01) {
        travelHeading = cursorHeading(after.x - before.x, after.y - before.y)
      }
      const wanted = motion.heading?.(progress, travelHeading) ?? travelHeading
      heading = fresh ? wanted : turnToward(heading, wanted, TURN_DAMPING * dt)
      lastPoint = point

      const fadeIn = clamp(progress / FADE_IN_PROGRESS)
      const fadeOut = motion.fadeOut ? clamp((1 - progress) / FADE_OUT_PROGRESS) : 1
      cursor.style.transform = `translate3d(${point.x - CURSOR_HOTSPOT}px, ${point.y - CURSOR_HOTSPOT}px, 0)`
      cursor.style.opacity = reduced ? "0" : String(Math.min(fadeIn, fadeOut))
      glyph.style.transform = `rotate(${heading}deg) scale(${reduced ? 1 : current.scale})`

      const turning = progress > 0 && progress < 1 && Math.abs(angleDifference(heading, wanted)) > 0.1
      const animating = !reduced && (follow.value !== target || turning)
      lastTime = animating ? now : undefined
      if (animating) schedule()
    }

    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(paint)
    }
    const remeasure = () => {
      needsMeasure = true
      schedule()
    }
    const onScroll = () => {
      lastTime ??= performance.now()
      schedule()
    }
    const onInteract = () => {
      snap = false
    }
    const onPageShow = () => {
      snap = true
      remeasure()
    }

    const resize = new ResizeObserver(remeasure)
    resize.observe(root)
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", remeasure)
    window.addEventListener("pageshow", onPageShow)
    for (const type of INTERACTION_EVENTS) window.addEventListener(type, onInteract, { passive: true })
    reducedMotion.addEventListener("change", schedule)
    document.fonts.ready.then(remeasure).catch(() => undefined)
    schedule()

    return () => {
      if (frame !== null) cancelAnimationFrame(frame)
      resize.disconnect()
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", remeasure)
      window.removeEventListener("pageshow", onPageShow)
      for (const type of INTERACTION_EVENTS) window.removeEventListener(type, onInteract)
      reducedMotion.removeEventListener("change", schedule)
      motion.reset()
      cursor.style.opacity = "0"
    }
  }, [rootRef, cursorRef, glyphRef, createMotion])
}

export function ScrollCursorPointer({
  cursorRef,
  glyphRef,
}: {
  cursorRef: RefObject<HTMLSpanElement | null>
  glyphRef: RefObject<HTMLSpanElement | null>
}) {
  return (
    <span
      ref={cursorRef}
      aria-hidden
      data-slot="scroll-cursor"
      className="pointer-events-none absolute top-0 left-0 z-20 opacity-0"
    >
      <span ref={glyphRef} className="block" style={{ transformOrigin: `${CURSOR_HOTSPOT}px ${CURSOR_HOTSPOT}px` }}>
        <svg viewBox="0 0 24 24" className="block size-6" fill="none">
          <path
            className="fill-background"
            d="M5.00114 1.85328C5.8546 1.67945 6.69665 1.77339 7.48356 2.05348L20.3966 6.65406C21.4592 7.03657 22.3847 7.69515 22.9904 8.70192C23.6196 9.72433 23.7834 10.897 23.4006 12.0623C23.0051 13.2894 22.0906 14.1164 21.0607 14.6433L16.7131 16.8611L14.508 21.1951C13.979 22.229 13.1514 23.1425 11.923 23.5369C10.7468 23.9152 9.59354 23.7519 8.58317 23.1463C7.55034 22.5299 6.88803 21.6005 6.50602 20.5408L1.90348 7.62086C1.62516 6.83889 1.52702 5.99731 1.70427 5.14332C1.8707 4.3334 2.24975 3.59784 2.8488 2.99879C3.44976 2.39783 4.18815 2.01889 5.00114 1.85328Z"
          />
          <path
            className="fill-foreground"
            d="M12.725 20.2874C12.3583 21.0041 11.8833 21.4541 11.3 21.6374C10.7167 21.8291 10.15 21.7582 9.6 21.4249C9.05 21.0999 8.64583 20.5791 8.3875 19.8624L3.7875 6.9499C3.6125 6.45824 3.57083 5.99157 3.6625 5.5499C3.75417 5.0999 3.95417 4.72073 4.2625 4.4124C4.57083 4.10407 4.95 3.90407 5.4 3.8124C5.85 3.72074 6.32083 3.7624 6.8125 3.9374L19.725 8.5374C20.4417 8.79574 20.9625 9.1999 21.2875 9.7499C21.6208 10.2916 21.6917 10.8541 21.5 11.4374C21.3167 12.0207 20.8667 12.4957 20.15 12.8624L15.225 15.3749L12.725 20.2874Z"
          />
        </svg>
      </span>
    </span>
  )
}
