"use client"

import { SearchIcon } from "@/components/docs/empty-icons"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../docs-input-group"

export function InputGroupDemo() {
  return (
    <InputGroup className="max-w-xs">
      <InputGroupInput placeholder="جستجو" />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">۱۲ نتیجه</InputGroupAddon>
    </InputGroup>
  )
}