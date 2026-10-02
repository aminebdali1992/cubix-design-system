"use client"

import { Button } from "@/app/docs/components/button/docs-button"
import { Label } from "@/components/cubix/label"
import { Checkbox } from "../docs-checkbox"

const channels = [
  { id: "email", label: "ایمیل", defaultChecked: true },
  { id: "push", label: "اعلان فشاری", defaultChecked: true },
  { id: "sms", label: "پیامک", defaultChecked: false },
]

export function CheckboxFormDemo() {
  return (
    <form
      className="grid w-full max-w-xs gap-6 rounded-xl bg-background p-6"
      onSubmit={(event) => event.preventDefault()}
    >
      <fieldset className="grid gap-4">
        <legend className="mb-4 space-y-1.5">
          <span className="block text-body leading-none font-medium text-foreground">
            کانال‌های اعلان
          </span>
          <span className="block text-caption text-muted-foreground">
            انتخاب کنید پیام‌ها از چه راهی به شما برسد.
          </span>
        </legend>
        {channels.map((channel) => (
          <div key={channel.id} className="flex items-center gap-2">
            <Checkbox
              id={`checkbox-form-${channel.id}`}
              name="channels"
              value={channel.id}
              defaultChecked={channel.defaultChecked}
            />
            <Label htmlFor={`checkbox-form-${channel.id}`}>{channel.label}</Label>
          </div>
        ))}
      </fieldset>
      <div className="grid grid-cols-2 gap-2">
        <Button type="button" variant="outline">
          انصراف
        </Button>
        <Button type="submit">ذخیره</Button>
      </div>
    </form>
  )
}
