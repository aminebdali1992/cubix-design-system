"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../docs-tabs"

export function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-full max-w-md">
      <TabsList aria-label="تنظیمات حساب">
        <TabsTrigger value="account">حساب کاربری</TabsTrigger>
        <TabsTrigger value="password">رمز عبور</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="rounded-lg border p-4 text-muted-foreground">
        نام، ایمیل و تصویر نمایه خود را از این بخش تغییر دهید.
      </TabsContent>
      <TabsContent value="password" className="rounded-lg border p-4 text-muted-foreground">
        برای امنیت بیشتر، رمز عبور خود را هر چند ماه یک بار عوض کنید.
      </TabsContent>
    </Tabs>
  )
}
