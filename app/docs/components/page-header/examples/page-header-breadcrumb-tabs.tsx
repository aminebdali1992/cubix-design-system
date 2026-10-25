"use client"

import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/docs/components/breadcrumb/docs-breadcrumb"
import { Tabs, TabsList, TabsTrigger } from "@/app/docs/components/tabs/docs-tabs"

import {
  PageHeader,
  PageHeaderBreadcrumb,
  PageHeaderDescription,
  PageHeaderMeta,
  PageHeaderNavigationTabs,
  PageHeaderSummary,
  PageHeaderTitle,
} from "../docs-page-header"

export function PageHeaderBreadcrumbTabs() {
  return (
    <div className="w-full">
      <PageHeader size="full">
        <PageHeaderBreadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">پروژه‌ها</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>تنظیمات</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </PageHeaderBreadcrumb>
        <PageHeaderMeta>
          <PageHeaderSummary>
            <PageHeaderTitle>تنظیمات پروژه</PageHeaderTitle>
            <PageHeaderDescription>پیکربندی عمومی، صورت‌حساب و دسترسی‌ها.</PageHeaderDescription>
          </PageHeaderSummary>
        </PageHeaderMeta>
        <PageHeaderNavigationTabs>
          <Tabs defaultValue="general">
            <TabsList variant="line">
              <TabsTrigger value="general">عمومی</TabsTrigger>
              <TabsTrigger value="billing">صورت‌حساب</TabsTrigger>
              <TabsTrigger value="access">دسترسی‌ها</TabsTrigger>
            </TabsList>
          </Tabs>
        </PageHeaderNavigationTabs>
      </PageHeader>
    </div>
  )
}
