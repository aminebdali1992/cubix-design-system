"use client"

import { Button } from "@/app/docs/components/button/docs-button"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "../docs-combobox"

const cities = ["تهران", "مشهد", "اصفهان", "شیراز", "تبریز"]

export function ComboboxPopupDemo() {
  return (
    <Combobox dir="rtl" lang="fa" items={cities}>
      <ComboboxTrigger
        render={<Button variant="outline" className="w-56 justify-between px-3 font-normal" />}
      >
        <ComboboxValue placeholder="انتخاب شهر" />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput placeholder="جستجو" />
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
