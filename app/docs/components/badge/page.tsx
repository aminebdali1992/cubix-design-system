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
import { badgePropRows } from "./badge-table-data"
import { BadgeCustomDemo } from "./examples/badge-custom-demo"
import { BadgeDemo } from "./examples/badge-demo"
import { BadgeDotDemo } from "./examples/badge-dot-demo"
import { BadgeIconDemo } from "./examples/badge-icon-demo"
import { BadgeLinkDemo } from "./examples/badge-link-demo"
import { BadgeSizesDemo } from "./examples/badge-sizes-demo"
import { BadgeSpinnerDemo } from "./examples/badge-spinner-demo"
import { BadgeVariantsDemo } from "./examples/badge-variants-demo"

const description = "Displays a badge or a component that looks like a badge."

export const metadata: Metadata = {
  title: "Badge",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/badge"
const EXAMPLES_DIR = "app/docs/components/badge/examples"

function loadBadgeExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

/*
  Persian labels need lang="fa" so the IRANSans Cubix faces apply.
  Docs chrome only - not part of the paste-ready example source.
*/
function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex items-center justify-center">
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

export default function BadgePage() {
  const badgeDemoSource = loadBadgeExample("badge-demo.tsx")
  const badgeVariantsSource = loadBadgeExample("badge-variants-demo.tsx")
  const badgeSizesSource = loadBadgeExample("badge-sizes-demo.tsx")
  const badgeDotSource = loadBadgeExample("badge-dot-demo.tsx")
  const badgeIconSource = loadBadgeExample("badge-icon-demo.tsx")
  const badgeSpinnerSource = loadBadgeExample("badge-spinner-demo.tsx")
  const badgeLinkSource = loadBadgeExample("badge-link-demo.tsx")
  const badgeCustomSource = loadBadgeExample("badge-custom-demo.tsx")
  const usageImport = extractDemoImports(badgeDemoSource)
  const usageSnippet = extractDemoJsx(badgeDemoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Badge" description={description} slug="badge" />

      <ComponentPreview code={badgeDemoSource}>
        <PreviewShell>
          <BadgeDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="badge" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Variants"
          description={
            <>
              Use the <Code>variant</Code> prop to change the look of the badge.
            </>
          }
          code={badgeVariantsSource}
        >
          <BadgeVariantsDemo />
        </ExampleSection>

        <ExampleSection
          title="Sizes"
          description={
            <>
              Use the <Code>size</Code> prop to pick <Code>default</Code> (20px) or <Code>lg</Code>{" "}
              (24px).
            </>
          }
          code={badgeSizesSource}
        >
          <BadgeSizesDemo />
        </ExampleSection>

        <ExampleSection
          title="Dot"
          description={
            <>
              Use <Code>variant=&quot;dot&quot;</Code> for a small round status indicator with no
              visible label. It is 8px by default and 12px with <Code>size=&quot;lg&quot;</Code>.
              Give it <Code>role=&quot;img&quot;</Code> and an <Code>aria-label</Code> so screen
              readers announce the status, and change its color with a token class such as{" "}
              <Code>bg-destructive</Code>.
            </>
          }
          code={badgeDotSource}
        >
          <BadgeDotDemo />
        </ExampleSection>

        <ExampleSection
          title="With icon"
          description={
            <>
              Render an icon inside the badge. Use <Code>data-icon=&quot;inline-start&quot;</Code>{" "}
              and <Code>data-icon=&quot;inline-end&quot;</Code> so padding follows the reading
              direction. In RTL, inline-end is the left side, so use a left-pointing arrow.
            </>
          }
          code={badgeIconSource}
        >
          <BadgeIconDemo />
        </ExampleSection>

        <ExampleSection
          title="With spinner"
          description={
            <>
              Put a Cubix <Code>Spinner</Code> inside the badge. Add <Code>data-icon</Code> so
              padding matches the icon examples.
            </>
          }
          code={badgeSpinnerSource}
        >
          <BadgeSpinnerDemo />
        </ExampleSection>

        <ExampleSection
          title="Link"
          description={
            <>
              Use the <Code>render</Code> prop to render the badge as a link. It works the same on
              Base UI, React Aria, and Radix.
            </>
          }
          code={badgeLinkSource}
        >
          <BadgeLinkDemo />
        </ExampleSection>

        <ExampleSection
          title="Custom styling"
          description={
            <>
              Badge accepts a <Code>className</Code> merged with the shipped <Code>cn</Code> helper,
              so override colors with classes such as <Code>bg-green-50 dark:bg-green-950</Code>.
            </>
          }
          code={badgeCustomSource}
        >
          <BadgeCustomDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Put icons and spinners inside the
            badge and mark them with <Code>data-icon</Code> so spacing stays correct in both
            directions.
          </p>
        </div>
        <h3 className="scroll-m-20 font-semibold tracking-tight">Badge</h3>
        <p className="leading-relaxed text-muted-foreground">
          Displays a badge or a component that looks like a badge.
        </p>
        <PropsTable data={badgePropRows} />
      </section>
    </article>
  )
}
