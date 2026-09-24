import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeftIcon,
  CircleAlertIcon,
  MailIcon,
} from "lucide-react"

import { Button } from "./docs-button"
import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
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

const usageSnippet = `<Button variant="outline">Button</Button>`

const rtlSnippet = `<div dir="rtl" lang="fa" className="flex flex-wrap justify-center gap-2">
  <Button>ادامه</Button>
  <Button variant="secondary">انصراف</Button>
  <Button variant="outline">
    <MailIcon data-icon="inline-start" />
    ایمیل
  </Button>
  <Button>
    ادامه
    <ArrowLeftIcon data-icon="inline-end" />
  </Button>
</div>`

export default function ButtonPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Button"
        description="Displays a button or a component that looks like a button."
        slug="button"
      />

      <ComponentPreview code={`<Button>Button</Button>`}>
        <Button>Button</Button>
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
            Variants
          </h3>
          <ComponentPreview
            code={`<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`}
          >
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Sizes</h3>
          <ComponentPreview
            code={`<Button size="xs">Extra small</Button>
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button variant="outline" size="icon-xs" aria-label="Extra small icon">
  <MailIcon />
</Button>
<Button variant="outline" size="icon-sm" aria-label="Small icon">
  <MailIcon />
</Button>
<Button variant="outline" size="icon" aria-label="Icon button">
  <MailIcon />
</Button>
<Button variant="outline" size="icon-lg" aria-label="Large icon">
  <MailIcon />
</Button>`}
          >
            <Button size="xs">Extra small</Button>
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button
              variant="outline"
              size="icon-xs"
              aria-label="Extra small icon"
            >
              <MailIcon />
            </Button>
            <Button variant="outline" size="icon-sm" aria-label="Small icon">
              <MailIcon />
            </Button>
            <Button variant="outline" size="icon" aria-label="Icon button">
              <MailIcon />
            </Button>
            <Button variant="outline" size="icon-lg" aria-label="Large icon">
              <MailIcon />
            </Button>
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
  <MailIcon data-icon="inline-start" />
  Login with Email
</Button>`}
          >
            <ButtonWithIconDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Icon only
          </h3>
          <ComponentPreview
            code={`<Button variant="outline" size="icon" aria-label="Send email">
  <ArrowRightIcon />
</Button>`}
          >
            <ButtonIconDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Loading
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Disable the button and compose a spinner while an async action is
            in flight. Click the button below to try it:
          </p>
          <ComponentPreview
            code={`<Button disabled>
  <LoaderIcon data-icon="inline-start" className="animate-spin" />
  Saving...
</Button>`}
          >
            <ButtonLoadingDemo />
          </ComponentPreview>
          <p className="leading-relaxed text-muted-foreground">
            If you prefer full control, compose the spinner yourself:
          </p>
          <ComponentPreview
            code={`<Button disabled>
  <LoaderIcon data-icon="inline-start" className="animate-spin" />
  Please wait
</Button>`}
          >
            <ButtonSpinnerDemo />
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
  Go to Docs
</Button>`}
          >
            <ButtonAsChildDemo />
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
            code={`<Button variant="outline" className="rounded-full px-6 text-base">
  Fully rounded
</Button>`}
          >
            <ButtonCustomDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Invalid
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Set <code className="font-mono text-sm">aria-invalid</code> to
            switch to destructive border and ring styles - no extra prop
            needed:
          </p>
          <ComponentPreview
            code={`<Button aria-invalid>Invalid</Button>
<Button variant="outline" aria-invalid>
  Invalid
</Button>`}
          >
            <Button aria-invalid>Invalid</Button>
            <Button variant="outline" aria-invalid>
              Invalid
            </Button>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Disabled
          </h3>
          <ComponentPreview code={`<Button disabled>Disabled</Button>`}>
            <Button disabled>Disabled</Button>
            <Button variant="outline" disabled>
              Disabled
            </Button>
          </ComponentPreview>
        </div>
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
          guide. Icon padding uses{" "}
          <code className="font-mono text-sm">inline-start</code> /{" "}
          <code className="font-mono text-sm">inline-end</code> so it stays
          correct under{" "}
          <code className="font-mono text-sm">dir=&quot;rtl&quot;</code>.
        </p>
        <ComponentPreview code={rtlSnippet} previewClassName="min-h-44">
          <div
            dir="rtl"
            lang="fa"
            className="flex flex-wrap justify-center gap-2"
          >
            <Button>ادامه</Button>
            <Button variant="secondary">انصراف</Button>
            <Button variant="outline">
              <MailIcon data-icon="inline-start" />
              ایمیل
            </Button>
            <Button>
              ادامه
              <ArrowLeftIcon data-icon="inline-end" />
            </Button>
          </div>
        </ComponentPreview>
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
