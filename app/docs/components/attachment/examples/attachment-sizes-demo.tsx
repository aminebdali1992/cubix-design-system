"use client"

import { FileTextIcon } from "lucide-react"

import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "../docs-attachment"

const sizes = [
  { size: "default", title: "default-attachment.pdf" },
  { size: "sm", title: "small-attachment.pdf" },
  { size: "xs", title: "extra-small-attachment.pdf" },
] as const

export function AttachmentSizesDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      {sizes.map((item) => (
        <Attachment key={item.size} size={item.size} className="w-full">
          <AttachmentMedia>
            <FileTextIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{item.title}</AttachmentTitle>
            <AttachmentDescription>۲.۴ مگابایت</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
      ))}
    </div>
  )
}
