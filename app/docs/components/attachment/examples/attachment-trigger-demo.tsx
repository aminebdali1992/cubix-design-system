"use client"

import { CopyIcon, FileSearchIcon, XIcon } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/cubix/dialog"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "../docs-attachment"

export function AttachmentTriggerDemo() {
  return (
    <Dialog>
      <Attachment className="w-full max-w-sm">
        <AttachmentMedia>
          <FileSearchIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>research-summary.pdf</AttachmentTitle>
          <AttachmentDescription>برای پیش‌نمایش کلیک کنید</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="کپی لینک">
            <CopyIcon />
          </AttachmentAction>
          <AttachmentAction aria-label="حذف research-summary.pdf">
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
        <DialogTrigger render={<AttachmentTrigger aria-label="پیش‌نمایش research-summary.pdf" />} />
      </Attachment>
      <DialogContent dir="rtl" lang="fa" className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>research-summary.pdf</DialogTitle>
          <DialogDescription>
            کل کارت پیش‌نمایش را باز می‌کند و دکمه‌های کپی و حذف جداگانه کار می‌کنند.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
