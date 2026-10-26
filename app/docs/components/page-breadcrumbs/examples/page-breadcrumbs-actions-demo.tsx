"use client"

import { Button } from "@/components/cubix/button"
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  PageBreadcrumbs,
  PageBreadcrumbsActions,
} from "../docs-page-breadcrumbs"

export function PageBreadcrumbsActionsDemo() {
  return (
    <div className="w-full">
      <PageBreadcrumbs
        actions={
          <PageBreadcrumbsActions>
            <Button variant="outline" size="sm">
              دانلود فاکتور
            </Button>
            <Button size="sm">ارسال برای مشتری</Button>
          </PageBreadcrumbsActions>
        }
      >
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/billing">صورت‌حساب‌ها</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>فاکتور ۱۴۰۵-۰۲۱</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </PageBreadcrumbs>
    </div>
  )
}
