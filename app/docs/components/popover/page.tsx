import type { Metadata } from "next";
import { CircleAlertIcon } from "lucide-react";

import { Button } from "@/components/cubix/button";
import { Input } from "@/components/cubix/input";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/cubix/popover";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentDocsHeader } from "@/components/docs/component-docs-header";
import { ComponentInstall } from "@/components/docs/component-install";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import {
  contentPropRows,
  popoverPropRows,
  subcomponentRows,
  triggerClosePropRows,
} from "./popover-table-data";

export const metadata: Metadata = {
  title: "Popover",
  description: "Displays rich content in a portal, triggered by a button.",
};

const usageImport = `import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/cubix/popover"`;

const usageSnippet = `<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>
Open popover
</PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Dimensions</PopoverTitle>
      <PopoverDescription>
        Set the dimensions for the layer.
      </PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>`;

const sidesSnippet = `<div className="flex flex-wrap items-center gap-4">
  {(["top", "right", "bottom", "left"] as const).map((side) => (
    <Popover key={side}>
      <PopoverTrigger render={<Button variant="outline" />}>
{side}
</PopoverTrigger>
      <PopoverContent side={side} className="w-40">
        Popover on the {side}
      </PopoverContent>
    </Popover>
  ))}
</div>`;

const formSnippet = `<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>
Open form
</PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Share</PopoverTitle>
      <PopoverDescription>
        Anyone with the link can view this document.
      </PopoverDescription>
    </PopoverHeader>
    <div className="mt-3 grid gap-3">
      <Input defaultValue="https://cubix.design" readOnly />
      <Button className="w-full">Copy link</Button>
    </div>
  </PopoverContent>
</Popover>`;

export default function PopoverPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Popover"
        description="Displays rich content in a portal, triggered by a button."
        slug="popover"
      />

      <ComponentPreview code={usageSnippet}>
        <Popover>
          <PopoverTrigger render={<Button variant="outline" />}>
Open popover
</PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Dimensions</PopoverTitle>
              <PopoverDescription>
                Set the dimensions for the layer.
              </PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      </ComponentPreview>

      <ComponentInstall name="popover" />

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
            Sides
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Use <code className="font-mono text-sm">side</code> to place the
            popover relative to the trigger.
          </p>
          <ComponentPreview code={sidesSnippet}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {(["top", "right", "bottom", "left"] as const).map((side) => (
                <Popover key={side}>
                  <PopoverTrigger render={<Button variant="outline" />}>
{side}
</PopoverTrigger>
                  <PopoverContent side={side} className="w-40">
                    Popover on the {side}
                  </PopoverContent>
                </Popover>
              ))}
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Align
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Use <code className="font-mono text-sm">align</code> to shift the
            panel along the opposite axis.
          </p>
          <ComponentPreview
            code={`<div className="flex flex-wrap items-center gap-4">
  {(["start", "center", "end"] as const).map((align) => (
    <Popover key={align}>
      <PopoverTrigger render={<Button variant="outline" />}>
{align}
</PopoverTrigger>
      <PopoverContent align={align}>
        Aligned to {align}
      </PopoverContent>
    </Popover>
  ))}
</div>`}
          >
            <div className="flex flex-wrap items-center justify-center gap-4">
              {(["start", "center", "end"] as const).map((align) => (
                <Popover key={align}>
                  <PopoverTrigger render={<Button variant="outline" />}>
{align}
</PopoverTrigger>
                  <PopoverContent align={align}>
                    Aligned to {align}
                  </PopoverContent>
                </Popover>
              ))}
            </div>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            With form
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Popovers can hold interactive content such as inputs and actions.
          </p>
          <ComponentPreview code={formSnippet}>
            <Popover>
              <PopoverTrigger render={<Button variant="outline" />}>
Open form
</PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle>Share</PopoverTitle>
                  <PopoverDescription>
                    Anyone with the link can view this document.
                  </PopoverDescription>
                </PopoverHeader>
                <div className="mt-3 grid gap-3">
                  <Input defaultValue="https://cubix.design" readOnly />
                  <Button className="w-full">Copy link</Button>
                </div>
              </PopoverContent>
            </Popover>
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
            <strong className="text-foreground">Note:</strong> The popover is
            not modal. Escape and clicking outside close it, and focus returns
            to the trigger. Use{" "}
            <code className="font-mono text-sm">Dialog</code> when you need a
            focus-trapped overlay.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Popover</h3>
        <p className="leading-relaxed text-muted-foreground">
          The container that wraps the trigger and content and manages open
          state.
        </p>
        <PropsTable data={popoverPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          PopoverTrigger
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          The element that opens the popover. Use{" "}
          <code className="font-mono text-sm">render</code> to merge onto a
          Button.
        </p>
        <PropsTable data={triggerClosePropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">PopoverContent</h3>
        <p className="leading-relaxed text-muted-foreground">
          The panel rendered in a portal next to the trigger.
        </p>
        <PropsTable data={contentPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          PopoverHeader / PopoverTitle / PopoverDescription
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          Optional layout and text helpers for the popover panel.
        </p>
        <PropsTable data={subcomponentRows} />
      </section>
    </article>
  );
}
