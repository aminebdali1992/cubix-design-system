"use client"

import * as React from "react"
import { Inter, JetBrains_Mono } from "next/font/google"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  FileCodeIcon,
  FileIcon,
  FilesIcon,
  FolderIcon,
  LoaderCircleIcon,
  SearchIcon,
  SparklesIcon,
  TerminalIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  AGENT_INTRO,
  AGENT_SUCCESS,
  CONFIG_JSON,
  CONFIG_PATH,
  FILE_TREE,
  PHASE_AT,
  USER_PROMPT,
  type DemoPhase,
} from "./cursor-agent-script"
import { TypingCaret } from "./cursor-agent-caret"
import { CursorAgentComposer } from "./cursor-agent-composer"

const cursorSans = Inter({
  subsets: ["latin"],
  variable: "--font-cursor-sans",
  display: "swap",
})

const cursorMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-cursor-mono",
  display: "swap",
})

function usePrefersReducedMotion() {
  const framer = useReducedMotion()
  const [match, setMatch] = React.useState(false)

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    setMatch(media.matches)
    function onChange() {
      setMatch(media.matches)
    }
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [])

  return Boolean(framer || match)
}

const PHASE_ORDER: DemoPhase[] = [
  "idle",
  "typing",
  "sending",
  "user-sent",
  "thinking",
  "agent-intro",
  "tool-open",
  "tool-writing",
  "tool-done",
  "success",
  "hold",
]

function phaseRank(phase: DemoPhase) {
  return PHASE_ORDER.indexOf(phase)
}

function atLeast(phase: DemoPhase, target: DemoPhase) {
  return phaseRank(phase) >= phaseRank(target)
}

function ThinkingDots() {
  return (
    <div className="flex items-center gap-2 text-[13px] text-[#8b8b8b]">
      <SparklesIcon className="size-3.5 text-[#a1a1aa]" aria-hidden />
      <span className="animate-pulse">Thinking</span>
    </div>
  )
}

function ConfigFileCard({
  status,
  reduceMotion,
}: {
  status: "open" | "writing" | "done"
  reduceMotion: boolean
}) {
  const lines = CONFIG_JSON.split("\n")
  const [visibleCount, setVisibleCount] = React.useState(
    status === "done" ? lines.length : status === "open" ? 2 : 1
  )

  React.useEffect(() => {
    if (status === "done") {
      setVisibleCount(lines.length)
      return
    }
    if (status === "open") {
      setVisibleCount(2)
      return
    }
    if (reduceMotion) {
      setVisibleCount(lines.length)
      return
    }
    setVisibleCount(1)
    let i = 1
    const id = window.setInterval(() => {
      i += 1
      setVisibleCount(Math.min(i, lines.length))
      if (i >= lines.length) window.clearInterval(id)
    }, 110)
    return () => window.clearInterval(id)
  }, [status, reduceMotion, lines.length])

  return (
    <div className="overflow-hidden rounded-lg border border-[#2a2a2a] bg-[#141414]">
      <div className="flex items-center gap-2 border-b border-[#2a2a2a] px-3 py-2">
        <FileCodeIcon className="size-3.5 text-[#8b8b8b]" aria-hidden />
        <span
          className="min-w-0 flex-1 truncate text-[12px] text-[#d4d4d8]"
          style={{ fontFamily: "var(--font-cursor-mono), ui-monospace, monospace" }}
        >
          {CONFIG_PATH}
        </span>
        <span className="flex items-center gap-1.5 text-[11px] text-[#8b8b8b]">
          {status === "writing" ? (
            <>
              <LoaderCircleIcon className="size-3 animate-spin" aria-hidden />
              Writing
            </>
          ) : null}
          {status === "done" ? (
            <>
              <CheckIcon className="size-3 text-[#4ade80]" aria-hidden />
              Wrote
            </>
          ) : null}
          {status === "open" ? (
            <>
              <ChevronDownIcon className="size-3" aria-hidden />
              Edit
            </>
          ) : null}
        </span>
      </div>
      <pre
        className="overflow-x-auto px-3 py-3 text-[12px] leading-[1.65] text-[#c4c4c4]"
        style={{ fontFamily: "var(--font-cursor-mono), ui-monospace, monospace" }}
      >
        {lines.slice(0, visibleCount).map((line, index) => (
          <div key={`${index}-${line}`}>
            <span className="me-4 inline-block w-4 select-none text-right text-[#525252]">
              {index + 1}
            </span>
            {line || " "}
          </div>
        ))}
        {status === "writing" && visibleCount < lines.length ? <TypingCaret /> : null}
      </pre>
    </div>
  )
}

function FileTree({ revealConfig }: { revealConfig: boolean }) {
  return (
    <div className="hidden w-[200px] shrink-0 flex-col overflow-y-auto border-e border-[#2a2a2a] bg-[#141414] lg:flex">
      <div className="px-3 py-2.5 text-[11px] font-medium tracking-[0.04em] text-[#6f6f6f] uppercase">
        Explorer
      </div>
      <ul className="flex flex-col gap-px px-2 pb-3 text-[12.5px]">
        {FILE_TREE.map((entry) => {
          const isConfig = Boolean(entry.highlight)
          if (isConfig && !revealConfig) return null
          return (
            <li
              key={`${entry.depth}-${entry.name}`}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-1.5 py-[5px] text-[#9a9a9a]",
                isConfig && "bg-[#1f1f1f] text-[#e8e8e8]"
              )}
              style={{ paddingInlineStart: `${6 + entry.depth * 12}px` }}
            >
              {entry.kind === "folder" ? (
                <FolderIcon className="size-3.5 shrink-0 opacity-75" aria-hidden />
              ) : (
                <FileIcon className="size-3.5 shrink-0 opacity-75" aria-hidden />
              )}
              <span className="truncate">{entry.name}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function CursorAgentInstall() {
  const reduceMotion = usePrefersReducedMotion()
  const [phase, setPhase] = React.useState<DemoPhase>(reduceMotion ? "hold" : "idle")
  const [typed, setTyped] = React.useState(reduceMotion ? USER_PROMPT : "")
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const timers = React.useRef<number[]>([])

  const clearTimers = React.useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id))
    timers.current = []
  }, [])

  const schedule = React.useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms)
    timers.current.push(id)
  }, [])

  React.useEffect(() => {
    if (reduceMotion) {
      setPhase("hold")
      setTyped(USER_PROMPT)
      return
    }

    let cancelled = false

    function runLoop() {
      if (cancelled) return
      clearTimers()
      setPhase("idle")
      setTyped("")

      schedule(() => {
        setPhase("typing")
        let i = 0
        function typeNext() {
          if (cancelled) return
          i += 1
          setTyped(USER_PROMPT.slice(0, i))
          if (i < USER_PROMPT.length) {
            schedule(typeNext, PHASE_AT.charMs)
          } else {
            schedule(() => setPhase("sending"), PHASE_AT.afterTyped)
            schedule(() => setPhase("user-sent"), PHASE_AT.afterTyped + PHASE_AT.sending)
          }
        }
        typeNext()
      }, PHASE_AT.typing)

      const afterUser =
        PHASE_AT.typing +
        USER_PROMPT.length * PHASE_AT.charMs +
        PHASE_AT.afterTyped +
        PHASE_AT.sending

      schedule(() => setPhase("thinking"), afterUser + 350)
      schedule(() => setPhase("agent-intro"), afterUser + 350 + PHASE_AT.thinking)
      schedule(
        () => setPhase("tool-open"),
        afterUser + 350 + PHASE_AT.thinking + PHASE_AT.agentIntro
      )
      schedule(
        () => setPhase("tool-writing"),
        afterUser + 350 + PHASE_AT.thinking + PHASE_AT.agentIntro + PHASE_AT.toolOpen
      )
      const afterWrite =
        afterUser +
        350 +
        PHASE_AT.thinking +
        PHASE_AT.agentIntro +
        PHASE_AT.toolOpen +
        PHASE_AT.toolWriting
      schedule(() => setPhase("tool-done"), afterWrite)
      schedule(() => setPhase("success"), afterWrite + PHASE_AT.toolDone)
      schedule(() => setPhase("hold"), afterWrite + PHASE_AT.toolDone + PHASE_AT.success)
      schedule(runLoop, afterWrite + PHASE_AT.toolDone + PHASE_AT.success + PHASE_AT.hold)
    }

    runLoop()
    return () => {
      cancelled = true
      clearTimers()
    }
  }, [reduceMotion, clearTimers, schedule])

  React.useEffect(() => {
    const scroller = scrollRef.current
    const content = contentRef.current
    if (!scroller || !content) return
    const observer = new ResizeObserver(() => {
      scroller.scrollTo({
        top: scroller.scrollHeight,
        behavior: reduceMotion ? "auto" : "smooth",
      })
    })
    observer.observe(content)
    return () => observer.disconnect()
  }, [reduceMotion])

  const showUser = atLeast(phase, "user-sent")
  const draft = phase === "typing" || phase === "sending" ? typed : ""
  const showThinking = phase === "thinking"
  const showAgent = atLeast(phase, "agent-intro")
  const showTool = atLeast(phase, "tool-open")
  const showSuccess = atLeast(phase, "success")
  const revealConfig = atLeast(phase, "tool-done")
  const busy = atLeast(phase, "user-sent") && !atLeast(phase, "success")

  const toolStatus =
    phaseRank(phase) >= phaseRank("tool-done")
      ? "done"
      : phaseRank(phase) >= phaseRank("tool-writing")
        ? "writing"
        : "open"

  return (
    <div
      role="img"
      aria-label="Animated Cursor Agent demo running npx cubix-ui@latest init, which writes cubix.json and adds Button."
      className={cn(
        cursorSans.className,
        cursorMono.variable,
        "w-full overflow-hidden rounded-2xl border border-[#2e2e2e]",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_30px_80px_-20px_rgba(0,0,0,0.65)]",
        "antialiased tracking-[-0.011em]"
      )}
    >
      <div className="flex flex-col bg-[#181818] text-[#e4e4e7]">
        <div className="flex h-11 items-center gap-3 border-b border-[#2a2a2a] bg-[#1c1c1c] px-3.5">
          <div className="flex items-center gap-[7px]" aria-hidden>
            <span className="size-[11px] rounded-full bg-[#ff5f57]" />
            <span className="size-[11px] rounded-full bg-[#febc2e]" />
            <span className="size-[11px] rounded-full bg-[#28c840]" />
          </div>
          <div className="flex min-w-0 flex-1 items-center justify-center">
            <div className="flex max-w-full items-center gap-2 rounded-md border border-[#2f2f2f] bg-[#141414] px-3 py-1 text-[12px] text-[#a1a1aa]">
              <TerminalIcon className="size-3.5 shrink-0 opacity-70" aria-hidden />
              <span className="truncate">Agent</span>
              <span className="text-[#525252]">/</span>
              <span className="truncate text-[#d4d4d8]">Set up Cubix</span>
            </div>
          </div>
          <div className="w-[52px]" aria-hidden />
        </div>

        <div className="flex h-[460px] md:h-[500px]">
          <div
            className="hidden w-12 shrink-0 flex-col items-center justify-between border-e border-[#2a2a2a] bg-[#141414] py-3.5 sm:flex"
            aria-hidden
          >
            <div className="flex flex-col items-center gap-4">
              <FilesIcon className="size-[18px] text-[#e4e4e7]" />
              <SearchIcon className="size-[18px] text-[#6f6f6f]" />
              <SparklesIcon className="size-[18px] text-[#6f6f6f]" />
            </div>
            <div className="size-6 rounded-full bg-[#2a2a2a]" />
          </div>

          <FileTree revealConfig={revealConfig} />

          <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-[#181818]">
            <div className="flex shrink-0 items-center gap-1.5 border-b border-[#2a2a2a] px-4 py-2.5 text-[13px]">
              <span className="font-medium text-[#f4f4f5]">Agent</span>
              <ChevronRightIcon className="size-3.5 text-[#525252]" aria-hidden />
              <span className="text-[#8b8b8b]">New chat</span>
            </div>

            <div
              ref={scrollRef}
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 md:px-5"
            >
              <div ref={contentRef} className="flex flex-col gap-5">
                <AnimatePresence initial={false}>
                  {showUser ? (
                    <motion.div
                      key="user"
                      initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="flex justify-end"
                    >
                      <div className="max-w-[min(100%,34rem)] rounded-2xl rounded-br-md bg-[#2b2b2b] px-4 py-2.5 text-[14px] leading-[1.55] text-[#f4f4f5]">
                        {USER_PROMPT}
                      </div>
                    </motion.div>
                  ) : null}

                  {showThinking ? (
                    <motion.div
                      key="thinking"
                      initial={reduceMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <ThinkingDots />
                    </motion.div>
                  ) : null}

                  {showAgent ? (
                    <motion.div
                      key="agent"
                      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="max-w-[min(100%,40rem)] space-y-3.5"
                    >
                      <p className="text-[14px] leading-[1.6] text-[#e7e7e7]">{AGENT_INTRO}</p>

                      {showTool ? (
                        <motion.div
                          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.28 }}
                        >
                          <ConfigFileCard status={toolStatus} reduceMotion={reduceMotion} />
                        </motion.div>
                      ) : null}

                      {showSuccess ? (
                        <motion.p
                          initial={reduceMotion ? false : { opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="text-[14px] leading-[1.6] text-[#e7e7e7]"
                        >
                          {AGENT_SUCCESS}
                        </motion.p>
                      ) : null}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>

            <CursorAgentComposer
              draft={draft}
              typing={phase === "typing"}
              sending={phase === "sending"}
              busy={busy}
              hasMessages={showUser}
              reduceMotion={reduceMotion}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
