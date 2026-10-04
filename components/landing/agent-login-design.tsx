"use client"

import * as React from "react"
import { Inter, JetBrains_Mono } from "next/font/google"
import { AnimatePresence, motion } from "framer-motion"
import {
  CheckIcon,
  ChevronRightIcon,
  LoaderCircleIcon,
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

import { CursorAgentComposer } from "./cursor-agent-composer"
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

const AGENT_INTRO =
  "Building with Cubix primitives: Card, Email Field, Password Field, and Button. Same tokens in light and dark."

const AGENT_SUCCESS =
  "Login form is ready. Fields use Cubix focus and invalid states, and the CTA is the primary Button."

type DemoPhase =
  | "idle"
  | "typing"
  | "sending"
  | "user-sent"
  | "thinking"
  | "agent-intro"
  | "preview-card"
  | "preview-fields"
  | "preview-button"
  | "success"
  | "hold"

const PHASE_ORDER: DemoPhase[] = [
  "idle",
  "typing",
  "sending",
  "user-sent",
  "thinking",
  "agent-intro",
  "preview-card",
  "preview-fields",
  "preview-button",
  "success",
  "hold",
]

const PHASE_AT = {
  typing: 800,
  charMs: 28,
  afterTyped: 500,
  sending: 240,
  thinking: 800,
  agentIntro: 900,
  previewCard: 700,
  previewFields: 900,
  previewButton: 700,
  success: 700,
  hold: 3400,
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
    <div className="relative flex h-full min-h-0 flex-col border-t border-border bg-muted/40 lg:border-t-0 lg:border-s">
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
              <Card
                dir="rtl"
                lang="fa"
                className="w-full shadow-sm ring-foreground/10"
              >
                <CardHeader>
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduceMotion ? 0 : 0.08, duration: 0.3 }}
                    className="space-y-1"
                  >
                    <CardTitle className="text-base font-medium">
                      ورود به حساب
                    </CardTitle>
                    <CardDescription>
                      با حساب Cubix خود ادامه دهید.
                    </CardDescription>
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
              className="flex flex-col items-center gap-2 text-center text-[13px] text-muted-foreground"
            >
              <SparklesIcon className="size-5 opacity-60" aria-hidden />
              <p>Preview updates as the agent builds.</p>
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

      let t = afterUser + 300
      schedule(() => setPhase("thinking"), t)
      t += PHASE_AT.thinking
      schedule(() => setPhase("agent-intro"), t)
      t += PHASE_AT.agentIntro
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
  }, [reduceMotion])

  const showUser = atLeast(phase, "user-sent")
  const draft = phase === "typing" || phase === "sending" ? typed : ""
  const showThinking = phase === "thinking"
  const showAgent = atLeast(phase, "agent-intro")
  const showSuccess = atLeast(phase, "success")
  const busy = atLeast(phase, "user-sent") && !atLeast(phase, "success")

  return (
    <div
      role="img"
      aria-label="Animated agent demo designing a Cubix login form while a live preview assembles on the side."
      className={cn(
        cursorSans.className,
        cursorMono.variable,
        "w-full overflow-hidden border-0 bg-card text-card-foreground antialiased tracking-[-0.011em]"
      )}
    >
      <div className="flex flex-col bg-card text-card-foreground">
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
              <span className="truncate text-foreground">Design login</span>
            </div>
          </div>
          <div className="w-[52px]" aria-hidden />
        </div>

        <div className="grid min-h-[520px] grid-cols-1 lg:min-h-[500px] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="flex min-h-[320px] min-w-0 flex-col bg-card lg:min-h-0">
            <div className="flex h-10 shrink-0 items-center gap-1.5 border-b border-border px-4 text-[13px]">
              <span className="font-medium text-foreground">Agent</span>
              <ChevronRightIcon className="size-3.5 text-muted-foreground" aria-hidden />
              <span className="text-muted-foreground">New chat</span>
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

                  {showAgent ? (
                    <motion.div
                      key="agent"
                      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="max-w-[min(100%,40rem)] space-y-3.5"
                    >
                      <p className="text-[14px] leading-[1.6] text-foreground">{AGENT_INTRO}</p>
                      <ul className="space-y-2 text-[13px] text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <CheckIcon
                            className={cn(
                              "size-3.5",
                              atLeast(phase, "preview-card")
                                ? "text-emerald-600 dark:text-[#4ade80]"
                                : "text-muted-foreground/40"
                            )}
                            aria-hidden
                          />
                          Compose Card shell and title
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckIcon
                            className={cn(
                              "size-3.5",
                              atLeast(phase, "preview-fields")
                                ? "text-emerald-600 dark:text-[#4ade80]"
                                : "text-muted-foreground/40"
                            )}
                            aria-hidden
                          />
                          Wire Email Field and Password Field
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckIcon
                            className={cn(
                              "size-3.5",
                              atLeast(phase, "preview-button")
                                ? "text-emerald-600 dark:text-[#4ade80]"
                                : "text-muted-foreground/40"
                            )}
                            aria-hidden
                          />
                          Add primary Button CTA
                        </li>
                      </ul>
                      {showSuccess ? (
                        <motion.p
                          initial={reduceMotion ? false : { opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-[14px] leading-[1.6] text-foreground"
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
              tone="surface"
            />
          </div>

          <div className="min-h-[280px] lg:min-h-0">
            <LoginPreview phase={reduceMotion ? "hold" : phase} reduceMotion={reduceMotion} />
          </div>
        </div>
      </div>
    </div>
  )
}
