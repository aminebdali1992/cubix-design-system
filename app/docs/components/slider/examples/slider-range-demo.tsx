"use client"

import { Slider } from "../docs-slider"

export function SliderRangeDemo() {
  return (
    <Slider defaultValue={[25, 50]} max={100} step={5} aria-label="بازه‌ی قیمت" className="w-full max-w-xs" />
  )
}
