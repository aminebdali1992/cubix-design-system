"use client"

import { CallIcon, MobileIcon } from "@/components/docs/empty-icons"

import {
  PhoneField,
  PhoneFieldControl,
  PhoneFieldInput,
  PhoneFieldLabel,
} from "../docs-phone-field"

export function PhoneFieldIconsDemo() {
  return (
    <div className="grid w-full max-w-sm gap-8">
      <PhoneField>
        <PhoneFieldLabel>شماره همراه</PhoneFieldLabel>
        <PhoneFieldControl>
          <MobileIcon data-icon="inline-start" className="size-6" />
          <PhoneFieldInput placeholder="۰۹۱۲۰۰۰۰۰۰۰" />
        </PhoneFieldControl>
      </PhoneField>
      <PhoneField>
        <PhoneFieldLabel>شماره تماس اضطراری</PhoneFieldLabel>
        <PhoneFieldControl>
          <PhoneFieldInput placeholder="۰۹۱۲۰۰۰۰۰۰۰" />
          <CallIcon data-icon="inline-end" className="size-6" />
        </PhoneFieldControl>
      </PhoneField>
    </div>
  )
}
