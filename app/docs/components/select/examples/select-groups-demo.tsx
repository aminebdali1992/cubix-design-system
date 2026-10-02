"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../docs-select"

export function SelectGroupsDemo() {
  return (
    <Select>
      <SelectTrigger aria-label="محصول" className="w-56">
        <SelectValue placeholder="یک محصول انتخاب کنید" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>میوه‌ها</SelectLabel>
          <SelectItem value="apple">سیب</SelectItem>
          <SelectItem value="banana">موز</SelectItem>
          <SelectItem value="grape">انگور</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>سبزیجات</SelectLabel>
          <SelectItem value="carrot">هویج</SelectItem>
          <SelectItem value="lettuce">کاهو</SelectItem>
          <SelectItem value="cucumber">خیار</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
