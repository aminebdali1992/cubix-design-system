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
  avatarPropRows,
  badgePropRows,
  fallbackPropRows,
  groupCountPropRows,
  groupPropRows,
  imagePropRows,
} from "./avatar-table-data"
import { AvatarBadgeDemo } from "./examples/avatar-badge-demo"
import { AvatarBadgeIconDemo } from "./examples/avatar-badge-icon-demo"
import { AvatarDemo } from "./examples/avatar-demo"
import { AvatarFallbackDemo } from "./examples/avatar-fallback-demo"
import { AvatarGroupCountDemo } from "./examples/avatar-group-count-demo"
import { AvatarGroupDemo } from "./examples/avatar-group-demo"
import { AvatarGroupIconDemo } from "./examples/avatar-group-icon-demo"
import { AvatarRingDemo } from "./examples/avatar-ring-demo"
import { AvatarSizesDemo } from "./examples/avatar-sizes-demo"

const description = "An image element with a fallback for representing the user."

export const metadata: Metadata = {
  title: "Avatar",
  description,
}

const PUBLIC_IMPORT = "@/components/cubix/avatar"
const EXAMPLES_DIR = "app/docs/components/avatar/examples"

function loadAvatarExample(fileName: string) {
  return readDocsExampleSource(`${EXAMPLES_DIR}/${fileName}`, {
    publicImport: PUBLIC_IMPORT,
  })
}

const compositionSnippet = `Avatar
├── AvatarImage
├── AvatarFallback
└── AvatarBadge

AvatarGroup
├── Avatar
├── Avatar
└── AvatarGroupCount`

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

export default function AvatarPage() {
  const demoSource = loadAvatarExample("avatar-demo.tsx")
  const sizesSource = loadAvatarExample("avatar-sizes-demo.tsx")
  const fallbackSource = loadAvatarExample("avatar-fallback-demo.tsx")
  const badgeSource = loadAvatarExample("avatar-badge-demo.tsx")
  const badgeIconSource = loadAvatarExample("avatar-badge-icon-demo.tsx")
  const groupSource = loadAvatarExample("avatar-group-demo.tsx")
  const groupCountSource = loadAvatarExample("avatar-group-count-demo.tsx")
  const groupIconSource = loadAvatarExample("avatar-group-icon-demo.tsx")
  const ringSource = loadAvatarExample("avatar-ring-demo.tsx")
  const usageImport = extractDemoImports(demoSource)
  const usageSnippet = extractDemoJsx(demoSource)

  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Avatar" description={description} slug="avatar" />

      <ComponentPreview code={demoSource}>
        <PreviewShell>
          <AvatarDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="avatar" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Composition</h2>
        <p className="leading-relaxed text-muted-foreground">
          Always keep <Code>AvatarFallback</Code> next to <Code>AvatarImage</Code> so initials stay
          visible when the photo is missing. <Code>AvatarBadge</Code> and <Code>AvatarGroup</Code>{" "}
          are optional.
        </p>
        <CodeBlock code={compositionSnippet} title="Structure" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Accessibility</h2>
        <p className="leading-relaxed text-muted-foreground">
          Give <Code>AvatarImage</Code> an <Code>alt</Code> that names the person. Label status
          badges with <Code>aria-label</Code>, compose action badges onto a <Code>button</Code> with{" "}
          <Code>render</Code>, and name each <Code>AvatarGroup</Code> with <Code>aria-label</Code>.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Sizes"
          description={
            <>
              Use <Code>size</Code> on the root: <Code>sm</Code> (24px), default (32px),{" "}
              <Code>lg</Code> (40px), <Code>xl</Code> (48px) and <Code>2xl</Code> (64px).
            </>
          }
          code={sizesSource}
        >
          <AvatarSizesDemo />
        </ExampleSection>

        <ExampleSection
          title="Fallback"
          description="When the image fails to load, the fallback initials stay visible."
          code={fallbackSource}
        >
          <AvatarFallbackDemo />
        </ExampleSection>

        <ExampleSection
          title="Badge"
          description={
            <>
              Use <Code>AvatarBadge</Code> for a status dot. Override the color with a Cubix token
              such as <Code>bg-chart-2</Code>, and give the badge an <Code>aria-label</Code>.
            </>
          }
          code={badgeSource}
        >
          <AvatarBadgeDemo />
        </ExampleSection>

        <ExampleSection
          title="Badge with icon"
          description={
            <>
              For real actions, compose <Code>AvatarBadge</Code> onto a <Code>button</Code> with{" "}
              <Code>render</Code> and give it an <Code>aria-label</Code>.
            </>
          }
          code={badgeIconSource}
        >
          <AvatarBadgeIconDemo />
        </ExampleSection>

        <ExampleSection
          title="Avatar group"
          description={
            <>
              Stack avatars with <Code>AvatarGroup</Code>. Label the group so the set of people is
              announced.
            </>
          }
          code={groupSource}
        >
          <AvatarGroupDemo />
        </ExampleSection>

        <ExampleSection
          title="Group count"
          description={
            <>
              Use <Code>AvatarGroupCount</Code> to show remaining people.
            </>
          }
          code={groupCountSource}
        >
          <AvatarGroupCountDemo />
        </ExampleSection>

        <ExampleSection
          title="Group with icon"
          description={
            <>
              Pass an icon as the <Code>AvatarGroupCount</Code> child for an invite or overflow
              action.
            </>
          }
          code={groupIconSource}
        >
          <AvatarGroupIconDemo />
        </ExampleSection>

        <ExampleSection
          title="Ring"
          description={
            <>
              Add <Code>ring</Code> to draw a border-token ring around the avatar with a 2px gap.
            </>
          }
          code={ringSource}
        >
          <AvatarRingDemo />
        </ExampleSection>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">API Reference</h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Parts render <Code>data-slot</Code>{" "}
            attributes (<Code>avatar</Code>, <Code>avatar-image</Code>, <Code>avatar-fallback</Code>
            , <Code>avatar-badge</Code>, <Code>avatar-group</Code>, <Code>avatar-group-count</Code>)
            for targeting in tests and parent selectors. Always provide <Code>AvatarFallback</Code>.
            Use the same props on Base UI, React Aria, and Radix.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Avatar</h3>
        <PropsTable data={avatarPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">AvatarImage</h3>
        <PropsTable data={imagePropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">AvatarFallback</h3>
        <PropsTable data={fallbackPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">AvatarBadge</h3>
        <PropsTable data={badgePropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">AvatarGroup</h3>
        <PropsTable data={groupPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">AvatarGroupCount</h3>
        <PropsTable data={groupCountPropRows} />
      </section>
    </article>
  )
}
