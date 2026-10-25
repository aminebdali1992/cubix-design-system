"use client"

import { Separator } from "../docs-separator"

const items = [
  { title: "تنظیمات", description: "مدیریت ترجیحات" },
  { title: "حساب کاربری", description: "پروفایل و امنیت" },
  { title: "راهنما", description: "پشتیبانی و مستندات" },
]

export function SeparatorMenuDemo() {
  return (
    <div className="flex items-center gap-4">
      {items.map((item, index) => (
        <div key={item.title} className="flex items-center gap-4 self-stretch">
          {index > 0 && <Separator orientation="vertical" />}
          <div className="flex flex-col gap-1">
            <span className="text-label font-normal text-foreground">{item.title}</span>
            <span className="text-description text-muted-foreground">{item.description}</span>
          </div>
        </div>
      ))}
    </div>
  )
}