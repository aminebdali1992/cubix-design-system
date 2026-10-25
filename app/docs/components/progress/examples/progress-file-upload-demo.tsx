"use client"

import { DocumentIcon } from "@/components/docs/empty-icons"
import { Progress } from "../docs-progress"

const files = [
  { id: 1, name: "قرارداد.pdf", progress: 100, status: "تکمیل شد" },
  { id: 2, name: "ارائه.pptx", progress: 72, status: "۱۵ ثانیه مانده" },
  { id: 3, name: "گزارش-مالی.xlsx", progress: 38, status: "۴۰ ثانیه مانده" },
  { id: 4, name: "تصویر.jpg", progress: 5, status: "۲ دقیقه مانده" },
]

export function ProgressFileUploadDemo() {
  return (
    <ul className="m-0 flex w-full max-w-md list-none flex-col gap-3 p-0">
      {files.map((file) => (
        <li key={file.id} className="flex items-center gap-3 text-label">
          <DocumentIcon className="size-6 shrink-0 text-muted-foreground" />
          <span className="flex-1 truncate text-foreground">{file.name}</span>
          <Progress value={file.progress} aria-label={file.name} className="w-32" />
          <span className="w-24 shrink-0 text-caption text-muted-foreground">{file.status}</span>
        </li>
      ))}
    </ul>
  )
}