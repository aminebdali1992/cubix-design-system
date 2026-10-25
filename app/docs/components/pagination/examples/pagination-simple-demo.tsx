"use client"

import * as React from "react"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../docs-pagination"

const pages = [1, 2, 3, 4, 5]

function toPersianDigits(value: number) {
  return String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)])
}

export function PaginationSimpleDemo() {
  const [page, setPage] = React.useState(2)

  return (
    <Pagination>
      <PaginationContent>
        {pages.map((item) => (
          <PaginationItem key={item}>
            <PaginationLink
              href="#"
              isActive={item === page}
              onClick={(event) => {
                event.preventDefault()
                setPage(item)
              }}
            >
              {toPersianDigits(item)}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  )
}
