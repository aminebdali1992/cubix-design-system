"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../docs-tabs"

const sections = [
  {
    value: "general",
    label: "عمومی",
    description: "زبان، منطقه زمانی و قالب تاریخ را تنظیم کنید.",
  },
  {
    value: "security",
    label: "امنیت",
    description: "ورود دو مرحله‌ای و نشست‌های فعال را مدیریت کنید.",
  },
  { value: "billing", label: "صورتحساب", description: "طرح اشتراک و روش پرداخت خود را ببینید." },
]

export function TabsVerticalDemo() {
  return (
    <Tabs defaultValue="general" orientation="vertical" className="w-full max-w-lg">
      <TabsList aria-label="بخش‌های تنظیمات">
        {sections.map((section) => (
          <TabsTrigger key={section.value} value={section.value}>
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
