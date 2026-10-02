"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../docs-select"

export function SelectDisabledDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Select defaultValue="tehran" disabled>
        <SelectTrigger aria-label="شهر" className="w-56">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="tehran">تهران</SelectItem>
          <SelectItem value="mashhad">مشهد</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger aria-label="روش ارسال" className="w-56">
          <SelectValue placeholder="روش ارسال را انتخاب کنید" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="post">پست پیشتاز</SelectItem>
          <SelectItem value="courier">پیک</SelectItem>
          <SelectItem value="express" disabled>
            ارسال فوری (ناموجود)
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
