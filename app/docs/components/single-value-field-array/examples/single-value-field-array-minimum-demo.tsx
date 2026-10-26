"use client"

import { useState, type FormEvent } from "react"

import { Button } from "../../button/docs-button"
import { FormItemLayout } from "../../form-item-layout/docs-form-item-layout"
import { SingleValueFieldArray } from "../docs-single-value-field-array"

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function SingleValueFieldArrayMinimumDemo() {
  const [emails, setEmails] = useState(["finance@example.com"])
  const [errors, setErrors] = useState<(string | undefined)[]>([])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrors(emails.map((e) => (EMAIL.test(e) ? undefined : "ایمیل معتبر وارد کنید.")))
  }

  const hasErrors = errors.some(Boolean)

  return (
    <form className="w-full max-w-2xl" onSubmit={handleSubmit} noValidate>
      <FormItemLayout
        label="گیرندگان گزارش ماهانه"
        description={hasErrors ? undefined : "دست‌کم یک گیرنده لازم است؛ دکمه حذف آخرین ردیف غیرفعال است."}
      >
        <SingleValueFieldArray
          value={emails}
          onValueChange={(next) => {
            setEmails(next)
            setErrors([])
          }}
          errors={errors}
          fieldType="email"
          placeholder="name@example.com"
          addLabel="افزودن گیرنده"
          removeLabel="حذف گیرنده"
          minimumRows={1}
        />
      </FormItemLayout>
      <div className="mt-4">
        <Button type="submit" variant="default" size="sm">
          ارسال گزارش
        </Button>
      </div>
    </form>
  )
}
