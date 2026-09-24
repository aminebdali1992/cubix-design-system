"use client"

import * as React from "react"

import { Toaster } from "@/components/cubix/toast"

export function ToastDocsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <Toaster>{children}</Toaster>
}
