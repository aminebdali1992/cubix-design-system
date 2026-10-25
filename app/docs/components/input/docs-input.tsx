"use client"

import type { ComponentProps } from "react"
import { usePathname } from "next/navigation"

import { Input as AriaInput } from "@/components/cubix/aria/input"
import { Input as BaseInput } from "@/components/cubix/base/input"
import { Input as RadixInput } from "@/components/cubix/radix/input"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

function Input(props: ComponentProps<typeof BaseInput>) {
  const base = parseComponentPath(usePathname())?.base ?? DEFAULT_BASE
  if (base === "radix") return <RadixInput {...(props as ComponentProps<typeof RadixInput>)} />
  if (base === "aria") return <AriaInput {...(props as ComponentProps<typeof AriaInput>)} />
  return <BaseInput {...props} />
}

export { Input }
