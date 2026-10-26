"use client"

import { Button } from "@/app/docs/components/button/docs-button"
import { Card, CardContent } from "@/app/docs/components/card/docs-card"

import { CollapsibleCardSection } from "../docs-collapsible-card-section"

export function CollapsibleCardSectionDemo() {
  return (
    <Card dir="rtl" className="w-full max-w-lg">
      <CardContent className="flex flex-col gap-6">
        <CollapsibleCardSection
          title="تنظیمات پیشرفته"
          description="این تنظیمات پس از ایجاد پروژه قابل تغییر نیستند."
        >
          <div className="flex items-center justify-between gap-4">
            <p className="text-description text-foreground">کاربران از طریق این دامنه به برنامه‌ی شما دسترسی خواهند داشت.</p>
            <Button type="button" variant="default" size="sm" className="shrink-0">
              افزودن دامنه‌ی سفارشی
            </Button>
          </div>
        </CollapsibleCardSection>
      </CardContent>
    </Card>
  )
}
