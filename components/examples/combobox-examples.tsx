"use client"

import * as React from "react"
import { ButtonDemoIcon } from "@/components/examples/button-demo-icon"

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
} from "@/app/docs/components/combobox/docs-combobox"
import { Button } from "@/components/cubix/button"
import { InputGroupAddon } from "@/components/cubix/input-group"

const cities = ["تهران", "مشهد", "اصفهان", "شیراز", "تبریز"]

function CityContent() {
  return (
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
  )
}

export function ComboboxDemo() {
  return (
    <Combobox dir="rtl" lang="fa" items={cities}>
      <ComboboxInput placeholder="انتخاب شهر" className="w-56" />
      <CityContent />
    </Combobox>
  )
}

export function ComboboxSizesDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Combobox dir="rtl" lang="fa" items={cities}>
        <ComboboxInput placeholder="انتخاب شهر" className="w-56" />
        <CityContent />
      </Combobox>
      <Combobox dir="rtl" lang="fa" items={cities}>
        <ComboboxInput placeholder="انتخاب شهر" size="lg" className="w-56" />
        <CityContent />
      </Combobox>
    </div>
  )
}

export function ComboboxMultipleDemo() {
  const anchor = useComboboxAnchor()

  return (
    <Combobox
      dir="rtl"
      lang="fa"
      multiple
      autoHighlight
      items={cities}
      defaultValue={[cities[0]]}
    >
      <ComboboxChips ref={anchor} className="w-64">
        <ComboboxValue>
          {(values: string[]) => (
            <React.Fragment>
              {values.map((value) => (
                <ComboboxChip key={value}>{value}</ComboboxChip>
              ))}
              <ComboboxChipsInput />
            </React.Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
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

export function ComboboxClearDemo() {
  return (
    <Combobox dir="rtl" lang="fa" items={cities} defaultValue={cities[0]}>
      <ComboboxInput placeholder="انتخاب شهر" showClear className="w-56" />
      <CityContent />
    </Combobox>
  )
}

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
              {index < foods.length - 1 && <ComboboxSeparator />}
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

export function ComboboxDisabledItemsDemo() {
  return (
    <Combobox dir="rtl" lang="fa" items={cities}>
      <ComboboxInput placeholder="انتخاب شهر" className="w-56" />
      <ComboboxContent>
        <ComboboxEmpty>شهری یافت نشد.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item} disabled={item === "تبریز"}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

type City = {
  id: string
  name: string
  province: string
}

const cityDetails: City[] = [
  { id: "tehran", name: "تهران", province: "استان تهران" },
  { id: "mashhad", name: "مشهد", province: "استان خراسان رضوی" },
  { id: "isfahan", name: "اصفهان", province: "استان اصفهان" },
  { id: "shiraz", name: "شیراز", province: "استان فارس" },
  { id: "tabriz", name: "تبریز", province: "استان آذربایجان شرقی" },
]

export function ComboboxCustomDemo() {
  return (
    <Combobox
      dir="rtl"
      lang="fa"
      items={cityDetails}
      itemToStringLabel={(city: City) => city.name}
    >
      <ComboboxInput placeholder="انتخاب شهر" className="w-56" />
      <ComboboxContent>
        <ComboboxEmpty>شهری یافت نشد.</ComboboxEmpty>
        <ComboboxList>
          {(city: City) => (
            <ComboboxItem key={city.id} value={city}>
              <div className="flex min-w-0 flex-col">
                <span className="truncate">{city.name}</span>
                <span className="text-caption text-muted-foreground">
                  {city.province}
                </span>
              </div>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

export function ComboboxInvalidDemo() {
  return (
    <Combobox dir="rtl" lang="fa" items={cities}>
      <ComboboxInput
        placeholder="انتخاب شهر"
        aria-invalid="true"
        className="w-56"
      />
      <CityContent />
    </Combobox>
  )
}

export function ComboboxDisabledDemo() {
  return (
    <Combobox dir="rtl" lang="fa" items={cities} disabled>
      <ComboboxInput placeholder="انتخاب شهر" className="w-56" />
      <CityContent />
    </Combobox>
  )
}

export function ComboboxAutoHighlightDemo() {
  return (
    <Combobox dir="rtl" lang="fa" items={cities} autoHighlight>
      <ComboboxInput placeholder="انتخاب شهر" className="w-56" />
      <CityContent />
    </Combobox>
  )
}

export function ComboboxPopupDemo() {
  return (
    <Combobox dir="rtl" lang="fa" items={cities}>
      <ComboboxTrigger
        render={
          <Button
            variant="outline"
            className="w-56 justify-between px-3 font-normal"
          />
        }
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

export function ComboboxInputGroupDemo() {
  return (
    <Combobox dir="rtl" lang="fa" items={cities}>
      <ComboboxInput placeholder="انتخاب شهر" className="w-56">
        <InputGroupAddon>
          <ButtonDemoIcon />
        </InputGroupAddon>
      </ComboboxInput>
      <CityContent />
    </Combobox>
  )
}

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
