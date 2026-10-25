"use client"

import { SearchIcon } from "@/components/docs/empty-icons"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../docs-input-group"

export function InputGroupInlineStartDemo() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <InputGroup>
        <InputGroupInput id="inline-start-input"
            aria-label="جستجو" placeholder="نام محصول را بنویسید" />
        <InputGroupAddon align="inline-start">
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}