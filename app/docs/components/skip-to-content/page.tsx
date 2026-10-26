import type { Metadata } from "next"
import type { ReactNode } from "react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import { TokenTable } from "@/components/docs/token-table"
import { extractDemoImports, readDocsExampleSource } from "@/lib/docs/example-source"
import { SkipToContentDemo } from "./examples/skip-to-content-demo"
import { SkipToContentKeyboardDemo } from "./examples/skip-to-content-keyboard-demo"
import { SkipToContentSidebarDemo } from "./examples/skip-to-content-sidebar-demo"
import { SkipToContentStickyHeaderDemo } from "./examples/skip-to-content-sticky-header-demo"
import { skipToContentColorRows, skipToContentRows, skipToContentTypographyRows } from "./skip-to-content-table-data"

const description = "Keyboard-accessible skip link that jumps past chrome to the main landmark."

export const metadata: Metadata = {
  title: "Skip to Content",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/skip-to-content"
const EXAMPLES_DIR = "app/docs/components/skip-to-content/examples"

function loadExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, { publicImport: PUBLIC_IMPORT })
}

const usageSnippet = `"use client"

import type { ReactNode } from "react"

import { SkipToContent } from "@/components/cubix/skip-to-content"

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SkipToContent href="#main" />
      <main id="main" tabIndex={-1} className="scroll-mt-(--header-height) outline-hidden">
        {children}
      </main>
    </>
  )
}`

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

export default function SkipToContentPage() {
  const demoSource = loadExample("skip-to-content-demo.tsx")
  const usageImport = extractDemoImports(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Skip to Content" description={description} slug="skip-to-content" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <SkipToContentDemo />
        </PreviewShell>
      </ComponentPreview>

      <p className="leading-relaxed text-muted-foreground">
        Keyboard-accessible skip link composed from Button for apps with persistent header and sidebar
        chrome. Hidden until focused via Tab, then slides into view so users can jump past navigation to the
        main landmark. The preview above shows the focused appearance. In product apps, the link stays
        off-screen until keyboard focus.
      </p>

      <ComponentInstall name="skip-to-content" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
        <p className="leading-relaxed text-muted-foreground">
          Place the skip link at the root of the app chrome so Tab reaches it before navigation. The target
          landmark must be content only. Do not wrap a sidebar inside the same <Code>main</Code>, otherwise a
          Tab after skip will land in the sidebar navigation.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>
        <ExampleSection
          title="Hidden until Tab"
          description="The production behavior. Focus the preview and press Tab: the link slides in from the top, and Enter moves focus to the main landmark."
          code={loadExample("skip-to-content-keyboard-demo.tsx")}
        >
          <SkipToContentKeyboardDemo />
        </ExampleSection>

        <ExampleSection
          title="Custom label with sidebar"
          description={
            <>
              Pass <Code>children</Code> to change the label. The sidebar sits outside the landmark, so the
              next Tab lands on the first interactive child of the content.
            </>
          }
          code={loadExample("skip-to-content-sidebar-demo.tsx")}
        >
          <SkipToContentSidebarDemo />
        </ExampleSection>

        <ExampleSection
          title="Sticky header"
          description={
            <>
              Add <Code>scroll-mt</Code> to the landmark so its top is not hidden under a sticky header after
              the jump.
            </>
          }
          code={loadExample("skip-to-content-sticky-header-demo.tsx")}
        >
          <SkipToContentStickyHeaderDemo />
        </ExampleSection>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Target landmark</h2>
        <p className="leading-relaxed text-muted-foreground">Callers own the landmark the skip link points at:</p>
        <ul className="list-disc space-y-1 ps-6 leading-relaxed text-muted-foreground">
          <li>
            Matching <Code>id</Code>
          </li>
          <li>
            <Code>tabIndex={"{-1}"}</Code> so Enter moves focus onto the landmark
          </li>
          <li>
            <Code>scroll-mt</Code> when a sticky header is present
          </li>
          <li>
            <Code>outline-hidden</Code> so the landmark has no visible focus ring. The subsequent Tab will land
            on the first interactive child
          </li>
        </ul>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <h3 className="scroll-m-20 font-semibold tracking-tight">Component Props</h3>
        <PropsTable data={skipToContentRows} />
      </section>

      <section className="space-y-4">
        <h3 className="scroll-m-20 font-semibold tracking-tight">Typography</h3>
        <TokenTable data={skipToContentTypographyRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Colors</h3>
        <TokenTable data={skipToContentColorRows} />
      </section>
    </article>
  )
}
