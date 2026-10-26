"use client"

import { useState, type FormEvent } from "react"

import { Button } from "../../button/docs-button"
import { FormItemLayout } from "../../form-item-layout/docs-form-item-layout"
import { SingleValueFieldArray } from "../docs-single-value-field-array"

const DOMAIN = /^(?!-)[a-z0-9-]+(\.[a-z0-9-]+)+$/i

export function SingleValueFieldArrayPasteDemo() {
  const [domains, setDomains] = useState(["example.com"])
  const [errors, setErrors] = useState<(string | undefined)[]>([])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrors(domains.map((d) => (DOMAIN.test(d) ? undefined : "دامنه معتبر نیست.")))
  }

  const hasErrors = errors.some(Boolean)

  return (
    <form className="w-full max-w-2xl" onSubmit={handleSubmit} noValidate>
      <FormItemLayout
        label="دامنه‌های ورود یکپارچه"
        description={
          hasErrors ? undefined : "چند دامنه را با کاما یا فاصله جدا کنید و یک‌جا بچسبانید؛ هر کدام یک ردیف می‌شود."
        }
      >
        <SingleValueFieldArray
          value={domains}
          onValueChange={(next) => {
            setDomains(next)
            setErrors([])
          }}
          errors={errors}
          pasteSeparator={/[\s,]+/}
          placeholder="example.com"
          addLabel="افزودن دامنه"
          removeLabel="حذف دامنه"
        />
      </FormItemLayout>
      <div className="mt-4">
        <Button type="submit" variant="default" size="sm">
          ذخیره دامنه‌ها
        </Button>
      </div>
    </form>
  )
}
