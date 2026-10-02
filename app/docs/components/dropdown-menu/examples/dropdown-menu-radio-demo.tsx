"use client"

import * as React from "react"

import { Button } from "@/app/docs/components/button/docs-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../docs-dropdown-menu"

const sortOptions = [
  { value: "newest", label: "جدیدترین" },
  { value: "popular", label: "پربازدیدترین" },
  { value: "cheapest", label: "ارزان‌ترین" },
]

export function DropdownMenuRadioDemo() {
  const [sort, setSort] = React.useState("newest")
  const current = sortOptions.find((option) => option.value === sort)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        مرتب‌سازی: {current?.label}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
          <DropdownMenuLabel>ترتیب نمایش</DropdownMenuLabel>
          {sortOptions.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
