"use client"

import * as React from "react"
import { ArrowRightIcon, LoaderIcon, MailIcon } from "lucide-react"
import Link from "next/link"

import { Button } from "@/app/docs/components/button/docs-button"

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
          <LoaderIcon data-icon="inline-start" className="animate-spin" />
          Saving...
        </>
      ) : (
        "Save changes"
      )}
    </Button>
  )
}

export function ButtonWithIconDemo() {
  return (
    <Button>
      <MailIcon data-icon="inline-start" />
      Login with Email
    </Button>
  )
}

export function ButtonIconDemo() {
  return (
    <Button variant="outline" size="icon" aria-label="Send email">
      <ArrowRightIcon />
    </Button>
  )
}

export function ButtonAsChildDemo() {
  return (
    <Button nativeButton={false} render={<Link href="/docs" />}>
      Go to Docs
      <ArrowRightIcon data-icon="inline-end" />
    </Button>
  )
}

export function ButtonSpinnerDemo() {
  return (
    <Button disabled>
      <LoaderIcon data-icon="inline-start" className="animate-spin" />
      Please wait
    </Button>
  )
}

export function ButtonCustomDemo() {
  return (
    <Button variant="outline" className="rounded-full px-6 text-base">
      Fully rounded
    </Button>
  )
}
