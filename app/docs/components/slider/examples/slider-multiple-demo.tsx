"use client"

import { Slider } from "../docs-slider"

export function SliderMultipleDemo() {
  return (
    <Slider defaultValue={[10, 20, 70]} max={100} step={10} aria-label="نقاط شکست" className="w-full max-w-xs" />
  )
}
