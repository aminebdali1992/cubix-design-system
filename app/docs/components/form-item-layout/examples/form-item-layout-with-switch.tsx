"use client"

import { useState, type FormEvent } from "react"

import { Button } from "@/app/docs/components/button/docs-button"
import { Switch } from "@/app/docs/components/switch/docs-switch"

import { FormControl, FormItemLayout } from "../docs-form-item-layout"

export function FormItemLayoutWithSwitch() {
  const [checked, setChecked] = useState(false)
  const [error, setError] = useState<string | undefined>()

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!checked) {
      setError("برای ادامه باید این گزینه را فعال کنید.")
      return
    }
    setError(undefined)
    console.log({ checked })
  }

  return (
    <form dir="rtl" className="flex w-full max-w-96 flex-col gap-6" onSubmit={onSubmit}>
      <FormItemLayout
        layout="flex-row-reverse"
        label="این سوئیچ را فعال کنید"
        description={error ? undefined : "این یک توضیح درباره‌ی گزینه است."}
        error={error}
      >
        <FormControl>
          <Switch
            checked={checked}
            onCheckedChange={(value) => {
              setChecked(value)
              if (value) setError(undefined)
            }}
          />
        </FormControl>
      </FormItemLayout>
      <Button type="submit" variant="default" size="default" className="w-full">
        ارسال
      </Button>
    </form>
  )
}