"use client"

import { Fragment } from "react"

import { Separator } from "../docs-separator"

const rows = [
  { label: "نام", value: "سارا محمدی" },
  { label: "ایمیل", value: "sara@example.com" },
  { label: "نقش", value: "طراح محصول" },
]

export function SeparatorListDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      {rows.map((row, index) => (
        <Fragment key={row.label}>
          {index > 0 && (
            <Separator variant="dashed" />
          )}
          <dl className="flex items-center justify-between text-label">
            <dt className="text-foreground">{row.label}</dt>
            <dd className="text-muted-foreground">{row.value}</dd>
          </dl>
        </Fragment>
      ))}
    </div>
  )
}