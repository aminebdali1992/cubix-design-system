"use client"

import { useState, type FormEvent } from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/app/docs/components/button/docs-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/docs/components/menu/docs-dropdown-menu"
import {
  TextField,
  TextFieldDescription,
  TextFieldError,
  TextFieldLabel,
} from "@/app/docs/components/text-field/docs-text-field"
import { textFieldInputVariants } from "@/components/cubix/text-field"
import { cn } from "@/lib/utils"

const emails = ["m@example.com", "m@google.com", "m@support.com"]

export function FormItemLayoutWithSelect() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | undefined>()

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!email) {
      setError("لطفاً یک ایمیل برای نمایش انتخاب کنید.")
      return
    }
    setError(undefined)
    console.log({ email })
  }

  return (
    <form className="flex w-full max-w-96 flex-col gap-6" onSubmit={onSubmit}>
      <TextField invalid={Boolean(error)}>
        <TextFieldLabel>انتخاب ایمیل</TextFieldLabel>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                aria-invalid={error ? "true" : undefined}
                className={cn(
                  textFieldInputVariants({ size: "default" }),
                  "flex items-center justify-between gap-2 text-start not-disabled:hover:bg-muted aria-expanded:bg-muted dark:not-disabled:hover:bg-input/50 dark:aria-expanded:bg-input/50 shadow-[0_1px_3px_0_rgb(0_0_0/0.04)] dark:shadow-[0_1px_3px_0_rgb(0_0_0/0.2)]"
                )}
              />
            }
          >
            {email ? (
              <span dir="ltr">{email}</span>
            ) : (
              <span className="text-muted-foreground">یه ایمیل انتخاب کن</span>
            )}
            <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[var(--anchor-width,var(--radix-dropdown-menu-trigger-width,var(--trigger-width)))]">
            {emails.map((item) => (
              <DropdownMenuItem key={item} onClick={() => setEmail(item)}>
                <span dir="ltr">{item}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {error ? (
          <TextFieldError>{error}</TextFieldError>
        ) : (
          <TextFieldDescription>ایمیل دلخواه را انتخاب کنید</TextFieldDescription>
        )}
      </TextField>
      <Button type="submit">
        ارسال
      </Button>
    </form>
  )
}