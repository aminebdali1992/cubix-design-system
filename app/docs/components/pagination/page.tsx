import type { Metadata } from "next"
import type { ReactNode } from "react"

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
import { PaginationControlledDemo } from "./examples/pagination-controlled-demo"
import { PaginationDemo } from "./examples/pagination-demo"
import { PaginationFirstLastDemo } from "./examples/pagination-first-last-demo"
import { PaginationOutlineDemo } from "./examples/pagination-outline-demo"
import { PaginationTableDemo } from "./examples/pagination-table-demo"
import { PaginationIconsDemo } from "./examples/pagination-icons-demo"
import { PaginationSimpleDemo } from "./examples/pagination-simple-demo"
import { PaginationSizesDemo } from "./examples/pagination-sizes-demo"
import {
  contentPropRows,
  ellipsisPropRows,
  itemPropRows,
  linkPropRows,
  paginationColorRows,
  paginationPropRows,
  paginationTypographyRows,
  previousNextPropRows,
} from "./pagination-table-data"

const description = "Pagination with page navigation, next and previous links."

export const metadata: Metadata = {
  title: "Pagination",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/pagination"
const EXAMPLES_DIR = "app/docs/components/pagination/examples"

function loadExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `Pagination
└── PaginationContent
    ├── PaginationItem
    │   └── PaginationPrevious
    ├── PaginationItem
    │   └── PaginationLink
    ├── PaginationItem
    │   └── PaginationEllipsis
    └── PaginationItem
        └── PaginationNext`

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

export default function PaginationDocsPage() {
  const demoSource = loadExample("pagination-demo.tsx")
  const simpleSource = loadExample("pagination-simple-demo.tsx")
  const sizesSource = loadExample("pagination-sizes-demo.tsx")
  const controlledSource = loadExample("pagination-controlled-demo.tsx")
  const iconsSource = loadExample("pagination-icons-demo.tsx")
  const firstLastSource = loadExample("pagination-first-last-demo.tsx")
  const outlineSource = loadExample("pagination-outline-demo.tsx")
  const tableSource = loadExample("pagination-table-demo.tsx")

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Pagination" description={description} slug="pagination" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <PaginationDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="pagination" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={extractDemoImports(demoSource)} title="Import" />
        <CodeBlock code={extractDemoJsx(demoSource)} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          The root renders <Code>dir=&quot;rtl&quot;</Code>, so <Code>PaginationPrevious</Code> sits
          on the right and its chevron points right.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection title="Simple" description="Page numbers only." code={simpleSource}>
          <PaginationSimpleDemo />
        </ExampleSection>

        <ExampleSection
          title="Sizes"
          description={
            <>
              <Code>sm</Code> (32px, default) and <Code>default</Code> (40px), the same heights as
              Button.
            </>
          }
          code={sizesSource}
        >
          <PaginationSizesDemo />
        </ExampleSection>

        <ExampleSection
          title="Controlled"
          description={
            <>
              Keep the current page in state, build the page list with ellipses, and disable{" "}
              <Code>PaginationPrevious</Code> / <Code>PaginationNext</Code> at the ends.
            </>
          }
          code={controlledSource}
        >
          <PaginationControlledDemo />
        </ExampleSection>

        <ExampleSection
          title="Icons only"
          description={
            <>
              Pass <Code>text=&#123;null&#125;</Code> for compact previous and next buttons, useful
              under data tables.
            </>
          }
          code={iconsSource}
        >
          <PaginationIconsDemo />
        </ExampleSection>
        <ExampleSection
          title="First and last"
          description="Add double-chevron links to jump straight to the first or last page."
          code={firstLastSource}
        >
          <PaginationFirstLastDemo />
        </ExampleSection>

        <ExampleSection
          title="Outline"
          description="Give every link a border and fill the current page with the foreground color."
          code={outlineSource}
        >
          <PaginationOutlineDemo />
        </ExampleSection>

        <ExampleSection
          title="Table footer"
          description="Show the visible range next to the pages, as in the footer of a data table."
          code={tableSource}
        >
          <PaginationTableDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Pagination</h3>
        <PropsTable data={paginationPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">PaginationContent</h3>
        <PropsTable data={contentPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">PaginationItem</h3>
        <PropsTable data={itemPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">PaginationLink</h3>
        <PropsTable data={linkPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">PaginationPrevious / PaginationNext</h3>
        <PropsTable data={previousNextPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">PaginationEllipsis</h3>
        <PropsTable data={ellipsisPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Typography</h3>
        <TokenTable data={paginationTypographyRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Colors</h3>
        <TokenTable data={paginationColorRows} />
      </section>
    </article>
  )
}
