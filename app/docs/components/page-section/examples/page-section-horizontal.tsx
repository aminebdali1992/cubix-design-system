"use client"

import { Card, CardContent } from "@/app/docs/components/card/docs-card"

import {
  PageSection,
  PageSectionContent,
  PageSectionDescription,
  PageSectionMeta,
  PageSectionSummary,
  PageSectionTitle,
} from "../docs-page-section"

export function PageSectionHorizontal() {
  return (
    <div className="@container w-full">
      <PageSection orientation="horizontal">
        <PageSectionMeta>
          <PageSectionSummary>
            <PageSectionTitle>عنوان بخش</PageSectionTitle>
            <PageSectionDescription>
              در جهت افقی، خلاصه (عنوان و توضیحات) در یک سمت و محتوا در سمت دیگر صفحه‌های بزرگ‌تر قرار می‌گیرد. این برای بخش‌های مفصلی مفید است که می‌خواهید هنگام دیدن محتوا، زمینه را حفظ کنید.
            </PageSectionDescription>
          </PageSectionSummary>
        </PageSectionMeta>
        <PageSectionContent>
          <Card className="rounded-lg border border-border ring-0">
            <CardContent>
              <p className="text-label font-normal text-muted-foreground">
                ناحیهٔ محتوا در چیدمان افقی کنار خلاصه نمایش داده می‌شود. در صفحه‌های کوچک‌تر، به‌صورت عمودی روی هم قرار می‌گیرد.
              </p>
            </CardContent>
          </Card>
        </PageSectionContent>
      </PageSection>
    </div>
  )
}
