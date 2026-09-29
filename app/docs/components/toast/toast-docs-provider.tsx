"use client"

import * as React from "react"

import { Toaster } from "./docs-toast"

export function ToastDocsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <Toaster>{children}</Toaster>
}