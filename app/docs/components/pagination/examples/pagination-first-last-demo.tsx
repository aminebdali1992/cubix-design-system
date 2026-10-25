"use client"

import * as React from "react"
import { ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../docs-pagination"

const TOTAL_PAGES = 20

function toPersianDigits(value: number) {
  return String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)])
}

export function PaginationFirstLastDemo() {
  const [page, setPage] = React.useState(1)

  function goTo(next: number) {
    return (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      setPage(Math.min(TOTAL_PAGES, Math.max(1, next)))
    }
  }

  const start = Math.min(Math.max(1, page - 1), TOTAL_PAGES - 2)
  const visible = [start, start + 1, start + 2]

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            href="#"
            aria-label="رفتن به صفحه‌ی اول"
            disabled={page === 1}
            onClick={goTo(1)}
          >
            <ChevronsRightIcon />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious href="#" disabled={page === 1} onClick={goTo(page - 1)} />
        </PaginationItem>
        {visible.map((item) => (
          <PaginationItem key={item}>
            <PaginationLink href="#" isActive={item === page} onClick={goTo(item)}>
              {toPersianDigits(item)}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext href="#" disabled={page === TOTAL_PAGES} onClick={goTo(page + 1)} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            aria-label="رفتن به صفحه‌ی آخر"
            disabled={page === TOTAL_PAGES}
            onClick={goTo(TOTAL_PAGES)}
          >
            <ChevronsLeftIcon />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
