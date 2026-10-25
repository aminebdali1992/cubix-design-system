"use client"

import { useState } from "react"

import { Button } from "@/components/cubix/button"
import { TextField, TextFieldInput, TextFieldLabel } from "@/components/cubix/text-field"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogTrigger,
} from "../docs-dialog"

const projectName = "my-project"

export function DialogDeleteDemo() {
  const [value, setValue] = useState("")

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>حذف پروژه</DialogTrigger>
      <DialogContent size="small">
        <DialogHeader>
          <DialogTitle>حذف پروژه</DialogTitle>
        </DialogHeader>
        <DialogSection>
          <p className="text-label">
            این کار قابل بازگشت نیست. پروژه و همه‌ی داده‌های آن برای همیشه حذف می‌شوند.
          </p>
        </DialogSection>
        <DialogSection>
          <TextField>
            <TextFieldLabel>
            برای تأیید، نام پروژه «{projectName}» را وارد کنید</TextFieldLabel>
            <TextFieldInput
            dir="ltr"
            autoComplete="off"
            placeholder={projectName}
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          </TextField>
        </DialogSection>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" size="sm" />}>انصراف</DialogClose>
          <Button variant="destructive" size="sm" disabled={value !== projectName}>
            حذف پروژه
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
