"use client"

import { Button } from "@/app/docs/components/button/docs-button"
import { Card, CardContent } from "@/app/docs/components/card/docs-card"

import {
  PageSection,
  PageSectionAside,
  PageSectionContent,
  PageSectionDescription,
  PageSectionMeta,
  PageSectionSummary,
  PageSectionTitle,
} from "../docs-page-section"

export function PageSectionDemo() {
  return (
    <div className="w-full">
      <PageSection>
        <PageSectionMeta>
          <PageSectionSummary>
            <PageSectionTitle>عنوان بخش</PageSectionTitle>
            <PageSectionDescription>
              این بخشی با عنوان و توضیحات، به‌همراه اقدام‌های اختیاری است.
            </PageSectionDescription>
          </PageSectionSummary>
          <PageSectionAside>
            <Button variant="outline" size="sm">
              مشاهده همه
            </Button>
          </PageSectionAside>
        </PageSectionMeta>
        <PageSectionContent>
          <Card className="rounded-lg border border-border ring-0">
            <CardContent>
              <p className="text-label font-normal text-muted-foreground">
                محتوای بخش اینجا قرار می‌گیرد. این می‌تواند فرم، جدول یا هر محتوای دیگری باشد.
              </p>
            </CardContent>
          </Card>
        </PageSectionContent>
      </PageSection>
    </div>
  )
}
