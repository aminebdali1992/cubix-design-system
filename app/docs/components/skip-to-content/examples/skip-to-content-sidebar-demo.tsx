"use client"

import { Button } from "@/components/cubix/button"
import { SkipToContent } from "../docs-skip-to-content"

const sidebarItems = ["داشبورد", "مشتریان", "فاکتورها", "پشتیبانی"]

export function SkipToContentSidebarDemo() {
  return (
    <div dir="rtl" className="relative w-full overflow-hidden rounded-md border border-border bg-background">
      <SkipToContent href="#skip-sidebar-main" onClick={(event) => { event.preventDefault(); const target = document.getElementById("skip-sidebar-main"); if (!target) return; target.focus({ preventScroll: true }); }} className="relative start-0 top-0 translate-y-0 focus-within:translate-y-0 px-4 pt-4">
        رفتن به فهرست فاکتورها
      </SkipToContent>
      <div className="mt-4 flex min-h-48 border-t border-border">
        <aside className="flex w-36 shrink-0 flex-col gap-1 border-e border-border p-2">
          {sidebarItems.map((item) => (
            <Button key={item} type="button" variant="ghost" size="xs" className="justify-start">
              {item}
            </Button>
          ))}
        </aside>
        <main id="skip-sidebar-main" tabIndex={-1} className="flex-1 space-y-2 p-4 outline-hidden">
          <p className="text-title text-foreground">فهرست فاکتورها</p>
          <p className="text-caption text-muted-foreground">
            نوار کناری بیرون از این بخش قرار دارد، پس Tab بعدی روی اولین فاکتور می‌نشیند نه در ناوبری.
          </p>
          <Button type="button" variant="link" size="sm" className="px-0">
            فاکتور شماره ۱۰۲۴
          </Button>
        </main>
      </div>
    </div>
  )
}
