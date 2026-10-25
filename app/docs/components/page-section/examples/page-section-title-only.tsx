"use client"

import { Card, CardContent } from "@/app/docs/components/card/docs-card"

import {
  PageSection,
  PageSectionContent,
  PageSectionMeta,
  PageSectionSummary,
  PageSectionTitle,
} from "../docs-page-section"

export function PageSectionTitleOnly() {
  return (
    <div className="w-full">
      <PageSection>
        <PageSectionMeta>
          <PageSectionSummary>
            <PageSectionTitle>عنوان بخش</PageSectionTitle>
          </PageSectionSummary>
        </PageSectionMeta>
        <PageSectionContent>
          <Card className="rounded-lg border border-border ring-0">
            <CardContent>
              <p className="text-label font-normal text-muted-foreground">
                PageSectionSummary همچنان باید داخل PageSectionMeta قرار بگیرد، چون PageSectionMeta یک کانتینر flex است و اجازه می‌دهد خلاصه تمام عرض را بگیرد.
              </p>
            </CardContent>
          </Card>
        </PageSectionContent>
      </PageSection>
    </div>
  )
}
