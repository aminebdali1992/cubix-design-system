import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  SliderControlledDemo,
  SliderDemo,
  SliderDisabledDemo,
  SliderMultipleDemo,
  SliderRangeDemo,
  SliderRtlDemo,
  SliderVerticalDemo,
} from "@/components/examples/slider-examples"

import { sliderPropRows } from "./slider-table-data"

const description =
  "An input where the user selects a value from within a given range."

export const metadata: Metadata = {
  title: "Slider",
  description,
}

const usageImport = `import { Slider } from "@/components/cubix/slider"`

const usageSnippet = `<Slider defaultValue={[33]} max={100} step={1} aria-label="Volume" />`

const demoSnippet = `import { Slider } from "@/components/cubix/slider"

export function SliderDemo() {
  return (
    <Slider
      defaultValue={[33]}
      max={100}
      step={1}
      aria-label="Volume"
      className="mx-auto w-full max-w-xs"
    />
  )
}`

const rangeSnippet = `<Slider
  defaultValue={[25, 50]}
  max={100}
  step={5}
  aria-label="Price range"
  className="mx-auto w-full max-w-xs"
/>`

const multipleSnippet = `<Slider
  defaultValue={[10, 20, 70]}
  max={100}
  step={10}
  aria-label="Breakpoints"
  className="mx-auto w-full max-w-xs"
/>`

const verticalSnippet = `<div className="mx-auto flex w-full max-w-xs items-center justify-center gap-6">
  <Slider
    defaultValue={[50]}
    max={100}
    step={1}
    orientation="vertical"
    aria-label="Bass"
    className="h-40"
  />
  <Slider
    defaultValue={[25]}
    max={100}
    step={1}
    orientation="vertical"
    aria-label="Treble"
    className="h-40"
  />
</div>`

const controlledSnippet = `"use client"

import * as React from "react"

import { Label } from "@/components/cubix/label"
import { Slider } from "@/components/cubix/slider"

export function SliderControlledDemo() {
  const [value, setValue] = React.useState([0.3, 0.7])

  return (
    <div className="mx-auto grid w-full max-w-xs gap-3">
      <div className="flex items-center justify-between gap-2">
        <Label id="slider-demo-temperature">Temperature</Label>
        <span className="text-sm text-muted-foreground tabular-nums">
          {value.join(", ")}
        </span>
      </div>
      <Slider
        aria-labelledby="slider-demo-temperature"
        value={value}
        onValueChange={(next) => setValue(typeof next === "number" ? [next] : [...next])}
        min={0}
        max={1}
        step={0.1}
      />
    </div>
  )
}`

const disabledSnippet = `<Slider
  defaultValue={[50]}
  max={100}
  step={1}
  disabled
  aria-label="Volume"
  className="mx-auto w-full max-w-xs"
/>`

const rtlSnippet = `<div dir="rtl" className="w-full">
  <Slider
    defaultValue={[40]}
    max={100}
    step={1}
    aria-label="میزان صدا"
    className="mx-auto w-full max-w-xs"
  />
</div>`

export default function SliderDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Slider"
        description={description}
        slug="slider"
      />

      <ComponentPreview code={demoSnippet} previewClassName="min-h-32">
        <SliderDemo />
      </ComponentPreview>

      <ComponentInstall name="slider" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Range</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use an array with two values for a range slider.
        </p>
        <ComponentPreview code={rangeSnippet} previewClassName="min-h-32">
          <SliderRangeDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Multiple Thumbs
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Use an array with multiple values for multiple thumbs.
        </p>
        <ComponentPreview code={multipleSnippet} previewClassName="min-h-32">
          <SliderMultipleDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Vertical</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use{" "}
          <code className="font-mono text-sm">orientation=&quot;vertical&quot;</code>{" "}
          for a vertical slider.
        </p>
        <ComponentPreview code={verticalSnippet} previewClassName="min-h-52">
          <SliderVerticalDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Controlled
        </h2>
        <ComponentPreview code={controlledSnippet} previewClassName="min-h-32">
          <SliderControlledDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Disabled</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the{" "}
          <code className="font-mono text-sm">disabled</code> prop to disable
          the slider.
        </p>
        <ComponentPreview code={disabledSnippet} previewClassName="min-h-32">
          <SliderDisabledDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">RTL</h2>
        <p className="leading-relaxed text-muted-foreground">
          Wrap the slider in a container with{" "}
          <code className="font-mono text-sm">dir=&quot;rtl&quot;</code> to
          mirror direction.
        </p>
        <ComponentPreview code={rtlSnippet} previewClassName="min-h-32">
          <SliderRtlDemo />
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          See also the Base UI Slider documentation for primitive props.
        </p>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Slider</h3>
          <PropsTable data={sliderPropRows} />
        </div>
      </section>
    </article>
  )
}
