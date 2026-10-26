"use client"

import { useState } from "react"
import { CloudOffIcon } from "lucide-react"

import { ErrorDisplay } from "../docs-error-display"

export function ErrorDisplayCustomDemo() {
  const [reported, setReported] = useState(false)

  return (
    <div className="w-full max-w-2xl space-y-2">
      <ErrorDisplay
        title="آپلود فایل ناموفق بود"
        errorMessage="خطای ذخیره‌سازی: حجم فایل از سقف ۵۰ مگابایت بیشتر است."
        variant="destructive"
        icon={<CloudOffIcon />}
        supportLabel="گزارش مشکل"
        onSupportClick={() => setReported(true)}
      />
      {reported ? (
        <p className="text-caption font-normal text-muted-foreground">گزارش شما ثبت شد و به‌زودی بررسی می‌شود.</p>
      ) : null}
    </div>
  )
}
