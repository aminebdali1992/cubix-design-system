"use client"

/*
  Cubix Slider - Radix UI version.

  aria-label and aria-labelledby on the slider name every thumb, and disabled
  thumbs expose aria-disabled. Radix positions thumbs from its dir, so the
  slider follows the reading direction of the page like the other bases.
*/
import * as React from "react"
import { Slider as SliderPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

type ReadingDir = "ltr" | "rtl"

/*
  Radix falls back to left-to-right when it gets no dir. The slider starts
  right-to-left (Cubix is Persian-first) and then follows the closest dir
  attribute, or the computed direction when no attribute is set. An explicit
  dir prop wins.
*/
function useReadingDir(dir?: ReadingDir) {
  const ref = React.useRef<HTMLSpanElement | null>(null)
  const [pageDir, setPageDir] = React.useState<ReadingDir>("rtl")

  React.useLayoutEffect(() => {
    const parent = ref.current?.parentElement
    if (!parent) return
    const attribute = parent.closest("[dir]")?.getAttribute("dir")
    const resolved =
      attribute === "ltr" || attribute === "rtl"
        ? attribute
        : getComputedStyle(parent).direction
    if (resolved === "ltr" || resolved === "rtl") setPageDir(resolved)
  }, [])

  return { ref, dir: dir ?? pageDir }
}

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  disabled,
  dir,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: Omit<React.ComponentProps<typeof SliderPrimitive.Root>, "dir" | "ref"> & {
  dir?: ReadingDir
}) {
  const { ref, dir: resolvedDir } = useReadingDir(dir)
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )

  return (
    <SliderPrimitive.Root
      ref={ref}
      dir={resolvedDir}
      data-slot="slider"
      defaultValue={value === undefined ? _values : undefined}
      value={value}
      min={min}
      max={max}
      disabled={disabled}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-40 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="absolute bg-primary select-none data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-disabled={disabled || undefined}
          className="relative block size-3 shrink-0 rounded-full border border-ring bg-background ring-ring/50 transition-[color,box-shadow] select-none after:absolute after:-inset-2 hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden active:ring-3 disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
