import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import { SidebarDemo } from "@/components/examples/sidebar-examples"

import {
  menuButtonPropRows,
  providerPropRows,
  sidebarPropRows,
} from "./sidebar-table-data"

const description =
  "A composable, themeable and customizable sidebar component."

export const metadata: Metadata = {
  title: "Sidebar",
  description,
}

const usageImport = `import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/cubix/sidebar"`

const usageSnippet = `<SidebarProvider>
  <Sidebar>
    <SidebarContent />
  </Sidebar>
  <SidebarInset>
    <SidebarTrigger />
  </SidebarInset>
</SidebarProvider>`

const compositionSnippet = `SidebarProvider
├── Sidebar
│   ├── SidebarHeader
│   ├── SidebarContent
│   │   └── SidebarGroup
│   │       ├── SidebarGroupLabel
│   │       └── SidebarGroupContent
│   │           └── SidebarMenu
│   │               └── SidebarMenuItem
│   │                   └── SidebarMenuButton
│   ├── SidebarFooter
│   └── SidebarRail
└── SidebarInset
    └── SidebarTrigger`

const demoSnippet = `"use client"

import {
  CalendarIcon,
  HomeIcon,
  InboxIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/cubix/sidebar"

const items = [
  { title: "Home", icon: HomeIcon },
  { title: "Inbox", icon: InboxIcon },
  { title: "Calendar", icon: CalendarIcon },
  { title: "Search", icon: SearchIcon },
  { title: "Settings", icon: SettingsIcon },
]

export function SidebarDemo() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" tooltip="Cubix">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <span className="text-sm font-semibold">C</span>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Cubix</span>
                  <span className="truncate text-xs">Design system</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton tooltip={item.title}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger />
        </header>
      </SidebarInset>
    </SidebarProvider>
  )
}`

const sideSnippet = `<Sidebar side="left" />
<Sidebar side="right" />`

const collapsibleSnippet = `<Sidebar collapsible="offcanvas" />
<Sidebar collapsible="icon" />
<Sidebar collapsible="none" />`

export default function SidebarDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Sidebar"
        description={description}
        slug="sidebar"
      />

      <ComponentPreview
        code={demoSnippet}
        previewClassName="min-h-0 items-stretch p-0"
        align="start"
      >
        <SidebarDemo />
      </ComponentPreview>

      <ComponentInstall name="sidebar" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Composition
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the following composition to build a sidebar layout:
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Side</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the <code className="font-mono text-sm">side</code> prop to place
          the sidebar on the left or right.
        </p>
        <CodeBlock code={sideSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Collapsible
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the <code className="font-mono text-sm">collapsible</code> prop
          to control how the sidebar collapses.{" "}
          <code className="font-mono text-sm">offcanvas</code> slides away,{" "}
          <code className="font-mono text-sm">icon</code> collapses to icons, and{" "}
          <code className="font-mono text-sm">none</code> disables collapsing.
        </p>
        <CodeBlock code={collapsibleSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <h3 className="scroll-m-20 text-lg font-semibold tracking-tight">
          SidebarProvider
        </h3>
        <PropsTable data={providerPropRows} />
        <h3 className="scroll-m-20 text-lg font-semibold tracking-tight">
          Sidebar
        </h3>
        <PropsTable data={sidebarPropRows} />
        <h3 className="scroll-m-20 text-lg font-semibold tracking-tight">
          SidebarMenuButton
        </h3>
        <PropsTable data={menuButtonPropRows} />
      </section>
    </article>
  )
}
