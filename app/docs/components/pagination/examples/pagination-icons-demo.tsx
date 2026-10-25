"use client"

import * as React from "react"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../docs-pagination"

const TOTAL_ITEMS = 97
const PAGE_SIZE = 10
const TOTAL_PAGES = Math.ceil(TOTAL_ITEMS / PAGE_SIZE)

function toPersianDigits(value: number) {
  return String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)])
}

export function PaginationIconsDemo() {
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
    <div className="flex w-full max-w-sm items-center justify-between gap-4">
      <p className="m-0 text-label font-normal text-muted-foreground">
        {toPersianDigits(from)}–{toPersianDigits(to)} از {toPersianDigits(TOTAL_ITEMS)} مورد
      </p>
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              text={null}
              className="w-8 ps-0 pe-0"
              disabled={page === 1}
              onClick={goTo(page - 1)}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              text={null}
              className="w-8 ps-0 pe-0"
              disabled={page === TOTAL_PAGES}
              onClick={goTo(page + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
