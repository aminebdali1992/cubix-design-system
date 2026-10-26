import type { Metadata } from "next"
import type { ReactNode } from "react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import { TokenTable } from "@/components/docs/token-table"
import { extractDemoImports, readDocsExampleSource } from "@/lib/docs/example-source"
import {
  collapsibleCardSectionColorRows,
  collapsibleCardSectionRows,
  collapsibleCardSectionTypographyRows,
} from "./collapsible-card-section-table-data"
import { CollapsibleCardSectionBasic } from "./examples/collapsible-card-section-basic"
import { CollapsibleCardSectionDefaultOpen } from "./examples/collapsible-card-section-default-open"
import { CollapsibleCardSectionDemo } from "./examples/collapsible-card-section-demo"

const description =
  "A mono-uppercase collapsible trigger for hiding optional or advanced settings inside a card or panel."

export const metadata: Metadata = {
  title: "Collapsible Card Section",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/collapsible-card-section"
const EXAMPLES_DIR = "app/docs/components/collapsible-card-section/examples"

function loadExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, { publicImport: PUBLIC_IMPORT })
}

const usageSnippet = `<CollapsibleCardSection title="تنظیمات پیشرفته">{/* فیلدهای فرم */}</CollapsibleCardSection>`

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

export default function CollapsibleCardSectionPage() {
  const demoSource = loadExample("collapsible-card-section-demo.tsx")
  const usageImport = extractDemoImports(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Collapsible Card Section"
        description={description}
        slug="collapsible-card-section"
      />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <CollapsibleCardSectionDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="collapsible-card-section" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use <Code>CollapsibleCardSection</Code> to progressively disclose optional or advanced
          fields inside a card or panel form. The trigger is mono uppercase to blend with card
          section headings; content animates in and out on toggle.
        </p>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Basic"
          description="Only a title; the fields stay hidden until the trigger is pressed."
          code={loadExample("collapsible-card-section-basic.tsx")}
        >
          <CollapsibleCardSectionBasic />
        </ExampleSection>

        <ExampleSection
          title="With description"
          description="Use description to add a short qualifier below the title, only when the content needs context that the title alone doesn't provide."
          code={demoSource}
        >
          <CollapsibleCardSectionDemo />
        </ExampleSection>

        <ExampleSection
          title="Default open"
          description="Set defaultOpen to show the content on first render."
          code={loadExample("collapsible-card-section-default-open.tsx")}
        >
          <CollapsibleCardSectionDefaultOpen />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <PropsTable data={collapsibleCardSectionRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Typography</h3>
        <TokenTable data={collapsibleCardSectionTypographyRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Colors</h3>
        <TokenTable data={collapsibleCardSectionColorRows} />
      </section>
    </article>
  )
}
