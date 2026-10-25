"use client"

import { ArrowUpLeftIcon } from "lucide-react"
import { FolderIcon } from "@/components/docs/empty-icons"

import { Button } from "@/app/docs/components/button/docs-button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../docs-empty"

export function EmptyDemo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderIcon />
        </EmptyMedia>
        <EmptyTitle>هنوز پروژه‌ای ندارید</EmptyTitle>
        <EmptyDescription>
          هنوز هیچ پروژه‌ای نساخته‌اید. با ساخت اولین پروژه شروع کنید.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button size="sm">ساخت پروژه</Button>
          <Button variant="outline" size="sm">
            وارد کردن پروژه
          </Button>
        </div>
      </EmptyContent>
      <Button
        variant="link"
        size="sm"
        className="text-muted-foreground"
        nativeButton={false}
        render={<a href="#" />}
      >
        بیشتر بدانید <ArrowUpLeftIcon data-icon="inline-end" />
      </Button>
    </Empty>
  )
}
