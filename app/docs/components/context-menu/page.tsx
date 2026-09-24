import type { Metadata } from "next"
import { CircleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentDocsHeader } from "@/components/docs/component-docs-header"
import { ComponentInstall } from "@/components/docs/component-install"
import { ComponentPreview } from "@/components/docs/component-preview"
import { PropsTable } from "@/components/docs/props-table"
import {
  ContextMenuBasicDemo,
  ContextMenuCheckboxesDemo,
  ContextMenuDemo,
  ContextMenuDestructiveDemo,
  ContextMenuGroupsDemo,
  ContextMenuIconsDemo,
  ContextMenuRadioDemo,
  ContextMenuShortcutsDemo,
  ContextMenuSidesDemo,
  ContextMenuSubmenuDemo,
} from "@/components/examples/context-menu-examples"
import {
  checkboxItemPropRows,
  contentPropRows,
  itemPropRows,
  menuPropRows,
  radioGroupPropRows,
  radioItemPropRows,
  triggerPropRows,
} from "./context-menu-table-data"

const description = "Displays a menu of actions triggered by a right click."

export const metadata: Metadata = {
  title: "Context Menu",
  description,
}

const usageImport = `import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/cubix/context-menu"`

const usageSnippet = `<ContextMenu>
  <ContextMenuTrigger>Right click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Profile</ContextMenuItem>
    <ContextMenuItem>Billing</ContextMenuItem>
    <ContextMenuItem>Team</ContextMenuItem>
    <ContextMenuItem>Subscription</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`

const compositionSnippet = `ContextMenu
├── ContextMenuTrigger
└── ContextMenuContent
    ├── ContextMenuGroup
    │   ├── ContextMenuLabel
    │   ├── ContextMenuItem
    │   └── ContextMenuItem
    ├── ContextMenuSeparator
    ├── ContextMenuGroup
    │   ├── ContextMenuLabel
    │   ├── ContextMenuCheckboxItem
    │   └── ContextMenuCheckboxItem
    ├── ContextMenuSeparator
    ├── ContextMenuGroup
    │   ├── ContextMenuLabel
    │   └── ContextMenuRadioGroup
    │       ├── ContextMenuRadioItem
    │       └── ContextMenuRadioItem
    └── ContextMenuSub
        ├── ContextMenuSubTrigger
        └── ContextMenuSubContent
            └── ContextMenuGroup
                ├── ContextMenuItem
                └── ContextMenuItem`

const demoSnippet = `<ContextMenu>
  <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm">
    Right click here
  </ContextMenuTrigger>
  <ContextMenuContent className="w-48">
    <ContextMenuItem>
      Back
      <ContextMenuShortcut>⌘[</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem disabled>
      Forward
      <ContextMenuShortcut>⌘]</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuSub>
      <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
      <ContextMenuSubContent>
        <ContextMenuItem>Save Page...</ContextMenuItem>
        <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
      </ContextMenuSubContent>
    </ContextMenuSub>
    <ContextMenuSeparator />
    <ContextMenuCheckboxItem checked>Show Bookmarks</ContextMenuCheckboxItem>
    <ContextMenuRadioGroup value="pedro">
      <ContextMenuLabel>People</ContextMenuLabel>
      <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
    </ContextMenuRadioGroup>
  </ContextMenuContent>
</ContextMenu>`

const basicSnippet = `<ContextMenu>
  <ContextMenuTrigger>Right click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuGroup>
      <ContextMenuItem>Back</ContextMenuItem>
      <ContextMenuItem disabled>Forward</ContextMenuItem>
      <ContextMenuItem>Reload</ContextMenuItem>
    </ContextMenuGroup>
  </ContextMenuContent>
</ContextMenu>`

const submenuSnippet = `<ContextMenuSub>
  <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
  <ContextMenuSubContent>
    <ContextMenuItem>Save Page...</ContextMenuItem>
    <ContextMenuItem>Create Shortcut...</ContextMenuItem>
    <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
  </ContextMenuSubContent>
</ContextMenuSub>`

const shortcutsSnippet = `<ContextMenuItem>
  Back
  <ContextMenuShortcut>⌘[</ContextMenuShortcut>
</ContextMenuItem>`

const groupsSnippet = `<ContextMenuGroup>
  <ContextMenuLabel>File</ContextMenuLabel>
  <ContextMenuItem>New File</ContextMenuItem>
</ContextMenuGroup>
<ContextMenuSeparator />
<ContextMenuGroup>
  <ContextMenuLabel>Edit</ContextMenuLabel>
  <ContextMenuItem>Undo</ContextMenuItem>
</ContextMenuGroup>`

const iconsSnippet = `<ContextMenuItem>
  <CopyIcon />
  Copy
</ContextMenuItem>`

const checkboxesSnippet = `<ContextMenuCheckboxItem defaultChecked>
  Show Bookmarks Bar
</ContextMenuCheckboxItem>
<ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>`

const radioSnippet = `const [user, setUser] = React.useState("pedro")

<ContextMenuRadioGroup value={user} onValueChange={setUser}>
  <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
  <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
</ContextMenuRadioGroup>`

const destructiveSnippet = `<ContextMenuItem variant="destructive">
  <TrashIcon />
  Delete
</ContextMenuItem>`

const sidesSnippet = `<ContextMenuContent side="top">
  <ContextMenuItem>Back</ContextMenuItem>
</ContextMenuContent>`

export default function ContextMenuDocsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Context Menu"
        description={description}
        slug="context-menu"
      />

      <ComponentPreview code={demoSnippet}>
        <ContextMenuDemo />
      </ComponentPreview>

      <ComponentInstall name="context-menu" />

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
          <code className="font-mono text-sm">ContextMenu</code>:
        </p>
        <CodeBlock code={compositionSnippet} />
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">Examples</h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Basic</h3>
          <p className="leading-relaxed text-muted-foreground">
            A simple context menu with a few actions.
          </p>
          <ComponentPreview code={basicSnippet}>
            <ContextMenuBasicDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Submenu</h3>
          <p className="leading-relaxed text-muted-foreground">
            Use <code className="font-mono text-sm">ContextMenuSub</code> to
            nest secondary actions.
          </p>
          <ComponentPreview code={submenuSnippet}>
            <ContextMenuSubmenuDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Shortcuts
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Add <code className="font-mono text-sm">ContextMenuShortcut</code>{" "}
            to show keyboard hints.
          </p>
          <ComponentPreview code={shortcutsSnippet}>
            <ContextMenuShortcutsDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Groups</h3>
          <p className="leading-relaxed text-muted-foreground">
            Group related actions and separate them with dividers.
          </p>
          <ComponentPreview code={groupsSnippet}>
            <ContextMenuGroupsDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Icons</h3>
          <p className="leading-relaxed text-muted-foreground">
            Combine icons with labels for quick scanning.
          </p>
          <ComponentPreview code={iconsSnippet}>
            <ContextMenuIconsDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Checkboxes
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Use{" "}
            <code className="font-mono text-sm">ContextMenuCheckboxItem</code>{" "}
            for toggles.
          </p>
          <ComponentPreview code={checkboxesSnippet}>
            <ContextMenuCheckboxesDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Radio</h3>
          <p className="leading-relaxed text-muted-foreground">
            Use <code className="font-mono text-sm">ContextMenuRadioItem</code>{" "}
            for exclusive choices.
          </p>
          <ComponentPreview code={radioSnippet}>
            <ContextMenuRadioDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Destructive
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Use <code className="font-mono text-sm">variant=&quot;destructive&quot;</code>{" "}
            to style the menu item as destructive.
          </p>
          <ComponentPreview code={destructiveSnippet}>
            <ContextMenuDestructiveDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">Sides</h3>
          <p className="leading-relaxed text-muted-foreground">
            Control submenu placement with{" "}
            <code className="font-mono text-sm">side</code> and{" "}
            <code className="font-mono text-sm">align</code> props.
          </p>
          <ComponentPreview code={sidesSnippet}>
            <ContextMenuSidesDemo />
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
              href="https://base-ui.com/react/components/context-menu"
              className="font-medium text-foreground underline decoration-dotted decoration-1 underline-offset-[6px] [text-decoration-skip-ink:none]"
              rel="noreferrer"
              target="_blank"
            >
              Base UI
            </a>{" "}
            documentation for more information.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            ContextMenu
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            The container that wraps the trigger and content and manages open
            state.
          </p>
          <PropsTable data={menuPropRows} />
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            ContextMenuTrigger
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            The area that opens the menu on right click or long press.
          </p>
          <PropsTable data={triggerPropRows} />
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            ContextMenuContent
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            The menu panel rendered in a portal next to the pointer.
          </p>
          <PropsTable data={contentPropRows} />
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            ContextMenuItem
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            An action inside the menu. Selecting it closes the menu.
          </p>
          <PropsTable data={itemPropRows} />
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            ContextMenuCheckboxItem
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            A checkable item. The menu stays open after toggling.
          </p>
          <PropsTable data={checkboxItemPropRows} />
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            ContextMenuRadioGroup
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            A set of mutually exclusive items. The menu stays open after a
            change.
          </p>
          <PropsTable data={radioGroupPropRows} />
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            ContextMenuRadioItem
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            One option inside a radio group.{" "}
            <code className="font-mono text-sm">value</code> is required.
          </p>
          <PropsTable data={radioItemPropRows} />
        </div>
      </section>
    </article>
  )
}
