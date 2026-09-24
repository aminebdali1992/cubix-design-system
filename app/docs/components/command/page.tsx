import type { Metadata } from "next"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  CommandBasicDemo,
  CommandDemo,
  CommandGroupsDemo,
  CommandScrollableDemo,
  CommandShortcutsDemo,
} from "@/components/examples/command-examples"
import {
  commandPropRows,
  dialogPropRows,
  groupPropRows,
  inputPropRows,
  itemPropRows,
} from "./command-table-data"

const description = "Command menu for search and quick actions."

export const metadata: Metadata = {
  title: "Command",
  description,
}

const usageImport = `import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/cubix/command"`

const usageSnippet = `<Command className="max-w-sm rounded-lg border">
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search Emoji</CommandItem>
      <CommandItem>Calculator</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>Profile</CommandItem>
      <CommandItem>Billing</CommandItem>
      <CommandItem>Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`

const compositionSnippet = `Command
├── CommandInput
└── CommandList
    ├── CommandEmpty
    ├── CommandGroup
    │   ├── CommandItem
    │   └── CommandItem
    ├── CommandSeparator
    └── CommandGroup
        ├── CommandItem
        └── CommandItem`

const demoSnippet = `<Command className="max-w-sm rounded-lg border">
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>
        <CalendarIcon />
        <span>Calendar</span>
      </CommandItem>
      <CommandItem>
        <SmileIcon />
        <span>Search Emoji</span>
      </CommandItem>
      <CommandItem disabled>
        <CalculatorIcon />
        <span>Calculator</span>
      </CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>
        <UserIcon />
        <span>Profile</span>
        <CommandShortcut>⌘P</CommandShortcut>
      </CommandItem>
      <CommandItem>
        <CreditCardIcon />
        <span>Billing</span>
        <CommandShortcut>⌘B</CommandShortcut>
      </CommandItem>
      <CommandItem>
        <SettingsIcon />
        <span>Settings</span>
        <CommandShortcut>⌘S</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`

const basicSnippet = `const [open, setOpen] = React.useState(false)

<div className="flex flex-col gap-4">
  <Button onClick={() => setOpen(true)} variant="outline" className="w-fit">
    Open Menu
  </Button>
  <CommandDialog open={open} onOpenChange={setOpen}>
    <Command>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  </CommandDialog>
</div>`

const shortcutsSnippet = `const [open, setOpen] = React.useState(false)

<CommandDialog open={open} onOpenChange={setOpen}>
  <Command>
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Settings">
        <CommandItem>
          <UserIcon />
          <span>Profile</span>
          <CommandShortcut>⌘P</CommandShortcut>
        </CommandItem>
        <CommandItem>
          <CreditCardIcon />
          <span>Billing</span>
          <CommandShortcut>⌘B</CommandShortcut>
        </CommandItem>
        <CommandItem>
          <SettingsIcon />
          <span>Settings</span>
          <CommandShortcut>⌘S</CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</CommandDialog>`

const groupsSnippet = `const [open, setOpen] = React.useState(false)

<CommandDialog open={open} onOpenChange={setOpen}>
  <Command>
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem>
          <CalendarIcon />
          <span>Calendar</span>
        </CommandItem>
        <CommandItem>
          <SmileIcon />
          <span>Search Emoji</span>
        </CommandItem>
        <CommandItem>
          <CalculatorIcon />
          <span>Calculator</span>
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Settings">
        <CommandItem>
          <UserIcon />
          <span>Profile</span>
          <CommandShortcut>⌘P</CommandShortcut>
        </CommandItem>
        <CommandItem>
          <CreditCardIcon />
          <span>Billing</span>
          <CommandShortcut>⌘B</CommandShortcut>
        </CommandItem>
        <CommandItem>
          <SettingsIcon />
          <span>Settings</span>
          <CommandShortcut>⌘S</CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</CommandDialog>`

const scrollableSnippet = `const [open, setOpen] = React.useState(false)

<CommandDialog open={open} onOpenChange={setOpen}>
  <Command>
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Navigation">
        <CommandItem>
          <HomeIcon />
          <span>Home</span>
          <CommandShortcut>⌘H</CommandShortcut>
        </CommandItem>
        <CommandItem>
          <InboxIcon />
          <span>Inbox</span>
          <CommandShortcut>⌘I</CommandShortcut>
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Actions">
        <CommandItem>
          <PlusIcon />
          <span>New File</span>
          <CommandShortcut>⌘N</CommandShortcut>
        </CommandItem>
        <CommandItem>
          <TrashIcon />
          <span>Delete</span>
          <CommandShortcut>⌫</CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</CommandDialog>`

export default function CommandDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Command"
        description={description}
        slug="command"
      />

      <ComponentPreview
        code={demoSnippet}
        align="start"
        previewClassName="h-[24.5rem] [&>[data-slot=command]]:h-full"
      >
        <CommandDemo />
      </ComponentPreview>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">About</h2>
        <p className="leading-relaxed text-muted-foreground">
          The <code className="font-mono text-sm">Command</code> component uses
          the{" "}
          <a
            href="https://github.com/dip/cmdk"
            className="font-medium text-foreground underline decoration-dotted decoration-1 underline-offset-[6px] [text-decoration-skip-ink:none]"
            rel="noreferrer"
            target="_blank"
          >
            cmdk
          </a>{" "}
          component by{" "}
          <a
            href="https://www.dip.org/"
            className="font-medium text-foreground underline decoration-dotted decoration-1 underline-offset-[6px] [text-decoration-skip-ink:none]"
            rel="noreferrer"
            target="_blank"
          >
            Dip
          </a>
          .
        </p>
      </section>

      <ComponentInstall name="command" />

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
          <code className="font-mono text-sm">Command</code>:
        </p>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Basic</h3>
          <p className="leading-relaxed text-muted-foreground">
            A simple command menu in a dialog.
          </p>
          <ComponentPreview code={basicSnippet}>
            <CommandBasicDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Shortcuts
          </h3>
          <ComponentPreview code={shortcutsSnippet}>
            <CommandShortcutsDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Groups</h3>
          <p className="leading-relaxed text-muted-foreground">
            A command menu with groups, icons and separators.
          </p>
          <ComponentPreview code={groupsSnippet}>
            <CommandGroupsDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Scrollable
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Scrollable command menu with multiple items.
          </p>
          <ComponentPreview code={scrollableSnippet}>
            <CommandScrollableDemo />
          </ComponentPreview>
        </div>
      </section>

      <section id="api-reference" className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> See the{" "}
            <a
              href="https://github.com/dip/cmdk"
              className="font-medium text-foreground underline decoration-dotted decoration-1 underline-offset-[6px] [text-decoration-skip-ink:none]"
              rel="noreferrer"
              target="_blank"
            >
              cmdk
            </a>{" "}
            documentation for more information.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Command</h3>
          <p className="leading-relaxed text-muted-foreground">
            The root that provides search context to input, list, and items.
          </p>
          <PropsTable data={commandPropRows} />
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            CommandDialog
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Wraps Command in a dialog for a palette overlay.
          </p>
          <PropsTable data={dialogPropRows} />
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            CommandInput
          </h3>
          <PropsTable data={inputPropRows} />
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            CommandGroup
          </h3>
          <PropsTable data={groupPropRows} />
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            CommandItem
          </h3>
          <PropsTable data={itemPropRows} />
        </div>
      </section>
    </article>
  )
}
