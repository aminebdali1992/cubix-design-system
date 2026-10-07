"use client"

import * as React from "react"
import { Inter, JetBrains_Mono } from "next/font/google"
import { AnimatePresence, motion } from "framer-motion"
import {
  CheckIcon,
  ChevronRightIcon,
  CloudIcon,
  LoaderCircleIcon,
  PackageIcon,
  SearchIcon,
  SparklesIcon,
  TerminalIcon,
} from "lucide-react"

import { Button } from "@/components/cubix/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/cubix/card"
import {
  EmailField,
  EmailFieldInput,
  EmailFieldLabel,
} from "@/components/cubix/email-field"
import {
  PasswordField,
  PasswordFieldControl,
  PasswordFieldInput,
  PasswordFieldLabel,
  PasswordFieldToggle,
} from "@/components/cubix/password-field"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site"

import { CursorAgentComposer } from "./cursor-agent-composer"
import { TypingCaret } from "./cursor-agent-caret"
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion"

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

const USER_PROMPT =
  "Design a clean login screen with Cubix - email, password, and a primary sign-in button."

const AGENT_PLAN =
  "I'll use the Cubix Skill against the registry, pull the ready components, then compose the login UI."

const AGENT_SUCCESS =
  "Login is ready. Card, Email Field, Password Field, and Button came from the registry - same tokens in light and dark."

const SEARCH_HITS = [
  { name: "card", version: "1.0.0" },
  { name: "email-field", version: "1.0.0" },
  { name: "password-field", version: "1.0.0" },
  { name: "button", version: "1.0.0" },
] as const

const ADDED_FILES = [
  "components/cubix/card.tsx",
  "components/cubix/email-field.tsx",
  "components/cubix/password-field.tsx",
  "components/cubix/button.tsx",
] as const

type DemoPhase =
  | "idle"
  | "skill"
  | "typing"
  | "sending"
  | "user-sent"
  | "thinking"
  | "plan"
  | "search-run"
  | "search-done"
  | "add-run"
  | "add-writing"
  | "add-done"
  | "preview-card"
  | "preview-fields"
  | "preview-button"
  | "success"
  | "hold"

const PHASE_ORDER: DemoPhase[] = [
  "idle",
  "skill",
  "typing",
  "sending",
  "user-sent",
  "thinking",
  "plan",
  "search-run",
  "search-done",
  "add-run",
  "add-writing",
  "add-done",
  "preview-card",
  "preview-fields",
  "preview-button",
  "success",
  "hold",
]

const PHASE_AT = {
  skill: 1100,
  typing: 500,
  charMs: 26,
  afterTyped: 420,
  sending: 220,
  thinking: 700,
  plan: 900,
  searchRun: 900,
  searchDone: 1100,
  addRun: 700,
  addWriting: 1400,
  addDone: 700,
  previewCard: 650,
  previewFields: 850,
  previewButton: 650,
  success: 800,
  hold: 3600,
} as const

function phaseRank(phase: DemoPhase) {
  return PHASE_ORDER.indexOf(phase)
}

function atLeast(phase: DemoPhase, target: DemoPhase) {
  return phaseRank(phase) >= phaseRank(target)
}

function ThinkingDots() {
  return (
    <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
      <SparklesIcon className="size-3.5" aria-hidden />
      <span className="animate-pulse">Thinking</span>
    </div>
  )
}

function ToolShell({
  title,
  icon: Icon,
  status,
  children,
  reduceMotion,
}: {
  title: string
  icon: React.ComponentType<{ className?: string }>
  status: "running" | "done"
  children: React.ReactNode
  reduceMotion: boolean
}) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="overflow-hidden rounded-xl border border-border bg-background"
    >
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <Icon className="size-3.5 text-muted-foreground" aria-hidden />
        <span
          className="min-w-0 flex-1 truncate font-mono text-[12px] text-foreground"
          style={{ fontFamily: "var(--font-cursor-mono), ui-monospace, monospace" }}
        >
          {title}
        </span>
        <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          {status === "running" ? (
            <>
              <LoaderCircleIcon className="size-3 animate-spin" aria-hidden />
              Running
            </>
          ) : (
            <>
              <CheckIcon className="size-3 text-emerald-600 dark:text-emerald-400" aria-hidden />
              Done
            </>
          )}
        </span>
      </div>
      <div className="px-3 py-2.5">{children}</div>
    </motion.div>
  )
}

function LoginPreview({
  phase,
  reduceMotion,
}: {
  phase: DemoPhase
  reduceMotion: boolean
}) {
  const showCard = atLeast(phase, "preview-card")
  const showFields = atLeast(phase, "preview-fields")
  const showButton = atLeast(phase, "preview-button")
  const done = atLeast(phase, "success")

  return (
    <div className="relative flex h-full min-h-0 flex-col bg-muted/40 lg:border-s lg:border-border">
      <div className="flex h-10 shrink-0 items-center justify-between border-b border-border px-4">
        <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
          <span className="font-medium text-foreground">Preview</span>
          <span className="opacity-40">/</span>
          <span
            className="truncate"
            style={{ fontFamily: "var(--font-cursor-mono), ui-monospace, monospace" }}
          >
            login.tsx
          </span>
        </div>
        <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          {done ? (
            <>
              <CheckIcon className="size-3 text-emerald-600 dark:text-[#4ade80]" aria-hidden />
              Ready
            </>
          ) : showCard ? (
            <>
              <LoaderCircleIcon className="size-3 animate-spin" aria-hidden />
              Building
            </>
          ) : (
            "Waiting"
          )}
        </span>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-background p-5 md:p-7">
        <AnimatePresence mode="wait">
          {showCard ? (
            <motion.div
              key="login-card"
              initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[320px]"
            >
              <Card dir="rtl" lang="fa" className="w-full shadow-sm ring-foreground/10">
                <CardHeader>
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduceMotion ? 0 : 0.08, duration: 0.3 }}
                    className="space-y-1"
                  >
                    <CardTitle className="text-base font-medium">ورود به حساب</CardTitle>
                    <CardDescription>با حساب Cubix خود ادامه دهید.</CardDescription>
                  </motion.div>
                </CardHeader>
                <CardContent className="space-y-4 pb-(--card-spacing)">
                  <AnimatePresence>
                    {showFields ? (
                      <motion.div
                        key="fields"
                        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="space-y-4"
                      >
                        <EmailField>
                          <EmailFieldLabel>ایمیل</EmailFieldLabel>
                          <EmailFieldInput
                            defaultValue="amin@cubixflow.ir"
                            placeholder="example@cubix.com"
                            readOnly
                            tabIndex={-1}
                          />
                        </EmailField>
                        <PasswordField>
                          <PasswordFieldLabel>رمز عبور</PasswordFieldLabel>
                          <PasswordFieldControl>
                            <PasswordFieldInput
                              defaultValue="CubixPass123!"
                              placeholder="رمز عبور خود را وارد کنید"
                              readOnly
                              tabIndex={-1}
                            />
                            <PasswordFieldToggle tabIndex={-1} />
                          </PasswordFieldControl>
                        </PasswordField>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                  <AnimatePresence>
                    {showButton ? (
                      <motion.div
                        key="cta"
                        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Button className="w-full" tabIndex={-1}>
                          ورود
                        </Button>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={false}
              animate={{ opacity: 1 }}
              className="flex max-w-[220px] flex-col items-center gap-3 text-center text-[13px] text-muted-foreground"
            >
              <CloudIcon className="size-5 opacity-60" aria-hidden />
              <p>Waiting for registry install, then the preview builds field by field.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export function AgentLoginDesign() {
  const reduceMotion = usePrefersReducedMotion()
  const [phase, setPhase] = React.useState<DemoPhase>(reduceMotion ? "hold" : "idle")
  const [typed, setTyped] = React.useState(reduceMotion ? USER_PROMPT : "")
  const [filesVisible, setFilesVisible] = React.useState(
    reduceMotion ? ADDED_FILES.length : 0
  )
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
      setFilesVisible(ADDED_FILES.length)
      return
    }

    let cancelled = false

    function runLoop() {
      if (cancelled) return
      clearTimers()
      setPhase("idle")
      setTyped("")
      setFilesVisible(0)

      let t = 400
      schedule(() => setPhase("skill"), t)
      t += PHASE_AT.skill

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
      }, t)

      t +=
        PHASE_AT.typing +
        USER_PROMPT.length * PHASE_AT.charMs +
        PHASE_AT.afterTyped +
        PHASE_AT.sending +
        280

      schedule(() => setPhase("thinking"), t)
      t += PHASE_AT.thinking
      schedule(() => setPhase("plan"), t)
      t += PHASE_AT.plan
      schedule(() => setPhase("search-run"), t)
      t += PHASE_AT.searchRun
      schedule(() => setPhase("search-done"), t)
      t += PHASE_AT.searchDone
      schedule(() => setPhase("add-run"), t)
      t += PHASE_AT.addRun
      schedule(() => {
        setPhase("add-writing")
        setFilesVisible(0)
        ADDED_FILES.forEach((_, index) => {
          schedule(() => setFilesVisible(index + 1), 220 * (index + 1))
        })
      }, t)
      t += PHASE_AT.addWriting
      schedule(() => setPhase("add-done"), t)
      t += PHASE_AT.addDone
      schedule(() => setPhase("preview-card"), t)
      t += PHASE_AT.previewCard
      schedule(() => setPhase("preview-fields"), t)
      t += PHASE_AT.previewFields
      schedule(() => setPhase("preview-button"), t)
      t += PHASE_AT.previewButton
      schedule(() => setPhase("success"), t)
      t += PHASE_AT.success
      schedule(() => setPhase("hold"), t)
      t += PHASE_AT.hold
      schedule(runLoop, t)
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
  }, [reduceMotion, phase, filesVisible])

  const showSkill = atLeast(phase, "skill")
  const showUser = atLeast(phase, "user-sent")
  const draft = phase === "typing" || phase === "sending" ? typed : ""
  const showThinking = phase === "thinking"
  const showPlan = atLeast(phase, "plan")
  const showSearch = atLeast(phase, "search-run")
  const showAdd = atLeast(phase, "add-run")
  const showSuccess = atLeast(phase, "success")
  const busy = atLeast(phase, "user-sent") && !atLeast(phase, "success")

  return (
    <div
      role="img"
      aria-label="Animated demo showing Cubix Skill connecting to the registry, installing components with the CLI, and assembling a login UI preview."
      className={cn(
        cursorSans.className,
        cursorMono.variable,
        "w-full overflow-hidden border-0 bg-card text-card-foreground antialiased tracking-[-0.011em]"
      )}
    >
      <div className="flex h-full flex-col bg-card text-card-foreground">
        <div className="flex h-11 items-center gap-3 border-b border-border bg-muted/40 px-3.5">
          <div className="flex items-center gap-[7px]" aria-hidden>
            <span className="size-[11px] rounded-full bg-[#ff5f57]" />
            <span className="size-[11px] rounded-full bg-[#febc2e]" />
            <span className="size-[11px] rounded-full bg-[#28c840]" />
          </div>
          <div className="flex min-w-0 flex-1 items-center justify-center">
            <div className="flex max-w-full items-center gap-2 rounded-md border border-border bg-background px-3 py-1 text-[12px] text-muted-foreground">
              <TerminalIcon className="size-3.5 shrink-0 opacity-70" aria-hidden />
              <span className="truncate">Agent</span>
              <span className="opacity-40">/</span>
              <span className="truncate text-foreground">Cubix Skill</span>
            </div>
          </div>
          <div className="w-[52px]" aria-hidden />
        </div>

        <div className="grid h-[640px] grid-cols-1 grid-rows-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:h-[560px] lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:grid-rows-none">
          <div className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden bg-card">
            <div className="flex h-10 shrink-0 items-center gap-1.5 border-b border-border px-4 text-[13px]">
              <span className="font-medium text-foreground">Agent</span>
              <ChevronRightIcon className="size-3.5 text-muted-foreground" aria-hidden />
              <span className="text-muted-foreground">Build login</span>
            </div>

            <div
              ref={scrollRef}
              className="min-h-0 flex-1 overflow-hidden px-4 py-5 md:px-5"
            >
              <div ref={contentRef} className="flex flex-col gap-4">
                <AnimatePresence initial={false}>
                  {showSkill ? (
                    <motion.div
                      key="skill"
                      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl border border-border bg-muted/40 px-3.5 py-3"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md border border-border bg-background">
                          <SparklesIcon className="size-3.5" aria-hidden />
                        </span>
                        <div className="min-w-0 space-y-1">
                          <div className="text-[13px] font-medium text-foreground">
                            Cubix Skill connected
                          </div>
                          <p className="text-[12px] leading-relaxed text-muted-foreground">
                            Registry{" "}
                            <span className="font-mono text-foreground/80">
                              {siteConfig.registryUrl}
                            </span>
                            {" · "}
                            CLI{" "}
                            <span className="font-mono text-foreground/80">cubix-ui</span>
                          </p>
                        </div>
                        <CheckIcon
                          className="ms-auto size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                          aria-hidden
                        />
                      </div>
                    </motion.div>
                  ) : null}

                  {showUser ? (
                    <motion.div
                      key="user"
                      initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="flex justify-end"
                    >
                      <div className="max-w-[min(100%,34rem)] rounded-2xl rounded-br-md bg-muted px-4 py-2.5 text-[14px] leading-[1.55] text-foreground">
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

                  {showPlan ? (
                    <motion.p
                      key="plan"
                      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="max-w-[min(100%,40rem)] text-[14px] leading-[1.6] text-foreground"
                    >
                      {AGENT_PLAN}
                    </motion.p>
                  ) : null}

                  {showSearch ? (
                    <ToolShell
                      key="search"
                      title="npx cubix-ui@latest search -q login"
                      icon={SearchIcon}
                      status={atLeast(phase, "search-done") ? "done" : "running"}
                      reduceMotion={reduceMotion}
                    >
                      <div
                        className="space-y-1.5 font-mono text-[12px] leading-relaxed"
                        style={{
                          fontFamily: "var(--font-cursor-mono), ui-monospace, monospace",
                        }}
                      >
                        {atLeast(phase, "search-done") ? (
                          SEARCH_HITS.map((hit) => (
                            <div
                              key={hit.name}
                              className="flex items-center justify-between gap-3 text-muted-foreground"
                            >
                              <span className="text-foreground">{hit.name}</span>
                              <span>v{hit.version} · ready</span>
                            </div>
                          ))
                        ) : (
                          <span className="text-muted-foreground">
                            Querying {siteConfig.registryUrl}
                            <TypingCaret />
                          </span>
                        )}
                      </div>
                    </ToolShell>
                  ) : null}

                  {showAdd ? (
                    <ToolShell
                      key="add"
                      title="npx cubix-ui@latest add card email-field password-field button"
                      icon={PackageIcon}
                      status={atLeast(phase, "add-done") ? "done" : "running"}
                      reduceMotion={reduceMotion}
                    >
                      <div
                        className="space-y-1.5 font-mono text-[12px]"
                        style={{
                          fontFamily: "var(--font-cursor-mono), ui-monospace, monospace",
                        }}
                      >
                        {ADDED_FILES.slice(0, filesVisible).map((file) => (
                          <div
                            key={file}
                            className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400"
                          >
                            <CheckIcon className="size-3 shrink-0" aria-hidden />
                            <span className="truncate">+ {file}</span>
                          </div>
                        ))}
                        {phase === "add-run" ||
                        (phase === "add-writing" && filesVisible < ADDED_FILES.length) ? (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <LoaderCircleIcon className="size-3 animate-spin" aria-hidden />
                            Writing owned source into the repo
                            <TypingCaret />
                          </div>
                        ) : null}
                        {atLeast(phase, "add-done") ? (
                          <div className="pt-1 text-muted-foreground">
                            4 components added · base from cubix.json
                          </div>
                        ) : null}
                      </div>
                    </ToolShell>
                  ) : null}

                  {showSuccess ? (
                    <motion.p
                      key="success"
                      initial={reduceMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="max-w-[min(100%,40rem)] text-[14px] leading-[1.6] text-foreground"
                    >
                      {AGENT_SUCCESS}
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>

            <div className="shrink-0 border-t border-border">
              <CursorAgentComposer
                draft={draft}
                typing={phase === "typing"}
                sending={phase === "sending"}
                busy={busy}
                hasMessages={showUser}
                reduceMotion={reduceMotion}
                tone="surface"
              />
            </div>
          </div>

          <div className="h-full min-h-0 overflow-hidden border-t border-border lg:border-t-0">
            <LoginPreview phase={reduceMotion ? "hold" : phase} reduceMotion={reduceMotion} />
          </div>
        </div>
      </div>
    </div>
  )
}
