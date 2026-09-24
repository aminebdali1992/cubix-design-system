import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  EmptyAvatarDemo,
  EmptyAvatarGroupDemo,
  EmptyBackgroundDemo,
  EmptyDemo,
  EmptyInputGroupDemo,
  EmptyOutlineDemo,
} from "@/components/examples/empty-examples"

import {
  emptyMediaPropRows,
  emptyPropRows,
  emptySubcomponentRows,
} from "./empty-table-data"

const description = "Use the Empty component to display an empty state."

export const metadata: Metadata = {
  title: "Empty",
  description,
}

const usageImport = `import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/cubix/empty"`

const usageSnippet = `<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <Icon />
    </EmptyMedia>
    <EmptyTitle>No data</EmptyTitle>
    <EmptyDescription>No data found</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>Add data</Button>
  </EmptyContent>
</Empty>`

const compositionSnippet = `Empty
├── EmptyHeader
│   ├── EmptyMedia
│   ├── EmptyTitle
│   └── EmptyDescription
└── EmptyContent`

const outlineSnippet = `<Empty className="border border-dashed">
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <CloudIcon />
    </EmptyMedia>
    <EmptyTitle>Cloud Storage Empty</EmptyTitle>
    <EmptyDescription>
      Upload files to your cloud storage to access them anywhere.
    </EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button variant="outline" size="sm">Upload Files</Button>
  </EmptyContent>
</Empty>`

const backgroundSnippet = `<Empty className="from-muted/50 h-full bg-gradient-to-b from-30% to-background">
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <BellIcon />
    </EmptyMedia>
    <EmptyTitle>No Notifications</EmptyTitle>
    <EmptyDescription>
      You're all caught up. New notifications will appear here.
    </EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button variant="outline" size="sm">
      <RefreshCcwIcon />
      Refresh
    </Button>
  </EmptyContent>
</Empty>`

const avatarSnippet = `<Empty>
  <EmptyHeader>
    <EmptyMedia>
      <Avatar className="size-12">
        <AvatarImage src="..." />
        <AvatarFallback>LR</AvatarFallback>
      </Avatar>
    </EmptyMedia>
    <EmptyTitle>User Offline</EmptyTitle>
    <EmptyDescription>
      This user is currently offline.
    </EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button size="sm">Leave Message</Button>
  </EmptyContent>
</Empty>`

const avatarGroupSnippet = `<Empty>
  <EmptyHeader>
    <EmptyMedia>
      <div className="flex -space-x-2">
        <Avatar>...</Avatar>
        <Avatar>...</Avatar>
        <Avatar>...</Avatar>
      </div>
    </EmptyMedia>
    <EmptyTitle>No Team Members</EmptyTitle>
    <EmptyDescription>
      Invite your team to collaborate on this project.
    </EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button size="sm">
      <PlusIcon />
      Invite Members
    </Button>
  </EmptyContent>
</Empty>`

const inputGroupSnippet = `<Empty>
  <EmptyHeader>
    <EmptyTitle>404 - Not Found</EmptyTitle>
    <EmptyDescription>
      The page you're looking for doesn't exist.
    </EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <InputGroup className="sm:w-3/4">
      <InputGroupInput placeholder="Try searching for pages..." />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  </EmptyContent>
</Empty>`

export default function EmptyDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Empty"
        description={description}
        slug="empty"
      />

      <ComponentPreview code={usageSnippet}>
        <EmptyDemo />
      </ComponentPreview>

      <ComponentInstall name="empty" />

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
          <code className="font-mono text-sm">Empty</code> state:
        </p>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Outline</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the <code className="font-mono text-sm">border</code> utility
          class to create an outline empty state.
        </p>
        <ComponentPreview code={outlineSnippet}>
          <EmptyOutlineDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Background
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the <code className="font-mono text-sm">bg-*</code> and{" "}
          <code className="font-mono text-sm">bg-gradient-*</code> utilities to
          add a background to the empty state.
        </p>
        <ComponentPreview code={backgroundSnippet}>
          <EmptyBackgroundDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Avatar</h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the <code className="font-mono text-sm">EmptyMedia</code> component
          to display an avatar in the empty state.
        </p>
        <ComponentPreview code={avatarSnippet}>
          <EmptyAvatarDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Avatar Group
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the <code className="font-mono text-sm">EmptyMedia</code> component
          to display an avatar group in the empty state.
        </p>
        <ComponentPreview code={avatarGroupSnippet}>
          <EmptyAvatarGroupDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Input Group
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          You can add an{" "}
          <code className="font-mono text-sm">InputGroup</code> component to the{" "}
          <code className="font-mono text-sm">EmptyContent</code> component.
        </p>
        <ComponentPreview code={inputGroupSnippet}>
          <EmptyInputGroupDemo />
        </ComponentPreview>
      </section>

      <section id="api-reference" className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Empty</h3>
          <p className="leading-relaxed text-muted-foreground">
            The main component of the empty state. Wraps the{" "}
            <code className="font-mono text-sm">EmptyHeader</code> and{" "}
            <code className="font-mono text-sm">EmptyContent</code> components.
          </p>
          <PropsTable data={emptyPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            EmptyHeader
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Wraps the empty media, title, and description.
          </p>
          <PropsTable data={emptySubcomponentRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            EmptyMedia
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Display media such as an icon, image, or avatar.
          </p>
          <PropsTable data={emptyMediaPropRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            EmptyTitle
          </h3>
          <PropsTable data={emptySubcomponentRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            EmptyDescription
          </h3>
          <PropsTable data={emptySubcomponentRows} />
        </div>

        <div className="space-y-3">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            EmptyContent
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Display actions such as a button, input, or link.
          </p>
          <PropsTable data={emptySubcomponentRows} />
        </div>
      </section>
    </article>
  )
}
