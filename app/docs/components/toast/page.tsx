import type { Metadata } from "next"
import type { ReactNode } from "react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  ToastCustomDemo,
  ToastDemo,
  ToastPromiseDemo,
  ToastTypesDemo,
} from "@/components/examples/toast-examples"

import { ToastDocsProvider } from "./toast-docs-provider"
import { toastManagerPropRows, toasterPropRows } from "./toast-table-data"

const description =
  "A succinct message that appears temporarily to provide feedback."

export const metadata: Metadata = {
  title: "Toast",
  description,
}

const usageImport = `import { toast } from "@/components/cubix/toast"`

const usageSnippet = `toast.add({
  title: "رویداد ساخته شد",
  description: "یکشنبه، ۱۲ آذر ساعت ۹:۰۰ صبح",
})`

const demoSnippet = `"use client"

import { Button } from "@/components/cubix/button"
import { toast } from "@/components/cubix/toast"

export function ToastDemo() {
  function showToast() {
    const id = toast.add({
      title: "رویداد ساخته شد",
      description: "یکشنبه، ۱۲ آذر ساعت ۹:۰۰ صبح",
      actionProps: {
        children: "بازگردانی",
        onClick() {
          toast.close(id)
        },
      },
    })
  }

  return (
    <Button variant="outline" size="sm" onClick={showToast}>
      نمایش اعلان
    </Button>
  )
}`

const layoutSnippet = `import { Toaster } from "@/components/cubix/toast"

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}`

const typesSnippet = `"use client"

import { Button } from "@/components/cubix/button"
import { toast } from "@/components/cubix/toast"

export function ToastTypesDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => toast.add({ description: "رویداد ساخته شد." })}
      >
        پیش‌فرض
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          toast.add({ type: "success", description: "رویداد ساخته شد." })
        }
      >
        موفقیت
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          toast.add({
            type: "info",
            description: "ده دقیقه زودتر از شروع رویداد برسید.",
          })
        }
      >
        اطلاعات
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          toast.add({
            type: "warning",
            description: "رویداد نمی‌تواند قبل از ساعت ۸ صبح شروع شود.",
          })
        }
      >
        هشدار
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          toast.add({
            type: "error",
            description: "ساخت رویداد ناموفق بود.",
            priority: "high",
          })
        }
      >
        خطا
      </Button>
    </div>
  )
}`

const actionSnippet = `const id = toast.add({
  title: "رویداد ساخته شد",
  actionProps: {
    children: "بازگردانی",
    onClick() {
      toast.close(id)
    },
  },
})`

const promiseSnippet = `"use client"

import { Button } from "@/components/cubix/button"
import { toast } from "@/components/cubix/toast"

export function ToastPromiseDemo() {
  function showToast() {
    toast.promise(
      new Promise<{ name: string }>((resolve) => {
        window.setTimeout(() => resolve({ name: "رویداد" }), 2000)
      }),
      {
        loading: "در حال ساخت رویداد...",
        success: (data) => \`\${data.name} ساخته شد.\`,
        error: "ساخت رویداد ناموفق بود.",
      }
    )
  }

  return (
    <Button variant="outline" size="sm" onClick={showToast}>
      ساخت رویداد
    </Button>
  )
}`

const customSnippet = `"use client"

import { Button } from "@/components/cubix/button"
import { toast } from "@/components/cubix/toast"

export function ToastCustomDemo() {
  function showToast() {
    const id = toast.add({
      title: "دعوت به رویداد",
      description: "سارا شما را به «جلسه‌ی طراحی» دعوت کرد",
      data: {
        icon: <MyIcon className="size-5" />,
        actions: (
          <>
            <Button size="xs" onClick={() => toast.close(id)}>
              پذیرش
            </Button>
            <Button variant="outline" size="xs" onClick={() => toast.close(id)}>
              رد کردن
            </Button>
          </>
        ),
      },
    })
  }

  return (
    <Button variant="outline" size="sm" onClick={showToast}>
      نمایش اعلان سفارشی
    </Button>
  )
}`
function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div
      dir="rtl"
      lang="fa"
      className="flex min-h-32 w-full items-center justify-center"
    >
      {children}
    </div>
  )
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-sm">{children}</code>
}

export default function ToastDocsPage() {
  return (
    <ToastDocsProvider>
      <article className="space-y-10">
        <ComponentDocsHeader
          title="Toast"
          description={description}
          slug="toast"
        />

        <ComponentPreview code={demoSnippet}>
          <PreviewShell>
            <ToastDemo />
          </PreviewShell>
        </ComponentPreview>

        <ComponentInstall name="toast" />

        <section className="space-y-4">
          <h2 className="scroll-m-20 font-semibold tracking-tight">
            Add the Toaster
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            Place <Code>Toaster</Code> once in your root layout so toasts can
            render from anywhere. It starts right-to-left and shows the stack at
            the bottom-left of the screen; pass <Code>dir=&quot;ltr&quot;</Code>{" "}
            to switch it.
          </p>
          <CodeBlock code={layoutSnippet} title="app/layout.tsx" />
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
          <CodeBlock code={usageImport} title="Import" />
          <CodeBlock code={usageSnippet} title="Example" />
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 font-semibold tracking-tight">Types</h2>
          <p className="leading-relaxed text-muted-foreground">
            Set the <Code>type</Code> option to render a status icon. The
            built-in renderer recognizes <Code>success</Code>,{" "}
            <Code>info</Code>, <Code>warning</Code>, <Code>error</Code>, and{" "}
            <Code>loading</Code>.
          </p>
          <ComponentPreview code={typesSnippet}>
            <PreviewShell>
              <ToastTypesDemo />
            </PreviewShell>
          </ComponentPreview>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 font-semibold tracking-tight">Action</h2>
          <p className="leading-relaxed text-muted-foreground">
            Pass button props with <Code>actionProps</Code> to render an
            action.
          </p>
          <CodeBlock code={actionSnippet} />
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 font-semibold tracking-tight">Promise</h2>
          <p className="leading-relaxed text-muted-foreground">
            Use <Code>toast.promise</Code> to show one loading toast and then
            replace it with a success or error toast when the task finishes.
          </p>
          <ComponentPreview code={promiseSnippet}>
            <PreviewShell>
              <ToastPromiseDemo />
            </PreviewShell>
          </ComponentPreview>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 font-semibold tracking-tight">
            Custom styling
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            Pass a <Code>data</Code> object to <Code>toast.add</Code> to change
            how a single toast looks. <Code>icon</Code> replaces the status
            icon, <Code>actions</Code> renders any buttons below the
            description, and <Code>className</Code> is merged into the toast
            root. Leave out <Code>actionProps</Code> when you use{" "}
            <Code>actions</Code>, and close the toast yourself with{" "}
            <Code>toast.close(id)</Code>.
          </p>
          <ComponentPreview code={customSnippet}>
            <PreviewShell>
              <ToastCustomDemo />
            </PreviewShell>
          </ComponentPreview>
        </section>

        <section id="api-reference" className="space-y-6">
          <h2 className="scroll-m-20 font-semibold tracking-tight">
            API Reference
          </h2>

          <div className="space-y-3">
            <h3 className="scroll-m-20 font-semibold tracking-tight">
              toast manager
            </h3>
            <PropsTable data={toastManagerPropRows} />
          </div>

          <div className="space-y-3">
            <h3 className="scroll-m-20 font-semibold tracking-tight">Toaster</h3>
            <PropsTable data={toasterPropRows} />
          </div>
        </section>
      </article>
    </ToastDocsProvider>
  )
}