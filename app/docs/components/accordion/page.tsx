import type { Metadata } from "next";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./docs-accordion";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentDocsHeader } from "@/components/docs/component-docs-header";
import { ComponentInstall } from "@/components/docs/component-install";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import {
  accordionContentPropRows,
  accordionItemPropRows,
  accordionPropRows,
  accordionTriggerPropRows,
} from "./accordion-table-data";

export const metadata: Metadata = {
  title: "Accordion",
  description:
    "A vertically stacked set of interactive headings that each reveal a section of content.",
};

const usageImport = `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/cubix/accordion"`;

const usageSnippet = `<Accordion defaultValue={["item-1"]} className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>
      Yes. It comes with default styles that match the other Cubix
      components.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>Is it animated?</AccordionTrigger>
    <AccordionContent>
      Yes. The content opens and closes with a height animation.
    </AccordionContent>
  </AccordionItem>
</Accordion>`;

const rtlSnippet = `<div dir="rtl" lang="fa">
  <Accordion defaultValue={["item-1"]} className="w-full">
    <AccordionItem value="item-1">
      <AccordionTrigger>آیا در دسترس‌پذیر است؟</AccordionTrigger>
      <AccordionContent>
        بله. از الگوی WAI-ARIA پیروی می‌کند.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>آیا استایل دارد؟</AccordionTrigger>
      <AccordionContent>
        بله. استایل پیش‌فرض با بقیه کامپوننت‌های Cubix یکی است.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
      <AccordionTrigger>آیا انیمیشن دارد؟</AccordionTrigger>
      <AccordionContent>
        بله. محتوا با انیمیشن ارتفاع باز و بسته می‌شود.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</div>`;

const multipleSnippet = `<Accordion multiple defaultValue={["item-1", "item-3"]} className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Can I open several items?</AccordionTrigger>
    <AccordionContent>
      Yes. Pass multiple to keep more than one section open.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Does it work in forms?</AccordionTrigger>
    <AccordionContent>
      Accordion is a disclosure pattern, not a form control. Put form
      fields inside the content when you need them.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>Can items start open?</AccordionTrigger>
    <AccordionContent>
      Pass an array to defaultValue or value when multiple is set.
    </AccordionContent>
  </AccordionItem>
</Accordion>`;

export default function AccordionPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Accordion"
        description="A vertically stacked set of interactive headings that each reveal a section of content."
        slug="accordion"
      />

      <ComponentPreview code={usageSnippet} align="start" previewClassName="min-h-0">
        <Accordion defaultValue={["item-1"]} className="w-full max-w-lg">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that match the other Cubix
              components.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. The content opens and closes with a height animation.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ComponentPreview>

      <ComponentInstall name="accordion" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Usage
        </h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Examples
        </h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Multiple
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Set{" "}
            <code className="font-mono text-sm">multiple</code>{" "}
            to keep more than one item open at a time.
          </p>
          <ComponentPreview code={multipleSnippet} align="start" previewClassName="min-h-0">
            <Accordion
              multiple
              defaultValue={["item-1", "item-3"]}
              className="w-full max-w-lg"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>Can I open several items?</AccordionTrigger>
                <AccordionContent>
                  Yes. Pass multiple to keep more than one section open.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Does it work in forms?</AccordionTrigger>
                <AccordionContent>
                  Accordion is a disclosure pattern, not a form control. Put
                  form fields inside the content when you need them.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can items start open?</AccordionTrigger>
                <AccordionContent>
                  Pass an array to defaultValue or value when multiple is set.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Single item
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Omit{" "}
            <code className="font-mono text-sm">multiple</code> so only one item
            is open at a time. Click the open item to close it.
          </p>
          <ComponentPreview
            align="start"
            previewClassName="min-h-0"
            code={`<Accordion defaultValue={["item-1"]} className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Only one open</AccordionTrigger>
    <AccordionContent>
      Opening another item closes this one. Click the trigger again to collapse it.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Switch to this section</AccordionTrigger>
    <AccordionContent>
      The previous item closes automatically.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
          >
            <Accordion defaultValue={["item-1"]} className="w-full max-w-lg">
              <AccordionItem value="item-1">
                <AccordionTrigger>Only one open</AccordionTrigger>
                <AccordionContent>
                  Opening another item closes this one. Click the trigger again
                  to collapse it.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Switch to this section</AccordionTrigger>
                <AccordionContent>
                  The previous item closes automatically.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Disabled
          </h3>
          <ComponentPreview
            align="start"
            previewClassName="min-h-0"
            code={`<Accordion defaultValue={["item-1"]} className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Available</AccordionTrigger>
    <AccordionContent>
      This item can be opened and closed.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2" disabled>
    <AccordionTrigger>Unavailable</AccordionTrigger>
    <AccordionContent>
      This content cannot be reached while the item is disabled.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
          >
            <Accordion defaultValue={["item-1"]} className="w-full max-w-lg">
              <AccordionItem value="item-1">
                <AccordionTrigger>Available</AccordionTrigger>
                <AccordionContent>
                  This item can be opened and closed.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" disabled>
                <AccordionTrigger>Unavailable</AccordionTrigger>
                <AccordionContent>
                  This content cannot be reached while the item is disabled.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </ComponentPreview>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">RTL</h2>
        <p className="leading-relaxed text-muted-foreground">
          Wrap the accordion in{" "}
          <code className="font-mono text-sm">dir=&quot;rtl&quot;</code> and{" "}
          <code className="font-mono text-sm">lang=&quot;fa&quot;</code> so
          layout, chevron placement, and IRANSans XV follow Persian.
        </p>
        <ComponentPreview
          code={rtlSnippet}
          align="start"
          previewClassName="min-h-0"
        >
          <div dir="rtl" lang="fa" className="w-full max-w-lg">
            <Accordion defaultValue={["item-1"]} className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>آیا در دسترس‌پذیر است؟</AccordionTrigger>
                <AccordionContent>
                  بله. از الگوی WAI-ARIA پیروی می‌کند.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>آیا استایل دارد؟</AccordionTrigger>
                <AccordionContent>
                  بله. استایل پیش‌فرض با بقیه کامپوننت‌های Cubix یکی است.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>آیا انیمیشن دارد؟</AccordionTrigger>
                <AccordionContent>
                  بله. محتوا با انیمیشن ارتفاع باز و بسته می‌شود.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Accordion</h3>
        <p className="leading-relaxed text-muted-foreground">
          The root that manages open state and keyboard movement between
          triggers.
        </p>
        <PropsTable data={accordionPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">AccordionItem</h3>
        <p className="leading-relaxed text-muted-foreground">
          A single section. Wrap a trigger and content and give it a unique{" "}
          <code className="font-mono text-sm">value</code>.
        </p>
        <PropsTable data={accordionItemPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          AccordionTrigger
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          The heading button that opens and closes the section.
        </p>
        <PropsTable data={accordionTriggerPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          AccordionContent
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          The collapsible panel revealed by the trigger.
        </p>
        <PropsTable data={accordionContentPropRows} />
      </section>
    </article>
  );
}
