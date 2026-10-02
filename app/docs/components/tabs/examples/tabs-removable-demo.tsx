"use client"

import * as React from "react"

import { Button } from "@/app/docs/components/button/docs-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../docs-tabs"

const initialFolders = [
  { value: "inbox", label: "ورودی", description: "۱۲ پیام جدید در صندوق ورودی دارید." },
  { value: "sent", label: "ارسالی", description: "پیام‌هایی که در هفته گذشته فرستاده‌اید." },
  { value: "drafts", label: "پیش‌نویس", description: "۳ پیش‌نویس ذخیره‌شده دارید." },
]

export function TabsRemovableDemo() {
  const [folders, setFolders] = React.useState(initialFolders)
  const [value, setValue] = React.useState(initialFolders[0].value)

  function removeFolder(folderValue: string) {
    const index = folders.findIndex((folder) => folder.value === folderValue)
    const next = folders.filter((folder) => folder.value !== folderValue)
    setFolders(next)
    if (value === folderValue && next.length > 0) {
      setValue((next[index] ?? next[index - 1]).value)
    }
  }

  if (folders.length === 0) {
    return (
      <div className="flex items-center gap-2 text-caption text-muted-foreground">
        همه پوشه‌ها بسته شدند.
        <Button
          variant="link"
          size="sm"
          className="h-auto px-0"
          onClick={() => {
            setFolders(initialFolders)
            setValue(initialFolders[0].value)
          }}
        >
          بازگردانی
        </Button>
      </div>
    )
  }

  return (
    <Tabs value={value} onValueChange={setValue} className="w-full max-w-md">
      <TabsList aria-label="پوشه‌های پیام">
        {folders.map((folder) => (
          <TabsTrigger
            key={folder.value}
            value={folder.value}
            onRemove={() => removeFolder(folder.value)}
          >
            {folder.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {folders.map((folder) => (
        <TabsContent
          key={folder.value}
          value={folder.value}
          className="rounded-lg border p-4 text-muted-foreground"
        >
          {folder.description}
        </TabsContent>
      ))}
    </Tabs>
  )
}
