"use client"

import { useState } from "react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "../docs-input-group"

const MAX_LENGTH = 120
const toFa = (value: number) => value.toLocaleString("fa-IR")

export function InputGroupTextDemo() {
  const [length, setLength] = useState(0)

  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupInput inputMode="numeric" placeholder="۰" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>تومان</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup dir="ltr">
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="example" className="ps-0.5!" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>.com</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup dir="ltr">
        <InputGroupInput placeholder="username" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>@company.com</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup resizable>
        <InputGroupTextarea
          placeholder="پیام خود را بنویسید"
          maxLength={MAX_LENGTH}
          onInput={(event) => setLength(event.currentTarget.value.length)}
        />
        <InputGroupAddon align="block-end">
          <InputGroupText className="text-caption text-muted-foreground/70">{toFa(MAX_LENGTH - length)} کاراکتر باقی مانده</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}