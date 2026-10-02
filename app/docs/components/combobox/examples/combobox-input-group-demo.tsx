"use client"

import { ButtonDemoIcon } from "@/components/docs/demo-icon"
import { InputGroupAddon } from "@/components/cubix/input-group"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../docs-combobox"

const cities = ["تهران", "مشهد", "اصفهان", "شیراز", "تبریز"]

export function ComboboxInputGroupDemo() {
  return (
    <Combobox dir="rtl" lang="fa" items={cities}>
      <ComboboxInput placeholder="انتخاب شهر" className="w-56">
        <InputGroupAddon>
          <ButtonDemoIcon />
        </InputGroupAddon>
      </ComboboxInput>
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
