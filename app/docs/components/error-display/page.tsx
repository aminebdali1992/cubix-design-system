import type { Metadata } from "next"
import type { ReactNode } from "react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import { TokenTable } from "@/components/docs/token-table"
import { extractDemoImports, readDocsExampleSource } from "@/lib/docs/example-source"
import { errorDisplayColorRows, errorDisplayTypographyRows, propRows } from "./error-display-table-data"
import { ErrorDisplayCustomDemo } from "./examples/error-display-custom-demo"
import { ErrorDisplayDemo } from "./examples/error-display-demo"
import { ErrorDisplayRetryDemo } from "./examples/error-display-retry-demo"
import { ErrorDisplayTroubleshootingDemo } from "./examples/error-display-troubleshooting-demo"

const description = "A card component for surfacing API errors with optional troubleshooting steps and a support link."

export const metadata: Metadata = {
  title: "Error Display",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/error-display"
const EXAMPLES_DIR = "app/docs/components/error-display/examples"

function loadExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, { publicImport: PUBLIC_IMPORT })
}

const usageSnippet = `<ErrorDisplay
  title="بارگذاری جدول‌ها ناموفق بود"
  errorMessage="خطا: اتصال به دلیل پایان زمان انتظار قطع شد."
  supportFormParams={{ projectRef: "cubix-app" }}
/>`

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
  return <code className="font-mono">{children}</code>
}

export default function ErrorDisplayPage() {
  const demoSource = loadExample("error-display-demo.tsx")
  const usageImport = extractDemoImports(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Error Display" description={description} slug="error-display" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <ErrorDisplayDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="error-display" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <p className="leading-relaxed text-muted-foreground">
          <Code>ErrorDisplay</Code> renders a <Code>Card</Code> with a warning header, a monospace error message
          block, an optional children slot for inline troubleshooting content, and a support button footer that is
          always shown.
        </p>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
        <p className="leading-relaxed text-muted-foreground">
          Use <Code>ErrorDisplay</Code> as the base for any inline error state, such as a failed request inside a
          page section. Pass troubleshooting steps or a retry action as <Code>children</Code>.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>
        <ExampleSection
          title="With troubleshooting steps"
          description="Pass any content as children to render inline troubleshooting between the error message and the support footer."
          code={loadExample("error-display-troubleshooting-demo.tsx")}
        >
          <ErrorDisplayTroubleshootingDemo />
        </ExampleSection>
        <ExampleSection
          title="With retry action"
          description="Place a secondary outline Button in children so the user can retry before contacting support."
          code={loadExample("error-display-retry-demo.tsx")}
        >
          <ErrorDisplayRetryDemo />
        </ExampleSection>
        <ExampleSection
          title="Custom icon and support action"
          description="Override the header icon with icon, the button label with supportLabel, and handle the click with onSupportClick instead of a link."
          code={loadExample("error-display-custom-demo.tsx")}
        >
          <ErrorDisplayCustomDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <h3 className="scroll-m-20 font-semibold tracking-tight">Props</h3>
        <PropsTable data={propRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Typography</h3>
        <TokenTable data={errorDisplayTypographyRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Colors</h3>
        <TokenTable data={errorDisplayColorRows} />
      </section>
    </article>
  )
}
