"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../docs-combobox"

const cities = ["تهران", "مشهد", "اصفهان", "شیراز", "تبریز"]

export function ComboboxClearDemo() {
  return (
    <Combobox dir="rtl" lang="fa" items={cities} defaultValue={cities[0]}>
      <ComboboxInput placeholder="انتخاب شهر" showClear className="w-56" />
      <ComboboxContent>
        <ComboboxEmpty>شهری یافت نشد.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
