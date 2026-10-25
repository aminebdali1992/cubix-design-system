"use client"

import type { ComponentProps, MouseEvent } from "react"
import { usePathname } from "next/navigation"

import * as AriaPagination from "@/components/cubix/aria/pagination"
import * as BasePagination from "@/components/cubix/base/pagination"
import * as RadixPagination from "@/components/cubix/radix/pagination"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

function usePaginationLib() {
  const pathname = usePathname()
  const base = parseComponentPath(pathname)?.base ?? DEFAULT_BASE
  if (base === "radix") return RadixPagination
  if (base === "aria") return AriaPagination
  return BasePagination
}

/* Docs previews only: links inside the demos must not leave the page. */
function stayOnPage(event: MouseEvent<HTMLElement>) {
  const link = (event.target as HTMLElement).closest("a")
  if (link && link.getAttribute("href")?.startsWith("#")) event.preventDefault()
}

function Pagination(props: ComponentProps<typeof BasePagination.Pagination>) {
  const P = usePaginationLib()
  return <P.Pagination onClickCapture={stayOnPage} {...props} />
}
function PaginationContent(props: ComponentProps<typeof BasePagination.PaginationContent>) {
  const P = usePaginationLib()
  return <P.PaginationContent {...props} />
}
function PaginationItem(props: ComponentProps<typeof BasePagination.PaginationItem>) {
  const P = usePaginationLib()
  return <P.PaginationItem {...props} />
}
function PaginationLink(props: ComponentProps<typeof BasePagination.PaginationLink>) {
  const P = usePaginationLib()
  return <P.PaginationLink {...props} />
}
function PaginationPrevious(props: ComponentProps<typeof BasePagination.PaginationPrevious>) {
  const P = usePaginationLib()
  return <P.PaginationPrevious {...props} />
}
function PaginationNext(props: ComponentProps<typeof BasePagination.PaginationNext>) {
  const P = usePaginationLib()
  return <P.PaginationNext {...props} />
}
function PaginationEllipsis(props: ComponentProps<typeof BasePagination.PaginationEllipsis>) {
  const P = usePaginationLib()
  return <P.PaginationEllipsis {...props} />
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
