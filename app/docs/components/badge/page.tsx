import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  BadgeCheckIcon,
  CircleAlertIcon,
  LoaderIcon,
} from "lucide-react"

import { Badge } from "./docs-badge"
import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import { badgePropRows } from "./badge-table-data"

export const metadata: Metadata = {
  title: "Badge",
  description: "Displays a badge or a component that looks like a badge.",
}

const usageImport = `import { Badge } from "@/components/cubix/badge"`

const usageSnippet = `<Badge variant="default | secondary | destructive | outline | ghost | link">
  Badge
</Badge>`

const heroSnippet = `<Badge>Badge</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>`

const variantsSnippet = `<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="ghost">Ghost</Badge>
<Badge variant="link">Link</Badge>`

const iconSnippet = `<Badge>
  <BadgeCheckIcon data-icon="inline-start" />
  Default
</Badge>
<Badge variant="secondary">
  Default
  <ArrowRightIcon data-icon="inline-end" />
</Badge>`

const spinnerSnippet = `<Badge variant="destructive">
  <LoaderIcon data-icon="inline-start" className="animate-spin" />
  Deleting
</Badge>
<Badge variant="secondary">
  Generating
  <LoaderIcon data-icon="inline-end" className="animate-spin" />
</Badge>`

const linkSnippet = `<Badge
  render={
    <a href="#">
      Link
      <ArrowUpRightIcon data-icon="inline-end" />
    </a>
  }
/>`

const colorsSnippet = `<Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
  Blue
</Badge>
<Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
  Green
</Badge>
<Badge className="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
  Sky
</Badge>
<Badge className="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
  Purple
</Badge>
<Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
  Red
</Badge>`

const rtlSnippet = `<div
  dir="rtl"
  lang="fa"
  className="flex w-full flex-wrap justify-center gap-2"
>
  <Badge>نشان</Badge>
  <Badge variant="secondary">ثانویه</Badge>
  <Badge variant="destructive">مخرب</Badge>
  <Badge variant="outline">حاشیه</Badge>
  <Badge>
    <BadgeCheckIcon data-icon="inline-start" />
    تأیید شده
  </Badge>
  <Badge variant="secondary">
    ادامه
    <ArrowLeftIcon data-icon="inline-end" />
  </Badge>
</div>`

export default function BadgePage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Badge"
        description="Displays a badge or a component that looks like a badge."
        slug="badge"
      />

      <ComponentPreview code={heroSnippet}>
        <Badge>Badge</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </ComponentPreview>

      <ComponentInstall name="badge" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Variants</h3>
          <p className="leading-relaxed text-muted-foreground">
            Use the <code className="font-mono text-sm">variant</code> prop to
            change the look of the badge.
          </p>
          <ComponentPreview code={variantsSnippet}>
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="ghost">Ghost</Badge>
            <Badge variant="link">Link</Badge>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            With Icon
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Render an icon inside the badge. Use{" "}
            <code className="font-mono text-sm">
              data-icon=&quot;inline-start&quot;
            </code>{" "}
            and{" "}
            <code className="font-mono text-sm">
              data-icon=&quot;inline-end&quot;
            </code>{" "}
            so padding follows reading direction in LTR and RTL.
          </p>
          <ComponentPreview code={iconSnippet}>
            <Badge>
              <BadgeCheckIcon data-icon="inline-start" />
              Default
            </Badge>
            <Badge variant="secondary">
              Default
              <ArrowRightIcon data-icon="inline-end" />
            </Badge>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            With Spinner
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Render a spinner inside the badge. Add{" "}
            <code className="font-mono text-sm">data-icon</code> so padding
            matches the icon examples.
          </p>
          <ComponentPreview code={spinnerSnippet}>
            <Badge variant="destructive">
              <LoaderIcon
                data-icon="inline-start"
                className="animate-spin"
              />
              Deleting
            </Badge>
            <Badge variant="secondary">
              Generating
              <LoaderIcon
                data-icon="inline-end"
                className="animate-spin"
              />
            </Badge>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Link</h3>
          <p className="leading-relaxed text-muted-foreground">
            Use the <code className="font-mono text-sm">render</code> prop
            (Base UI / React Aria) or{" "}
            <code className="font-mono text-sm">asChild</code> (Radix) to
            render a link as a badge.
          </p>
          <ComponentPreview code={linkSnippet}>
            <Badge
              render={
                <a href="#">
                  Link
                  <ArrowUpRightIcon data-icon="inline-end" />
                </a>
              }
            />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Custom Colors
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Override colors with classes such as{" "}
            <code className="font-mono text-sm">
              bg-green-50 dark:bg-green-950
            </code>
            .
          </p>
          <ComponentPreview code={colorsSnippet}>
            <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              Blue
            </Badge>
            <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
              Green
            </Badge>
            <Badge className="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
              Sky
            </Badge>
            <Badge className="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
              Purple
            </Badge>
            <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
              Red
            </Badge>
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
        <ComponentPreview code={rtlSnippet}>
          <div
            dir="rtl"
            lang="fa"
            className="flex w-full flex-wrap justify-center gap-2"
          >
            <Badge>نشان</Badge>
            <Badge variant="secondary">ثانویه</Badge>
            <Badge variant="destructive">مخرب</Badge>
            <Badge variant="outline">حاشیه</Badge>
            <Badge>
              <BadgeCheckIcon data-icon="inline-start" />
              تأیید شده
            </Badge>
            <Badge variant="secondary">
              ادامه
              <ArrowLeftIcon data-icon="inline-end" />
            </Badge>
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
            <strong className="text-foreground">Note:</strong> Put icons and
            spinners inside the badge and mark them with{" "}
            <code className="font-mono">data-icon</code> so spacing stays
            correct.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Badge</h3>
        <p className="leading-relaxed text-muted-foreground">
          The control that displays a badge or a component that looks like a
          badge.
        </p>
        <PropsTable data={badgePropRows} />
      </section>
    </article>
  )
}
