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
  pageHeaderBreadcrumbRows,
  pageHeaderColorRows,
  pageHeaderDivRows,
  pageHeaderRows,
  pageHeaderTitleRows,
  pageHeaderTypographyRows,
} from "./page-header-table-data"
import { PageHeaderBreadcrumbTabs } from "./examples/page-header-breadcrumb-tabs"
import { PageHeaderDemo } from "./examples/page-header-demo"
import { PageHeaderTitleOnly } from "./examples/page-header-title-only"

const description = "A compound component for page title, description, and actions."

export const metadata: Metadata = {
  title: "Page Header",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/page-header"
const EXAMPLES_DIR = "app/docs/components/page-header/examples"

function loadExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `PageHeader (size)
├── PageHeaderBreadcrumb (legacy)
├── PageHeaderMeta
│   ├── PageHeaderIcon
│   ├── PageHeaderSummary
│   │   ├── PageHeaderTitle
│   │   └── PageHeaderDescription
│   └── PageHeaderAside
└── PageHeaderNavigationTabs (legacy)`
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

export default function PageHeaderPage() {
  const demoSource = loadExample("page-header-demo.tsx")
  const titleOnlySource = loadExample("page-header-title-only.tsx")
  const tabsSource = loadExample("page-header-breadcrumb-tabs.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Page Header" description={description} slug="page-header" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <PageHeaderDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="page-header" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Sub-components</h2>
        <ul className="list-disc space-y-2 ps-6 leading-relaxed text-muted-foreground">
          <Item name="PageHeader">
            Root. <Code>size</Code> variants: <Code>small</Code>, <Code>default</Code>,{" "}
            <Code>large</Code>, <Code>full</Code>.
          </Item>
          <Item name="PageHeaderMeta">Groups icon, summary and aside. Owns its own container query.</Item>
          <Item name="PageHeaderIcon">Optional icon before the summary (inside Meta).</Item>
          <Item name="PageHeaderSummary">Title and description (inside Meta).</Item>
          <Item name="PageHeaderTitle">
            Page heading, <Code>h1</Code> by default; change it with <Code>as</Code>.
          </Item>
          <Item name="PageHeaderDescription">Supporting text below the title.</Item>
          <Item name="PageHeaderAside">Page-level actions when there is no filter row above a table.</Item>
          <Item name="PageHeaderBreadcrumb">Legacy. Cubix Breadcrumb in the sized container, placed first.</Item>
          <Item name="PageHeaderNavigationTabs">Legacy. Tab navigation with a bottom border, placed last.</Item>
        </ul>
        <CodeBlock code={compositionSnippet} title="Structure" />
        <p className="leading-relaxed text-muted-foreground">
          Sizes are passed to <Code>PageHeader</Code> and applied to the width of the meta,
          breadcrumb and tabs containers. In a pair of actions, put the secondary button first so
          the primary one sits on the left in RTL.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          <Code>PageHeaderTitle</Code> renders an <Code>h1</Code>, so use one per page. When the
          header sits below another page title, pass <Code>as=&quot;h2&quot;</Code> to keep the
          heading order valid. The breadcrumb is a labelled <Code>nav</Code> from Cubix Breadcrumb,
          and the tabs keep the Cubix Tabs keyboard and ARIA behaviour. Decorative icons in{" "}
          <Code>PageHeaderIcon</Code> need no label.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Title and single action"
          description="Small size, no icon, one primary action."
          code={titleOnlySource}
        >
          <PageHeaderTitleOnly />
        </ExampleSection>

        <ExampleSection
          title="With breadcrumb and navigation tabs"
          description="The legacy breadcrumb and tabs parts with size full, so the tabs border spans the full width."
          code={tabsSource}
        >
          <PageHeaderBreadcrumbTabs />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Parts render{" "}
            <Code>data-slot=&quot;page-header-*&quot;</Code> attributes; the root also renders{" "}
            <Code>data-size</Code>. Read the size in custom parts with <Code>usePageHeader()</Code>.
            Use the same props on Base UI, React Aria, and Radix.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">PageHeader</h3>
        <PropsTable data={pageHeaderRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">PageHeaderTitle</h3>
        <PropsTable data={pageHeaderTitleRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">PageHeaderBreadcrumb</h3>
        <PropsTable data={pageHeaderBreadcrumbRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          PageHeaderMeta, Icon, Summary, Description, Aside, NavigationTabs
        </h3>
        <PropsTable data={pageHeaderDivRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Typography</h3>
        <TokenTable data={pageHeaderTypographyRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Colors</h3>
        <TokenTable data={pageHeaderColorRows} />
      </section>
    </article>
  )
}
