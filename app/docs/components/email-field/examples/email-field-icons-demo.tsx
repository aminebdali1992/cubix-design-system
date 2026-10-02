"use client"

import { AtSignIcon, MailIcon } from "lucide-react"

import {
  EmailField,
  EmailFieldControl,
  EmailFieldInput,
  EmailFieldLabel,
} from "../docs-email-field"

export function EmailFieldIconsDemo() {
  return (
    <div className="grid w-full max-w-sm gap-8">
      <EmailField>
        <EmailFieldLabel>ایمیل</EmailFieldLabel>
        <EmailFieldControl>
          <MailIcon data-icon="inline-start" />
          <EmailFieldInput placeholder="example@cubix.com" />
        </EmailFieldControl>
      </EmailField>
      <EmailField>
        <EmailFieldLabel>ایمیل پشتیبان</EmailFieldLabel>
        <EmailFieldControl>
          <EmailFieldInput placeholder="backup@cubix.com" />
          <AtSignIcon data-icon="inline-end" />
        </EmailFieldControl>
      </EmailField>
    </div>
  )
}
