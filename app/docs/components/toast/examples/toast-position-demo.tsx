"use client"

import * as React from "react"

import { Button } from "@/app/docs/components/button/docs-button"

import { Toaster, toast, type ToastPosition } from "../docs-toast"

const positions: { value: ToastPosition; label: string }[] = [
  { value: "top-start", label: "بالا راست" },
  { value: "top-center", label: "بالا وسط" },
  { value: "top-end", label: "بالا چپ" },
  { value: "bottom-start", label: "پایین راست" },
  { value: "bottom-center", label: "پایین وسط" },
  { value: "bottom-end", label: "پایین چپ" },
]

export function ToastPositionDemo() {
  const [position, setPosition] = React.useState<ToastPosition>("bottom-end")

  return (
    <Toaster position={position}>
      <div className="grid grid-cols-3 gap-2">
        {positions.map((item) => (
          <Button
            key={item.value}
            variant="outline"
            size="sm"
            className="font-normal"
            onClick={() => {
              setPosition(item.value)
              toast.add({
                title: "اعلان",
                description: "این اعلان در موقعیت انتخاب‌شده نمایش داده می‌شود.",
              })
            }}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </Toaster>
  )
}
