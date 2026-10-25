"use client"

import { useState, type FormEvent } from "react"

import { Button } from "@/app/docs/components/button/docs-button"
import { Checkbox } from "@/app/docs/components/checkbox/docs-checkbox"

import { FormControl, FormItemLayout } from "../docs-form-item-layout"

export function FormItemLayoutWithCheckbox() {
  const [checked, setChecked] = useState(false)
  const [error, setError] = useState<string | undefined>()

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!checked) {
      setError("برای ادامه باید این گزینه را انتخاب کنید.")
      return
    }
    setError(undefined)
    console.log({ checked })
  }

  return (
    <form dir="rtl" className="flex w-full max-w-96 flex-col gap-6" onSubmit={onSubmit}>
      <FormItemLayout
        layout="flex"
        label="قوانین را می‌پذیرم"
        description={
          error ? undefined : "می‌توانید اعلان‌های موبایل را در صفحه‌ی تنظیمات موبایل مدیریت کنید."
        }
        error={error}
      >
        <FormControl>
          <Checkbox
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