"use client"

import { ButtonDemoIcon } from "@/components/docs/demo-icon"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../docs-tabs"

export function TabsIconsDemo() {
  return (
    <Tabs defaultValue="profile" className="w-full max-w-md">
      <TabsList aria-label="تنظیمات کاربر">
        <TabsTrigger value="profile">
          <ButtonDemoIcon data-icon="inline-start" />
          نمایه
        </TabsTrigger>
        <TabsTrigger value="notifications">
          <ButtonDemoIcon data-icon="inline-start" />
          اعلان‌ها
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile" className="rounded-lg border p-4 text-muted-foreground">
        اطلاعات عمومی نمایه شما برای اعضای تیم قابل مشاهده است.
      </TabsContent>
      <TabsContent value="notifications" className="rounded-lg border p-4 text-muted-foreground">
        انتخاب کنید کدام رویدادها برای شما اعلان ارسال کنند.
      </TabsContent>
    </Tabs>
  )
}
