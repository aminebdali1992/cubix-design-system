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

export function ComboboxCustomStylingDemo() {
  return (
    <Combobox dir="rtl" lang="fa" items={cities}>
      <ComboboxInput
        placeholder="انتخاب شهر"
        className="w-56 border-border bg-muted has-[[data-slot=input-group-control]:focus-visible]:bg-background dark:bg-muted dark:has-[[data-slot=input-group-control]:focus-visible]:bg-background"
      />
      <ComboboxContent className="rounded-xl">
        <ComboboxEmpty>شهری یافت نشد.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item} className="rounded-md">
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
