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
  variant?: "line"
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

function useTabsBase() {
  return parseComponentPath(usePathname())?.base ?? DEFAULT_BASE
}

function Tabs(props: TabsProps) {
  const base = useTabsBase()
  if (base === "radix") return <RadixTabs.Tabs {...props} />
  if (base === "aria") return <AriaTabs.Tabs {...props} />
  return <BaseTabs.Tabs {...props} />
}

function TabsList(props: TabsListProps) {
  const base = useTabsBase()
  if (base === "radix") return <RadixTabs.TabsList {...props} />
  if (base === "aria") return <AriaTabs.TabsList {...props} />
  return <BaseTabs.TabsList {...props} />
}

function TabsTrigger(props: TabsTriggerProps) {
  const base = useTabsBase()
  if (base === "radix") return <RadixTabs.TabsTrigger {...props} />
  if (base === "aria") return <AriaTabs.TabsTrigger {...props} />
  return <BaseTabs.TabsTrigger {...props} />
}

function TabsContent(props: TabsContentProps) {
  const base = useTabsBase()
  if (base === "radix") return <RadixTabs.TabsContent {...props} />
  if (base === "aria") return <AriaTabs.TabsContent {...props} />
  return <BaseTabs.TabsContent {...props} />
}

export { Tabs, TabsContent, TabsList, TabsTrigger }
