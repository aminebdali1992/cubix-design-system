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

export function PageBreadcrumbsDemo() {
  return (
    <div className="w-full">
      <PageBreadcrumbs
        actions={
          <PageBreadcrumbsActions>
            <Button size="sm">ایجاد پروژه</Button>
          </PageBreadcrumbsActions>
        }
      >
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/project/demo">پروژه</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>پایگاه داده</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </PageBreadcrumbs>
    </div>
  )
}
