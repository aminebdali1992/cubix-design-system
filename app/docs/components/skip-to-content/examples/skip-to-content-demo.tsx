"use client"

import { SkipToContent } from "../docs-skip-to-content"

export function SkipToContentDemo() {
  return (
    <div dir="rtl" className="relative w-full overflow-hidden rounded-md border border-border bg-background">
      <div className="flex items-center border-b border-border px-4 py-3 text-caption text-muted-foreground">
        سربرگ و ناوبری نمونه
      </div>
      {/* Preview shows the focused appearance; production hides until Tab */}
      <SkipToContent href="#skip-demo-main" onClick={(event) => { event.preventDefault(); const target = document.getElementById("skip-demo-main"); if (!target) return; target.focus({ preventScroll: true }); }} className="relative start-0 top-0 translate-y-0 focus-within:translate-y-0 px-4 pt-4" />
      <main id="skip-demo-main" tabIndex={-1} className="p-4 outline-hidden">
        <p className="text-caption text-muted-foreground">
          این بخش محتوای اصلی است. در یک برنامه واقعی، یک بار Tab بزنید تا لینک پرش نمایان شود، سپس با Enter
          به اینجا بروید.
        </p>
      </main>
    </div>
  )
}
