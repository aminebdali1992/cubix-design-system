"use client"

import { Slider } from "../docs-slider"

export function SliderDemo() {
  return (
    <Slider defaultValue={[33]} max={100} step={1} aria-label="صدا" className="w-full max-w-xs" />
  )
}
