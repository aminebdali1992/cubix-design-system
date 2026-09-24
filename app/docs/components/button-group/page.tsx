import type { Metadata } from "next"
import Link from "next/link"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  ButtonGroupDemo,
  ButtonGroupInputDemo,
  ButtonGroupNestedDemo,
  ButtonGroupOrientationDemo,
  ButtonGroupRtlDemo,
  ButtonGroupSelectDemo,
  ButtonGroupSeparatorDemo,
  ButtonGroupSizeDemo,
  ButtonGroupSplitDemo,
  ButtonGroupTextDemo,
} from "@/components/examples/button-group-examples"
import {
  buttonGroupPropRows,
  separatorPropRows,
  textPropRows,
} from "./button-group-table-data"

export const metadata: Metadata = {
  title: "Button Group",
  description:
    "A container that groups related buttons together with consistent styling.",
}

const usageImport = `import { Button } from "@/components/cubix/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/cubix/button-group"`

const usageSnippet = `<ButtonGroup>
  <Button variant="outline">Button 1</Button>
  <Button variant="outline">Button 2</Button>
</ButtonGroup>`

const compositionSnippet = `ButtonGroup
├── Button or Input
├── ButtonGroupSeparator
└── ButtonGroupText`

const orientationSnippet = `<ButtonGroup orientation="vertical" aria-label="Media controls">
  <Button variant="outline" size="icon" aria-label="Increase">
    <PlusIcon />
  </Button>
  <Button variant="outline" size="icon" aria-label="Decrease">
    <MinusIcon />
  </Button>
</ButtonGroup>`

const sizeSnippet = `<ButtonGroup>
  <Button variant="outline" size="sm">Small</Button>
  <Button variant="outline" size="sm">Button</Button>
</ButtonGroup>
<ButtonGroup>
  <Button variant="outline">Default</Button>
  <Button variant="outline">Button</Button>
</ButtonGroup>
<ButtonGroup>
  <Button variant="outline" size="lg">Large</Button>
  <Button variant="outline" size="lg">Button</Button>
</ButtonGroup>`

const nestedSnippet = `<ButtonGroup>
  <ButtonGroup>
    <Button variant="outline" size="icon" aria-label="Add">
      <PlusIcon />
    </Button>
  </ButtonGroup>
  <ButtonGroup>
    <Button variant="outline">Archive</Button>
    <Button variant="outline">Report</Button>
  </ButtonGroup>
</ButtonGroup>`

const separatorSnippet = `<ButtonGroup>
  <Button variant="secondary">Button 1</Button>
  <ButtonGroupSeparator />
  <Button variant="secondary">Button 2</Button>
</ButtonGroup>`

const splitSnippet = `<ButtonGroup>
  <Button variant="outline">Update</Button>
  <DropdownMenu>
    <DropdownMenuTrigger render={<Button variant="outline" size="icon" aria-label="More options" />}>
      <ChevronDownIcon />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem>Disable</DropdownMenuItem>
      <DropdownMenuItem variant="destructive">Uninstall</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</ButtonGroup>`

const inputSnippet = `<ButtonGroup>
  <Input placeholder="Type something here..." />
  <Button variant="outline">Search</Button>
</ButtonGroup>`

const textSnippet = `<ButtonGroup>
  <ButtonGroupText>https://</ButtonGroupText>
  <Input placeholder="example.com" />
</ButtonGroup>`

const selectSnippet = `<ButtonGroup>
  <Select defaultValue="$">
    <SelectTrigger aria-label="Currency">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="$">$</SelectItem>
      <SelectItem value="€">€</SelectItem>
      <SelectItem value="£">£</SelectItem>
    </SelectContent>
  </Select>
  <Input placeholder="Enter amount to send" />
  <Button variant="outline" size="icon" aria-label="Send">
    <ArrowRightIcon />
  </Button>
</ButtonGroup>`

const rtlSnippet = `<div dir="rtl" lang="fa" className="flex flex-wrap justify-center gap-2">
  <ButtonGroup>
    <Button variant="outline">ادامه</Button>
    <Button variant="outline">انصراف</Button>
  </ButtonGroup>
  <ButtonGroup>
    <Button variant="outline">
      ادامه
      <ArrowLeftIcon data-icon="inline-end" />
    </Button>
    <Button variant="outline" size="icon" aria-label="افزودن">
      <PlusIcon />
    </Button>
  </ButtonGroup>
</div>`

export default function ButtonGroupDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Button Group"
        description="A container that groups related buttons together with consistent styling."
        slug="button-group"
      />

      <ComponentPreview code={usageSnippet}>
        <ButtonGroupDemo />
      </ComponentPreview>

      <ComponentInstall name="button-group" />

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
          Use the following composition to build a{" "}
          <code className="font-mono text-sm">ButtonGroup</code>:
        </p>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Accessibility
        </h2>
        <ul className="list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground">
          <li>
            The group has{" "}
            <code className="font-mono text-sm">role=&quot;group&quot;</code>.
          </li>
          <li>Use Tab to move between the controls in the group.</li>
          <li>
            Label the group with{" "}
            <code className="font-mono text-sm">aria-label</code> or{" "}
            <code className="font-mono text-sm">aria-labelledby</code>.
          </li>
          <li>
            Icon-only buttons inside the group need their own{" "}
            <code className="font-mono text-sm">aria-label</code>.
          </li>
        </ul>
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Orientation
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Set the <code className="font-mono text-sm">orientation</code> prop
            to change the layout.
          </p>
          <ComponentPreview code={orientationSnippet}>
            <ButtonGroupOrientationDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Size</h3>
          <p className="leading-relaxed text-muted-foreground">
            Control size with the{" "}
            <code className="font-mono text-sm">size</code> prop on each button.
          </p>
          <ComponentPreview code={sizeSnippet}>
            <ButtonGroupSizeDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Nested</h3>
          <p className="leading-relaxed text-muted-foreground">
            Nest <code className="font-mono text-sm">ButtonGroup</code>{" "}
            components to create groups with spacing.
          </p>
          <ComponentPreview code={nestedSnippet}>
            <ButtonGroupNestedDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Separator
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Outline buttons already have a border. For other variants, add{" "}
            <code className="font-mono text-sm">ButtonGroupSeparator</code> to
            split the group.
          </p>
          <ComponentPreview code={separatorSnippet}>
            <ButtonGroupSeparatorDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Split</h3>
          <p className="leading-relaxed text-muted-foreground">
            Pair a main action with a{" "}
            <code className="font-mono text-sm">DropdownMenu</code> trigger for
            a split button.
          </p>
          <ComponentPreview code={splitSnippet}>
            <ButtonGroupSplitDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Input</h3>
          <p className="leading-relaxed text-muted-foreground">
            Wrap an input with buttons in the same group.
          </p>
          <ComponentPreview code={inputSnippet}>
            <ButtonGroupInputDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Text</h3>
          <p className="leading-relaxed text-muted-foreground">
            Use <code className="font-mono text-sm">ButtonGroupText</code> for
            a prefix or label inside the group.
          </p>
          <ComponentPreview code={textSnippet}>
            <ButtonGroupTextDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Select</h3>
          <p className="leading-relaxed text-muted-foreground">
            Pair the group with a{" "}
            <code className="font-mono text-sm">Select</code> and an input.
          </p>
          <ComponentPreview code={selectSnippet}>
            <ButtonGroupSelectDemo />
          </ComponentPreview>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">RTL</h2>
        <p className="leading-relaxed text-muted-foreground">
          Joined corners and borders use logical start/end, so the group stays
          correct under{" "}
          <code className="font-mono text-sm">dir=&quot;rtl&quot;</code>. To
          enable RTL support, see the{" "}
          <Link
            href="/docs/components/direction"
            className="font-medium text-foreground underline decoration-dotted decoration-1 underline-offset-[6px] [text-decoration-skip-ink:none] hover:text-foreground/80"
          >
            Direction
          </Link>{" "}
          guide.
        </p>
        <ComponentPreview code={rtlSnippet} previewClassName="min-h-44">
          <ButtonGroupRtlDemo />
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Use{" "}
            <code className="font-mono">ButtonGroup</code> for related actions.
            Use a toggle group when the controls represent a selected state.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          ButtonGroup
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          The container that groups related buttons with consistent styling.
        </p>
        <PropsTable data={buttonGroupPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          ButtonGroupSeparator
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          A visual divider between buttons in the group.
        </p>
        <PropsTable data={separatorPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          ButtonGroupText
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          Text shown inside the group, such as a prefix or label.
        </p>
        <PropsTable data={textPropRows} />
      </section>
    </article>
  )
}
