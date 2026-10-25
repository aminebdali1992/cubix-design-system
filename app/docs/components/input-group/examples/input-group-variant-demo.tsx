"use client"

import { SearchIcon } from "@/components/docs/empty-icons"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../docs-input-group"

export function InputGroupVariantDemo() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupInput aria-label="جستجو (outline)" placeholder="جستجو" />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup variant="filled">
        <InputGroupInput aria-label="جستجو (filled)" placeholder="جستجو" />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}