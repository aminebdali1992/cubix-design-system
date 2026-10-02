"use client"

import * as React from "react"

import { Spinner } from "@/components/cubix/spinner"
import { Button } from "../docs-button"

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
          <Spinner data-icon="inline-start" />
          در حال ذخیره
        </>
      ) : (
        "ذخیره"
      )}
    </Button>
  )
}
