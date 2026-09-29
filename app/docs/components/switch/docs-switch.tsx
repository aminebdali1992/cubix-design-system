"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaSwitch from "@/components/cubix/aria/switch"
import * as BaseSwitch from "@/components/cubix/base/switch"
import * as RadixSwitch from "@/components/cubix/radix/switch"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type SwitchProps = {
  className?: string
  id?: string
  name?: string
  value?: string
  size?: "sm" | "default"
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  required?: boolean
  invalid?: boolean
  "aria-invalid"?: boolean
  "aria-label"?: string
  onCheckedChange?: (checked: boolean) => void
  children?: ReactNode
}

function useSwitchBase() {
  const pathname = usePathname()
  return parseComponentPath(pathname)?.base ?? DEFAULT_BASE
}

function Switch({
  invalid,
  "aria-invalid": ariaInvalid,
  required,
  ...props
}: SwitchProps) {
  const base = useSwitchBase()

  if (base === "radix") {
    return (
      <RadixSwitch.Switch
        required={required}
        aria-invalid={invalid ?? ariaInvalid}
        {...props}
      />
    )
  }

  if (base === "aria") {
    return (
      <AriaSwitch.Switch
        invalid={invalid}
        aria-invalid={ariaInvalid}
        {...props}
      />
    )
  }

  return (
    <BaseSwitch.Switch
      required={required}
      aria-invalid={invalid ?? ariaInvalid}
      {...props}
    />
  )
}

export { Switch }
export type { SwitchProps }