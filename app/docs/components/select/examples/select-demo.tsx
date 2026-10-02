"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../docs-select"

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger aria-label="شهر" className="w-56">
        <SelectValue placeholder="یک شهر انتخاب کنید" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="tehran">تهران</SelectItem>
        <SelectItem value="mashhad">مشهد</SelectItem>
        <SelectItem value="isfahan">اصفهان</SelectItem>
        <SelectItem value="shiraz">شیراز</SelectItem>
        <SelectItem value="tabriz">تبریز</SelectItem>
      </SelectContent>
    </Select>
  )
}
