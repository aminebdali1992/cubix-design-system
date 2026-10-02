"use client"

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
  "aria-invalid"?: boolean
  "aria-label"?: string
  onCheckedChange?: (checked: boolean) => void
}

function useSwitchBase() {
  return parseComponentPath(usePathname())?.base ?? DEFAULT_BASE
}

function Switch({ required, ...props }: SwitchProps) {
  const base = useSwitchBase()
  // React Aria Switch omits isRequired; Base UI and Radix accept required.
  if (base === "radix") return <RadixSwitch.Switch required={required} {...props} />
  if (base === "aria") return <AriaSwitch.Switch {...props} />
  return <BaseSwitch.Switch required={required} {...props} />
}

export { Switch }
export type { SwitchProps }
