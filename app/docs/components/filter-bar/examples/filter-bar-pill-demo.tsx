"use client"

import { useState } from "react"

import { FilterBar, type FilterGroup, type FilterProperty } from "../docs-filter-bar"

const filterProperties: FilterProperty[] = [
  { label: "سرویس", name: "service", type: "string", operators: ["=", "!="] },
  {
    label: "سطح لاگ",
    name: "level",
    type: "string",
    options: ["اطلاعات", "هشدار", "خطا"],
    operators: ["=", "!="],
  },
]

export function FilterBarPillDemo() {
  const [filters, setFilters] = useState<FilterGroup>({
    logicalOperator: "AND",
    conditions: [{ propertyName: "level", operator: "=", value: "خطا" }],
  })
  const [freeformText, setFreeformText] = useState("")

  return (
    <div dir="rtl" className="w-full">
      <FilterBar
        variant="pill"
        className="overflow-visible border-0 bg-transparent"
        filterProperties={filterProperties}
        filters={filters}
        onFilterChange={setFilters}
        freeformText={freeformText}
        onFreeformTextChange={setFreeformText}
      />
    </div>
  )
}
