import type { Metadata } from "next"
import type { ReactNode } from "react"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  AccordionControlledDemo,
  AccordionCustomStylingDemo,
  AccordionDemo,
  AccordionDisabledDemo,
  AccordionDisabledItemDemo,
  AccordionIconDemo,
  AccordionMultipleDemo,
} from "@/components/examples/accordion-examples"

import {
  accordionContentPropRows,
  accordionItemPropRows,
  accordionKeyboardRows,
  accordionPropRows,
  accordionTriggerPropRows,
} from "./accordion-table-data"

const description =
  "A vertically stacked set of interactive headings that each reveal a section of content."

export const metadata: Metadata = {
  title: "Accordion",
  description,
}

const usageImport = `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/cubix/accordion"`

const usageSnippet = `<Accordion dir="rtl" lang="fa" defaultValue={["accessible"]}>
  <AccordionItem value="accessible">
    <AccordionTrigger>آیا دسترس‌پذیر است؟</AccordionTrigger>
    <AccordionContent>
      بله. از الگوی WAI-ARIA پیروی می‌کند و همهٔ بخش‌ها با صفحه‌کلید باز و
      بسته می‌شوند.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="styled">
    <AccordionTrigger>آیا ظاهر آماده دارد؟</AccordionTrigger>
    <AccordionContent>
      بله. با توکن‌های Cubix رنگ‌آمیزی شده و در حالت تیره هم درست نمایش
      داده می‌شود.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="animated">
    <AccordionTrigger>آیا انیمیشن دارد؟</AccordionTrigger>
    <AccordionContent>
      بله. ارتفاع بخش‌ها نرم تغییر می‌کند و اگر کاهش حرکت در سیستم فعال
      باشد، انیمیشن حذف می‌شود.
    </AccordionContent>
  </AccordionItem>
</Accordion>`

const composition = `Accordion
└── AccordionItem
    ├── AccordionTrigger
    └── AccordionContent`

const multipleSnippet = `<Accordion
  dir="rtl"
  lang="fa"
  multiple
  defaultValue={["delivery", "returns"]}
>
  <AccordionItem value="delivery">
    <AccordionTrigger>سفارش چند روزه می‌رسد؟</AccordionTrigger>
    <AccordionContent>
      سفارش‌های تهران یک روز کاری و سفارش‌های شهرهای دیگر دو تا چهار روز
      کاری بعد تحویل داده می‌شوند.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="cost">
    <AccordionTrigger>هزینهٔ ارسال چطور حساب می‌شود؟</AccordionTrigger>
    <AccordionContent>
      ارسال سفارش‌های بالای یک میلیون تومان رایگان است و برای بقیه بر اساس
      وزن بسته حساب می‌شود.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="returns">
    <AccordionTrigger>می‌توانم کالا را مرجوع کنم؟</AccordionTrigger>
    <AccordionContent>
      بله. تا هفت روز پس از تحویل می‌توانید از صفحهٔ سفارش‌ها درخواست
      مرجوعی ثبت کنید.
    </AccordionContent>
  </AccordionItem>
</Accordion>`

const controlledSnippet = `const items = ["delivery", "cost", "returns"]

export function ControlledAccordion() {
  const [value, setValue] = React.useState<string[]>(["cost"])

  return (
    <div dir="rtl" lang="fa" className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => setValue(items)}>
          باز کردن همه
        </Button>
        <Button variant="outline" size="sm" onClick={() => setValue([])}>
          بستن همه
        </Button>
      </div>
      <Accordion multiple value={value} onValueChange={setValue}>
        <AccordionItem value="delivery">.</AccordionItem>
        <AccordionItem value="cost">.</AccordionItem>
        <AccordionItem value="returns">.</AccordionItem>
      </Accordion>
    </div>
  )
}`

const disabledItemSnippet = `<Accordion dir="rtl" lang="fa" defaultValue={["profile"]}>
  <AccordionItem value="profile">
    <AccordionTrigger>اطلاعات حساب</AccordionTrigger>
    <AccordionContent>
      نام، ایمیل و شمارهٔ تلفن خود را از این بخش ویرایش کنید.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="payment" disabled>
    <AccordionTrigger>روش‌های پرداخت</AccordionTrigger>
    <AccordionContent>
      این بخش پس از تأیید حساب فعال می‌شود.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="notifications">
    <AccordionTrigger>اعلان‌ها</AccordionTrigger>
    <AccordionContent>
      انتخاب کنید کدام پیام‌ها با ایمیل یا پیامک برایتان فرستاده شود.
    </AccordionContent>
  </AccordionItem>
</Accordion>`

const disabledSnippet = `<Accordion dir="rtl" lang="fa" disabled>
  <AccordionItem value="accessible">.</AccordionItem>
  <AccordionItem value="styled">.</AccordionItem>
  <AccordionItem value="animated">.</AccordionItem>
</Accordion>`

const iconSnippet = `<Accordion dir="rtl" lang="fa" defaultValue={["accessible"]}>
  <AccordionItem value="accessible">
    <AccordionTrigger icon={<Icon />}>آیا دسترس‌پذیر است؟</AccordionTrigger>
    <AccordionContent>
      بله. از الگوی WAI-ARIA پیروی می‌کند و همهٔ بخش‌ها با صفحه‌کلید باز و
      بسته می‌شوند.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="styled">
    <AccordionTrigger icon={<Icon />}>آیا ظاهر آماده دارد؟</AccordionTrigger>
    <AccordionContent>
      بله. با توکن‌های Cubix رنگ‌آمیزی شده و در حالت تیره هم درست نمایش
      داده می‌شود.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="animated">
    <AccordionTrigger icon={<Icon />}>آیا انیمیشن دارد؟</AccordionTrigger>
    <AccordionContent>
      بله. ارتفاع بخش‌ها نرم تغییر می‌کند و اگر کاهش حرکت در سیستم فعال
      باشد، انیمیشن حذف می‌شود.
    </AccordionContent>
  </AccordionItem>
</Accordion>`

const customStylingSnippet = `<Accordion dir="rtl" lang="fa" defaultValue={["delivery"]} className="gap-2">
  <AccordionItem
    value="delivery"
    className="rounded-xl border bg-muted/40 px-4 last:border-b"
  >
    <AccordionTrigger>سفارش چند روزه می‌رسد؟</AccordionTrigger>
    <AccordionContent>
      سفارش‌های تهران یک روز کاری و سفارش‌های شهرهای دیگر دو تا چهار روز
      کاری بعد تحویل داده می‌شوند.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem
    value="cost"
    className="rounded-xl border bg-muted/40 px-4 last:border-b"
  >
    .
  </AccordionItem>
</Accordion>`

function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" lang="fa" className="flex w-full justify-center">
      {children}
    </div>
  )
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-sm">{children}</code>
}

function PropsSection({
  title,
  description,
  children,
}: {
  title: string
  description?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="space-y-3">
      <h3 className="scroll-m-20 font-semibold tracking-tight">{title}</h3>
      {description ? (
        <p className="leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
      {children}
    </div>
  )
}

function ExampleSection({
  title,
  code,
  children,
  description,
}: {
  title: string
  code: string
  children: ReactNode
  description?: ReactNode
}) {
  return (
    <section className="space-y-4">
      <h2 className="scroll-m-20 font-semibold tracking-tight">{title}</h2>
      {description ? (
        <p className="leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
      <ComponentPreview code={code} align="center" previewClassName="min-h-72">
        <PreviewShell>{children}</PreviewShell>
      </ComponentPreview>
    </section>
  )
}

export default function AccordionDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Accordion"
        description={description}
        slug="accordion"
      />

      <ComponentPreview
        code={usageSnippet}
        align="center"
        previewClassName="min-h-72"
      >
        <PreviewShell>
          <AccordionDemo />
        </PreviewShell>
      </ComponentPreview>

      <ComponentInstall name="accordion" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Usage</h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Composition
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Each <Code>AccordionItem</Code> holds one trigger and one content
          panel. The trigger renders inside a heading, so the section titles
          stay in the page outline.
        </p>
        <CodeBlock code={composition} />
      </section>

      <ExampleSection
        title="Basic"
        code={usageSnippet}
        description={
          <>
            By default one item is open at a time. Opening another item closes
            the open one, and clicking the open trigger closes it. The chevron
            sits at the inline end, on the left in RTL.
          </>
        }
      >
        <AccordionDemo />
      </ExampleSection>

      <ExampleSection
        title="Multiple"
        code={multipleSnippet}
        description={
          <>
            Set <Code>multiple</Code> to keep any number of items open. Pass
            every open item to <Code>defaultValue</Code>.
          </>
        }
      >
        <AccordionMultipleDemo />
      </ExampleSection>

      <ExampleSection
        title="Controlled"
        code={controlledSnippet}
        description={
          <>
            Pass <Code>value</Code> and <Code>onValueChange</Code> to own the
            open items, for example to open or close every item from outside.
            Both modes use a <Code>string[]</Code>; in single mode it holds at
            most one value.
          </>
        }
      >
        <AccordionControlledDemo />
      </ExampleSection>

      <ExampleSection
        title="Disabled item"
        code={disabledItemSnippet}
        description={
          <>
            Set <Code>disabled</Code> on an <Code>AccordionItem</Code> to keep
            it visible but locked. Arrow key navigation skips it.
          </>
        }
      >
        <AccordionDisabledItemDemo />
      </ExampleSection>

      <ExampleSection
        title="Disabled"
        code={disabledSnippet}
        description={
          <>
            Set <Code>disabled</Code> on <Code>Accordion</Code> to lock every
            item in its current state.
          </>
        }
      >
        <AccordionDisabledDemo />
      </ExampleSection>

      <ExampleSection
        title="With icon"
        code={iconSnippet}
        description={
          <>
            Pass <Code>icon</Code> to <Code>AccordionTrigger</Code> to show an
            icon at the inline start, before the heading text. SVG icons
            default to 24px.
          </>
        }
      >
        <AccordionIconDemo />
      </ExampleSection>

      <ExampleSection
        title="Custom styling"
        code={customStylingSnippet}
        description={
          <>
            Every part accepts a <Code>className</Code> merged with the shipped{" "}
            <Code>cn</Code> helper. Here each item is a separate card with a
            muted surface, and the root adds a gap between them.
          </>
        }
      >
        <AccordionCustomStylingDemo />
      </ExampleSection>


      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Parts render{" "}
            <code className="font-mono">data-slot</code> attributes (
            <code className="font-mono">accordion</code>,{" "}
            <code className="font-mono">accordion-item</code>,{" "}
            <code className="font-mono">accordion-header</code>,{" "}
            <code className="font-mono">accordion-trigger</code>,{" "}
            <code className="font-mono">accordion-trigger-icon</code>,{" "}
            <code className="font-mono">accordion-content</code>) for targeting
            in tests and parent selectors. Open state is exposed as{" "}
            <code className="font-mono">aria-expanded</code> on the trigger.
          </p>
        </div>

        <PropsSection
          title="Accordion"
          description="The root that holds the open items and the mode."
        >
          <PropsTable data={accordionPropRows} />
        </PropsSection>

        <PropsSection
          title="AccordionItem"
          description="One section with a trigger and a content panel."
        >
          <PropsTable data={accordionItemPropRows} />
        </PropsSection>

        <PropsSection
          title="AccordionTrigger"
          description="The button inside the section heading that opens and closes the item."
        >
          <PropsTable data={accordionTriggerPropRows} />
        </PropsSection>

        <PropsSection
          title="AccordionContent"
          description="The panel revealed by the trigger, labelled by it as a region."
        >
          <PropsTable data={accordionContentPropRows} />
        </PropsSection>

        <PropsSection title="Keyboard">
          <div className="my-6 overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="px-4 py-3 text-left font-semibold">Key</th>
                  <th className="px-4 py-3 text-left font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {accordionKeyboardRows.map((row) => (
                  <tr key={row.key} className="border-b last:border-0">
                    <td className="px-4 py-3 align-top font-mono text-xs font-medium text-foreground">
                      {row.key}
                    </td>
                    <td className="px-4 py-3 align-top text-xs leading-relaxed text-muted-foreground">
                      {row.action}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PropsSection>
      </section>
    </article>
  )
}
