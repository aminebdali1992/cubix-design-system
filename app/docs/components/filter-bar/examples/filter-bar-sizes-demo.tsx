"use client"

import { useState } from "react"

import { FilterBar, type FilterGroup, type FilterProperty } from "../docs-filter-bar"

const filterProperties: FilterProperty[] = [
  { label: "شماره فاکتور", name: "number", type: "string", operators: ["=", "CONTAINS"] },
  { label: "مشتری", name: "customer", type: "string", operators: ["=", "!=", "CONTAINS"] },
  {
    label: "وضعیت پرداخت",
    name: "payment",
    type: "string",
    options: [
      { value: "paid", label: "پرداخت‌شده" },
      { value: "unpaid", label: "پرداخت‌نشده" },
      { value: "overdue", label: "سررسیدگذشته" },
    ],
    operators: ["=", "!="],
  },
  { label: "مبلغ", name: "amount", type: "number", operators: [">", "<", "="] },
]

function InvoiceFilter({ size, variant }: { size: "sm" | "md"; variant: "default" | "pill" }) {
  const [filters, setFilters] = useState<FilterGroup>({
    logicalOperator: "AND",
    conditions: [{ propertyName: "payment", operator: "=", value: "overdue" }],
  })
  const [freeformText, setFreeformText] = useState("")

  return (
    <FilterBar
      size={size}
      variant={variant}
      placeholder="جستجوی فاکتورها..."
      filterProperties={filterProperties}
      filters={filters}
      onFilterChange={setFilters}
      freeformText={freeformText}
      onFreeformTextChange={setFreeformText}
    />
  )
}

export function FilterBarSizesDemo() {
  return (
    <div dir="rtl" className="flex w-full flex-col gap-4">
      <div className="space-y-1.5">
        <p className="text-xs text-muted-foreground">کوچک (sm)</p>
        <InvoiceFilter size="sm" variant="default" />
      </div>
      <div className="space-y-1.5">
        <p className="text-xs text-muted-foreground">متوسط (md)</p>
        <InvoiceFilter size="md" variant="default" />
      </div>
    </div>
  )
}
