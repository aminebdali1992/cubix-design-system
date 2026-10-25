"use client"

import { Slider } from "../docs-slider"

export function SliderDisabledDemo() {
  return (
    <Slider defaultValue={[50]} max={100} step={1} disabled aria-label="صدا" className="w-full max-w-xs" />
  )
}
