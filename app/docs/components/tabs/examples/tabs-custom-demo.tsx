"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../docs-tabs"

const triggerClassName =
  "h-auto flex-none rounded-full border-border px-4 py-1.5 after:hidden hover:bg-muted aria-selected:border-transparent aria-selected:bg-foreground! aria-selected:text-background!"

const sections = [
  { value: "overview", label: "نمای کلی", description: "شاخص‌های کلیدی این ماه در یک نگاه." },
  { value: "reports", label: "گزارش‌ها", description: "گزارش‌های آماده برای دانلود." },
  { value: "settings", label: "تنظیمات", description: "دسترسی‌ها و یکپارچه‌سازی‌ها." },
]

export function TabsCustomDemo() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList aria-label="داشبورد" className="gap-2">
        {sections.map((section) => (
          <TabsTrigger key={section.value} value={section.value} className={triggerClassName}>
            {section.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {sections.map((section) => (
        <TabsContent
          key={section.value}
          value={section.value}
          className="rounded-lg border p-4 text-muted-foreground"
        >
          {section.description}
        </TabsContent>
      ))}
    </Tabs>
  )
}
