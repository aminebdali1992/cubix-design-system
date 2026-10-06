"use client"

/*
  Cubix Slider - React Aria version.

  Same classes and props as the Base UI and Radix sliders, built on React Aria
  Slider, SliderTrack, SliderFill and SliderThumb. min / max / disabled /
  onValueChange / onValueCommitted map onto minValue / maxValue / isDisabled /
  onChange / onChangeEnd. A thumb renders for every value, and with no value
  the slider starts as a range from min to max. aria-label and
  aria-labelledby on the slider name every thumb. Thumbs follow the reading
  direction of the page.
*/
import * as React from "react"
import {
  I18nProvider,
  Slider as AriaSlider,
  SliderFill,
  SliderThumb,
  SliderTrack,
  type SliderProps as AriaSliderProps,
} from "react-aria-components"

import { cn } from "@/lib/utils"

type ReadingDir = "ltr" | "rtl"
type SliderValue = number | number[]

/*
  React Aria positions thumbs from its locale direction, while the fill uses
  CSS logical insets. Both must agree, so the locale follows the closest dir
  attribute, or the computed direction when no attribute is set. The slider
  starts right-to-left (Cubix is Persian-first). An explicit dir prop wins.
*/
function useReadingDir(dir?: ReadingDir) {
  const ref = React.useRef<HTMLDivElement | null>(null)
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

type SliderProps = Omit<
  AriaSliderProps<SliderValue>,
  | "className"
  | "children"
  | "value"
  | "defaultValue"
  | "onChange"
  | "onChangeEnd"
  | "minValue"
  | "maxValue"
  | "isDisabled"
> & {
  className?: string
  value?: SliderValue
  defaultValue?: SliderValue
  min?: number
  max?: number
  disabled?: boolean
  name?: string
  dir?: ReadingDir
  onValueChange?: (value: SliderValue) => void
  onValueCommitted?: (value: SliderValue) => void
}

function Slider({
  className,
  value,
  defaultValue,
  min = 0,
  max = 100,
  orientation = "horizontal",
  disabled,
  name,
  dir,
  onValueChange,
  onValueCommitted,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: SliderProps) {
  const { ref, dir: resolvedDir } = useReadingDir(dir)

  return (
    <I18nProvider locale={resolvedDir === "rtl" ? "fa-IR" : "en-US"}>
      <AriaSlider
        ref={ref}
        data-slot="slider"
        value={value}
        defaultValue={value === undefined ? (defaultValue ?? [min, max]) : undefined}
        minValue={min}
        maxValue={max}
        orientation={orientation}
        isDisabled={disabled}
        onChange={onValueChange}
        onChangeEnd={onValueCommitted}
        aria-labelledby={ariaLabelledBy}
        className={cn("group/slider data-horizontal:w-full data-vertical:h-full", className)}
        {...props}
      >
        {({ state }) => (
          <SliderTrack className="relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col">
            <div
              data-slot="slider-track"
              data-orientation={orientation}
              className="relative grow overflow-hidden rounded-full bg-muted select-none data-horizontal:h-1 data-horizontal:w-full data-vertical:h-full data-vertical:w-1"
            >
              <SliderFill data-slot="slider-range" className="bg-primary select-none" />
            </div>
            {state.values.map((_, index) => (
              <Thumb key={index} index={index} name={name} labelledBy={ariaLabelledBy} />
            ))}
          </SliderTrack>
        )}
      </AriaSlider>
    </I18nProvider>
  )
}

/*
  React Aria labels each thumb's input by the slider group first, and the
  group's content is the thumb values, so an external label would be read
  after the numbers. With aria-labelledby the input points at that label
  alone, which is how the Base UI and Radix thumbs are named.
*/
function Thumb({
  index,
  name,
  labelledBy,
}: {
  index: number
  name?: string
  labelledBy?: string
}) {
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  React.useLayoutEffect(() => {
    if (labelledBy) inputRef.current?.setAttribute("aria-labelledby", labelledBy)
  })

  return (
    <SliderThumb
      index={index}
      name={name}
      inputRef={inputRef}
      data-slot="slider-thumb"
      className="block size-3 shrink-0 rounded-full border border-ring bg-background ring-ring/50 transition-[color,box-shadow] select-none group-data-horizontal/slider:top-1/2 group-data-vertical/slider:left-1/2 after:absolute after:-inset-2 data-hovered:ring-3 data-focus-visible:ring-3 data-focus-visible:outline-hidden data-dragging:ring-3 data-disabled:pointer-events-none data-disabled:opacity-50"
    />
  )
}

export { Slider }
