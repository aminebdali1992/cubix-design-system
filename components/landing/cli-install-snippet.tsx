"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CheckIcon, FileCodeIcon, FolderIcon, TerminalIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import { TypingCaret } from "./cursor-agent-caret"
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion"

type Line =
  | { kind: "command"; text: string }
  | { kind: "ok"; text: string }
  | { kind: "file"; text: string }

const LINES: Line[] = [
  { kind: "command", text: "$ npx cubix-ui@latest init" },
  { kind: "ok", text: "Wrote cubix.json and design tokens" },
  { kind: "command", text: "$ npx cubix-ui@latest add button dialog" },
  { kind: "ok", text: "Added button, dialog (base)" },
  { kind: "file", text: "components/cubix/button.tsx" },
  { kind: "file", text: "components/cubix/dialog.tsx" },
  { kind: "file", text: "lib/utils.ts" },
]

const TREE = [
  { label: "components/cubix", kind: "folder" as const },
  { label: "button.tsx", kind: "file" as const, indent: true },
  { label: "dialog.tsx", kind: "file" as const, indent: true },
  { label: "cubix.json", kind: "file" as const },
]

const FILES_REVEAL_AT = 4

export function CliInstallSnippet() {
  const reduceMotion = usePrefersReducedMotion()
  const [visible, setVisible] = React.useState(reduceMotion ? LINES.length : 0)

  React.useEffect(() => {
    if (reduceMotion) {
      setVisible(LINES.length)
      return
    }

    let cancelled = false
    let count = 0

    function tick() {
      if (cancelled) return
      count += 1
      setVisible(count)
      if (count < LINES.length) {
        const line = LINES[count - 1]
        const delay = line.kind === "file" ? 380 : line.kind === "ok" ? 720 : 880
        window.setTimeout(tick, delay)
      } else {
        window.setTimeout(() => {
          if (cancelled) return
          count = 0
          setVisible(0)
          window.setTimeout(tick, 600)
        }, 3400)
      }
    }

    const start = window.setTimeout(tick, 500)
    return () => {
      cancelled = true
      window.clearTimeout(start)
    }
  }, [reduceMotion])

  const showTree = visible >= FILES_REVEAL_AT

  return (
    <div
      role="img"
      aria-label="Terminal snippet showing cubix-ui init and add button dialog."
      className="flex h-full min-h-[280px] flex-col overflow-hidden bg-background text-foreground md:min-h-full dark:bg-[#111111] dark:text-[#e4e4e7]"
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
        <span className="ms-auto hidden font-mono text-[11px] sm:inline">base</span>
      </div>

      <div className="grid flex-1 grid-cols-1 md:grid-cols-[148px_minmax(0,1fr)]">
        <div className="hidden border-e border-border md:flex md:flex-col dark:border-white/10">
          <div className="flex h-9 items-center border-b border-border px-3 font-mono text-[11px] tracking-wide text-muted-foreground uppercase dark:border-white/10 dark:text-white/40">
            Created
          </div>
          <div className="flex flex-1 flex-col gap-2 px-3 py-4">
            <AnimatePresence>
              {showTree ? (
                <motion.ul
                  key="tree"
                  initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  className="space-y-2 font-mono text-[12px] text-muted-foreground dark:text-white/55"
                >
                  {TREE.map((item) => (
                    <li
                      key={item.label}
                      className={cn(
                        "flex items-center gap-2",
                        item.indent && "ps-3"
                      )}
                    >
                      {item.kind === "folder" ? (
                        <FolderIcon className="size-3.5 shrink-0 opacity-70" aria-hidden />
                      ) : (
                        <FileCodeIcon className="size-3.5 shrink-0 opacity-70" aria-hidden />
                      )}
                      <span className="truncate">{item.label}</span>
                    </li>
                  ))}
                </motion.ul>
              ) : (
                <motion.div
                  key="waiting"
                  initial={false}
                  animate={{ opacity: 1 }}
                  className="space-y-2"
                  aria-hidden
                >
                  <div className="h-2.5 w-[88%] rounded-sm bg-muted" />
                  <div className="h-2.5 w-[70%] rounded-sm bg-muted/80 ps-3" />
                  <div className="h-2.5 w-[64%] rounded-sm bg-muted/80" />
                  <div className="h-2.5 w-[52%] rounded-sm bg-muted/70" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="mt-auto flex h-9 items-center border-t border-border px-3 font-mono text-[11px] text-muted-foreground dark:border-white/10 dark:text-white/40">
            registry · local
          </div>
        </div>

        <div className="flex flex-col justify-start space-y-1.5 px-4 py-5 font-mono text-[13px] leading-6 md:px-5">
          <AnimatePresence initial={false}>
            {LINES.slice(0, visible).map((line, index) => (
              <motion.div
                key={`${line.text}-${index}`}
                initial={reduceMotion ? false : { opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "flex items-start gap-2",
                  line.kind === "ok" && "text-emerald-700 dark:text-[#86efac]",
                  line.kind === "command" && "text-foreground dark:text-[#f4f4f5]",
                  line.kind === "file" && "ps-5 text-muted-foreground dark:text-white/45"
                )}
              >
                {line.kind === "ok" ? (
                  <CheckIcon className="mt-1 size-3.5 shrink-0" aria-hidden />
                ) : null}
                {line.kind === "file" ? (
                  <span className="text-muted-foreground/70 dark:text-white/30" aria-hidden>
                    +
                  </span>
                ) : null}
                <span>{line.text}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          {!reduceMotion && visible < LINES.length ? (
            <div className="ps-0 text-muted-foreground">
              <TypingCaret />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
