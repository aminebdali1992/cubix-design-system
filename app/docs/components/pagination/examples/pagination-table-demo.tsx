"use client"

import * as React from "react"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../docs-pagination"

const TOTAL_ITEMS = 48
const PAGE_SIZE = 10
const TOTAL_PAGES = Math.ceil(TOTAL_ITEMS / PAGE_SIZE)

function toPersianDigits(value: number) {
  return String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)])
}

export function PaginationTableDemo() {
  const [page, setPage] = React.useState(1)
  const from = (page - 1) * PAGE_SIZE + 1
  const to = Math.min(page * PAGE_SIZE, TOTAL_ITEMS)

  function goTo(next: number) {
    return (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      setPage(Math.min(TOTAL_PAGES, Math.max(1, next)))
    }
  }

  return (
    <div className="flex w-full max-w-xl flex-wrap items-center justify-between gap-4">
      <p className="m-0 text-label font-normal text-muted-foreground">
        نمایش {toPersianDigits(from)} تا {toPersianDigits(to)} از {toPersianDigits(TOTAL_ITEMS)} سفارش
      </p>
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" disabled={page === 1} onClick={goTo(page - 1)} />
          </PaginationItem>
          {Array.from({ length: TOTAL_PAGES }, (_, index) => index + 1).map((item) => (
            <PaginationItem key={item}>
              <PaginationLink href="#" isActive={item === page} onClick={goTo(item)}>
                {toPersianDigits(item)}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext href="#" disabled={page === TOTAL_PAGES} onClick={goTo(page + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
