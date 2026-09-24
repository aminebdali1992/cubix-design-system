import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  InputGroupBlockEndDemo,
  InputGroupBlockStartDemo,
  InputGroupButtonDemo,
  InputGroupDemo,
  InputGroupDropdownDemo,
  InputGroupIconDemo,
  InputGroupInlineEndDemo,
  InputGroupInlineStartDemo,
  InputGroupKbdDemo,
  InputGroupSpinnerDemo,
  InputGroupTextDemo,
  InputGroupTextareaDemo,
} from "@/components/examples/input-group-examples"

import {
  addonPropRows,
  buttonPropRows,
  controlPropRows,
  inputGroupPropRows,
} from "./input-group-table-data"

const description =
  "Display additional information or actions inside an input."

export const metadata: Metadata = {
  title: "Input Group",
  description,
}

const usageImport = `import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/cubix/input-group"`

const usageSnippet = `<InputGroup>
  <InputGroupInput placeholder="Search..." />
  <InputGroupAddon>
    <SearchIcon />
  </InputGroupAddon>
</InputGroup>`

const compositionSnippet = `InputGroup
├── InputGroupInput or InputGroupTextarea
├── InputGroupAddon
├── InputGroupButton
└── InputGroupText`

const demoSnippet = `<InputGroup className="max-w-xs">
  <InputGroupInput placeholder="Search..." />
  <InputGroupAddon>
    <SearchIcon />
  </InputGroupAddon>
  <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
</InputGroup>`

const inlineStartSnippet = `<InputGroup>
  <InputGroupInput placeholder="Search..." />
  <InputGroupAddon align="inline-start">
    <SearchIcon />
  </InputGroupAddon>
</InputGroup>`

const inlineEndSnippet = `<InputGroup>
  <InputGroupInput type="password" placeholder="Enter password" />
  <InputGroupAddon align="inline-end">
    <EyeOffIcon />
  </InputGroupAddon>
</InputGroup>`

const blockStartSnippet = `<InputGroup>
  <InputGroupInput placeholder="Enter your name" />
  <InputGroupAddon align="block-start">
    <InputGroupText>Full Name</InputGroupText>
  </InputGroupAddon>
</InputGroup>`

const blockEndSnippet = `<InputGroup>
  <InputGroupTextarea placeholder="Write a comment..." />
  <InputGroupAddon align="block-end">
    <InputGroupText>0/280</InputGroupText>
    <InputGroupButton variant="default" size="sm" className="ml-auto">
      Post
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>`

export default function InputGroupDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Input Group"
        description={description}
        slug="input-group"
      />

      <ComponentPreview code={demoSnippet} previewClassName="min-h-[26rem]">
        <InputGroupDemo />
      </ComponentPreview>

      <ComponentInstall name="input-group" />

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
          Use the following composition to build an{" "}
          <code className="font-mono text-sm">InputGroup</code>:
        </p>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Align</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the <code className="font-mono text-sm">align</code> prop on{" "}
          <code className="font-mono text-sm">InputGroupAddon</code> to position
          the addon relative to the input. For proper focus management, place{" "}
          <code className="font-mono text-sm">InputGroupAddon</code> after the
          control in the DOM and use <code className="font-mono text-sm">align</code>{" "}
          for visual position.
        </p>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            inline-start
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Use{" "}
            <code className="font-mono text-sm">align=&quot;inline-start&quot;</code>{" "}
            to position the addon at the start of the input. This is the
            default.
          </p>
          <ComponentPreview code={inlineStartSnippet} previewClassName="min-h-48">
            <InputGroupInlineStartDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            inline-end
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Use{" "}
            <code className="font-mono text-sm">align=&quot;inline-end&quot;</code>{" "}
            to position the addon at the end of the input.
          </p>
          <ComponentPreview code={inlineEndSnippet} previewClassName="min-h-48">
            <InputGroupInlineEndDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            block-start
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Use{" "}
            <code className="font-mono text-sm">align=&quot;block-start&quot;</code>{" "}
            to position the addon above the input.
          </p>
          <ComponentPreview code={blockStartSnippet} previewClassName="min-h-96">
            <InputGroupBlockStartDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            block-end
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Use{" "}
            <code className="font-mono text-sm">align=&quot;block-end&quot;</code>{" "}
            to position the addon below the input.
          </p>
          <ComponentPreview
            code={blockEndSnippet}
            previewClassName="min-h-[26rem]"
          >
            <InputGroupBlockEndDemo />
          </ComponentPreview>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Icon</h2>
        <ComponentPreview
          code={`<InputGroup>
  <InputGroupInput placeholder="Search..." />
  <InputGroupAddon>
    <SearchIcon />
  </InputGroupAddon>
</InputGroup>`}
          previewClassName="min-h-80"
        >
          <InputGroupIconDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Text</h2>
        <ComponentPreview
          code={`<InputGroup>
  <InputGroupAddon>
    <InputGroupText>$</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput placeholder="0.00" />
  <InputGroupAddon align="inline-end">
    <InputGroupText>USD</InputGroupText>
  </InputGroupAddon>
</InputGroup>`}
          previewClassName="min-h-80"
        >
          <InputGroupTextDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Button</h2>
        <ComponentPreview
          code={`<InputGroup>
  <InputGroupInput placeholder="Type to search..." />
  <InputGroupAddon align="inline-end">
    <InputGroupButton variant="secondary">Search</InputGroupButton>
  </InputGroupAddon>
</InputGroup>`}
          previewClassName="min-h-72"
        >
          <InputGroupButtonDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Kbd</h2>
        <ComponentPreview
          code={`<InputGroup>
  <InputGroupInput placeholder="Search..." />
  <InputGroupAddon>
    <SearchIcon />
  </InputGroupAddon>
  <InputGroupAddon align="inline-end">
    <Kbd>⌘K</Kbd>
  </InputGroupAddon>
</InputGroup>`}
          previewClassName="min-h-40"
        >
          <InputGroupKbdDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Dropdown</h2>
        <ComponentPreview
          code={`<InputGroup>
  <InputGroupInput placeholder="Enter file name" />
  <InputGroupAddon align="inline-end">
    <DropdownMenu>
      <DropdownMenuTrigger render={<InputGroupButton size="icon-xs" />}>
        <MoreHorizontalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Settings</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </InputGroupAddon>
</InputGroup>`}
          previewClassName="min-h-56"
        >
          <InputGroupDropdownDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Spinner</h2>
        <ComponentPreview
          code={`<InputGroup>
  <InputGroupInput placeholder="Searching..." />
  <InputGroupAddon align="inline-end">
    <LoaderIcon className="animate-spin" />
  </InputGroupAddon>
</InputGroup>`}
          previewClassName="min-h-80"
        >
          <InputGroupSpinnerDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Textarea</h2>
        <ComponentPreview
          code={`<InputGroup>
  <InputGroupTextarea placeholder="console.log('Hello, world!');" />
  <InputGroupAddon align="block-start" className="border-b">
    <InputGroupText>script.js</InputGroupText>
  </InputGroupAddon>
  <InputGroupAddon align="block-end" className="border-t">
    <InputGroupButton size="sm" variant="default" className="ml-auto">
      Run
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>`}
          previewClassName="min-h-96"
        >
          <InputGroupTextareaDemo />
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            InputGroup
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            The main component that wraps inputs and addons.
          </p>
          <PropsTable data={inputGroupPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            InputGroupAddon
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Displays icons, text, buttons, or other content alongside inputs.
            Place it after the input in the DOM and set{" "}
            <code className="font-mono text-sm">align</code> for visual
            position. Prefer{" "}
            <code className="font-mono text-sm">inline-*</code> with{" "}
            <code className="font-mono text-sm">InputGroupInput</code> and{" "}
            <code className="font-mono text-sm">block-*</code> with{" "}
            <code className="font-mono text-sm">InputGroupTextarea</code>.
          </p>
          <PropsTable data={addonPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            InputGroupButton
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Displays buttons within input groups.
          </p>
          <PropsTable data={buttonPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            InputGroupInput
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Replacement for{" "}
            <code className="font-mono text-sm">Input</code> inside groups.
            Uses <code className="font-mono text-sm">data-slot=&quot;input-group-control&quot;</code>{" "}
            for focus styling.
          </p>
          <PropsTable data={controlPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            InputGroupTextarea
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Replacement for{" "}
            <code className="font-mono text-sm">Textarea</code> inside groups.
          </p>
          <PropsTable data={controlPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            InputGroupText
          </h3>
          <PropsTable data={controlPropRows} />
        </div>
      </section>
    </article>
  )
}
