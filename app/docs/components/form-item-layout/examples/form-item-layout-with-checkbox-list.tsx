"use client"

import { useState, type FormEvent } from "react"

import { Button } from "@/app/docs/components/button/docs-button"
import { Checkbox } from "@/app/docs/components/checkbox/docs-checkbox"

import { FormItemLayout } from "../docs-form-item-layout"

const items = [
  { id: "messages", label: "پیام‌های جدید" },
  { id: "updates", label: "به‌روزرسانی‌ها" },
  { id: "offers", label: "پیشنهادهای ویژه" },
] as const

export function FormItemLayoutWithCheckboxList() {
  const [selected, setSelected] = useState<string[]>(["messages"])
  const [error, setError] = useState<string | undefined>()

  function toggle(id: string, checked: boolean) {
    setSelected((value) => (checked ? [...value, id] : value.filter((item) => item !== id)))
    if (checked) setError(undefined)
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (selected.length === 0) {
      setError("حداقل یک مورد را انتخاب کنید.")
      return
    }
    setError(undefined)
    console.log({ items: selected })
  }

  return (
    <form dir="rtl" className="flex w-full max-w-96 flex-col gap-6" onSubmit={onSubmit}>
      <FormItemLayout
        layout="vertical"
        label="اعلان‌ها"
        description={error ? undefined : "انتخاب کنید درباره‌ی چه چیزهایی به شما اطلاع دهیم."}
        error={error}
      >
        <div className="flex flex-col gap-3 pb-2">
          {items.map((item) => (
            <label key={item.id} className="flex items-center gap-2 text-description text-foreground">
              <Checkbox
                checked={selected.includes(item.id)}
                invalid={Boolean(error)}
                onCheckedChange={(checked) => toggle(item.id, checked)}
              />
              {item.label}
            </label>
          ))}
        </div>
      </FormItemLayout>
      <Button type="submit" variant="default" size="default" className="w-full">
        ذخیره
      </Button>
    </form>
  )
}
