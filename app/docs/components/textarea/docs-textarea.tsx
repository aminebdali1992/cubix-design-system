"use client"

import type { ComponentProps, ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaTextarea from "@/components/cubix/aria/textarea"
import * as BaseTextarea from "@/components/cubix/base/textarea"
import * as RadixTextarea from "@/components/cubix/radix/textarea"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type TextareaProps = ComponentProps<"textarea">

type TextareaControlProps = {
  className?: string
  children?: ReactNode
}

function useTextareaBase() {
  const pathname = usePathname()
  return parseComponentPath(pathname)?.base ?? DEFAULT_BASE
}

function Textarea(props: TextareaProps) {
  const base = useTextareaBase()

  if (base === "radix") {
    return <RadixTextarea.Textarea {...props} />
  }

  if (base === "aria") {
    return <AriaTextarea.Textarea {...props} />
  }

  return <BaseTextarea.Textarea {...props} />
}

function TextareaControl({ className, children }: TextareaControlProps) {
  const base = useTextareaBase()

  if (base === "radix") {
    return (
      <RadixTextarea.TextareaControl className={className}>
        {children}
      </RadixTextarea.TextareaControl>
    )
  }

  if (base === "aria") {
    return (
      <AriaTextarea.TextareaControl className={className}>
        {children}
      </AriaTextarea.TextareaControl>
    )
  }

  return (
    <BaseTextarea.TextareaControl className={className}>
      {children}
    </BaseTextarea.TextareaControl>
  )
}

export { Textarea, TextareaControl }
