"use client"

import { TextFieldInput } from "@/app/docs/components/text-field/docs-text-field"
import { ButtonGroup, ButtonGroupText } from "../docs-button-group"

export function ButtonGroupTextDemo() {
  return (
    <ButtonGroup dir="ltr" aria-label="آدرس وب‌سایت">
      <ButtonGroupText render={<label htmlFor="website-url" />}>https://</ButtonGroupText>
      <TextFieldInput id="website-url" placeholder="example.com" />
    </ButtonGroup>
  )
}
