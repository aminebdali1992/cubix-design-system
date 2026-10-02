import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  extractDemoImports,
  extractDemoJsx,
  readDocsExampleSource,
} from "@/lib/docs/example-source"
import {
  alertActionRows,
  alertDescriptionRows,
  alertPropRows,
  alertTitleRows,
} from "./alert-table-data"
import { AlertActionDemo } from "./examples/alert-action-demo"
import { AlertBasicDemo } from "./examples/alert-basic-demo"
import { AlertCustomDemo } from "./examples/alert-custom-demo"
import { AlertDemo } from "./examples/alert-demo"
import { AlertDestructiveDemo } from "./examples/alert-destructive-demo"
import { AlertDismissibleDemo } from "./examples/alert-dismissible-demo"

const description =
  "Displays a callout for user attention with title, description, icon, and optional action."

export const metadata: Metadata = {
  title: "Alert",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/alert"
const EXAMPLES_DIR = "app/docs/components/alert/examples"

function loadAlertExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `Alert
├── Icon
├── AlertTitle
├── AlertDescription
└── AlertAction`

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
      <ComponentPreview code={code}>
        <PreviewShell>{children}</PreviewShell>
      </ComponentPreview>
    </div>
  )
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-sm">{children}</code>
}

export default function AlertPage() {
  const demoSource = loadAlertExample("alert-demo.tsx")
  const basicSource = loadAlertExample("alert-basic-demo.tsx")
  const destructiveSource = loadAlertExample("alert-destructive-demo.tsx")
  const actionSource = loadAlertExample("alert-action-demo.tsx")
  const dismissibleSource = loadAlertExample("alert-dismissible-demo.tsx")
  const customSource = loadAlertExample("alert-custom-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Alert" description={description} slug="alert" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <AlertDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="alert" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Place an optional icon, then <Code>AlertTitle</Code> and <Code>AlertDescription</Code>.
          Put buttons or dismiss controls in <Code>AlertAction</Code> so they sit in the top-end
          corner.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          The root renders <Code>role=&quot;alert&quot;</Code> so assistive tech announces the
          message when it appears. Keep the title short, and give dismiss buttons a clear{" "}
          <Code>aria-label</Code>.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Basic"
          description="A basic alert with an icon, title, and description."
          code={basicSource}
        >
          <AlertBasicDemo />
        </ExampleSection>

        <ExampleSection
          title="Destructive"
          description={
            <>
              Pass <Code>variant=&quot;destructive&quot;</Code> for error and failure callouts. The
              shipped styles use the destructive token - no extra color classes required.
            </>
          }
          code={destructiveSource}
        >
          <AlertDestructiveDemo />
        </ExampleSection>

        <ExampleSection
          title="Action"
          description={
            <>
              Use <Code>AlertAction</Code> to add a button or other control in the top-end corner.
            </>
          }
          code={actionSource}
        >
          <AlertActionDemo />
        </ExampleSection>

        <ExampleSection
          title="Dismissible"
          description="Combine AlertAction with local state to let the user dismiss the alert."
          code={dismissibleSource}
        >
          <AlertDismissibleDemo />
        </ExampleSection>

        <ExampleSection
          title="Custom colors"
          description={
            <>
              Override the surface with <Code>className</Code> when you need a one-off tone such as
              a warning palette.
            </>
          }
          code={customSource}
        >
          <AlertCustomDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Parts render <Code>data-slot</Code>{" "}
            attributes (<Code>alert</Code>, <Code>alert-title</Code>, <Code>alert-description</Code>
            , <Code>alert-action</Code>) for targeting in tests and parent selectors. Use the same
            props on Base UI, React Aria, and Radix.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Alert</h3>
        <PropsTable data={alertPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">AlertTitle</h3>
        <PropsTable data={alertTitleRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">AlertDescription</h3>
        <PropsTable data={alertDescriptionRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">AlertAction</h3>
        <PropsTable data={alertActionRows} />
      </section>
    </article>
  )
}
