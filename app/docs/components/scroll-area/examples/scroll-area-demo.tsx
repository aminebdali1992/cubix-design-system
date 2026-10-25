"use client"

import { ScrollArea } from "../docs-scroll-area"

const tags = Array.from({ length: 50 }).map((_, index) =>
  `نسخه‌ی ${String(index + 1).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)])}`
)

export function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-72 w-48 rounded-lg border">
      <div className="p-4">
        <h4 className="mb-4 text-label leading-none font-normal">برچسب‌ها</h4>
        {tags.map((tag) => (
          <div key={tag} className="border-b py-2 text-label font-normal last:border-b-0">
            {tag}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
