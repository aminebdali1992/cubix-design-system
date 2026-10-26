"use client"

import { Button } from "@/app/docs/components/button/docs-button"
import { Card, CardContent } from "@/app/docs/components/card/docs-card"

import { CollapsibleCardSection } from "../docs-collapsible-card-section"

export function CollapsibleCardSectionBasic() {
  return (
    <Card dir="rtl" className="w-full max-w-lg">
      <CardContent className="flex flex-col gap-6">
        <CollapsibleCardSection
          title="تنظیمات پیشرفته"
        >
          <div className="flex items-center justify-between gap-4">
            <p className="text-description text-foreground">گزارش هفتگی فعالیت پروژه به ایمیل شما ارسال می‌شود.</p>
            <Button type="button" variant="default" size="sm" className="shrink-0">
              مدیریت اعلان‌ها
            </Button>
          </div>
        </CollapsibleCardSection>
      </CardContent>
    </Card>
  )
}
