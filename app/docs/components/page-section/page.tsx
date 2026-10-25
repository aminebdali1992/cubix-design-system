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
  pageSectionColorRows,
  pageSectionDivRows,
  pageSectionMetaRows,
  pageSectionRows,
  pageSectionTitleRows,
  pageSectionTypographyRows,
} from "./page-section-table-data"
import { PageSectionDemo } from "./examples/page-section-demo"
import { PageSectionHorizontal } from "./examples/page-section-horizontal"
import { PageSectionTitleOnly } from "./examples/page-section-title-only"
import { PageSectionWithAside } from "./examples/page-section-with-aside"

const description = "A compound component for organizing page content into distinct sections."

export const metadata: Metadata = {
  title: "Page Section",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/page-section"
const EXAMPLES_DIR = "app/docs/components/page-section/examples"

function loadExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `PageSection (orientation)
├── PageSectionMeta
│   ├── PageSectionSummary
│   │   ├── PageSectionTitle
│   │   └── PageSectionDescription
│   └── PageSectionAside
└── PageSectionContent`

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

function Item({ name, children }: { name: string; children: ReactNode }) {
  return (
    <li>
      <Code>{name}</Code> - {children}
    </li>
  )
}

export default function PageSectionPage() {
  const demoSource = loadExample("page-section-demo.tsx")
  const horizontalSource = loadExample("page-section-horizontal.tsx")
  const asideSource = loadExample("page-section-with-aside.tsx")
  const titleOnlySource = loadExample("page-section-title-only.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Page Section" description={description} slug="page-section" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <PageSectionDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="page-section" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Sub-components</h2>
        <ul className="list-disc space-y-2 ps-6 leading-relaxed text-muted-foreground">
          <Item name="PageSection">
            Root container with orientation variants (<Code>horizontal</Code> or{" "}
            <Code>vertical</Code>).
          </Item>
          <Item name="PageSectionMeta">
            Wrapper for <Code>PageSectionSummary</Code> and an optional{" "}
            <Code>PageSectionAside</Code>.
          </Item>
          <Item name="PageSectionSummary">
            Holds the title and description. Place it inside <Code>PageSectionMeta</Code>; it gets{" "}
            <Code>flex-1</Code>.
          </Item>
          <Item name="PageSectionTitle">Section heading (h2).</Item>
          <Item name="PageSectionDescription">Supporting text below the title.</Item>
          <Item name="PageSectionAside">
            Section-level actions. Place it inside <Code>PageSectionMeta</Code>; it gets{" "}
            <Code>shrink-0</Code>.
          </Item>
          <Item name="PageSectionContent">Container for the main section content.</Item>
        </ul>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Orientation variants</h2>
        <ul className="list-disc space-y-2 ps-6 leading-relaxed text-muted-foreground">
          <Item name="vertical">Content stacks vertically (default).</Item>
          <Item name="horizontal">
            Summary and content sit side by side on larger containers. In RTL the summary is on
            the right.
          </Item>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Layout guidance</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use <Code>PageSectionTitle</Code> and <Code>PageSectionDescription</Code> when a page has
          several sections and no page header title, so each section gets its own heading. Header
          titles describe the page; section titles describe a distinct block of content on it. In
          a pair of actions, put the secondary button first so the primary one sits on the left in
          RTL.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          <Code>PageSectionTitle</Code> renders a real <Code>h2</Code>, so sections appear in the
          heading outline. Keep one level below the page title and do not skip levels. To expose a
          section as a landmark, pass <Code>role=&quot;region&quot;</Code> and{" "}
          <Code>aria-labelledby</Code> pointing at the title id. Layout uses logical properties
          and flex/grid order, so it mirrors correctly in RTL.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Horizontal orientation"
          description="Summary on one side, content on the other on larger screens; stacks on small screens."
          code={horizontalSource}
        >
          <PageSectionHorizontal />
        </ExampleSection>

        <ExampleSection
          title="With aside actions"
          description="Multiple action buttons in PageSectionAside. The primary button is on the left."
          code={asideSource}
        >
          <PageSectionWithAside />
        </ExampleSection>

        <ExampleSection
          title="Without aside"
          description="Title only. Keep PageSectionSummary inside PageSectionMeta so it spans the full width."
          code={titleOnlySource}
        >
          <PageSectionTitleOnly />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Parts render{" "}
            <Code>data-slot=&quot;page-section-*&quot;</Code> attributes; the root also renders{" "}
            <Code>data-orientation</Code>. Meta styles its children through these slots. Use the
            same props on Base UI, React Aria, and Radix.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">PageSection</h3>
        <PropsTable data={pageSectionRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">PageSectionMeta</h3>
        <PropsTable data={pageSectionMetaRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">PageSectionSummary</h3>
        <PropsTable data={pageSectionDivRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">PageSectionTitle</h3>
        <PropsTable data={pageSectionTitleRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">PageSectionDescription</h3>
        <PropsTable data={pageSectionDivRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">PageSectionAside</h3>
        <PropsTable data={pageSectionDivRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">PageSectionContent</h3>
        <PropsTable data={pageSectionDivRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Typography</h3>
        <TokenTable data={pageSectionTypographyRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Colors</h3>
        <TokenTable data={pageSectionColorRows} />
      </section>
    </article>
  )
}
