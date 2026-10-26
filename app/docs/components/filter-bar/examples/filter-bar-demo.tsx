"use client"

import { useState } from "react"
import type { DateRange } from "react-day-picker"

import { Button } from "@/app/docs/components/button/docs-button"
import { Calendar } from "@/app/docs/components/calendar/docs-calendar"

import { FilterBar, type CustomOptionProps, type FilterGroup, type FilterProperty } from "../docs-filter-bar"

function toDay(date: Date) {
  return date.toISOString().slice(0, 10)
}

function CustomDatePicker({ onChange, onCancel, search }: CustomOptionProps) {
  const [from, to] = (search ?? "").split(" - ")
  const [range, setRange] = useState<DateRange | undefined>(
    from ? { from: new Date(from), to: to ? new Date(to) : undefined } : undefined
  )

  return (
    <div className="w-[300px] space-y-4">
      <Calendar
        mode="range"
        numberOfMonths={1}
        defaultMonth={range?.from}
        selected={range}
        onSelect={setRange}
        className="w-full"
      />
      <div className="flex justify-end gap-2 border-t border-border px-4 py-3">
        <Button type="button" variant="outline" size="sm" onClick={onCancel}>
          انصراف
        </Button>
        <Button type="button" variant="default" size="sm" disabled={!range?.from}
          onClick={() =>
            onChange(range?.from ? `${toDay(range.from)} - ${toDay(range.to ?? range.from)}` : "")
          }>
          اعمال
        </Button>
      </div>
    </div>
  )
}

const filterProperties: FilterProperty[] = [
  {
    label: "نام کاربر",
    name: "name",
    type: "string",
    operators: [
      { value: "=", label: "برابر با" },
      { value: "!=", label: "نابرابر با" },
      { value: "CONTAINS", label: "شامل" },
      { value: "STARTS WITH", label: "شروع با" },
      { value: "ENDS WITH", label: "پایان با" },
    ],
  },
  {
    label: "وضعیت",
    name: "status",
    type: "string",
    options: [
      { label: "فعال", value: "active" },
      { label: "غیرفعال", value: "inactive" },
      { label: "در انتظار تأیید", value: "pending" },
    ],
    operators: ["=", "!="],
  },
  {
    label: "نقش",
    name: "role",
    type: "string",
    options: async (search?: string) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const all = ["کاربر", "مدیر", "مهمان"]
      return search ? all.filter((option) => option.includes(search)) : all
    },
    operators: ["=", "!="],
  },
  {
    label: "تاریخ عضویت",
    name: "created_at",
    type: "date",
    options: [
      { label: "امروز", value: toDay(new Date()) },
      { label: "دیروز", value: toDay(new Date(Date.now() - 86400000)) },
      { label: "۷ روز گذشته", value: toDay(new Date(Date.now() - 7 * 86400000)) },
      { label: "۳۰ روز گذشته", value: toDay(new Date(Date.now() - 30 * 86400000)) },
      { label: "انتخاب بازه تاریخ...", component: (props: CustomOptionProps) => <CustomDatePicker {...props} /> },
    ],
    operators: ["=", "!=", ">", "<", ">=", "<="],
  },
  {
    label: "امتیاز",
    name: "score",
    type: "number",
    options: {
      component: (props: CustomOptionProps) => (
        <div className="p-6">
          <Button type="button" variant="default" size="sm" onClick={() => props.onChange("100")}>
            امتیاز کامل
          </Button>
        </div>
      ),
    },
    operators: ["=", "!=", ">", "<", ">=", "<="],
  },
]

const initialFilters: FilterGroup = {
  logicalOperator: "AND",
  conditions: [{ propertyName: "status", operator: "=", value: "active" }],
}

function FilterBarExample({ variant }: { variant: "default" | "pill" }) {
  const [filters, setFilters] = useState<FilterGroup>(initialFilters)
  const [freeformText, setFreeformText] = useState("")

  return (
    <FilterBar
      variant={variant}
      className={variant === "pill" ? "overflow-visible border-0 bg-transparent" : undefined}
      filterProperties={filterProperties}
      freeformText={freeformText}
      onFreeformTextChange={setFreeformText}
      filters={filters}
      onFilterChange={setFilters}
    />
  )
}

export function FilterBarDemo() {
  return (
    <div dir="rtl" className="w-full space-y-6">
      <FilterBarExample variant="default" />
      <FilterBarExample variant="pill" />
    </div>
  )
}
