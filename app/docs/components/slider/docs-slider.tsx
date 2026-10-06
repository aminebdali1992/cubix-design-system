"use client"

import { usePathname } from "next/navigation"

import * as AriaSlider from "@/components/cubix/aria/slider"
import * as BaseSlider from "@/components/cubix/base/slider"
import * as RadixSlider from "@/components/cubix/radix/slider"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type SliderProps = {
  className?: string
  value?: number[]
  defaultValue?: number[]
  onValueChange?: (value: number[]) => void
  min?: number
  max?: number
  step?: number
  orientation?: "horizontal" | "vertical"
  disabled?: boolean
  "aria-label"?: string
  "aria-labelledby"?: string
}

function useSliderBase() {
  return parseComponentPath(usePathname())?.base ?? DEFAULT_BASE
}

function toArray(value: number | readonly number[]) {
  return typeof value === "number" ? [value] : [...value]
}

function Slider({ onValueChange, ...props }: SliderProps) {
  const base = useSliderBase()
  const handleChange = onValueChange
    ? (value: number | readonly number[]) => onValueChange(toArray(value))
    : undefined
  if (base === "radix") return <RadixSlider.Slider onValueChange={handleChange} {...props} />
  if (base === "aria") return <AriaSlider.Slider onValueChange={handleChange} {...props} />
  return <BaseSlider.Slider onValueChange={handleChange} {...props} />
}

export { Slider }
export type { SliderProps }
