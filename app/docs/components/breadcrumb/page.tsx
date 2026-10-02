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
  breadcrumbPropRows,
  ellipsisPropRows,
  itemPropRows,
  linkPropRows,
  listPropRows,
  pagePropRows,
  separatorPropRows,
} from "./breadcrumb-table-data"
import { BreadcrumbCollapsedDemo } from "./examples/breadcrumb-collapsed-demo"
import { BreadcrumbDemo } from "./examples/breadcrumb-demo"
import { BreadcrumbDropdownDemo } from "./examples/breadcrumb-dropdown-demo"
import { BreadcrumbIconDemo } from "./examples/breadcrumb-icon-demo"
import { BreadcrumbLinkDemo } from "./examples/breadcrumb-link-demo"
import { BreadcrumbSeparatorDemo } from "./examples/breadcrumb-separator-demo"

const description = "Displays the path to the current resource using a hierarchy of links."

export const metadata: Metadata = {
  title: "Breadcrumb",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/breadcrumb"
const EXAMPLES_DIR = "app/docs/components/breadcrumb/examples"

function loadBreadcrumbExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `Breadcrumb
└── BreadcrumbList
    ├── BreadcrumbItem
    │   └── BreadcrumbLink
    ├── BreadcrumbSeparator
    ├── BreadcrumbItem
    │   └── BreadcrumbLink
    ├── BreadcrumbSeparator
    └── BreadcrumbItem
        └── BreadcrumbPage`

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

export default function BreadcrumbPage() {
  const demoSource = loadBreadcrumbExample("breadcrumb-demo.tsx")
  const iconSource = loadBreadcrumbExample("breadcrumb-icon-demo.tsx")
  const separatorSource = loadBreadcrumbExample("breadcrumb-separator-demo.tsx")
  const collapsedSource = loadBreadcrumbExample("breadcrumb-collapsed-demo.tsx")
  const dropdownSource = loadBreadcrumbExample("breadcrumb-dropdown-demo.tsx")
  const linkSource = loadBreadcrumbExample("breadcrumb-link-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Breadcrumb" description={description} slug="breadcrumb" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <BreadcrumbDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="breadcrumb" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Keep the last item as <Code>BreadcrumbPage</Code> so the current page is announced
          correctly. The default chevron flips in RTL.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          The root is a navigation landmark named <Code>مسیر</Code> by default. Override{" "}
          <Code>aria-label</Code> when the trail needs a more specific name. Separators are hidden
          from assistive technology, and the current page uses{" "}
          <Code>aria-current=&quot;page&quot;</Code>.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="With icon"
          description={
            <>
              Place an icon inside <Code>BreadcrumbLink</Code> before the text. It is sized to 20px
              and spaced from the label automatically.
            </>
          }
          code={iconSource}
        >
          <BreadcrumbIconDemo />
        </ExampleSection>

        <ExampleSection
          title="Separator"
          description={
            <>
              Pass a custom child to <Code>BreadcrumbSeparator</Code> to replace the default
              chevron.
            </>
          }
          code={separatorSource}
        >
          <BreadcrumbSeparatorDemo />
        </ExampleSection>

        <ExampleSection
          title="Collapsed"
          description={
            <>
              Use <Code>BreadcrumbEllipsis</Code> to show a collapsed middle when the path is too
              long.
            </>
          }
          code={collapsedSource}
        >
          <BreadcrumbCollapsedDemo />
        </ExampleSection>

        <ExampleSection
          title="Dropdown"
          description={
            <>
              Compose <Code>BreadcrumbEllipsis</Code> with a <Code>DropdownMenu</Code> when the
              hidden segments should still be reachable.
            </>
          }
          code={dropdownSource}
        >
          <BreadcrumbDropdownDemo />
        </ExampleSection>

        <ExampleSection
          title="Link component"
          description={
            <>
              Pass <Code>render=&#123;&lt;Link /&gt;&#125;</Code> to use your routing library&apos;s
              link. The docs adapter maps this to <Code>asChild</Code> on Radix.
            </>
          }
          code={linkSource}
        >
          <BreadcrumbLinkDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Parts render <Code>data-slot</Code>{" "}
            attributes (<Code>breadcrumb</Code>, <Code>breadcrumb-list</Code>,{" "}
            <Code>breadcrumb-item</Code>, <Code>breadcrumb-link</Code>, <Code>breadcrumb-page</Code>
            , <Code>breadcrumb-separator</Code>, <Code>breadcrumb-ellipsis</Code>) for targeting in
            tests and parent selectors. Keep the last item as <Code>BreadcrumbPage</Code>. Use the
            same props on Base UI, React Aria, and Radix.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Breadcrumb</h3>
        <PropsTable data={breadcrumbPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">BreadcrumbList</h3>
        <PropsTable data={listPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">BreadcrumbItem</h3>
        <PropsTable data={itemPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">BreadcrumbLink</h3>
        <PropsTable data={linkPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">BreadcrumbPage</h3>
        <PropsTable data={pagePropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">BreadcrumbSeparator</h3>
        <PropsTable data={separatorPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">BreadcrumbEllipsis</h3>
        <PropsTable data={ellipsisPropRows} />
      </section>
    </article>
  )
}
