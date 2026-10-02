"use client"

import * as React from "react"

import { Label } from "@/components/cubix/label"
import { Checkbox } from "../docs-checkbox"

const permissions = [
  { id: "read", label: "مشاهده پروژه‌ها" },
  { id: "write", label: "ویرایش محتوا" },
  { id: "invite", label: "دعوت اعضای جدید" },
]

export function CheckboxGroupDemo() {
  const [selected, setSelected] = React.useState<string[]>(["read"])
  const allSelected = selected.length === permissions.length
  const someSelected = selected.length > 0 && !allSelected

  function toggleAll(checked: boolean) {
    setSelected(checked ? permissions.map((permission) => permission.id) : [])
  }

  function togglePermission(id: string, checked: boolean) {
    setSelected((current) => (checked ? [...current, id] : current.filter((value) => value !== id)))
  }

  return (
    <fieldset className="grid w-full max-w-xs gap-3">
      <legend className="sr-only">دسترسی‌های عضو</legend>
      <div className="flex items-center gap-2 border-b pb-3">
        <Checkbox
          id="checkbox-group-all"
          checked={allSelected}
          indeterminate={someSelected}
          onCheckedChange={toggleAll}
        />
        <Label htmlFor="checkbox-group-all" className="font-medium">
          همه دسترسی‌ها
        </Label>
      </div>
      <div className="grid gap-3 ps-6">
        {permissions.map((permission) => (
          <div key={permission.id} className="flex items-center gap-2">
            <Checkbox
              id={`checkbox-group-${permission.id}`}
              checked={selected.includes(permission.id)}
              onCheckedChange={(checked) => togglePermission(permission.id, checked)}
            />
            <Label htmlFor={`checkbox-group-${permission.id}`}>{permission.label}</Label>
          </div>
        ))}
      </div>
    </fieldset>
  )
}
