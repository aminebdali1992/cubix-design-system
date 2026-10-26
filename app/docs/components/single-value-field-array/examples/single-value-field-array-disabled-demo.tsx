"use client"

import { useState } from "react"

import { FormItemLayout } from "../../form-item-layout/docs-form-item-layout"
import { SingleValueFieldArray } from "../docs-single-value-field-array"

export function SingleValueFieldArrayDisabledDemo() {
  const [addresses, setAddresses] = useState(["192.168.1.10", "10.0.0.0/24"])

  return (
    <div className="w-full max-w-2xl">
      <FormItemLayout
        label="نشانی‌های IP مجاز"
        description="فهرست IPها در طرح رایگان قابل ویرایش نیست."
      >
        <SingleValueFieldArray
          value={addresses}
          onValueChange={setAddresses}
          placeholder="192.168.1.10"
          addLabel="افزودن IP"
          removeLabel="حذف IP"
          disabled
        />
      </FormItemLayout>
    </div>
  )
}
