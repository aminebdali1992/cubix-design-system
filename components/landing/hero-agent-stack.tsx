"use client"

import * as React from "react"
import { motion, useMotionValue } from "framer-motion"

import { CursorAgentInstall } from "@/components/landing/cursor-agent-install"
import { usePrefersReducedMotion } from "@/components/landing/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

function SchematicWindow({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-2xl",
        "border border-foreground/20 bg-background/80",
        "shadow-[0_18px_40px_-28px_rgba(0,0,0,0.28)]",
        "dark:border-white/20 dark:bg-[#141414]/55 dark:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      <div className="flex h-10 shrink-0 items-center gap-3 border-b border-foreground/12 px-3.5 dark:border-white/12">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full border border-foreground/25 dark:border-white/30" />
          <span className="size-2 rounded-full border border-foreground/25 dark:border-white/30" />
          <span className="size-2 rounded-full border border-foreground/25 dark:border-white/30" />
        </div>
        <div className="mx-auto h-5 w-[40%] max-w-[168px] rounded-md border border-foreground/14 dark:border-white/16" />
        <div className="w-10" />
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[40px_minmax(0,1fr)] md:grid-cols-[40px_132px_minmax(0,1fr)]">
        <div className="border-e border-foreground/12 dark:border-white/12" />
        <div className="hidden border-e border-foreground/12 p-3 dark:border-white/12 md:block">
          <div className="space-y-2">
            <div className="h-px w-12 bg-foreground/18 dark:bg-white/20" />
            <div className="h-px w-[85%] bg-foreground/12 dark:bg-white/14" />
            <div className="ms-2 h-px w-[60%] bg-foreground/12 dark:bg-white/14" />
            <div className="h-px w-[72%] bg-foreground/12 dark:bg-white/14" />
            <div className="h-px w-[55%] bg-foreground/12 dark:bg-white/14" />
            <div className="mt-3 h-px w-[68%] bg-foreground/12 dark:bg-white/14" />
            <div className="h-px w-[48%] bg-foreground/12 dark:bg-white/14" />
          </div>
        </div>
        <div className="flex min-w-0 flex-col">
          <div className="border-b border-foreground/12 px-4 py-2.5 dark:border-white/12">
            <div className="h-px w-24 bg-foreground/18 dark:bg-white/20" />
          </div>
          <div className="flex-1 space-y-3 p-4">
            <div className="ms-auto h-7 w-[52%] rounded-xl border border-foreground/14 dark:border-white/16" />
            <div className="h-px w-[70%] bg-foreground/14 dark:bg-white/16" />
            <div className="h-px w-[58%] bg-foreground/12 dark:bg-white/14" />
            <div className="h-20 rounded-lg border border-dashed border-foreground/14 dark:border-white/16" />
            <div className="h-px w-[44%] bg-foreground/12 dark:bg-white/14" />
          </div>
          <div className="border-t border-foreground/12 px-3 py-2.5 dark:border-white/12">
            <div className="h-8 rounded-full border border-foreground/14 dark:border-white/16" />
          </div>
        </div>
      </div>
    </div>
  )
}

const PIN_SCROLL = "120svh"

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v))
}

function easeInOut(v: number) {
  return v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2
}

export function HeroAgentStack() {
  const reduceMotion = usePrefersReducedMotion()
  const trackRef = React.useRef<HTMLDivElement>(null)
  const slotRef = React.useRef<HTMLDivElement>(null)
  const [stickyTop, setStickyTop] = React.useState(0)
  const [overhang, setOverhang] = React.useState(0)

  const width = useMotionValue<number | string>("100%")
  const height = useMotionValue<number | string>("100%")
  const marginLeft = useMotionValue(0)
  const marginTop = useMotionValue(0)
  const radius = useMotionValue(16)
  const backOpacity = useMotionValue(1)

  React.useEffect(() => {
    if (reduceMotion) return
    let raf = 0
    let top = 0

    function update() {
      const track = trackRef.current
      const slot = slotRef.current
      if (!track || !slot) return
      const baseW = slot.offsetWidth
      const baseH = slot.offsetHeight
      const vw = document.documentElement.clientWidth
      const vh = window.innerHeight
      const header = document.querySelector<HTMLElement>("header.sticky")
      const headerH = header ? header.offsetHeight : 0

      const rect = track.getBoundingClientRect()
      const distance = rect.height - slot.parentElement!.offsetHeight
      const p = distance > 0 ? clamp01((top - rect.top) / distance) : 0
      const e = easeInOut(clamp01(p / 0.72))

      const w = baseW + (vw - baseW) * e
      const h = baseH + (vh - headerH - baseH) * e
      const slotLeft = slot.getBoundingClientRect().left
      const pinnedTop = headerH + (vh - headerH - baseH) / 2

      width.set(w)
      height.set(h)
      marginLeft.set(-slotLeft * e)
      marginTop.set((headerH - pinnedTop) * e)
      radius.set(16 * (1 - e))
      backOpacity.set(1 - clamp01(e / 0.4))
    }

    function measure() {
      const slot = slotRef.current
      if (!slot) return
      const h = slot.offsetHeight
      const header = document.querySelector<HTMLElement>("header.sticky")
      const headerH = header ? header.offsetHeight : 0
      top = Math.round(headerH + (window.innerHeight - headerH - h) / 2 - slot.offsetTop)
      setStickyTop(top)
      setOverhang(Math.max(0, Math.round((window.innerHeight - headerH - h) / 2)))
      update()
    }

    function onScroll() {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    measure()
    const observer = new ResizeObserver(measure)
    if (slotRef.current) observer.observe(slotRef.current)
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", measure)
    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", measure)
    }
  }, [reduceMotion, width, height, marginLeft, marginTop, radius, backOpacity])

  return (
    <div className="relative z-20 mx-auto w-full max-w-4xl pb-12 md:pb-16">
      <div ref={trackRef} className="relative">
        <div
          className={cn("pt-10 md:pt-14", !reduceMotion && "sticky")}
          style={reduceMotion ? undefined : { top: stickyTop }}
        >
          <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ opacity: backOpacity }}>
            {/* farthest */}
            <div className="absolute inset-x-[8%] top-0 -z-20 h-[min(100%,520px)] origin-top scale-[0.88] md:inset-x-[9%]">
              <div className="h-full opacity-[0.35] dark:opacity-[0.28]">
                <SchematicWindow />
              </div>
            </div>

            {/* middle */}
            <div className="absolute inset-x-[4%] top-4 -z-10 h-[min(100%,540px)] origin-top scale-[0.94] md:top-5 md:inset-x-[4.5%]">
              <div className="h-full opacity-[0.55] dark:opacity-[0.42]">
                <SchematicWindow />
              </div>
            </div>
          </motion.div>

          <div ref={slotRef} className="relative z-10 h-[506px] md:h-[546px]">
            <motion.div
              className="absolute top-0 left-0 overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_30px_80px_-20px_rgba(0,0,0,0.65)] [&>[role=img]]:h-full [&>[role=img]]:rounded-none"
              style={
                reduceMotion
                  ? { width: "100%", height: "100%", borderRadius: 16 }
                  : { width, height, marginLeft, marginTop, borderRadius: radius }
              }
            >
              <CursorAgentInstall />
            </motion.div>
          </div>
        </div>
        {!reduceMotion && <div aria-hidden style={{ height: PIN_SCROLL }} />}
      </div>
      {!reduceMotion && <div aria-hidden style={{ height: overhang }} />}
    </div>
  )
}
