"use client"

import * as React from "react"

import { Label } from "@/components/cubix/label"
import { Slider } from "@/components/cubix/slider"

export function SliderDemo() {
  return (
    <Slider
      defaultValue={[33]}
      max={100}
      step={1}
      className="mx-auto w-full max-w-xs"
    />
  )
}

export function SliderRangeDemo() {
  return (
    <Slider
      defaultValue={[25, 50]}
      max={100}
      step={5}
      className="mx-auto w-full max-w-xs"
    />
  )
}

export function SliderMultipleDemo() {
  return (
    <Slider
      defaultValue={[10, 20, 70]}
      max={100}
      step={10}
      className="mx-auto w-full max-w-xs"
    />
  )
}

export function SliderVerticalDemo() {
  return (
    <div className="mx-auto flex w-full max-w-xs items-center justify-center gap-6">
      <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        orientation="vertical"
        className="h-40"
      />
      <Slider
        defaultValue={[25]}
        max={100}
        step={1}
        orientation="vertical"
        className="h-40"
      />
    </div>
  )
}

export function SliderControlledDemo() {
  const [value, setValue] = React.useState([0.3, 0.7])

  return (
    <div className="mx-auto grid w-full max-w-xs gap-3">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor="slider-demo-temperature">Temperature</Label>
        <span className="text-sm text-muted-foreground tabular-nums">
          {value.join(", ")}
        </span>
      </div>
      <Slider
        id="slider-demo-temperature"
        value={value}
        onValueChange={(next) => setValue(next as number[])}
        min={0}
        max={1}
        step={0.1}
      />
    </div>
  )
}

export function SliderDisabledDemo() {
  return (
    <Slider
      defaultValue={[50]}
      max={100}
      step={1}
      disabled
      className="mx-auto w-full max-w-xs"
    />
  )
}

export function SliderRtlDemo() {
  return (
    <div dir="rtl" className="w-full">
      <Slider
        defaultValue={[40]}
        max={100}
        step={1}
        className="mx-auto w-full max-w-xs"
      />
    </div>
  )
}
