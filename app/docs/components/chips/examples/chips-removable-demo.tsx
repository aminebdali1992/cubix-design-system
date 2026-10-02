"use client"

import * as React from "react"

import { Button } from "@/app/docs/components/button/docs-button"
import { Chip, Chips } from "../docs-chips"

const initialTags = [
  { value: "react", label: "ری‌اکت" },
  { value: "typescript", label: "تایپ‌اسکریپت" },
  { value: "tailwind", label: "تیلویند" },
  { value: "accessibility", label: "دسترس‌پذیری" },
]

export function ChipsRemovableDemo() {
  const [tags, setTags] = React.useState(initialTags)
  const [selected, setSelected] = React.useState<string[]>(["react"])

  function removeTag(value: string) {
    setTags((current) => current.filter((tag) => tag.value !== value))
    setSelected((current) => current.filter((item) => item !== value))
  }

  if (tags.length === 0) {
    return (
      <div className="flex items-center gap-2 text-caption text-muted-foreground">
        همه برچسب‌ها حذف شدند.
        <Button
          variant="link"
          size="sm"
          className="h-auto px-0"
          onClick={() => setTags(initialTags)}
        >
          بازگردانی
        </Button>
      </div>
    )
  }

  return (
    <Chips
      multiple
      value={selected}
      onValueChange={setSelected}
      className="w-fit max-w-md justify-center"
    >
      {tags.map((tag) => (
        <Chip
          key={tag.value}
          value={tag.value}
          removeLabel={`حذف ${tag.label}`}
          onRemove={() => removeTag(tag.value)}
        >
          {tag.label}
        </Chip>
      ))}
    </Chips>
  )
}
