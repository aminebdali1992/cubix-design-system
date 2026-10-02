"use client"

import * as React from "react"

import { Button } from "@/app/docs/components/button/docs-button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../docs-dropdown-menu"

export function DropdownMenuIndicatorDemo() {
  const [density, setDensity] = React.useState("comfortable")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>چیدمان</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>ستون‌ها</DropdownMenuLabel>
          <DropdownMenuCheckboxItem indicator="check" defaultChecked>
            نام
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem indicator="check" defaultChecked>
            وضعیت
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem indicator="check">تاریخ ایجاد</DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup indicator="check" value={density} onValueChange={setDensity}>
          <DropdownMenuLabel>فاصله ردیف‌ها</DropdownMenuLabel>
          <DropdownMenuRadioItem value="compact">فشرده</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="comfortable">معمولی</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="spacious">باز</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
