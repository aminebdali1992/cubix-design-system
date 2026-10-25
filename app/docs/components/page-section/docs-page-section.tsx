"use client"

import type { ComponentProps } from "react"
import { usePathname } from "next/navigation"

import * as AriaPageSection from "@/components/cubix/aria/page-section"
import * as BasePageSection from "@/components/cubix/base/page-section"
import * as RadixPageSection from "@/components/cubix/radix/page-section"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

function usePageSectionModule() {
  const base = parseComponentPath(usePathname())?.base ?? DEFAULT_BASE
  if (base === "radix") return RadixPageSection
  if (base === "aria") return AriaPageSection
  return BasePageSection
}

function PageSection(props: ComponentProps<typeof BasePageSection.PageSection>) {
  const Mod = usePageSectionModule()
  return <Mod.PageSection {...props} />
}

function PageSectionAside(props: ComponentProps<typeof BasePageSection.PageSectionAside>) {
  const Mod = usePageSectionModule()
  return <Mod.PageSectionAside {...props} />
}

function PageSectionContent(props: ComponentProps<typeof BasePageSection.PageSectionContent>) {
  const Mod = usePageSectionModule()
  return <Mod.PageSectionContent {...props} />
}

function PageSectionDescription(props: ComponentProps<typeof BasePageSection.PageSectionDescription>) {
  const Mod = usePageSectionModule()
  return <Mod.PageSectionDescription {...props} />
}

function PageSectionMeta(props: ComponentProps<typeof BasePageSection.PageSectionMeta>) {
  const Mod = usePageSectionModule()
  return <Mod.PageSectionMeta {...props} />
}

function PageSectionSummary(props: ComponentProps<typeof BasePageSection.PageSectionSummary>) {
  const Mod = usePageSectionModule()
  return <Mod.PageSectionSummary {...props} />
}

function PageSectionTitle(props: ComponentProps<typeof BasePageSection.PageSectionTitle>) {
  const Mod = usePageSectionModule()
  return <Mod.PageSectionTitle {...props} />
}

export {
  PageSection,
  PageSectionAside,
  PageSectionContent,
  PageSectionDescription,
  PageSectionMeta,
  PageSectionSummary,
  PageSectionTitle,
}
