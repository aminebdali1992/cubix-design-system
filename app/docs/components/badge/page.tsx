import type { Metadata } from "next"
import type { ReactNode } from "react"
import {
  ArrowLeftIcon,
  ArrowUpLeftIcon,
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

const description = "Displays a badge or a component that looks like a badge."

export const metadata: Metadata = {
  title: "Badge",
  description,
}

const usageImport = `import { Badge } from "@/components/cubix/badge"`

const usageSnippet = `<Badge variant="default | secondary | destructive | outline | ghost | link | dot">
  نشان
</Badge>`

const heroSnippet = `<Badge>نشان</Badge>
<Badge variant="secondary">ثانویه</Badge>
<Badge variant="destructive">مخرب</Badge>
<Badge variant="outline">حاشیه‌دار</Badge>`

const variantsSnippet = `<Badge>پیش‌فرض</Badge>
<Badge variant="secondary">ثانویه</Badge>
<Badge variant="destructive">مخرب</Badge>
<Badge variant="outline">حاشیه‌دار</Badge>
<Badge variant="ghost">شفاف</Badge>
<Badge variant="link">پیوند</Badge>`

const sizesSnippet = `<Badge>پیش‌فرض</Badge>
<Badge size="lg">بزرگ</Badge>
<Badge variant="secondary">پیش‌فرض</Badge>
<Badge variant="secondary" size="lg">بزرگ</Badge>`

const dotSnippet = `<Badge variant="dot" />
<Badge variant="dot" size="lg" />
<Badge variant="dot" className="bg-green-500" />
<Badge variant="dot" className="bg-amber-500" />
<Badge variant="dot" className="bg-red-500" />`

const iconSnippet = `<Badge>
  <BadgeCheckIcon data-icon="inline-start" />
  تأیید شده
</Badge>
<Badge variant="secondary">
  ادامه
  <ArrowLeftIcon data-icon="inline-end" />
</Badge>`

const spinnerSnippet = `<Badge variant="destructive">
  <LoaderIcon data-icon="inline-start" className="animate-spin" />
  در حال حذف
</Badge>
<Badge variant="secondary">
  در حال ساخت
  <LoaderIcon data-icon="inline-end" className="animate-spin" />
</Badge>`

const linkSnippet = `<Badge
  render={
    <a href="#">
      پیوند
      <ArrowUpLeftIcon data-icon="inline-end" />
    </a>
  }
/>`

const colorsSnippet = `<Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
  آبی
</Badge>
<Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
  سبز
</Badge>
<Badge className="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
  آسمانی
</Badge>
<Badge className="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
  بنفش
</Badge>
<Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
  قرمز
</Badge>`

function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div
      dir="rtl"
      lang="fa"
      className="flex w-full flex-wrap items-center justify-center gap-2"
    >
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
      <ComponentPreview code={code}>
        <PreviewShell>{children}</PreviewShell>
      </ComponentPreview>
    </div>
  )
}

export default function BadgePage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader title="Badge" description={description} slug="badge" />

      <ComponentPreview code={heroSnippet}>
        <PreviewShell>
          <Badge>نشان</Badge>
          <Badge variant="secondary">ثانویه</Badge>
          <Badge variant="destructive">مخرب</Badge>
          <Badge variant="outline">حاشیه‌دار</Badge>
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="badge" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <ExampleSection
          title="Variants"
          description={
            <>
              Use the <Code>variant</Code> prop to change the look of the badge.
            </>
          }
          code={variantsSnippet}
        >
          <Badge>پیش‌فرض</Badge>
          <Badge variant="secondary">ثانویه</Badge>
          <Badge variant="destructive">مخرب</Badge>
          <Badge variant="outline">حاشیه‌دار</Badge>
          <Badge variant="ghost">شفاف</Badge>
          <Badge variant="link">پیوند</Badge>
        </ExampleSection>

        <ExampleSection
          title="Sizes"
          description={
            <>
              Use the <Code>size</Code> prop to pick <Code>default</Code> (20px)
              or <Code>lg</Code> (24px).
            </>
          }
          code={sizesSnippet}
        >
          <Badge>پیش‌فرض</Badge>
          <Badge size="lg">بزرگ</Badge>
          <Badge variant="secondary">پیش‌فرض</Badge>
          <Badge variant="secondary" size="lg">
            بزرگ
          </Badge>
        </ExampleSection>

        <ExampleSection
          title="Dot"
          description={
            <>
              Use <Code>variant=&quot;dot&quot;</Code> for a small round status
              indicator with no label. It is 8px by default and 12px with{" "}
              <Code>size=&quot;lg&quot;</Code>. Change its color with a{" "}
              <Code>bg-*</Code> class.
            </>
          }
          code={dotSnippet}
        >
          <Badge variant="dot" aria-label="پیش‌فرض" />
          <Badge variant="dot" size="lg" aria-label="بزرگ" />
          <Badge variant="dot" className="bg-green-500" aria-label="فعال" />
          <Badge variant="dot" className="bg-amber-500" aria-label="در انتظار" />
          <Badge variant="dot" className="bg-red-500" aria-label="خطا" />
        </ExampleSection>

        <ExampleSection
          title="With Icon"
          description={
            <>
              Render an icon inside the badge. Use{" "}
              <Code>data-icon=&quot;inline-start&quot;</Code> and{" "}
              <Code>data-icon=&quot;inline-end&quot;</Code> so padding follows
              the reading direction. In RTL, inline-end is the left side, so
              use a left-pointing arrow.
            </>
          }
          code={iconSnippet}
        >
          <Badge>
            <BadgeCheckIcon data-icon="inline-start" />
            تأیید شده
          </Badge>
          <Badge variant="secondary">
            ادامه
            <ArrowLeftIcon data-icon="inline-end" />
          </Badge>
        </ExampleSection>

        <ExampleSection
          title="With Spinner"
          description={
            <>
              Render a spinner inside the badge. Add <Code>data-icon</Code> so
              padding matches the icon examples.
            </>
          }
          code={spinnerSnippet}
        >
          <Badge variant="destructive">
            <LoaderIcon data-icon="inline-start" className="animate-spin" />
            در حال حذف
          </Badge>
          <Badge variant="secondary">
            در حال ساخت
            <LoaderIcon data-icon="inline-end" className="animate-spin" />
          </Badge>
        </ExampleSection>

        <ExampleSection
          title="Link"
          description={
            <>
              Use the <Code>render</Code> prop (Base UI / React Aria) or{" "}
              <Code>asChild</Code> (Radix) to render a link as a badge.
            </>
          }
          code={linkSnippet}
        >
          <Badge
            render={
              <a href="#">
                پیوند
                <ArrowUpLeftIcon data-icon="inline-end" />
              </a>
            }
          />
        </ExampleSection>

        <ExampleSection
          title="Custom styling"
          description={
            <>
              Badge accepts a <Code>className</Code> merged with the shipped{" "}
              <Code>cn</Code> helper, so override colors with classes such as{" "}
              <Code>bg-green-50 dark:bg-green-950</Code>.
            </>
          }
          code={colorsSnippet}
        >
          <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            آبی
          </Badge>
          <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
            سبز
          </Badge>
          <Badge className="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
            آسمانی
          </Badge>
          <Badge className="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
            بنفش
          </Badge>
          <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
            قرمز
          </Badge>
        </ExampleSection>
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
            correct in both directions.
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