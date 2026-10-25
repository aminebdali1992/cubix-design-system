"use client"

import { Button } from "@/app/docs/components/button/docs-button"

import {
  PageHeader,
  PageHeaderAside,
  PageHeaderDescription,
  PageHeaderMeta,
  PageHeaderSummary,
  PageHeaderTitle,
} from "../docs-page-header"

export function PageHeaderTitleOnly() {
  return (
    <div className="w-full">
      <PageHeader size="small">
        <PageHeaderMeta>
          <PageHeaderSummary>
            <PageHeaderTitle>قالب‌ها</PageHeaderTitle>
            <PageHeaderDescription>قالب‌های ایمیل پروژهٔ خود را مدیریت کنید.</PageHeaderDescription>
          </PageHeaderSummary>
          <PageHeaderAside>
            <Button size="xs">ساخت قالب</Button>
          </PageHeaderAside>
        </PageHeaderMeta>
      </PageHeader>
    </div>
  )
}
