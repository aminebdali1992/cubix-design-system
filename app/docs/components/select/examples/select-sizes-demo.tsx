"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../docs-select"

const sizes = [
  { size: "sm", label: "کوچک" },
  { size: "default", label: "پیش‌فرض" },
  { size: "lg", label: "بزرگ" },
] as const

export function SelectSizesDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      {sizes.map(({ size, label }) => (
        <Select key={size} defaultValue="tehran">
          <SelectTrigger size={size} aria-label={`شهر - اندازه ${label}`} className="w-56">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tehran">تهران</SelectItem>
            <SelectItem value="mashhad">مشهد</SelectItem>
            <SelectItem value="isfahan">اصفهان</SelectItem>
          </SelectContent>
        </Select>
      ))}
    </div>
  )
}
