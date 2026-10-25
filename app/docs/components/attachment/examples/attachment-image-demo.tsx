"use client"

import { XIcon } from "lucide-react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "../docs-attachment"

const images = [
  { name: "workspace.jpg", meta: "۸۲۰ کیلوبایت", src: "/docs/attachment/workspace.jpg", alt: "فضای کار" },
  { name: "desk.jpg", meta: "۱.۱ مگابایت", src: "/docs/attachment/desk.jpg", alt: "میز کار" },
  { name: "office.jpg", meta: "۹۴۰ کیلوبایت", src: "/docs/attachment/office.jpg", alt: "دفتر" },
]

export function AttachmentImageDemo() {
  return (
    <AttachmentGroup>
      {images.map((image) => (
        <Attachment key={image.name} orientation="vertical">
          <AttachmentMedia variant="image">
            <img src={image.src} alt={image.alt} className="size-full object-cover" />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{image.name}</AttachmentTitle>
            <AttachmentDescription>{image.meta}</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label={`حذف ${image.name}`}>
              <XIcon />
            </AttachmentAction>
          </AttachmentActions>
          <AttachmentTrigger
            render={
              <a href={image.src} target="_blank" rel="noreferrer" aria-label={`باز کردن ${image.name}`} />
            }
          />
        </Attachment>
      ))}
    </AttachmentGroup>
  )
}
