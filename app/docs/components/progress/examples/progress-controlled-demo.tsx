"use client"

import { useState } from "react"

import { Slider } from "@/app/docs/components/slider/docs-slider"
import { Progress, ProgressLabel, ProgressValue } from "../docs-progress"

export function ProgressControlledDemo() {
  const [value, setValue] = useState(50)

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Progress value={value}>
        <ProgressLabel>میزان پیشرفت</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Slider
        value={[value]}
        onValueChange={(next) => setValue(typeof next === "number" ? next : next[0])}
        max={100}
        step={1}
        aria-label="مقدار پیشرفت"
      />
    </div>
  )
}