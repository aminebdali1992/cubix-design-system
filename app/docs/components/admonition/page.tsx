import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import { TokenTable } from "@/components/docs/token-table"
import {
  extractDemoImports,
  extractDemoJsx,
  readDocsExampleSource,
} from "@/lib/docs/example-source"
import {
  admonitionColorRows,
  admonitionPropRows,
  admonitionTypographyRows,
} from "./admonition-table-data"
import { AdmonitionDemo } from "./examples/admonition-demo"
import { AdmonitionDescriptionDemo } from "./examples/admonition-description-demo"
import { AdmonitionDestructiveDemo } from "./examples/admonition-destructive-demo"
import { AdmonitionResponsiveDemo } from "./examples/admonition-responsive-demo"
import { AdmonitionSuccessDemo } from "./examples/admonition-success-demo"
import { AdmonitionWarningDemo } from "./examples/admonition-warning-demo"

const description =
  "A ready-made callout with type, title, description, icon and actions. Use it instead of composing Alert by hand."

export const metadata: Metadata = {
  title: "Admonition",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/admonition"
const EXAMPLES_DIR = "app/docs/components/admonition/examples"

function loadExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `Admonition
├── Icon (type icon, or icon prop)
├── Title (title prop)
├── Description (description or children)
└── Actions (actions prop)`

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

export default function AdmonitionPage() {
  const demoSource = loadExample("admonition-demo.tsx")
  const warningSource = loadExample("admonition-warning-demo.tsx")
  const destructiveSource = loadExample("admonition-destructive-demo.tsx")
  const successSource = loadExample("admonition-success-demo.tsx")
  const descriptionSource = loadExample("admonition-description-demo.tsx")
  const responsiveSource = loadExample("admonition-responsive-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Admonition" description={description} slug="admonition" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <AdmonitionDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="admonition" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Admonition is prop-driven. Pass <Code>title</Code>, <Code>description</Code> and{" "}
          <Code>actions</Code>; it lays out the icon, text and action for you. Use a single
          <Code>size=&quot;xs&quot;</Code> button and style it by the context of the action, not the
          admonition type.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          The root renders <Code>role=&quot;alert&quot;</Code> with an <Code>aria-label</Code> taken
          from the type (یادداشت، هشدار، خطر، موفق). Pass your own <Code>aria-label</Code> to
          override it. The type icon is <Code>aria-hidden</Code>, and the title is a paragraph,
          not a heading, so it does not change the page outline.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Warning"
          description={
            <>
              Use <Code>type=&quot;warning&quot;</Code> when the user should review something before
              continuing.
            </>
          }
          code={warningSource}
        >
          <AdmonitionWarningDemo />
        </ExampleSection>

        <ExampleSection
          title="Destructive"
          description={
            <>
              Use <Code>type=&quot;destructive&quot;</Code> for irreversible or failing states. The
              action button uses the destructive variant because the action itself is destructive.
            </>
          }
          code={destructiveSource}
        >
          <AdmonitionDestructiveDemo />
        </ExampleSection>

        <ExampleSection
          title="Success"
          description={
            <>
              Use <Code>type=&quot;success&quot;</Code> for completed states that need no further
              action.
            </>
          }
          code={successSource}
        >
          <AdmonitionSuccessDemo />
        </ExampleSection>

        <ExampleSection
          title="Description only"
          description="Short callouts near a heading or form label can skip the title."
          code={descriptionSource}
        >
          <AdmonitionDescriptionDemo />
        </ExampleSection>

        <ExampleSection
          title="Responsive"
          description={
            <>
              With <Code>layout=&quot;responsive&quot;</Code> the root becomes a container. Actions
              stay below the text when narrow and move beside it at the <Code>@md</Code> width.
            </>
          }
          code={responsiveSource}
        >
          <AdmonitionResponsiveDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Parts render <Code>data-slot</Code>{" "}
            attributes (<Code>admonition</Code>, <Code>admonition-icon</Code>,{" "}
            <Code>admonition-title</Code>, <Code>admonition-description</Code>,{" "}
            <Code>admonition-actions</Code>) and the root carries <Code>data-type</Code> and{" "}
            <Code>data-layout</Code>. Use the same props on Base UI, React Aria, and Radix.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Admonition</h3>
        <PropsTable data={admonitionPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Typography</h3>
        <TokenTable data={admonitionTypographyRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Colors</h3>
        <TokenTable data={admonitionColorRows} />
      </section>
    </article>
  )
}
