"use client"

import { ErrorDisplay } from "../docs-error-display"

export function ErrorDisplayDemo() {
  return (
    <div className="w-full max-w-2xl">
      <ErrorDisplay
        title="بارگذاری جدول‌ها ناموفق بود"
        errorMessage="خطا: اجرای کوئری SQL ناموفق بود. اتصال به دلیل پایان زمان انتظار قطع شد."
        supportFormParams={{ projectRef: "cubix-app" }}
      />
    </div>
  )
}
