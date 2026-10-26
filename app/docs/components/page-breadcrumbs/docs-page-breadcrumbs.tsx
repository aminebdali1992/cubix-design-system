"use client"

import type { ComponentProps, MouseEvent } from "react"
import { usePathname } from "next/navigation"

import * as AriaPageBreadcrumbs from "@/components/cubix/aria/page-breadcrumbs"
import * as BasePageBreadcrumbs from "@/components/cubix/base/page-breadcrumbs"
import * as RadixPageBreadcrumbs from "@/components/cubix/radix/page-breadcrumbs"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

function usePageBreadcrumbsBase() {
  return parseComponentPath(usePathname())?.base ?? DEFAULT_BASE
}

/* Docs previews only: links inside the demos must not leave the page. */
function stayOnPage(event: MouseEvent<HTMLElement>) {
  if ((event.target as HTMLElement).closest("a")) event.preventDefault()
}

function PageBreadcrumbs(props: ComponentProps<typeof BasePageBreadcrumbs.PageBreadcrumbs>) {
  const base = usePageBreadcrumbsBase()
  if (base === "radix") return <RadixPageBreadcrumbs.PageBreadcrumbs onClickCapture={stayOnPage} {...props} />
  if (base === "aria") return <AriaPageBreadcrumbs.PageBreadcrumbs onClickCapture={stayOnPage} {...props} />
  return <BasePageBreadcrumbs.PageBreadcrumbs onClickCapture={stayOnPage} {...props} />
}

function PageBreadcrumbsActions(props: ComponentProps<"div">) {
  const base = usePageBreadcrumbsBase()
  if (base === "radix") return <RadixPageBreadcrumbs.PageBreadcrumbsActions {...props} />
  if (base === "aria") return <AriaPageBreadcrumbs.PageBreadcrumbsActions {...props} />
  return <BasePageBreadcrumbs.PageBreadcrumbsActions {...props} />
}

export { PageBreadcrumbs, PageBreadcrumbsActions }
export {
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../breadcrumb/docs-breadcrumb"
