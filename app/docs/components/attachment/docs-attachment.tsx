"use client"

import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react"
import { usePathname } from "next/navigation"

import * as AriaAttachment from "@/components/cubix/aria/attachment"
import * as BaseAttachment from "@/components/cubix/base/attachment"
import * as RadixAttachment from "@/components/cubix/radix/attachment"
import { DEFAULT_BASE, parseComponentPath } from "@/lib/bases"

type AttachmentState = "idle" | "uploading" | "processing" | "error" | "done"

type AttachmentProps = {
  className?: string
  state?: AttachmentState
  size?: "default" | "sm" | "xs"
  orientation?: "horizontal" | "vertical"
  children?: ReactNode
}

type MediaProps = {
  className?: string
  variant?: "icon" | "image"
  children?: ReactNode
}

type SlotProps = {
  className?: string
  children?: ReactNode
}

type ActionProps = {
  className?: string
  variant?: "default" | "secondary" | "gray" | "destructive" | "destructive-secondary" | "outline" | "ghost" | "link"
  size?: "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"
  children?: ReactNode
  "aria-label"?: string
}

type TriggerProps = {
  className?: string
  children?: ReactNode
  render?: ReactElement<{ className?: string }>
  "aria-label"?: string
}

function useAttachmentBase() {
  const pathname = usePathname()
  return parseComponentPath(pathname)?.base ?? DEFAULT_BASE
}

function Attachment(props: AttachmentProps) {
  const base = useAttachmentBase()
  if (base === "aria") return <AriaAttachment.Attachment {...props} />
  if (base === "radix") return <RadixAttachment.Attachment {...props} />
  return <BaseAttachment.Attachment {...props} />
}

function AttachmentMedia(props: MediaProps) {
  const base = useAttachmentBase()
  if (base === "aria") return <AriaAttachment.AttachmentMedia {...props} />
  if (base === "radix") return <RadixAttachment.AttachmentMedia {...props} />
  return <BaseAttachment.AttachmentMedia {...props} />
}

function AttachmentContent(props: SlotProps) {
  const base = useAttachmentBase()
  if (base === "aria") return <AriaAttachment.AttachmentContent {...props} />
  if (base === "radix") return <RadixAttachment.AttachmentContent {...props} />
  return <BaseAttachment.AttachmentContent {...props} />
}

function AttachmentTitle(props: SlotProps) {
  const base = useAttachmentBase()
  if (base === "aria") return <AriaAttachment.AttachmentTitle {...props} />
  if (base === "radix") return <RadixAttachment.AttachmentTitle {...props} />
  return <BaseAttachment.AttachmentTitle {...props} />
}

function AttachmentDescription(props: SlotProps) {
  const base = useAttachmentBase()
  if (base === "aria") return <AriaAttachment.AttachmentDescription {...props} />
  if (base === "radix") return <RadixAttachment.AttachmentDescription {...props} />
  return <BaseAttachment.AttachmentDescription {...props} />
}

function AttachmentActions(props: SlotProps) {
  const base = useAttachmentBase()
  if (base === "aria") return <AriaAttachment.AttachmentActions {...props} />
  if (base === "radix") return <RadixAttachment.AttachmentActions {...props} />
  return <BaseAttachment.AttachmentActions {...props} />
}

function AttachmentAction(props: ActionProps) {
  const base = useAttachmentBase()
  if (base === "aria") return <AriaAttachment.AttachmentAction {...props} />
  if (base === "radix") return <RadixAttachment.AttachmentAction {...props} />
  return <BaseAttachment.AttachmentAction {...props} />
}

function AttachmentTrigger({ render, className, children, ...props }: TriggerProps) {
  const base = useAttachmentBase()

  if (base === "radix") {
    if (isValidElement(render)) {
      return (
        <RadixAttachment.AttachmentTrigger asChild className={className} {...props}>
          {cloneElement(render)}
        </RadixAttachment.AttachmentTrigger>
      )
    }
    return (
      <RadixAttachment.AttachmentTrigger className={className} {...props}>
        {children}
      </RadixAttachment.AttachmentTrigger>
    )
  }

  if (base === "aria") {
    return (
      <AriaAttachment.AttachmentTrigger
        className={className}
        render={render}
        {...props}
      >
        {children}
      </AriaAttachment.AttachmentTrigger>
    )
  }

  return (
    <BaseAttachment.AttachmentTrigger
      className={className}
      render={render}
      {...props}
    >
      {children}
    </BaseAttachment.AttachmentTrigger>
  )
}

function AttachmentGroup(props: SlotProps) {
  const base = useAttachmentBase()
  if (base === "aria") return <AriaAttachment.AttachmentGroup {...props} />
  if (base === "radix") return <RadixAttachment.AttachmentGroup {...props} />
  return <BaseAttachment.AttachmentGroup {...props} />
}

export {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
}
