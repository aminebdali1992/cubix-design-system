"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaSelect from "@/components/cubix/aria/select"
import * as BaseSelect from "@/components/cubix/base/select"
import * as RadixSelect from "@/components/cubix/radix/select"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type TextDirection = "ltr" | "rtl"

type SelectProps = {
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
  required?: boolean
  name?: string
  dir?: TextDirection
  lang?: string
  children?: ReactNode
}

type SelectTriggerProps = {
  className?: string
  size?: "sm" | "default" | "lg"
  id?: string
  "aria-label"?: string
  "aria-describedby"?: string
  "aria-invalid"?: boolean
  children?: ReactNode
}

type SelectValueProps = {
  className?: string
  placeholder?: ReactNode
}

type SelectContentProps = {
  className?: string
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  sideOffset?: number
  alignOffset?: number
  alignItemWithTrigger?: boolean
  children?: ReactNode
}

type SelectItemProps = {
  className?: string
  value: string
  disabled?: boolean
  children?: ReactNode
}

type SelectPartProps = {
  className?: string
  children?: ReactNode
}

function useSelectBase() {
  return parseComponentPath(usePathname())?.base ?? DEFAULT_BASE
}

function Select(props: SelectProps) {
  const base = useSelectBase()
  if (base === "radix") return <RadixSelect.Select {...props} />
  if (base === "aria") return <AriaSelect.Select {...props} />
  return <BaseSelect.Select {...props} />
}

function SelectTrigger(props: SelectTriggerProps) {
  const base = useSelectBase()
  if (base === "radix") return <RadixSelect.SelectTrigger {...props} />
  if (base === "aria") return <AriaSelect.SelectTrigger {...props} />
  return <BaseSelect.SelectTrigger {...props} />
}

function SelectValue(props: SelectValueProps) {
  const base = useSelectBase()
  if (base === "radix") return <RadixSelect.SelectValue {...props} />
  if (base === "aria") return <AriaSelect.SelectValue {...props} />
  return <BaseSelect.SelectValue {...props} />
}

function SelectContent(props: SelectContentProps) {
  const base = useSelectBase()
  if (base === "radix") return <RadixSelect.SelectContent {...props} />
  if (base === "aria") return <AriaSelect.SelectContent {...props} />
  return <BaseSelect.SelectContent {...props} />
}

function SelectItem(props: SelectItemProps) {
  const base = useSelectBase()
  if (base === "radix") return <RadixSelect.SelectItem {...props} />
  if (base === "aria") return <AriaSelect.SelectItem {...props} />
  return <BaseSelect.SelectItem {...props} />
}

function SelectGroup(props: SelectPartProps) {
  const base = useSelectBase()
  if (base === "radix") return <RadixSelect.SelectGroup {...props} />
  if (base === "aria") return <AriaSelect.SelectGroup {...props} />
  return <BaseSelect.SelectGroup {...props} />
}

function SelectLabel(props: SelectPartProps) {
  const base = useSelectBase()
  if (base === "radix") return <RadixSelect.SelectLabel {...props} />
  if (base === "aria") return <AriaSelect.SelectLabel {...props} />
  return <BaseSelect.SelectLabel {...props} />
}

function SelectSeparator(props: { className?: string }) {
  const base = useSelectBase()
  if (base === "radix") return <RadixSelect.SelectSeparator {...props} />
  if (base === "aria") return <AriaSelect.SelectSeparator {...props} />
  return <BaseSelect.SelectSeparator {...props} />
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
