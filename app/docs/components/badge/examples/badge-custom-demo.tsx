"use client"

import { Badge } from "../docs-badge"

export function BadgeCustomDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">در حال بررسی</Badge>
      <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
        پرداخت شده
      </Badge>
      <Badge className="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">اطلاعیه</Badge>
      <Badge className="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
        حرفه‌ای
      </Badge>
      <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">منقضی شده</Badge>
    </div>
  )
}
