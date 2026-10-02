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

export function ComboboxSizesDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Combobox dir="rtl" lang="fa" items={cities}>
        <ComboboxInput placeholder="انتخاب شهر" className="w-56" />
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
      <Combobox dir="rtl" lang="fa" items={cities}>
        <ComboboxInput placeholder="انتخاب شهر" size="lg" className="w-56" />
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
    </div>
  )
}
