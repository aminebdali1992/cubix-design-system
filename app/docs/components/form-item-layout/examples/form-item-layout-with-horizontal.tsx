"use client"

import { useState, type FormEvent } from "react"

import { Button } from "@/app/docs/components/button/docs-button"
import { TextFieldControl, TextFieldInput } from "@/app/docs/components/text-field/docs-text-field"
import { Separator } from "@/app/docs/components/separator/docs-separator"

import { FormControl, FormItemLayout } from "../docs-form-item-layout"

export function FormItemLayoutHorizontal() {
  const [username, setUsername] = useState("")
  const [error, setError] = useState<string | undefined>()

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (username.trim().length < 2) {
      setError("نام کاربری باید حداقل ۲ نویسه باشد.")
      return
    }
    setError(undefined)
    console.log({ username })
  }

  return (
    <form className="flex w-full max-w-[520px] flex-col gap-6" onSubmit={onSubmit}>
      <FormItemLayout
        layout="horizontal"
        label="نام کاربری"
        description="این نام نمایشی عمومی شماست."
        error={error}
      >
        <TextFieldControl>
          <FormControl>
            <TextFieldInput
              placeholder="امین"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </FormControl>
        </TextFieldControl>
      </FormItemLayout>
      <Separator />
      <Button type="submit">
        ارسال
      </Button>
    </form>
  )
}
