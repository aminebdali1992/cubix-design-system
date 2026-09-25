"use client"

import * as React from "react"
import { ChevronLeftIcon, LoaderIcon } from "lucide-react"
import Link from "next/link"

import { Button } from "@/app/docs/components/button/docs-button"
import { ButtonDemoIcon } from "@/components/examples/button-demo-icon"

export function ButtonLoadingDemo() {
  const [loading, setLoading] = React.useState(false)

  async function simulateSave() {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLoading(false)
  }

  return (
    <Button disabled={loading} onClick={simulateSave}>
      {loading ? (
        <>
          <LoaderIcon data-icon="inline-start" className="size-4 animate-spin" />
          متن دکمه
        </>
      ) : (
        "متن دکمه"
      )}
    </Button>
  )
}

export function ButtonWithIconDemo() {
  return (
    <Button>
      <ButtonDemoIcon data-icon="inline-start" />
      متن دکمه
    </Button>
  )
}

export function ButtonIconDemo() {
  return (
    <Button variant="outline" size="icon" aria-label="آیکون">
      <ButtonDemoIcon />
    </Button>
  )
}

export function ButtonAsChildDemo() {
  return (
    <Button nativeButton={false} render={<Link href="/docs" />}>
      متن دکمه
      <ChevronLeftIcon data-icon="inline-end" />
    </Button>
  )
}

export function ButtonSpinnerDemo() {
  return (
    <Button disabled>
      <LoaderIcon data-icon="inline-start" className="size-4 animate-spin" />
      متن دکمه
    </Button>
  )
}

export function ButtonCustomDemo() {
  return (
    <Button variant="outline" className="px-6 text-base">
      متن دکمه
    </Button>
  )
}
