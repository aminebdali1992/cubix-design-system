"use client"

import { useState } from "react"

import { Button } from "../../button/docs-button"
import { ErrorDisplay } from "../docs-error-display"

export function ErrorDisplayRetryDemo() {
  const [attempts, setAttempts] = useState(0)

  return (
    <div className="w-full max-w-2xl">
      <ErrorDisplay
        title="همگام‌سازی مخاطبان متوقف شد"
        errorMessage={`همگام‌سازی ناموفق: زمان درخواست پس از ۳۰ ثانیه تمام شد (تلاش ${attempts + 1}).`}
        supportFormParams={{ projectRef: "cubix-app" }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 p-4">
          <p className="text-description text-muted-foreground">ممکن است سرویس موقتاً در دسترس نباشد. چند لحظه بعد دوباره امتحان کنید.</p>
          <Button type="button" variant="outline" size="sm" onClick={() => setAttempts((n) => n + 1)}>
            تلاش دوباره
          </Button>
        </div>
      </ErrorDisplay>
    </div>
  )
}
