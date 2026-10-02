"use client"

import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
} from "../docs-combobox"

const foods = [
  { value: "میوه‌ها", items: ["سیب", "انار", "پرتقال"] },
  { value: "سبزیجات", items: ["هویج", "خیار", "کدو"] },
]

export function ComboboxGroupsDemo() {
  return (
    <Combobox dir="rtl" lang="fa" items={foods}>
      <ComboboxInput placeholder="انتخاب خوراکی" className="w-56" />
      <ComboboxContent>
        <ComboboxEmpty>موردی یافت نشد.</ComboboxEmpty>
        <ComboboxList>
          {(group: (typeof foods)[number], index: number) => (
            <ComboboxGroup key={group.value} items={group.items}>
              <ComboboxLabel>{group.value}</ComboboxLabel>
              <ComboboxCollection>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
              {index < foods.length - 1 ? <ComboboxSeparator /> : null}
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
