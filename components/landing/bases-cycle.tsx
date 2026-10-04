"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"

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

import { usePrefersReducedMotion } from "./use-prefers-reduced-motion"

const CYCLE_MS = 10000

const bases = [
  {
    id: "base",
    label: "Base UI",
    flag: "--base base",
    note: "Default Cubix primitive layer. Compose with render props and tokens.",
  },
  {
    id: "aria",
    label: "React Aria",
    flag: "--base aria",
    note: "Same visual API with React Aria Components under the hood.",
  },
  {
    id: "radix",
    label: "Radix UI",
    flag: "--base radix",
    note: "Radix primitives, Cubix styling - switch without rewriting product UI.",
  },
] as const

function ChipProgress({
  durationMs,
  className,
}: {
  durationMs: number
  className?: string
}) {
  const size = 14
  const stroke = 1.75
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const [offset, setOffset] = React.useState(circumference)

  React.useEffect(() => {
    const frame = window.requestAnimationFrame(() => setOffset(0))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn("-rotate-90", className)}
      aria-hidden
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        className="opacity-25"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{
          transition: `stroke-dashoffset ${durationMs}ms linear`,
        }}
      />
    </svg>
  )
}

function WindowFormPreview({ baseLabel }: { baseLabel: string }) {
  return (
    <div
      className="mx-auto w-full max-w-[300px] overflow-hidden rounded-xl border border-border bg-card text-card-foreground"
      aria-hidden
    >
      <div className="flex h-10 items-center gap-3 border-b border-border bg-muted/60 px-3">
        <div className="flex items-center gap-[7px]">
          <span className="size-[11px] rounded-full bg-[#ff5f57]" />
          <span className="size-[11px] rounded-full bg-[#febc2e]" />
          <span className="size-[11px] rounded-full bg-[#28c840]" />
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-center">
          <div className="max-w-full truncate rounded-md border border-border bg-background px-3 py-0.5 text-[11px] text-muted-foreground">
            Preview / {baseLabel}
          </div>
        </div>
        <div className="w-[52px]" />
      </div>

      <div className="relative bg-background">
        <Card
          dir="rtl"
          lang="fa"
          className="relative w-full rounded-none bg-card shadow-none ring-0"
        >
          <CardHeader className="gap-1">
            <CardTitle className="text-base font-medium">ورود به حساب</CardTitle>
            <CardDescription>با حساب Cubix خود ادامه دهید.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pb-(--card-spacing)">
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
            <Button className="w-full" tabIndex={-1} lang="fa">
              ورود
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export function BasesCycle() {
  const reduceMotion = usePrefersReducedMotion()
  const [index, setIndex] = React.useState(0)
  const [cycleKey, setCycleKey] = React.useState(0)

  React.useEffect(() => {
    if (reduceMotion) return
    const id = window.setTimeout(() => {
      setIndex((value) => (value + 1) % bases.length)
      setCycleKey((value) => value + 1)
    }, CYCLE_MS)
    return () => window.clearTimeout(id)
  }, [reduceMotion, index, cycleKey])

  function selectBase(next: number) {
    setIndex(next)
    setCycleKey((value) => value + 1)
  }

  const active = bases[index]

  return (
    <div className="w-full overflow-hidden bg-background">
      <div className="grid md:grid-cols-[1.05fr_0.95fr] md:items-stretch">
        <div className="flex flex-col items-start justify-center gap-5 border-b border-border p-6 text-start md:border-b-0 md:border-e md:p-8 md:px-10 md:py-10">
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Primitive bases"
          >
            {bases.map((base, i) => {
              const selected = i === index
              return (
                <button
                  key={base.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => selectBase(i)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    selected
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  {selected && !reduceMotion ? (
                    <ChipProgress key={cycleKey} durationMs={CYCLE_MS} />
                  ) : (
                    <span
                      className={cn(
                        "size-3.5 rounded-full border",
                        selected
                          ? "border-background/40 bg-background/20"
                          : "border-current/30"
                      )}
                      aria-hidden
                    />
                  )}
                  {base.label}
                </button>
              )
            })}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              role="tabpanel"
              aria-label={active.label}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="flex w-full flex-col items-start space-y-3"
            >
              <h3 className="text-2xl font-semibold tracking-tight">{active.label}</h3>
              <p className="max-w-sm text-muted-foreground">{active.note}</p>
              <code className="inline-flex rounded-md border border-border bg-muted px-2.5 py-1 font-mono text-xs text-foreground">
                npx cubix-ui@latest add button {active.flag}
              </code>
              <p className="text-xs text-muted-foreground">
                Same form API on {active.label}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center bg-muted/60 px-6 py-10 md:px-8 md:py-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <WindowFormPreview baseLabel={active.label} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
