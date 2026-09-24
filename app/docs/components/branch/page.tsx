import type { Metadata } from "next"
import Link from "next/link"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  BranchControlledDemo,
  BranchDemo,
  BranchForcedSelectorDemo,
  BranchManyDemo,
  BranchMessageDemo,
  BranchPageLabelDemo,
  BranchRtlDemo,
  BranchSelectorEndDemo,
  BranchSingleDemo,
} from "@/components/examples/branch-examples"

import {
  branchContentPropRows,
  branchPagePropRows,
  branchPreviousPropRows,
  branchPropRows,
  branchSelectorPropRows,
  useBranchRows,
} from "./branch-table-data"

const description =
  "Navigate alternate reply branches when regenerating or editing a turn."

export const metadata: Metadata = {
  title: "Branch",
  description,
}

const usageImport = `import {
  Branch,
  BranchContent,
  BranchNext,
  BranchPage,
  BranchPrevious,
  BranchSelector,
} from "@/components/cubix/branch"`

const usageSnippet = `<Branch defaultBranch={0}>
  <BranchContent>
    <Bubble>...</Bubble>
    <Bubble>...</Bubble>
  </BranchContent>
  <BranchSelector>
    <BranchPrevious />
    <BranchPage />
    <BranchNext />
  </BranchSelector>
</Branch>`

const compositionSnippet = `Branch
├── BranchContent
│   └── (each child = one branch)
└── BranchSelector
    ├── BranchPrevious
    ├── BranchPage
    └── BranchNext`

const demoSnippet = usageSnippet

const singleSnippet = `<Branch>
  <BranchContent>
    <Bubble>...</Bubble>
  </BranchContent>
  <BranchSelector>
    <BranchPrevious />
    <BranchPage />
    <BranchNext />
  </BranchSelector>
</Branch>`

const controlledSnippet = `<Branch branch={branch} onBranchChange={setBranch}>
  ...
</Branch>`

const manySnippet = `<Branch defaultBranch={2}>
  <BranchContent>{versions.map(...)}</BranchContent>
  <BranchSelector>...</BranchSelector>
</Branch>`

const endSnippet = `<div className="flex justify-end">
  <BranchSelector>...</BranchSelector>
</div>`

const messageSnippet = `<Message>
  <MessageContent>
    <Branch>...</Branch>
  </MessageContent>
</Message>`

const rtlSnippet = `<div dir="rtl" lang="fa">
  <Branch defaultBranch={0}>
    <BranchContent>
      <Bubble>...</Bubble>
      <Bubble>...</Bubble>
    </BranchContent>
    <BranchSelector aria-label="نسخه‌ها">
      <BranchPrevious aria-label="نسخه قبلی" />
      <BranchPage />
      <BranchNext aria-label="نسخه بعدی" />
    </BranchSelector>
  </Branch>
</div>`

export default function BranchDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Branch"
        description={description}
        slug="branch"
      />

      <p className="leading-relaxed text-muted-foreground">
        <code className="font-mono text-sm">Branch</code> cycles through
        alternate reply versions after regenerate or edit. The selector hides
        itself when only one branch exists.
      </p>

      <ComponentPreview code={demoSnippet} previewClassName="min-h-44">
        <BranchDemo />
      </ComponentPreview>

      <ComponentInstall name="branch" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Composition
        </h2>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Features</h2>
        <ul className="list-disc space-y-2 ps-5 text-muted-foreground">
          <li>Compact prev / page / next selector</li>
          <li>Circular navigation across reply versions</li>
          <li>Controlled and uncontrolled modes</li>
          <li>RTL-safe chevrons and numeric order</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Single branch
        </h2>
        <ComponentPreview code={singleSnippet} previewClassName="min-h-36">
          <BranchSingleDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Forced selector
        </h2>
        <ComponentPreview
          code={`<BranchSelector force>...</BranchSelector>`}
          previewClassName="min-h-40"
        >
          <BranchForcedSelectorDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Controlled</h2>
        <ComponentPreview code={controlledSnippet} previewClassName="min-h-48">
          <BranchControlledDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Many branches
        </h2>
        <ComponentPreview code={manySnippet} previewClassName="min-h-44">
          <BranchManyDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Custom page label
        </h2>
        <ComponentPreview
          code={`<BranchPage>v{n}/{total}</BranchPage>`}
          previewClassName="min-h-44"
        >
          <BranchPageLabelDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          End aligned
        </h2>
        <ComponentPreview code={endSnippet} previewClassName="min-h-44">
          <BranchSelectorEndDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          In a message
        </h2>
        <ComponentPreview code={messageSnippet} previewClassName="min-h-56">
          <BranchMessageDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">RTL</h2>
        <p className="leading-relaxed text-muted-foreground">
          To enable RTL support, see the{" "}
          <Link
            href="/docs/components/direction"
            className="font-medium text-foreground underline decoration-dotted decoration-1 underline-offset-[6px] [text-decoration-skip-ink:none] hover:text-foreground/80"
          >
            Direction
          </Link>{" "}
          guide. Chevrons flip with{" "}
          <code className="font-mono text-sm">dir=&quot;rtl&quot;</code> and
          IRANSans XV follows{" "}
          <code className="font-mono text-sm">lang=&quot;fa&quot;</code>.
        </p>
        <ComponentPreview code={rtlSnippet} previewClassName="min-h-44">
          <BranchRtlDemo />
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <h3 className="font-medium">Branch</h3>
        <PropsTable data={branchPropRows} />
        <h3 className="font-medium">BranchContent</h3>
        <PropsTable data={branchContentPropRows} />
        <h3 className="font-medium">BranchSelector</h3>
        <PropsTable data={branchSelectorPropRows} />
        <h3 className="font-medium">BranchPrevious / BranchNext</h3>
        <PropsTable data={branchPreviousPropRows} />
        <h3 className="font-medium">BranchPage</h3>
        <PropsTable data={branchPagePropRows} />
        <h3 className="font-medium">useBranch</h3>
        <PropsTable data={useBranchRows} />
      </section>
    </article>
  )
}
