"use client"

import { Button } from "@/app/docs/components/button/docs-button"

import { Input } from "../docs-input"

export function InputFormDemo() {
  return (
    <form
      className="flex w-full max-w-sm items-center gap-2"
      onSubmit={(event) => event.preventDefault()}
    >
      <Input type="email" placeholder="ایمیل" />
      <Button type="submit">عضویت</Button>
    </form>
  )
}
