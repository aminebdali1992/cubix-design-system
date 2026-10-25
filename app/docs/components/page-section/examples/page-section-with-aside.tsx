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

export function PageSectionWithAside() {
  return (
    <div className="w-full">
      <PageSection>
        <PageSectionMeta>
          <PageSectionSummary>
            <PageSectionTitle>عنوان بخش</PageSectionTitle>
            <PageSectionDescription>
              این نمونه PageSection را با اقدام‌ها در کامپوننت Aside نشان می‌دهد.
            </PageSectionDescription>
          </PageSectionSummary>
          <PageSectionAside>
            <Button variant="outline" size="sm">
              ثانویه
            </Button>
            <Button size="sm">اقدام اصلی</Button>
          </PageSectionAside>
        </PageSectionMeta>
        <PageSectionContent>
          <Card className="rounded-lg border border-border ring-0">
            <CardContent>
              <p className="text-label font-normal text-muted-foreground">
                کامپوننت Aside اقدام‌ها را هم‌تراز با خلاصهٔ بخش قرار می‌دهد و جدایی روشنی بین توضیحات و اقدام‌ها ایجاد می‌کند.
              </p>
            </CardContent>
          </Card>
        </PageSectionContent>
      </PageSection>
    </div>
  )
}
