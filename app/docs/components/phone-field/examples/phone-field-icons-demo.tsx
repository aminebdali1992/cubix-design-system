"use client"

import { PhoneIcon, SmartphoneIcon } from "lucide-react"

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
          <SmartphoneIcon data-icon="inline-start" />
          <PhoneFieldInput placeholder="۰۹۱۲۰۰۰۰۰۰۰" />
        </PhoneFieldControl>
      </PhoneField>
      <PhoneField>
        <PhoneFieldLabel>شماره تماس اضطراری</PhoneFieldLabel>
        <PhoneFieldControl>
          <PhoneFieldInput placeholder="۰۹۱۲۰۰۰۰۰۰۰" />
          <PhoneIcon data-icon="inline-end" />
        </PhoneFieldControl>
      </PhoneField>
    </div>
  )
}
