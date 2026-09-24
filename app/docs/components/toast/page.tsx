import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
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
  title: "Event created",
  description: "Sunday, December 3 at 9:00 AM",
})`

const demoSnippet = `"use client"

import { Button } from "@/components/cubix/button"
import { toast } from "@/components/cubix/toast"

export function ToastDemo() {
  function showToast() {
    const id = toast.add({
      title: "Event created",
      description: "Sunday, December 3 at 9:00 AM",
      actionProps: {
        children: "Undo",
        onClick() {
          toast.close(id)
        },
      },
    })
  }

  return (
    <Button variant="outline" onClick={showToast}>
      Show Toast
    </Button>
  )
}`

const layoutSnippet = `import { Toaster } from "@/components/cubix/toast"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}`

const typesSnippet = `<Button
  variant="outline"
  onClick={() =>
    toast.add({
      type: "success",
      description: "Event has been created.",
    })
  }
>
  Success
</Button>`

const actionSnippet = `const id = toast.add({
  title: "Event created",
  actionProps: {
    children: "Undo",
    onClick() {
      toast.close(id)
    },
  },
})`

const promiseSnippet = `toast.promise(
  new Promise<{ name: string }>((resolve) => {
    window.setTimeout(() => resolve({ name: "Event" }), 2000)
  }),
  {
    loading: "Creating event...",
    success: (data) => \`\${data.name} created.\`,
    error: "Could not create event.",
  }
)`

export default function ToastDocsPage() {
  return (
    <ToastDocsProvider>
      <article className="space-y-10">
      <ComponentDocsHeader
        title="Toast"
        description={description}
        slug="toast"
      />

      <ComponentPreview code={demoSnippet} previewClassName="min-h-32">
        <ToastDemo />
      </ComponentPreview>

      <ComponentInstall name="toast" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Add the Toaster
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Place{" "}
          <code className="font-mono text-sm">Toaster</code> in your root
          layout so toasts can render from anywhere.
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
          Set the{" "}
          <code className="font-mono text-sm">type</code> option to render a
          status icon. The built-in renderer recognizes{" "}
          <code className="font-mono text-sm">success</code>,{" "}
          <code className="font-mono text-sm">info</code>,{" "}
          <code className="font-mono text-sm">warning</code>,{" "}
          <code className="font-mono text-sm">error</code>, and{" "}
          <code className="font-mono text-sm">loading</code>.
        </p>
        <ComponentPreview code={typesSnippet} previewClassName="min-h-32">
          <ToastTypesDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Action</h2>
        <p className="leading-relaxed text-muted-foreground">
          Pass button props with{" "}
          <code className="font-mono text-sm">actionProps</code> to render an
          action.
        </p>
        <CodeBlock code={actionSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Promise</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use{" "}
          <code className="font-mono text-sm">toast.promise</code> to update
          one toast as an asynchronous task moves through loading, success, and
          error states.
        </p>
        <ComponentPreview code={promiseSnippet} previewClassName="min-h-32">
          <ToastPromiseDemo />
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          See also the Base UI Toast documentation for manager options,
          stacking, swipe dismissal, and the primitive API.
        </p>

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
