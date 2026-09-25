import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

import { Button } from "./docs-button"
import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import { ButtonDemoIcon } from "@/components/examples/button-demo-icon"
import {
  ButtonAsChildDemo,
  ButtonCustomDemo,
  ButtonIconDemo,
  ButtonLoadingDemo,
  ButtonSpinnerDemo,
  ButtonWithIconDemo,
} from "@/components/examples/button-examples"
import { propRows, sizeRows, variantRows } from "./button-table-data"

export const metadata: Metadata = {
  title: "Button",
  description: "Displays a button or a component that looks like a button.",
}

const usageImport = `import { Button } from "@/components/cubix/button"`

const usageSnippet = `<Button variant="outline">متن دکمه</Button>`

function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div
      dir="rtl"
      lang="fa"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      {children}
    </div>
  )
}

export default function ButtonPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Button"
        description="Displays a button or a component that looks like a button."
        slug="button"
      />

      <ComponentPreview
        code={`<Button>
  <Icon data-icon="inline-start" />
  متن دکمه
  <Icon data-icon="inline-end" />
</Button>`}
      >
        <PreviewShell>
          <Button>
            <ButtonDemoIcon data-icon="inline-start" />
            متن دکمه
            <ButtonDemoIcon data-icon="inline-end" />
          </Button>
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="button" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Primary
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Solid and soft brand styles for the main call to action.
          </p>
          <ComponentPreview
            code={`<Button>متن دکمه</Button>
<Button variant="secondary">متن دکمه</Button>`}
          >
            <PreviewShell>
              <Button>متن دکمه</Button>
              <Button variant="secondary">متن دکمه</Button>
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Destructive
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Solid and soft danger styles, parallel to primary and secondary.
          </p>
          <ComponentPreview
            code={`<Button variant="destructive">متن دکمه</Button>
<Button variant="destructive-secondary">متن دکمه</Button>`}
          >
            <PreviewShell>
              <Button variant="destructive">متن دکمه</Button>
              <Button variant="destructive-secondary">متن دکمه</Button>
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Variants
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Lower-emphasis styles for neutral, bordered, quiet, and link-like
            actions.
          </p>
          <ComponentPreview
            code={`<Button variant="gray">متن دکمه</Button>
<Button variant="outline">متن دکمه</Button>
<Button variant="ghost">متن دکمه</Button>
<Button variant="link">متن دکمه</Button>`}
          >
            <PreviewShell>
              <Button variant="gray">متن دکمه</Button>
              <Button variant="outline">متن دکمه</Button>
              <Button variant="ghost">متن دکمه</Button>
              <Button variant="link">متن دکمه</Button>
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Sizes</h3>
          <p className="leading-relaxed text-muted-foreground">
            Text sizes from compact chrome to large actions.
          </p>
          <ComponentPreview
            code={`<Button size="xs">متن دکمه</Button>
<Button size="sm">متن دکمه</Button>
<Button size="default">متن دکمه</Button>
<Button size="lg">متن دکمه</Button>`}
          >
            <PreviewShell>
              <Button size="xs">متن دکمه</Button>
              <Button size="sm">متن دکمه</Button>
              <Button size="default">متن دکمه</Button>
              <Button size="lg">متن دکمه</Button>
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Icon sizes
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Square icon-only sizes. Icon-only buttons need an{" "}
            <code className="font-mono text-sm">aria-label</code>.
          </p>
          <ComponentPreview
            code={`<Button variant="outline" size="icon-xs" aria-label="آیکون خیلی کوچک">
  <Icon />
</Button>
<Button variant="outline" size="icon-sm" aria-label="آیکون کوچک">
  <Icon />
</Button>
<Button variant="outline" size="icon" aria-label="دکمه آیکون">
  <Icon />
</Button>
<Button variant="outline" size="icon-lg" aria-label="آیکون بزرگ">
  <Icon />
</Button>`}
          >
            <PreviewShell>
              <Button
                variant="outline"
                size="icon-xs"
                aria-label="آیکون خیلی کوچک"
              >
                <ButtonDemoIcon />
              </Button>
              <Button variant="outline" size="icon-sm" aria-label="آیکون کوچک">
                <ButtonDemoIcon />
              </Button>
              <Button variant="outline" size="icon" aria-label="دکمه آیکون">
                <ButtonDemoIcon />
              </Button>
              <Button variant="outline" size="icon-lg" aria-label="آیکون بزرگ">
                <ButtonDemoIcon />
              </Button>
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            With icon
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Render an icon inside the button. Use{" "}
            <code className="font-mono text-sm">
              data-icon=&quot;inline-start&quot;
            </code>{" "}
            and{" "}
            <code className="font-mono text-sm">
              data-icon=&quot;inline-end&quot;
            </code>{" "}
            so padding follows reading direction in LTR and RTL.
          </p>
          <ComponentPreview
            code={`<Button>
  <Icon data-icon="inline-start" />
  متن دکمه
</Button>`}
          >
            <PreviewShell>
              <ButtonWithIconDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Icon only
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Use a square size and always provide an{" "}
            <code className="font-mono text-sm">aria-label</code> when there is
            no visible text.
          </p>
          <ComponentPreview
            code={`<Button variant="outline" size="icon" aria-label="آیکون">
  <Icon />
</Button>`}
          >
            <PreviewShell>
              <ButtonIconDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Loading
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Disable the control and show a spinner while an async action runs.
            Click the first button to try it.
          </p>
          <ComponentPreview
            code={`<Button disabled>
  <LoaderIcon data-icon="inline-start" className="size-4 animate-spin" />
  متن دکمه
</Button>`}
          >
            <PreviewShell>
              <ButtonLoadingDemo />
            </PreviewShell>
          </ComponentPreview>
          <p className="leading-relaxed text-muted-foreground">
            Or compose the spinner yourself for full control:
          </p>
          <ComponentPreview
            code={`<Button disabled>
  <LoaderIcon data-icon="inline-start" className="size-4 animate-spin" />
  متن دکمه
</Button>`}
          >
            <PreviewShell>
              <ButtonSpinnerDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">As link</h3>
          <p className="leading-relaxed text-muted-foreground">
            Use <code className="font-mono text-sm">render</code> (Base UI /
            React Aria) or <code className="font-mono text-sm">asChild</code>{" "}
            (Radix) to render a Next.js{" "}
            <code className="font-mono text-sm">&lt;Link /&gt;</code> with
            button styles. On Base UI pass{" "}
            <code className="font-mono text-sm">{`nativeButton={false}`}</code>.
          </p>
          <ComponentPreview
            code={`<Button nativeButton={false} render={<Link href="/docs" />}>
  متن دکمه
  <ChevronLeftIcon data-icon="inline-end" />
</Button>`}
          >
            <PreviewShell>
              <ButtonAsChildDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Disabled
          </h3>
          <ComponentPreview code={`<Button disabled>متن دکمه</Button>`}>
            <PreviewShell>
              <Button disabled>متن دکمه</Button>
              <Button variant="outline" disabled>
                متن دکمه
              </Button>
            </PreviewShell>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Custom styling
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Every prop accepts a{" "}
            <code className="font-mono text-sm">className</code> merged with
            the shipped <code className="font-mono text-sm">cn</code> helper:
          </p>
          <ComponentPreview
            code={`<Button variant="outline" className="px-6 text-base">
  متن دکمه
</Button>`}
          >
            <PreviewShell>
              <ButtonCustomDemo />
            </PreviewShell>
          </ComponentPreview>
        </div>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Mark icons and
            spinners with{" "}
            <code className="font-mono">data-icon</code> so spacing follows
            reading direction. Icon-only buttons need an{" "}
            <code className="font-mono">aria-label</code>.
          </p>
        </div>
        <h3 className="scroll-m-20 font-semibold tracking-tight">Props</h3>
        <PropsTable data={propRows} />
        <h3 className="scroll-m-20 font-semibold tracking-tight">Variants</h3>
        <PropsTable data={variantRows} />
        <h3 className="scroll-m-20 font-semibold tracking-tight">Sizes</h3>
        <PropsTable data={sizeRows} />
      </section>
    </article>
  )
}
