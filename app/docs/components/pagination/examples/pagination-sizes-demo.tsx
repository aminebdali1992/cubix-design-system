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

const pages = [1, 2, 3, 4, 5]

function toPersianDigits(value: number) {
  return String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)])
}

function SizedPagination({ size }: { size: "sm" | "default" }) {
  const [page, setPage] = React.useState(2)

  function goTo(next: number) {
    return (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      setPage(Math.min(pages.length, Math.max(1, next)))
    }
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" size={size} disabled={page === 1} onClick={goTo(page - 1)} />
        </PaginationItem>
        {pages.map((item) => (
          <PaginationItem key={item}>
            <PaginationLink href="#" size={size} isActive={item === page} onClick={goTo(item)}>
              {toPersianDigits(item)}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext href="#" size={size} disabled={page === pages.length} onClick={goTo(page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export function PaginationSizesDemo() {
  return (
    <div className="grid gap-6">
      <SizedPagination size="sm" />
      <SizedPagination size="default" />
    </div>
  )
}
