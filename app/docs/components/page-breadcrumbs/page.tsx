import type { Metadata } from "next"
import type { ReactNode } from "react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import { TokenTable } from "@/components/docs/token-table"
import { extractDemoImports, readDocsExampleSource } from "@/lib/docs/example-source"
import { PageBreadcrumbsActionsDemo } from "./examples/page-breadcrumbs-actions-demo"
import { PageBreadcrumbsCollapsedDemo } from "./examples/page-breadcrumbs-collapsed-demo"
import { PageBreadcrumbsDemo } from "./examples/page-breadcrumbs-demo"
import { PageBreadcrumbsPlacementDemo } from "./examples/page-breadcrumbs-placement-demo"
import {
  actionsPropRows,
  pageBreadcrumbsColorRows,
  pageBreadcrumbsTypographyRows,
  propRows,
} from "./page-breadcrumbs-table-data"

const description = "Full-width breadcrumb row for page chrome, placed above PageHeader and page content."

export const metadata: Metadata = {
  title: "Page Breadcrumbs",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/page-breadcrumbs"
const EXAMPLES_DIR = "app/docs/components/page-breadcrumbs/examples"

function loadExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, { publicImport: PUBLIC_IMPORT })
}

const usageSnippet = `<PageBreadcrumbs
  actions={
    <PageBreadcrumbsActions>
      <Button size="sm">ایجاد پروژه</Button>
    </PageBreadcrumbsActions>
  }
>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/project/demo">پروژه</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>پایگاه داده</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</PageBreadcrumbs>`

function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex w-full">
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

export default function PageBreadcrumbsPage() {
  const demoSource = loadExample("page-breadcrumbs-demo.tsx")
  const usageImport = extractDemoImports(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Page Breadcrumbs" description={description} slug="page-breadcrumbs" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <PageBreadcrumbsDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="page-breadcrumbs" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Sub-components</h2>
        <ul className="list-disc space-y-2 ps-6 leading-relaxed text-muted-foreground">
          <li>
            <Code>PageBreadcrumbs</Code>: a full-width bordered bar that wraps <Code>Breadcrumb</Code>.
          </li>
          <li>
            <Code>PageBreadcrumbsActions</Code>: actions at the end of the bar, the left side in RTL. Pass it through
            the <Code>actions</Code> prop.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Layout</h2>
        <p className="leading-relaxed text-muted-foreground">
          The bar spans the full width with 16px inline padding and a bottom border. It does not depend on{" "}
          <Code>PageHeader</Code>. Place it as a sibling above <Code>PageHeader</Code> and the page content, not
          inside it. Separators point left for RTL.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>
        <ExampleSection
          title="Multiple actions"
          description="An invoice page with a secondary download action and a primary send action, grouped at the end of the row."
          code={loadExample("page-breadcrumbs-actions-demo.tsx")}
        >
          <PageBreadcrumbsActionsDemo />
        </ExampleSection>
        <ExampleSection
          title="Collapsed path"
          description="A deep organization settings path with the middle levels collapsed into BreadcrumbEllipsis and no actions."
          code={loadExample("page-breadcrumbs-collapsed-demo.tsx")}
        >
          <PageBreadcrumbsCollapsedDemo />
        </ExampleSection>
        <ExampleSection
          title="Above the page header"
          description="A monthly sales report where the breadcrumbs row sits above a PageHeader with the report title and description, as a sibling and not inside the header."
          code={loadExample("page-breadcrumbs-placement-demo.tsx")}
        >
          <PageBreadcrumbsPlacementDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <h3 className="scroll-m-20 font-semibold tracking-tight">PageBreadcrumbs</h3>
        <PropsTable data={propRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">PageBreadcrumbsActions</h3>
        <PropsTable data={actionsPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Typography</h3>
        <TokenTable data={pageBreadcrumbsTypographyRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Colors</h3>
        <TokenTable data={pageBreadcrumbsColorRows} />
      </section>
    </article>
  )
}
