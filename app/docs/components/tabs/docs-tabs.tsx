"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

import * as AriaTabs from "@/components/cubix/aria/tabs"
import * as BaseTabs from "@/components/cubix/base/tabs"
import * as RadixTabs from "@/components/cubix/radix/tabs"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type TabsProps = {
  className?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  orientation?: "horizontal" | "vertical"
  dir?: "ltr" | "rtl"
  children?: ReactNode
}
type TabsListProps = {
  className?: string
  variant?: "default" | "line"
  "aria-label"?: string
  children?: ReactNode
}
type TabsTriggerProps = {
  className?: string
  value: string
  disabled?: boolean
  onRemove?: () => void
  children?: ReactNode
}
type TabsContentProps = {
  className?: string
  value: string
  children?: ReactNode
}

function useTabsModule() {
  const base = parseComponentPath(usePathname())?.base ?? DEFAULT_BASE
  if (base === "radix") return RadixTabs
  if (base === "aria") return AriaTabs
  return BaseTabs
}

function Tabs(props: TabsProps) {
  const M = useTabsModule()
  return <M.Tabs {...(props as object)} />
}
function TabsList(props: TabsListProps) {
  const M = useTabsModule()
  return <M.TabsList {...(props as object)} />
}
function TabsTrigger(props: TabsTriggerProps) {
  const M = useTabsModule()
  return <M.TabsTrigger {...(props as TabsTriggerProps)} />
}
function TabsContent(props: TabsContentProps) {
  const M = useTabsModule()
  return <M.TabsContent {...(props as TabsContentProps)} />
}

export { Tabs, TabsContent, TabsList, TabsTrigger }