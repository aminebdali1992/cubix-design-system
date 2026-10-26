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
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderMeta,
  PageHeaderSummary,
  PageHeaderTitle,
} from "../../page-header/docs-page-header"

export function PageBreadcrumbsPlacementDemo() {
  return (
    <div className="w-full">
      <PageBreadcrumbs
        containerClassName="px-6 xl:px-10"
        actions={
          <PageBreadcrumbsActions>
            <Button variant="outline" size="sm">
              خروجی اکسل
            </Button>
          </PageBreadcrumbsActions>
        }
      >
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/reports">گزارش‌ها</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>فروش ماهانه</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </PageBreadcrumbs>
      <PageHeader size="full">
        <PageHeaderMeta>
          <PageHeaderSummary>
            <PageHeaderTitle as="h2">فروش ماهانه</PageHeaderTitle>
            <PageHeaderDescription>خلاصه‌ی فروش، سفارش‌ها و درآمد این ماه به تفکیک کانال فروش.</PageHeaderDescription>
          </PageHeaderSummary>
        </PageHeaderMeta>
      </PageHeader>
    </div>
  )
}
