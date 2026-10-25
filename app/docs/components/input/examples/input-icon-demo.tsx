"use client"

import { SearchIcon } from "@/components/docs/empty-icons"

import { Input } from "../docs-input"

export function InputIconDemo() {
  return (
    <div className="relative w-full max-w-sm">
      <SearchIcon className="pointer-events-none absolute start-2 top-1/2 size-6 -translate-y-1/2 text-muted-foreground" />
      <Input type="search" placeholder="جستجو" className="ps-10" />
    </div>
  )
}
