"use client"

import { useState } from "react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../docs-select"

const cities = [
  { value: "tehran", label: "تهران" },
  { value: "mashhad", label: "مشهد" },
  { value: "isfahan", label: "اصفهان" },
  { value: "shiraz", label: "شیراز" },
]

export function SelectControlledDemo() {
  const [city, setCity] = useState<string | null>("isfahan")
  const selected = cities.find((item) => item.value === city)

  return (
    <div className="flex flex-col items-center gap-3">
      <Select value={city} onValueChange={setCity}>
        <SelectTrigger aria-label="شهر" className="w-56">
          <SelectValue placeholder="یک شهر انتخاب کنید" />
        </SelectTrigger>
        <SelectContent>
          {cities.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-caption text-muted-foreground">
        شهر انتخاب‌شده: {selected ? selected.label : "هیچ‌کدام"}
      </p>
    </div>
  )
}
