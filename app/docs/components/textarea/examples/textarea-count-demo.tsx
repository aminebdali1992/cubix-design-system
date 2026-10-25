"use client"

import { useState } from "react"

import { Textarea } from "../docs-textarea"

const MAX_LENGTH = 200
const formatter = new Intl.NumberFormat("fa-IR")

export function TextareaCountDemo() {
  const [value, setValue] = useState("")

  return (
    <div className="grid w-full max-w-xs gap-2">
      <div className="flex items-center justify-between gap-2">
        <label htmlFor="textarea-count" className="text-label leading-none font-normal text-foreground">
          درباره‌ی من
        </label>
        <span
          aria-live="polite"
          className={`text-caption tabular-nums ${value.length >= MAX_LENGTH ? "text-destructive" : "text-muted-foreground"}`}
        >
          {formatter.format(value.length)} / {formatter.format(MAX_LENGTH)}
        </span>
      </div>
      <Textarea
        id="textarea-count"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        maxLength={MAX_LENGTH}
        placeholder="چند خط درباره‌ی خودتان بنویسید"
        aria-describedby="textarea-count-description"
      />
      <p id="textarea-count-description" className="text-caption text-muted-foreground">
        این متن در پروفایل عمومی شما نمایش داده می‌شود.
      </p>
    </div>
  )
}