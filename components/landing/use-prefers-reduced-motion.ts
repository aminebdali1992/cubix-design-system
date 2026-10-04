"use client"

import * as React from "react"
import { useReducedMotion } from "framer-motion"

export function usePrefersReducedMotion() {
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
