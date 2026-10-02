"use client"

import { Button } from "@/app/docs/components/button/docs-button"
import { TextFieldInput } from "@/app/docs/components/text-field/docs-text-field"
import { ButtonGroup } from "../docs-button-group"

export function ButtonGroupInputDemo() {
  return (
    <ButtonGroup aria-label="جستجو">
      <TextFieldInput placeholder="عبارت مورد نظر را بنویسید" aria-label="عبارت جستجو" />
      <Button variant="outline">جستجو</Button>
    </ButtonGroup>
  )
}
