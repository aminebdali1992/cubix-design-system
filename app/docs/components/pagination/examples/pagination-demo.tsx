"use client"

import * as React from "react"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../docs-pagination"

const TOTAL_PAGES = 10

function toPersianDigits(value: number) {
  return String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)])
}

export function PaginationDemo() {
  const [page, setPage] = React.useState(2)

  function goTo(next: number) {
    return (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      setPage(Math.min(TOTAL_PAGES, Math.max(1, next)))
    }
  }

  const visible = page <= 3 ? [1, 2, 3] : page >= TOTAL_PAGES - 1 ? [TOTAL_PAGES - 2, TOTAL_PAGES - 1, TOTAL_PAGES] : [page - 1, page, page + 1]

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" disabled={page === 1} onClick={goTo(page - 1)} />
        </PaginationItem>
        {visible[0] > 1 ? (
          <>
            <PaginationItem>
              <PaginationLink href="#" onClick={goTo(1)}>
                {toPersianDigits(1)}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        ) : null}
        {visible.map((item) => (
          <PaginationItem key={item}>
            <PaginationLink href="#" isActive={item === page} onClick={goTo(item)}>
              {toPersianDigits(item)}
            </PaginationLink>
          </PaginationItem>
        ))}
        {visible[visible.length - 1] < TOTAL_PAGES ? (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" onClick={goTo(TOTAL_PAGES)}>
                {toPersianDigits(TOTAL_PAGES)}
              </PaginationLink>
            </PaginationItem>
          </>
        ) : null}
        <PaginationItem>
          <PaginationNext href="#" disabled={page === TOTAL_PAGES} onClick={goTo(page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
