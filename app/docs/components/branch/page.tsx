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
  branchColorRows,
  branchContentPropRows,
  branchPagePropRows,
  branchPreviousPropRows,
  branchPropRows,
  branchSelectorPropRows,
  branchTypographyRows,
  useBranchRows,
} from "./branch-table-data"
import { BranchControlledDemo } from "./examples/branch-controlled-demo"
import { BranchDemo } from "./examples/branch-demo"
import { BranchEndDemo } from "./examples/branch-end-demo"
import { BranchForcedDemo } from "./examples/branch-forced-demo"
import { BranchManyDemo } from "./examples/branch-many-demo"
import { BranchMessageDemo } from "./examples/branch-message-demo"
import { BranchPageLabelDemo } from "./examples/branch-page-label-demo"
import { BranchSingleDemo } from "./examples/branch-single-demo"

const description =
  "Navigate alternate reply branches when regenerating or editing a turn."

export const metadata: Metadata = {
  title: "Branch",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/branch"
const EXAMPLES_DIR = "app/docs/components/branch/examples"

function loadBranchExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `Branch
├── BranchContent
│   └── (each child = one branch)
└── BranchSelector
    ├── BranchPrevious
    ├── BranchPage
    └── BranchNext`

/*
  Persian text needs lang="fa" so the IRANSans Cubix faces apply. Docs
  chrome only - not part of the paste-ready example source.
*/
function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex w-full items-center justify-center">
      {children}
    </div>
  )
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-sm">{children}</code>
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
      <ComponentPreview code={code} previewClassName="min-h-44">
        <PreviewShell>{children}</PreviewShell>
      </ComponentPreview>
    </div>
  )
}

export default function BranchDocsPage() {
  const demoSource = loadBranchExample("branch-demo.tsx")
  const singleSource = loadBranchExample("branch-single-demo.tsx")
  const forcedSource = loadBranchExample("branch-forced-demo.tsx")
  const controlledSource = loadBranchExample("branch-controlled-demo.tsx")
  const manySource = loadBranchExample("branch-many-demo.tsx")
  const pageLabelSource = loadBranchExample("branch-page-label-demo.tsx")
  const endSource = loadBranchExample("branch-end-demo.tsx")
  const messageSource = loadBranchExample("branch-message-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Branch" description={description} slug="branch" />

      <ComponentPreview code={demoSource} previewClassName="min-h-44">
        <PreviewShell>
          <BranchDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="branch" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Each child of <Code>BranchContent</Code> is one reply version. The selector hides itself
          when only one branch exists.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          The selector is a group named <Code>نسخه‌های پاسخ</Code>, the buttons are named{" "}
          <Code>نسخه قبلی</Code> and <Code>نسخه بعدی</Code>, and the page label is a live status
          so screen readers announce the change. Override any <Code>aria-label</Code> when needed.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Single branch"
          description="With only one child, the selector is not rendered."
          code={singleSource}
        >
          <BranchSingleDemo />
        </ExampleSection>

        <ExampleSection
          title="Forced selector"
          description={
            <>
              Pass <Code>force</Code> to <Code>BranchSelector</Code> to show it even with one
              branch.
            </>
          }
          code={forcedSource}
        >
          <BranchForcedDemo />
        </ExampleSection>

        <ExampleSection
          title="Controlled"
          description={
            <>
              Use <Code>branch</Code> and <Code>onBranchChange</Code> to drive the active version
              from your own state.
            </>
          }
          code={controlledSource}
        >
          <BranchControlledDemo />
        </ExampleSection>

        <ExampleSection
          title="Many branches"
          description={
            <>
              Navigation wraps around at both ends. <Code>defaultBranch</Code> sets the first
              visible version.
            </>
          }
          code={manySource}
        >
          <BranchManyDemo />
        </ExampleSection>

        <ExampleSection
          title="Custom page label"
          description={
            <>
              Read <Code>useBranch()</Code> and pass your own children to <Code>BranchPage</Code>.
            </>
          }
          code={pageLabelSource}
        >
          <BranchPageLabelDemo />
        </ExampleSection>

        <ExampleSection
          title="End aligned"
          description="Wrap the selector in a flex container to align it to the end."
          code={endSource}
        >
          <BranchEndDemo />
        </ExampleSection>

        <ExampleSection
          title="In a message"
          description={
            <>
              Place <Code>Branch</Code> inside <Code>MessageContent</Code> for assistant replies.
            </>
          }
          code={messageSource}
        >
          <BranchMessageDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Parts render <Code>data-slot</Code>{" "}
            attributes (<Code>branch</Code>, <Code>branch-content</Code>, <Code>branch-item</Code>,{" "}
            <Code>branch-selector</Code>, <Code>branch-previous</Code>, <Code>branch-page</Code>,{" "}
            <Code>branch-next</Code>). Use the same props on Base UI, React Aria, and Radix.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Branch</h3>
        <PropsTable data={branchPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">BranchContent</h3>
        <PropsTable data={branchContentPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">BranchSelector</h3>
        <PropsTable data={branchSelectorPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">BranchPrevious / BranchNext</h3>
        <PropsTable data={branchPreviousPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">BranchPage</h3>
        <PropsTable data={branchPagePropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">useBranch</h3>
        <PropsTable data={useBranchRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Typography</h3>
        <TokenTable data={branchTypographyRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Colors</h3>
        <TokenTable data={branchColorRows} />
      </section>
    </article>
  )
}
