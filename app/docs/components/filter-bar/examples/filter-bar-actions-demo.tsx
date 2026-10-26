"use client"

import { useState } from "react"
import { SparklesIcon } from "lucide-react"

import { FilterBar, type FilterBarAction, type FilterGroup, type FilterProperty } from "../docs-filter-bar"

const filterProperties: FilterProperty[] = [
  { label: "نام محصول", name: "product", type: "string", operators: ["=", "CONTAINS"] },
  {
    label: "دسته‌بندی",
    name: "category",
    type: "string",
    options: ["پوشاک", "لوازم دیجیتال", "کتاب"],
    operators: ["=", "!="],
  },
  { label: "قیمت", name: "price", type: "number", operators: ["=", ">", "<"] },
]

export function FilterBarActionsDemo() {
  const [filters, setFilters] = useState<FilterGroup>({ logicalOperator: "AND", conditions: [] })
  const [freeformText, setFreeformText] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const actions: FilterBarAction[] = [
    {
      value: "ai-filter",
      label: "فیلتر با هوش مصنوعی",
      icon: <SparklesIcon className="size-3.5 text-muted-foreground" />,
      onSelect: async () => {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 800))
        setFilters({
          logicalOperator: "AND",
          conditions: [
            { propertyName: "category", operator: "=", value: "لوازم دیجیتال" },
            { propertyName: "price", operator: "<", value: "5000000" },
          ],
        })
        setFreeformText("")
        setIsLoading(false)
      },
    },
  ]

  return (
    <div dir="rtl" className="w-full">
      <FilterBar
        filterProperties={filterProperties}
        filters={filters}
        onFilterChange={setFilters}
        freeformText={freeformText}
        onFreeformTextChange={setFreeformText}
        actions={actions}
        isLoading={isLoading}
      />
    </div>
  )
}
