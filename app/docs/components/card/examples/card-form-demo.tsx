"use client"

import { FolderIcon, MailIcon } from "lucide-react"

import { Button } from "@/app/docs/components/button/docs-button"
import {
  EmailField,
  EmailFieldControl,
  EmailFieldInput,
  EmailFieldLabel,
} from "@/app/docs/components/email-field/docs-email-field"
import {
  TextField,
  TextFieldControl,
  TextFieldInput,
  TextFieldLabel,
} from "@/app/docs/components/text-field/docs-text-field"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../docs-card"

export function CardFormDemo() {
  return (
    <form className="w-full max-w-sm" onSubmit={(event) => event.preventDefault()}>
      <Card>
        <CardHeader>
          <CardTitle>ساخت پروژه</CardTitle>
          <CardDescription>پروژه جدید خود را در چند ثانیه راه‌اندازی کنید.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <TextField name="projectName">
            <TextFieldLabel>نام پروژه</TextFieldLabel>
            <TextFieldControl>
              <FolderIcon data-icon="inline-start" />
              <TextFieldInput placeholder="مثلاً فروشگاه آنلاین" required />
            </TextFieldControl>
          </TextField>
          <EmailField name="ownerEmail">
            <EmailFieldLabel>ایمیل مدیر پروژه</EmailFieldLabel>
            <EmailFieldControl>
              <MailIcon data-icon="inline-start" />
              <EmailFieldInput placeholder="name@example.com" required />
            </EmailFieldControl>
          </EmailField>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-2">
          <Button type="button" variant="outline">
            انصراف
          </Button>
          <Button type="submit">ساخت پروژه</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
