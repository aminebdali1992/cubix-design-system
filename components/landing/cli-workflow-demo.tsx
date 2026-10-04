"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  CheckIcon,
  GitCompareArrowsIcon,
  LayoutGridIcon,
  RefreshCwIcon,
  TerminalIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

import { TypingCaret } from "./cursor-agent-caret"
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion"

type Line =
  | { kind: "command"; text: string }
  | { kind: "ok"; text: string }
  | { kind: "muted"; text: string }
  | { kind: "diff-add"; text: string }
  | { kind: "diff-del"; text: string }

type Step = {
  id: "init" | "add" | "diff" | "update"
  title: string
  cli: string
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  lines: Line[]
}

const STEPS: Step[] = [
  {
    id: "init",
    title: "Set up in your project",
    cli: "init",
    icon: TerminalIcon,
    lines: [
      { kind: "command", text: "$ npx cubix-ui@latest init" },
      { kind: "muted", text: "Detecting Next.js · Tailwind CSS · RSC" },
      { kind: "ok", text: "Wrote cubix.json and design tokens" },
      { kind: "ok", text: "Added lib/utils.ts" },
    ],
  },
  {
    id: "add",
    title: "Add a component",
    cli: "add",
    icon: LayoutGridIcon,
    lines: [
      { kind: "command", text: "$ npx cubix-ui@latest add button" },
      { kind: "muted", text: "Fetching https://cubixflow.ir/r/button.json" },
      { kind: "ok", text: "Added button (base)" },
      { kind: "ok", text: "components/cubix/button.tsx" },
    ],
  },
  {
    id: "diff",
    title: "Compare with the new version",
    cli: "diff",
    icon: GitCompareArrowsIcon,
    lines: [
      { kind: "command", text: "$ git diff components/cubix/button.tsx" },
      {
        kind: "diff-del",
        text: '-  variant: "default" | "secondary"',
      },
      {
        kind: "diff-add",
        text: '+  variant: "default" | "secondary" | "outline"',
      },
      { kind: "muted", text: "Review the diff before you overwrite local edits" },
    ],
  },
  {
    id: "update",
    title: "Update safely",
    cli: "add --overwrite",
    icon: RefreshCwIcon,
    lines: [
      {
        kind: "command",
        text: "$ npx cubix-ui@latest add button --overwrite",
      },
      { kind: "muted", text: "Replacing owned source from the registry" },
      { kind: "ok", text: "Updated button - review the merge, keep your product edits" },
    ],
  },
]

const STEP_HOLD_MS = 4200
const LINE_DELAY_MS = 520

const RING_SIZE = 36
const RING_STROKE = 2
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

function StepProgressRing({
  durationMs,
  paused,
  onComplete,
}: {
  durationMs: number
  paused: boolean
  onComplete: () => void
}) {
  const circleRef = React.useRef<SVGCircleElement>(null)

  React.useEffect(() => {
    const node = circleRef.current
    if (!node) return

    function handleEnd(event: AnimationEvent) {
      if (event.target !== node) return
      onComplete()
    }
    node.addEventListener("animationend", handleEnd)
    return () => node.removeEventListener("animationend", handleEnd)
  }, [onComplete])

  return (
    <svg
      width={RING_SIZE}
      height={RING_SIZE}
      viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
      className="pointer-events-none absolute inset-0 -rotate-90 text-foreground"
      aria-hidden
    >
      <circle
        cx={RING_SIZE / 2}
        cy={RING_SIZE / 2}
        r={RING_RADIUS}
        fill="none"
        stroke="currentColor"
        strokeWidth={RING_STROKE}
        className="opacity-20"
      />
      <circle
        ref={circleRef}
        cx={RING_SIZE / 2}
        cy={RING_SIZE / 2}
        r={RING_RADIUS}
        fill="none"
        stroke="currentColor"
        strokeWidth={RING_STROKE}
        strokeLinecap="round"
        strokeDasharray={RING_CIRCUMFERENCE}
        className="cli-step-ring"
        style={{
          ["--cli-step-ring-duration" as string]: `${durationMs}ms`,
          ["--cli-step-ring-circumference" as string]: RING_CIRCUMFERENCE,
          animationPlayState: paused ? "paused" : "running",
        }}
      />
    </svg>
  )
}

function TerminalLines({
  lines,
  reduceMotion,
}: {
  lines: Line[]
  reduceMotion: boolean
}) {
  const [visible, setVisible] = React.useState(reduceMotion ? lines.length : 0)

  React.useEffect(() => {
    if (reduceMotion) {
      setVisible(lines.length)
      return
    }

    setVisible(0)
    let cancelled = false
    let count = 0
    const timers: number[] = []

    function tick() {
      if (cancelled) return
      count += 1
      setVisible(count)
      if (count < lines.length) {
        timers.push(window.setTimeout(tick, LINE_DELAY_MS))
      }
    }

    timers.push(window.setTimeout(tick, 180))
    return () => {
      cancelled = true
      for (const timer of timers) window.clearTimeout(timer)
    }
  }, [lines, reduceMotion])

  return (
    <div className="flex flex-col justify-start space-y-1.5 px-4 py-5 font-mono text-[13px] leading-6 md:px-5">
      <AnimatePresence initial={false} mode="popLayout">
        {lines.slice(0, visible).map((line, index) => (
          <motion.div
            key={`${line.text}-${index}`}
            initial={reduceMotion ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "flex items-start gap-2",
              line.kind === "command" && "text-foreground dark:text-[#f4f4f5]",
              line.kind === "ok" && "text-emerald-700 dark:text-[#86efac]",
              line.kind === "muted" && "text-muted-foreground dark:text-white/45",
              line.kind === "diff-add" && "text-emerald-700 dark:text-[#86efac]",
              line.kind === "diff-del" && "text-destructive"
            )}
          >
            {line.kind === "ok" ? (
              <CheckIcon className="mt-1 size-3.5 shrink-0" aria-hidden />
            ) : null}
            <span className="min-w-0 break-all">{line.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>
      {!reduceMotion && visible < lines.length ? (
        <div className="text-muted-foreground">
          <TypingCaret />
        </div>
      ) : null}
    </div>
  )
}

export function CliWorkflowDemo() {
  const reduceMotion = usePrefersReducedMotion()
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [paused, setPaused] = React.useState(false)
  const [cycleKey, setCycleKey] = React.useState(0)

  const advance = React.useCallback(() => {
    setActiveIndex((current) => {
      const next = (current + 1) % STEPS.length
      if (next === 0) setCycleKey((key) => key + 1)
      return next
    })
  }, [])

  const selectStep = React.useCallback((index: number) => {
    setActiveIndex(index)
    setCycleKey((key) => key + 1)
  }, [])

  const active = STEPS[activeIndex]!

  return (
    <div
      className="grid h-full min-h-[320px] grid-cols-1 md:min-h-[360px] md:grid-cols-2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false)
        }
      }}
    >
      <div className="order-2 flex flex-col justify-between gap-8 border-t border-border bg-muted/25 px-5 py-6 md:order-1 md:border-t-0 md:border-e md:px-7 md:py-8">
        <ol className="relative flex flex-col gap-0" aria-label="Cubix CLI workflow steps">
          {STEPS.map((step, index) => {
            const Icon = step.icon
            const isActive = index === activeIndex
            const isComplete = index < activeIndex
            const isPastOrActive = index <= activeIndex

            return (
              <li key={step.id} className="relative flex gap-3 pb-5 last:pb-0">
                {index < STEPS.length - 1 ? (
                  <span
                    aria-hidden
                    className={cn(
                      "absolute start-[17px] top-[calc(2.25rem+6px)] h-[calc(100%-2.25rem-12px)] w-px",
                      isComplete
                        ? "bg-foreground"
                        : "bg-[repeating-linear-gradient(to_bottom,var(--border)_0_3px,transparent_3px_6px)]"
                    )}
                  />
                ) : null}
                <button
                  type="button"
                  onClick={() => selectStep(index)}
                  aria-current={isActive ? "step" : undefined}
                  className={cn(
                    "relative z-10 flex w-full items-start gap-3 rounded-lg text-start transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  )}
                >
                  <span className="relative size-9 shrink-0">
                    {!reduceMotion && isActive ? (
                      <StepProgressRing
                        key={`${step.id}-${cycleKey}`}
                        durationMs={STEP_HOLD_MS}
                        paused={paused}
                        onComplete={advance}
                      />
                    ) : null}
                    <span
                      className={cn(
                        "absolute inset-[3px] flex items-center justify-center rounded-full border transition-colors",
                        isActive
                          ? "border-transparent bg-foreground text-background"
                          : isPastOrActive
                            ? "border-foreground/35 bg-background text-foreground"
                            : "border-border bg-background text-muted-foreground"
                      )}
                    >
                      <Icon className="size-3.5" aria-hidden />
                    </span>
                  </span>
                  <span className="min-w-0 flex-1 pt-1">
                    <span
                      className={cn(
                        "block text-sm font-medium tracking-tight",
                        isActive ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {step.title}
                    </span>
                    <span
                      className={cn(
                        "mt-0.5 block font-mono text-xs",
                        isActive
                          ? "text-foreground/70"
                          : "text-muted-foreground/80"
                      )}
                    >
                      cubix-ui {step.cli}
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ol>

        <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
          Component source lands in your repo - you own it. Registry dependencies
          and npm packages resolve with the CLI, and upgrades stay intentional.
        </p>
      </div>

      <div
        role="img"
        aria-label={`Terminal showing cubix-ui ${active.cli}: ${active.title}.`}
        className="order-1 flex min-h-[240px] flex-col overflow-hidden bg-background md:order-2 md:min-h-0 dark:bg-[#111111] dark:text-[#e4e4e7]"
      >
        <div className="flex h-10 items-center gap-3 border-b border-border px-4 text-xs text-muted-foreground dark:border-white/10 dark:text-white/55">
          <div className="flex items-center gap-1.5" aria-hidden>
            <span className="size-2 rounded-full bg-border dark:bg-white/20" />
            <span className="size-2 rounded-full bg-border dark:bg-white/20" />
            <span className="size-2 rounded-full bg-border dark:bg-white/20" />
          </div>
          <div className="flex min-w-0 items-center gap-2">
            <TerminalIcon className="size-3.5 shrink-0" aria-hidden />
            <span className="truncate font-mono">~/app - cubix-ui</span>
          </div>
          <span className="ms-auto font-mono text-[11px] text-muted-foreground">
            {active.cli}
          </span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-1 flex-col"
          >
            <TerminalLines lines={active.lines} reduceMotion={reduceMotion} />
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  )
}
