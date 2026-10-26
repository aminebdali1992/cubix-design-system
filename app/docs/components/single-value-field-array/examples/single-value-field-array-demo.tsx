"use client"

import { useState, type FormEvent } from "react"

import { Button } from "../../button/docs-button"
import { FormItemLayout } from "../../form-item-layout/docs-form-item-layout"
import { SingleValueFieldArray } from "../docs-single-value-field-array"

function isValidUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === "https:" || url.protocol === "http:"
  } catch {
    return false
  }
}

export function SingleValueFieldArrayDemo() {
  const [redirectUris, setRedirectUris] = useState(["https://example.com/callback"])
  const [errors, setErrors] = useState<(string | undefined)[]>([])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrors(redirectUris.map((uri) => (isValidUrl(uri) ? undefined : "نشانی معتبر وارد کنید.")))
  }

  const hasErrors = errors.some(Boolean)

  return (
    <form className="w-full max-w-2xl" onSubmit={handleSubmit} noValidate>
      <FormItemLayout
        label="نشانی‌های بازگشت"
        description={hasErrors ? undefined : "پس از ورود، کاربر فقط به این نشانی‌ها بازگردانده می‌شود."}
      >
        <SingleValueFieldArray
          value={redirectUris}
          onValueChange={(next) => {
            setRedirectUris(next)
            setErrors([])
          }}
          errors={errors}
          inputType="url"
          placeholder="https://example.com/callback"
          addLabel="افزودن نشانی بازگشت"
          removeLabel="حذف نشانی بازگشت"
          minimumRows={1}
        />
      </FormItemLayout>
      <div className="mt-4">
        <Button type="submit" variant="default" size="sm">
          ذخیره تغییرات
        </Button>
      </div>
    </form>
  )
}
