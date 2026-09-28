"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaAccordion from "@/components/cubix/aria/accordion"
import * as BaseAccordion from "@/components/cubix/base/accordion"
import * as RadixAccordion from "@/components/cubix/radix/accordion"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

/*
  The demos use the props every base shares, so each part renders the
  Base UI, Radix or React Aria source picked in the docs switcher without a
  cast.
*/

type AccordionProps = {
  className?: string
  multiple?: boolean
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  disabled?: boolean
  dir?: "ltr" | "rtl"
  lang?: string
  children?: ReactNode
}

type AccordionItemProps = {
  className?: string
  value: string
  disabled?: boolean
  children?: ReactNode
}

type AccordionSlotProps = {
  className?: string
  children?: ReactNode
}

type AccordionTriggerProps = AccordionSlotProps & {
  icon?: ReactNode
}

function useAccordionBase() {
  const pathname = usePathname()
  return parseComponentPath(pathname)?.base ?? DEFAULT_BASE
}

function Accordion(props: AccordionProps) {
  const base = useAccordionBase()

  if (base === "aria") {
    return <AriaAccordion.Accordion {...props} />
  }

  if (base === "radix") {
    return <RadixAccordion.Accordion {...props} />
  }

  return <BaseAccordion.Accordion {...props} />
}

function AccordionItem(props: AccordionItemProps) {
  const base = useAccordionBase()

  if (base === "aria") {
    return <AriaAccordion.AccordionItem {...props} />
  }

  if (base === "radix") {
    return <RadixAccordion.AccordionItem {...props} />
  }

  return <BaseAccordion.AccordionItem {...props} />
}

function AccordionTrigger(props: AccordionTriggerProps) {
  const base = useAccordionBase()

  if (base === "aria") {
    return <AriaAccordion.AccordionTrigger {...props} />
  }

  if (base === "radix") {
    return <RadixAccordion.AccordionTrigger {...props} />
  }

  return <BaseAccordion.AccordionTrigger {...props} />
}

function AccordionContent(props: AccordionSlotProps) {
  const base = useAccordionBase()

  if (base === "aria") {
    return <AriaAccordion.AccordionContent {...props} />
  }

  if (base === "radix") {
    return <RadixAccordion.AccordionContent {...props} />
  }

  return <BaseAccordion.AccordionContent {...props} />
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
