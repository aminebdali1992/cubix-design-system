"use client"

import { Label } from "@/components/cubix/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../docs-select"

export function SelectInvalidDemo() {
  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor="city-required">شهر</Label>
      <Select required>
        <SelectTrigger
          id="city-required"
          aria-invalid
          aria-describedby="city-required-error"
          className="w-full"
        >
          <SelectValue placeholder="یک شهر انتخاب کنید" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="tehran">تهران</SelectItem>
          <SelectItem value="mashhad">مشهد</SelectItem>
          <SelectItem value="isfahan">اصفهان</SelectItem>
        </SelectContent>
      </Select>
      <p id="city-required-error" className="text-caption text-destructive">
        انتخاب شهر الزامی است.
      </p>
    </div>
  )
}
