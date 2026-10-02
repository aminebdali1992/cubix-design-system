"use client"

import * as React from "react"
import { LoaderIcon } from "lucide-react"

import { Button } from "../docs-button"

const SAVE_DELAY_MS = 2000

export function ButtonLoadingDemo() {
  const [loading, setLoading] = React.useState(false)

  async function simulateSave() {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, SAVE_DELAY_MS))
    setLoading(false)
  }

  return (
    <Button disabled={loading} aria-busy={loading} onClick={simulateSave}>
      {loading ? (
        <LoaderIcon data-icon="inline-start" className="size-4 animate-spin" aria-hidden="true" />
      ) : null}
      متن دکمه
    </Button>
  )
}
