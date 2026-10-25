"use client"

import type { ComponentProps } from "react"
import { usePathname } from "next/navigation"

import * as AriaFormItemLayout from "@/components/cubix/aria/form-item-layout"
import * as BaseFormItemLayout from "@/components/cubix/base/form-item-layout"
import * as RadixFormItemLayout from "@/components/cubix/radix/form-item-layout"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

function useFormItemLayoutModule() {
  const base = parseComponentPath(usePathname())?.base ?? DEFAULT_BASE
  if (base === "radix") return RadixFormItemLayout
  if (base === "aria") return AriaFormItemLayout
  return BaseFormItemLayout
}

function FormItemLayout(props: ComponentProps<typeof BaseFormItemLayout.FormItemLayout>) {
  const Mod = useFormItemLayoutModule()
  return <Mod.FormItemLayout {...props} />
}

function FormControl(props: ComponentProps<typeof BaseFormItemLayout.FormControl>) {
  const Mod = useFormItemLayoutModule()
  return <Mod.FormControl {...props} />
}

export { FormControl, FormItemLayout }
