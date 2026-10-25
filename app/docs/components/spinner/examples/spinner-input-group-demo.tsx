"use client"

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/cubix/input-group"
import { Spinner } from "@/components/cubix/spinner"

export function SpinnerInputGroupDemo() {
  return (
    <InputGroup className="w-full max-w-xs">
      <InputGroupInput placeholder="پیام خود را بنویسید" disabled />
      <InputGroupAddon align="inline-end">
        <Spinner />
      </InputGroupAddon>
    </InputGroup>
  )
}