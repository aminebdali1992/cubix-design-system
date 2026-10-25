"use client"

import * as React from "react"
import type { Layout } from "react-resizable-panels"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../docs-resizable"

function toPersianDigits(value: number) {
  return String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)])
}

export function ResizableControlledDemo() {
  const [layout, setLayout] = React.useState<Layout>({})

  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="min-h-[200px] max-w-md rounded-lg border md:min-w-[450px]"
      onLayoutChange={setLayout}
    >
      <ResizablePanel defaultSize="30%" id="start" minSize="20%">
        <div className="flex h-full items-center justify-center p-6">
          <span className="text-label font-normal">
            ٪{toPersianDigits(Math.round(layout.start ?? 30))}
          </span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="70%" id="end" minSize="30%">
        <div className="flex h-full items-center justify-center p-6">
          <span className="text-label font-normal">
            ٪{toPersianDigits(Math.round(layout.end ?? 70))}
          </span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
