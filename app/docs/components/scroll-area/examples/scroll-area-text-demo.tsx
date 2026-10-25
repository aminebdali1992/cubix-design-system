"use client"

import { ScrollArea } from "../docs-scroll-area"

const paragraph =
  "این یک متن نمونه برای نمایش اسکرول در محتوای طولانی است. وقتی متن از ارتفاع کادر بیشتر شود، نوار اسکرول ظاهر می‌شود و کاربر می‌تواند بقیه‌ی متن را بخواند."

export function ScrollAreaTextDemo() {
  return (
    <ScrollArea className="h-48 w-80 rounded-lg border">
      <div className="space-y-3 p-4 text-label leading-6 font-normal">
        <h4 className="text-label font-normal">شرایط و قوانین</h4>
        {Array.from({ length: 6 }).map((_, index) => (
          <p key={index} className="text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </div>
    </ScrollArea>
  )
}
