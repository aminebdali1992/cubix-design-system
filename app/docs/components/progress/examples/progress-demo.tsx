"use client"

import { useEffect, useState } from "react"

import { Progress } from "../docs-progress"

export function ProgressDemo() {
  const [progress, setProgress] = useState(13)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Progress value={progress} aria-label="در حال بارگذاری" className="w-[60%]" />
  )
}