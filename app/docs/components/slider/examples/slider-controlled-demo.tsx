"use client"

import { useState } from "react"

import { Slider } from "../docs-slider"

const formatter = new Intl.NumberFormat("fa-IR")

export function SliderControlledDemo() {
  const [value, setValue] = useState([30, 70])

  return (
    <div className="grid w-full max-w-xs gap-2">
      <div className="flex items-center justify-between gap-2">
        <span id="slider-temperature" className="text-label font-normal text-foreground">
          دما
        </span>
        <span className="text-description text-muted-foreground tabular-nums">
          {value.map((v) => formatter.format(v)).join(" تا ")}
        </span>
      </div>
      <Slider
        aria-labelledby="slider-temperature"
        value={value}
        onValueChange={setValue}
        min={0}
        max={100}
        step={1}
      />
    </div>
  )
}