"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../docs-tabs"

export function TabsDisabledDemo() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList aria-label="گزارش پروژه">
        <TabsTrigger value="overview">نمای کلی</TabsTrigger>
        <TabsTrigger value="analytics" disabled>
          تحلیل‌ها
        </TabsTrigger>
        <TabsTrigger value="reports">گزارش‌ها</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="rounded-lg border p-4 text-muted-foreground">
        خلاصه وضعیت پروژه در هفته جاری.
      </TabsContent>
      <TabsContent value="analytics" className="rounded-lg border p-4 text-muted-foreground">
        تحلیل‌ها پس از ارتقای طرح در دسترس است.
      </TabsContent>
      <TabsContent value="reports" className="rounded-lg border p-4 text-muted-foreground">
        گزارش‌های ماهانه را دریافت کنید.
      </TabsContent>
    </Tabs>
  )
}
