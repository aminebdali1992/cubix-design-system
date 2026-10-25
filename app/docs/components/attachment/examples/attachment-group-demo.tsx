"use client"

import { FileCodeIcon, FileSpreadsheetIcon, FileTextIcon, XIcon } from "lucide-react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "../docs-attachment"

const files = [
  { name: "meeting-notes.pdf", size: "۱.۴ مگابایت", icon: FileTextIcon },
  { name: "budget-2026.xlsx", size: "۸۶۰ کیلوبایت", icon: FileSpreadsheetIcon },
  { name: "renderer.tsx", size: "۱۲ کیلوبایت", icon: FileCodeIcon },
]

export function AttachmentGroupDemo() {
  return (
    <AttachmentGroup className="max-w-sm">
      {files.map((file) => (
        <Attachment key={file.name} className="w-64">
          <AttachmentMedia>
            <file.icon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{file.name}</AttachmentTitle>
            <AttachmentDescription>{file.size}</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label={`حذف ${file.name}`}>
              <XIcon />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      ))}
    </AttachmentGroup>
  )
}
