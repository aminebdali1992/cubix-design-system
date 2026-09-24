import type { ReactNode } from "react"
import Link from "next/link"
import { ChevronRightIcon } from "lucide-react"

import { defaultBlocksHref } from "@/app/blocks/blocks-data"
import { BlocksMobileMenuTrigger } from "@/components/blocks/blocks-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/cubix/breadcrumb"

export function BlocksPageHeader({
  title,
  description,
  actions,
}: {
  title: string
  description: string
  actions?: ReactNode
}) {
  return (
    <div className="mb-12 space-y-6 md:mb-16">
      <div className="flex min-w-0 items-center gap-2">
        <BlocksMobileMenuTrigger />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href={defaultBlocksHref} />}>
                Blocks
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRightIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="truncate font-medium">
                {title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl space-y-3">
          <h1 className="font-heading text-headline">
            {title}
          </h1>
          <p className="text-lead text-muted-foreground">
            {description}
          </p>
        </div>
        {actions}
      </header>
    </div>
  )
}
