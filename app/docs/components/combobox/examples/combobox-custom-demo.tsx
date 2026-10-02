"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../docs-combobox"

type City = {
  id: string
  name: string
  province: string
}

const cities: City[] = [
  { id: "tehran", name: "تهران", province: "استان تهران" },
  { id: "mashhad", name: "مشهد", province: "استان خراسان رضوی" },
  { id: "isfahan", name: "اصفهان", province: "استان اصفهان" },
  { id: "shiraz", name: "شیراز", province: "استان فارس" },
  { id: "tabriz", name: "تبریز", province: "استان آذربایجان شرقی" },
]

export function ComboboxCustomDemo() {
  return (
    <Combobox dir="rtl" lang="fa" items={cities} itemToStringLabel={(city: City) => city.name}>
      <ComboboxInput placeholder="انتخاب شهر" className="w-56" />
      <ComboboxContent>
        <ComboboxEmpty>شهری یافت نشد.</ComboboxEmpty>
        <ComboboxList>
          {(city: City) => (
            <ComboboxItem key={city.id} value={city}>
              <div className="flex min-w-0 flex-col">
                <span className="truncate">{city.name}</span>
                <span className="text-caption text-muted-foreground">{city.province}</span>
              </div>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
