"use client"

import type { ComponentProps } from "react"
import { usePathname } from "next/navigation"

import * as AriaPageHeader from "@/components/cubix/aria/page-header"
import * as BasePageHeader from "@/components/cubix/base/page-header"
import * as RadixPageHeader from "@/components/cubix/radix/page-header"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

function usePageHeaderModule() {
  const base = parseComponentPath(usePathname())?.base ?? DEFAULT_BASE
  if (base === "radix") return RadixPageHeader
  if (base === "aria") return AriaPageHeader
  return BasePageHeader
}

function PageHeader(props: ComponentProps<typeof BasePageHeader.PageHeader>) {
  const Mod = usePageHeaderModule()
  return <Mod.PageHeader {...props} />
}

function PageHeaderAside(props: ComponentProps<typeof BasePageHeader.PageHeaderAside>) {
  const Mod = usePageHeaderModule()
  return <Mod.PageHeaderAside {...props} />
}

function PageHeaderBreadcrumb(props: ComponentProps<typeof BasePageHeader.PageHeaderBreadcrumb>) {
  const Mod = usePageHeaderModule()
  return <Mod.PageHeaderBreadcrumb {...props} />
}

function PageHeaderDescription(props: ComponentProps<typeof BasePageHeader.PageHeaderDescription>) {
  const Mod = usePageHeaderModule()
  return <Mod.PageHeaderDescription {...props} />
}

function PageHeaderIcon(props: ComponentProps<typeof BasePageHeader.PageHeaderIcon>) {
  const Mod = usePageHeaderModule()
  return <Mod.PageHeaderIcon {...props} />
}

function PageHeaderMeta(props: ComponentProps<typeof BasePageHeader.PageHeaderMeta>) {
  const Mod = usePageHeaderModule()
  return <Mod.PageHeaderMeta {...props} />
}

function PageHeaderNavigationTabs(props: ComponentProps<typeof BasePageHeader.PageHeaderNavigationTabs>) {
  const Mod = usePageHeaderModule()
  return <Mod.PageHeaderNavigationTabs {...props} />
}

function PageHeaderSummary(props: ComponentProps<typeof BasePageHeader.PageHeaderSummary>) {
  const Mod = usePageHeaderModule()
  return <Mod.PageHeaderSummary {...props} />
}

function PageHeaderTitle(props: ComponentProps<typeof BasePageHeader.PageHeaderTitle>) {
  const Mod = usePageHeaderModule()
  return <Mod.PageHeaderTitle {...props} />
}

export {
  PageHeader,
  PageHeaderAside,
  PageHeaderBreadcrumb,
  PageHeaderDescription,
  PageHeaderIcon,
  PageHeaderMeta,
  PageHeaderNavigationTabs,
  PageHeaderSummary,
  PageHeaderTitle,
}
