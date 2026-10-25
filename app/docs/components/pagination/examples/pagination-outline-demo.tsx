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

export function PaginationOutlineDemo() {
  const [page, setPage] = React.useState(3)

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
          <PaginationPrevious
            href="#"
            className="border-border"
            disabled={page === 1}
            onClick={goTo(page - 1)}
          />
        </PaginationItem>
        {pages.map((item) => (
          <PaginationItem key={item}>
            <PaginationLink
              href="#"
              isActive={item === page}
              className="border-border data-[active=true]:border-foreground data-[active=true]:bg-foreground data-[active=true]:text-background data-[active=true]:hover:bg-foreground"
              onClick={goTo(item)}
            >
              {toPersianDigits(item)}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            className="border-border"
            disabled={page === pages.length}
            onClick={goTo(page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
