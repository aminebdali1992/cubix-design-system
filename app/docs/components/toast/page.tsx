import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { KeyboardTable } from "@/components/docs/keyboard-table"
import { PropsTable } from "@/components/docs/props-table"
import {
  extractDemoImports,
  extractDemoJsx,
  readDocsExampleSource,
} from "@/lib/docs/example-source"
import { ToastActionDemo } from "./examples/toast-action-demo"
import { ToastBasicDemo } from "./examples/toast-basic-demo"
import { ToastCustomDemo } from "./examples/toast-custom-demo"
import { ToastDemo } from "./examples/toast-demo"
import { ToastPromiseDemo } from "./examples/toast-promise-demo"
import { ToastTypesDemo } from "./examples/toast-types-demo"
import { ToastDocsProvider } from "./toast-docs-provider"
import { toastKeyboardRows, toastManagerPropRows, toasterPropRows } from "./toast-table-data"

const description = "A succinct message that appears temporarily to provide feedback."

export const metadata: Metadata = {
  title: "Toast",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/toast"
const EXAMPLES_DIR = "app/docs/components/toast/examples"

function loadToastExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const layoutSnippet = `import { Toaster } from "@/components/cubix/toast"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Toaster>{children}</Toaster>
      </body>
    </html>
  )
}`

/*
  Persian labels need lang="fa" so the IRANSans Cubix faces apply. Docs
  chrome only - not part of the paste-ready example source.
*/
function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex w-full justify-center">
      {children}
    </div>
  )
}

function ExampleSection({
  title,
  description,
  code,
  children,
}: {
  title: string
  description: ReactNode
  code: string
  children: ReactNode
}) {
  return (
    <div className="space-y-4">
      <h3 className="scroll-m-20 font-semibold tracking-tight">{title}</h3>
      <p className="leading-relaxed text-muted-foreground">{description}</p>
      <ComponentPreview code={code} previewClassName="min-h-40">
        <PreviewShell>{children}</PreviewShell>
      </ComponentPreview>
    </div>
  )
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-sm">{children}</code>
}

export default function ToastPage() {
  const demoSource = loadToastExample("toast-demo.tsx")
  const basicSource = loadToastExample("toast-basic-demo.tsx")
  const typesSource = loadToastExample("toast-types-demo.tsx")
  const actionSource = loadToastExample("toast-action-demo.tsx")
  const promiseSource = loadToastExample("toast-promise-demo.tsx")
  const customSource = loadToastExample("toast-custom-demo.tsx")
  const usageImport = extractDemoImports(basicSource)
  const usageSnippet = extractDemoJsx(basicSource)

  return (
    <ToastDocsProvider>
      <article className="space-y-10">
        <ComponentDocsHeader title="Toast" description={description} slug="toast" />

        <ComponentPreview code={demoSource} previewClassName="min-h-48">
          <PreviewShell>
            <ToastDemo />
          </PreviewShell>
        </ComponentPreview>

        <ComponentInstall name="toast" />

        <section className="space-y-4">
          <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
          <CodeBlock code={usageImport} title="Import" />
          <CodeBlock code={usageSnippet} title="Example" />
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
          <p className="leading-relaxed text-muted-foreground">
            Render <Code>Toaster</Code> once in your root layout, then call <Code>toast.add</Code>{" "}
            from any client component. The stack starts right-to-left at the bottom-left of the
            screen; pass <Code>dir=&quot;ltr&quot;</Code> to move it to the bottom-right and flip
            the swipe direction.
          </p>
          <CodeBlock code={layoutSnippet} title="app/layout.tsx" />
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
          <p className="leading-relaxed text-muted-foreground">
            Toasts render inside a labelled region. Screen readers announce each toast when it
            appears: politely by default, and immediately with{" "}
            <Code>priority=&quot;high&quot;</Code>. Close timers pause while the pointer is over the
            stack or focus is inside it, and the close button is labelled <Code>بستن</Code>.
          </p>
          <KeyboardTable data={toastKeyboardRows} />
        </section>

        <section className="space-y-6">
          <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

          <ExampleSection
            title="Basic"
            description={
              <>
                Pass a <Code>title</Code> and <Code>description</Code> to <Code>toast.add</Code>.
                The toast closes on its own after <Code>timeout</Code> milliseconds (5000 by
                default).
              </>
            }
            code={basicSource}
          >
            <ToastBasicDemo />
          </ExampleSection>

          <ExampleSection
            title="Types"
            description={
              <>
                Set <Code>type</Code> to render a status icon: <Code>success</Code>,{" "}
                <Code>info</Code>, <Code>warning</Code>, <Code>error</Code>, or <Code>loading</Code>
                .
              </>
            }
            code={typesSource}
          >
            <ToastTypesDemo />
          </ExampleSection>

          <ExampleSection
            title="Action"
            description={
              <>
                Pass <Code>actionProps</Code> to render an action button. Keep the id returned by{" "}
                <Code>toast.add</Code> to close the toast from the action.
              </>
            }
            code={actionSource}
          >
            <ToastActionDemo />
          </ExampleSection>

          <ExampleSection
            title="Promise"
            description={
              <>
                Use <Code>toast.promise</Code> to show a loading toast that is replaced by a success
                or error toast when the task settles.
              </>
            }
            code={promiseSource}
          >
            <ToastPromiseDemo />
          </ExampleSection>

          <ExampleSection
            title="Custom styling"
            description={
              <>
                Pass <Code>data</Code> to change a single toast. <Code>icon</Code> replaces the
                status icon, <Code>actions</Code> renders buttons below the description, and{" "}
                <Code>className</Code> is merged into the toast root. Leave out{" "}
                <Code>actionProps</Code> when you use <Code>actions</Code>, and close the toast with{" "}
                <Code>toast.close(id)</Code>.
              </>
            }
            code={customSource}
          >
            <ToastCustomDemo />
          </ExampleSection>
        </section>

        <section id="api-reference" className="space-y-6">
          <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
          <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
            <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
            <p className="leading-relaxed text-muted-foreground">
              <strong className="text-foreground">Note:</strong> Parts render{" "}
              <code className="font-mono">data-slot</code> attributes (
              <code className="font-mono">toast-viewport</code>,{" "}
              <code className="font-mono">toast</code>,{" "}
              <code className="font-mono">toast-icon</code>,{" "}
              <code className="font-mono">toast-title</code>,{" "}
              <code className="font-mono">toast-description</code>,{" "}
              <code className="font-mono">toast-actions</code>,{" "}
              <code className="font-mono">toast-action</code>,{" "}
              <code className="font-mono">toast-close</code>) for targeting in tests and parent
              selectors. Use the same props on Base UI, React Aria, and Radix.
            </p>
          </div>

          <h3 className="scroll-m-20 font-semibold tracking-tight">toast</h3>
          <PropsTable data={toastManagerPropRows} />

          <h3 className="scroll-m-20 font-semibold tracking-tight">Toaster</h3>
          <PropsTable data={toasterPropRows} />
        </section>
      </article>
    </ToastDocsProvider>
  )
}
