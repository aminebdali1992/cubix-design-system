"use client"

import * as React from "react"

import { Input } from "../docs-input"

export function InputTypesDemo() {
  const [fileName, setFileName] = React.useState<string | null>(null)

  return (
    <div className="grid w-full max-w-sm gap-4">
      <Input type="email" placeholder="ایمیل" />
      <Input type="password" placeholder="رمز عبور" />
      <Input type="search" placeholder="جستجو" />
      <label className="relative flex h-10 w-full min-w-0 cursor-pointer items-center gap-3 rounded-lg border border-input bg-transparent px-3 text-label font-normal transition-colors hover:bg-muted/50 dark:hover:bg-input/50 has-[input:focus-visible]:border-primary has-[input:focus-visible]:ring-3 has-[input:focus-visible]:ring-primary/20 dark:bg-input/30">
        <input
          type="file"
          className="sr-only"
          onChange={(event) =>
            setFileName(event.target.files?.[0]?.name ?? null)
          }
        />
        <span className="shrink-0 border-e border-input pe-3 text-foreground">
          انتخاب فایل
        </span>
        <span className="truncate text-muted-foreground">
          {fileName ?? "فایلی انتخاب نشده"}
        </span>
      </label>
    </div>
  )
}
