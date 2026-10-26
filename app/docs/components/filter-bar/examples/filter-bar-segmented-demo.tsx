"use client"

import { useState } from "react"

import { FilterBar, type FilterGroup, type FilterProperty } from "../docs-filter-bar"

const filterProperties: FilterProperty[] = [
  { label: "شماره‌ی سفارش", name: "order_id", type: "string", operators: ["=", "!="] },
  {
    label: "وضعیت پرداخت",
    name: "payment",
    type: "string",
    options: ["پرداخت‌شده", "ناموفق", "در انتظار پرداخت"],
    operators: ["=", "!="],
  },
]

export function FilterBarSegmentedDemo() {
  const [filters, setFilters] = useState<FilterGroup>({
    logicalOperator: "AND",
    conditions: [{ propertyName: "payment", operator: "=", value: "پرداخت‌شده" }],
  })
  const [freeformText, setFreeformText] = useState("")

  return (
    <div dir="rtl" className="w-full">
      <FilterBar
        filterProperties={filterProperties}
        filters={filters}
        onFilterChange={setFilters}
        freeformText={freeformText}
        onFreeformTextChange={setFreeformText}
      />
    </div>
  )
}
