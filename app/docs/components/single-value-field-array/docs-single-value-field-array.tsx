"use client"

import type { ComponentProps } from "react"
import { usePathname } from "next/navigation"

import * as AriaSingleValueFieldArray from "@/components/cubix/aria/single-value-field-array"
import * as BaseSingleValueFieldArray from "@/components/cubix/base/single-value-field-array"
import * as RadixSingleValueFieldArray from "@/components/cubix/radix/single-value-field-array"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

function SingleValueFieldArray(props: ComponentProps<typeof BaseSingleValueFieldArray.SingleValueFieldArray>) {
  const base = parseComponentPath(usePathname())?.base ?? DEFAULT_BASE
  if (base === "radix") return <RadixSingleValueFieldArray.SingleValueFieldArray {...props} />
  if (base === "aria") return <AriaSingleValueFieldArray.SingleValueFieldArray {...props} />
  return <BaseSingleValueFieldArray.SingleValueFieldArray {...props} />
}

export { SingleValueFieldArray }
export type { SingleValueFieldArrayProps } from "@/components/cubix/base/single-value-field-array"
