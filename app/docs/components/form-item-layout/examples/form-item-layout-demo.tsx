"use client"

import { useState, type FormEvent } from "react"

import { Button } from "@/app/docs/components/button/docs-button"
import {
  TextField,
  TextFieldControl,
  TextFieldDescription,
  TextFieldError,
  TextFieldInput,
  TextFieldLabel,
} from "@/app/docs/components/text-field/docs-text-field"

export function FormItemLayoutDemo() {
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
    <form className="flex w-full max-w-96 flex-col gap-6" onSubmit={onSubmit}>
      <TextField invalid={Boolean(error)}>
        <TextFieldLabel>نام کاربری</TextFieldLabel>
        <TextFieldControl>
          <TextFieldInput
            placeholder="امین"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </TextFieldControl>
        {error ? (
          <TextFieldError>{error}</TextFieldError>
        ) : (
          <TextFieldDescription>این نام نمایشی عمومی شماست.</TextFieldDescription>
        )}
      </TextField>
      <Button type="submit">
        ارسال
      </Button>
    </form>
  )
}
