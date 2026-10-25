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
import {
  emptyColorRows,
  emptyMediaPropRows,
  emptyPropRows,
  emptySubcomponentRows,
  emptyTypographyRows,
} from "./empty-table-data"
import { EmptyAvatarDemo } from "./examples/empty-avatar-demo"
import { EmptyAvatarGroupDemo } from "./examples/empty-avatar-group-demo"
import { EmptyBackgroundDemo } from "./examples/empty-background-demo"
import { EmptyDemo } from "./examples/empty-demo"
import { EmptyInputGroupDemo } from "./examples/empty-input-group-demo"
import { EmptyOutlineDemo } from "./examples/empty-outline-demo"

const description = "Use the Empty component to display an empty state."

export const metadata: Metadata = {
  title: "Empty",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/empty"
const EXAMPLES_DIR = "app/docs/components/empty/examples"

function loadEmptyExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `Empty
├── EmptyHeader
│   ├── EmptyMedia
│   ├── EmptyTitle
│   └── EmptyDescription
└── EmptyContent`

/*
  Persian content needs dir="rtl" and lang="fa" so the IRANSans Cubix faces apply.
  Docs chrome only - not part of the paste-ready example source.
*/
function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex w-full items-center justify-center">
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

export default function EmptyDocsPage() {
  const demoSource = loadEmptyExample("empty-demo.tsx")
  const outlineSource = loadEmptyExample("empty-outline-demo.tsx")
  const backgroundSource = loadEmptyExample("empty-background-demo.tsx")
  const avatarSource = loadEmptyExample("empty-avatar-demo.tsx")
  const avatarGroupSource = loadEmptyExample("empty-avatar-group-demo.tsx")
  const inputGroupSource = loadEmptyExample("empty-input-group-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Empty" description={description} slug="empty" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <EmptyDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="empty" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the following composition to build an <Code>Empty</Code> state:
        </p>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Outline"
          description={
            <>
              Use the <Code>border</Code> utility class to create an outline empty state.
            </>
          }
          code={outlineSource}
        >
          <EmptyOutlineDemo />
        </ExampleSection>

        <ExampleSection
          title="Background"
          description={
            <>
              Use the <Code>bg-*</Code> and <Code>bg-gradient-*</Code> utilities to add a
              background to the empty state.
            </>
          }
          code={backgroundSource}
        >
          <EmptyBackgroundDemo />
        </ExampleSection>

        <ExampleSection
          title="Avatar"
          description={
            <>
              Use the <Code>EmptyMedia</Code> component to display an avatar in the empty state.
            </>
          }
          code={avatarSource}
        >
          <EmptyAvatarDemo />
        </ExampleSection>

        <ExampleSection
          title="Avatar Group"
          description={
            <>
              Use the <Code>EmptyMedia</Code> component to display an avatar group in the empty
              state.
            </>
          }
          code={avatarGroupSource}
        >
          <EmptyAvatarGroupDemo />
        </ExampleSection>

        <ExampleSection
          title="With field"
          description={
            <>
              Place a Cubix <Code>EmailField</Code> and <Code>Button</Code> inside <Code>EmptyContent</Code>{" "}
              to collect input from the empty state.
            </>
          }
          code={inputGroupSource}
        >
          <EmptyInputGroupDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Empty</h3>
          <p className="leading-relaxed text-muted-foreground">
            The main component of the empty state. Wraps the <Code>EmptyHeader</Code> and{" "}
            <Code>EmptyContent</Code> components.
          </p>
          <PropsTable data={emptyPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">EmptyHeader</h3>
          <p className="leading-relaxed text-muted-foreground">
            Wraps the empty media, title, and description.
          </p>
          <PropsTable data={emptySubcomponentRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">EmptyMedia</h3>
          <p className="leading-relaxed text-muted-foreground">
            Display media such as an icon, image, or avatar.
          </p>
          <PropsTable data={emptyMediaPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">EmptyTitle</h3>
          <PropsTable data={emptySubcomponentRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">EmptyDescription</h3>
          <PropsTable data={emptySubcomponentRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">EmptyContent</h3>
          <p className="leading-relaxed text-muted-foreground">
            Display actions such as a button, input, or link.
          </p>
          <PropsTable data={emptySubcomponentRows} />
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Typography</h3>
        <TokenTable data={emptyTypographyRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">Colors</h3>
        <TokenTable data={emptyColorRows} />
      </section>
    </article>
  )
}
