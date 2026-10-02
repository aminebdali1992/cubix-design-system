"use client"

import { Label } from "@/components/cubix/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../docs-select"

export function SelectLabelDemo() {
  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor="province">استان</Label>
      <Select defaultValue="tehran">
        <SelectTrigger id="province" aria-describedby="province-description" className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="tehran">تهران</SelectItem>
          <SelectItem value="khorasan-razavi">خراسان رضوی</SelectItem>
          <SelectItem value="isfahan">اصفهان</SelectItem>
          <SelectItem value="fars">فارس</SelectItem>
        </SelectContent>
      </Select>
      <p id="province-description" className="text-caption text-muted-foreground">
        استان محل سکونت خود را انتخاب کنید.
      </p>
    </div>
  )
}
