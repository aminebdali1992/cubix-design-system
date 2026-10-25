"use client"

import { Slider } from "../docs-slider"

export function SliderVerticalDemo() {
  return (
    <div className="flex items-center justify-center gap-6">
      <Slider defaultValue={[50]} max={100} step={1} orientation="vertical" aria-label="بم" className="h-40" />
      <Slider defaultValue={[25]} max={100} step={1} orientation="vertical" aria-label="زیر" className="h-40" />
    </div>
  )
}
