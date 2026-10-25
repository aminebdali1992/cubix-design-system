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

function getPages(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1)
  if (current <= 4) return [1, 2, 3, 4, 5, "ellipsis", total]
  if (current >= total - 3)
    return [1, "ellipsis", total - 4, total - 3, total - 2, total - 1, total]
  return [1, "ellipsis", current - 1, current, current + 1, "ellipsis", total]
}

export function PaginationControlledDemo() {
  const [page, setPage] = React.useState(1)

  function goTo(next: number) {
    return (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      setPage(Math.min(TOTAL_PAGES, Math.max(1, next)))
    }
  }

  return (
    <div className="grid gap-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              disabled={page === 1}
              onClick={goTo(page - 1)}
            />
          </PaginationItem>
          {getPages(page, TOTAL_PAGES).map((item, index) =>
            item === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={item}>
                <PaginationLink
                  href="#"
                  isActive={item === page}
                  onClick={goTo(item)}
                >
                  {toPersianDigits(item)}
                </PaginationLink>
              </PaginationItem>
            )
          )}
          <PaginationItem>
            <PaginationNext
              href="#"
              disabled={page === TOTAL_PAGES}
              onClick={goTo(page + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <p className="m-0 text-center text-caption font-normal text-muted-foreground">
        صفحه‌ی {toPersianDigits(page)} از {toPersianDigits(TOTAL_PAGES)}
      </p>
    </div>
  )
}
