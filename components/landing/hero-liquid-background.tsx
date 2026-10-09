"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

// LiquidEther (React Bits, MIT + Commons Clause): website only, not part of the Cubix registry.
const LiquidEther = dynamic(() => import("@/components/landing/liquid-ether"), { ssr: false })

const LIGHT_COLORS = ["#e4e4e7", "#a1a1aa", "#71717a"]
const DARK_COLORS = ["#27272a", "#52525b", "#a1a1aa"]

export function HeroLiquidBackground() {
  const { resolvedTheme } = useTheme()
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)")
    const sync = () => setEnabled(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  if (!enabled || !resolvedTheme) return null
  const dark = resolvedTheme === "dark"

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-30 dark:opacity-35">
      <LiquidEther
        key={resolvedTheme}
        colors={dark ? DARK_COLORS : LIGHT_COLORS}
        mouseForce={20}
        cursorSize={100}
        resolution={0.5}
        autoDemo
        autoSpeed={0.4}
        autoIntensity={2}
      />
    </div>
  )
}