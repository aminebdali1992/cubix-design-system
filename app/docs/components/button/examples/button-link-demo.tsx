"use client"

import { ChevronLeftIcon } from "lucide-react"
import Link from "next/link"

import { Button } from "../docs-button"

export function ButtonLinkDemo() {
  return (
    <Button nativeButton={false} render={<Link href="/docs" />}>
      متن دکمه
      <ChevronLeftIcon data-icon="inline-end" />
    </Button>
  )
}
