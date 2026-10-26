"use client"

import type { ComponentProps } from "react"
import { usePathname } from "next/navigation"

import * as AriaCollapsibleCardSection from "@/components/cubix/aria/collapsible-card-section"
import * as BaseCollapsibleCardSection from "@/components/cubix/base/collapsible-card-section"
import * as RadixCollapsibleCardSection from "@/components/cubix/radix/collapsible-card-section"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

function CollapsibleCardSection(
  props: ComponentProps<typeof BaseCollapsibleCardSection.CollapsibleCardSection>
) {
  const base = parseComponentPath(usePathname())?.base ?? DEFAULT_BASE
  if (base === "radix") return <RadixCollapsibleCardSection.CollapsibleCardSection {...props} />
  if (base === "aria") return <AriaCollapsibleCardSection.CollapsibleCardSection {...props} />
  return <BaseCollapsibleCardSection.CollapsibleCardSection {...props} />
}

export { CollapsibleCardSection }
