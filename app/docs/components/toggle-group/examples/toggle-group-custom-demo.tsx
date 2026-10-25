"use client"

import * as React from "react"

import { Field, FieldDescription, FieldLabel } from "@/components/cubix/field"

import { ToggleGroup, ToggleGroupItem } from "../docs-toggle-group"

const weights = [
  { value: "light", label: "نازک", className: "font-light" },
  { value: "normal", label: "معمولی", className: "font-normal" },
  { value: "medium", label: "متوسط", className: "font-medium" },
  { value: "bold", label: "پررنگ", className: "font-bold" },
]

export function ToggleGroupCustomDemo() {
  const [fontWeight, setFontWeight] = React.useState("normal")

  return (
    <Field className="max-w-xs">
      <FieldLabel>وزن قلم</FieldLabel>
      <ToggleGroup
        value={[fontWeight]}
        onValueChange={(value) => {
          if (value[0]) setFontWeight(value[0])
        }}
        variant="outline"
        spacing={2}
        size="lg"
      >
        {weights.map((weight) => (
          <ToggleGroupItem
            key={weight.value}
            value={weight.value}
            aria-label={weight.label}
            className="flex size-16 flex-col items-center justify-center gap-1 rounded-xl px-0"
          >
            <span className={`text-2xl leading-none ${weight.className}`}>آب</span>
            <span className="text-caption text-muted-foreground">{weight.label}</span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <FieldDescription>
        برای تنظیم وزن قلم از{" "}
        <code className="rounded-md bg-muted px-1 py-0.5 font-mono">font-{fontWeight}</code>{" "}
        استفاده کنید.
      </FieldDescription>
    </Field>
  )
}
