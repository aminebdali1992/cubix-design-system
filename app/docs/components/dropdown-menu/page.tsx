import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CircleAlertIcon } from "lucide-react";

import { CodeBlock } from "@/components/docs/code-block";
import { ComponentDocsHeader } from "@/components/docs/component-docs-header";
import { ComponentInstall } from "@/components/docs/component-install";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import {
  DropdownMenuAvatarDemo,
  DropdownMenuBasicDemo,
  DropdownMenuCheckboxesDemo,
  DropdownMenuCheckboxesIconsDemo,
  DropdownMenuComplexDemo,
  DropdownMenuDemo,
  DropdownMenuDestructiveDemo,
  DropdownMenuIconsDemo,
  DropdownMenuRadioGroupDemo,
  DropdownMenuRadioIconsDemo,
  DropdownMenuRtlDemo,
  DropdownMenuShortcutsDemo,
  DropdownMenuSubmenuDemo,
} from "@/components/examples/dropdown-menu-examples";
import {
  checkboxItemPropRows,
  contentPropRows,
  itemPropRows,
  menuPropRows,
  radioGroupPropRows,
  radioItemPropRows,
  triggerPropRows,
} from "./dropdown-menu-table-data";

export const metadata: Metadata = {
  title: "Dropdown Menu",
  description:
    "Displays a menu to the user - such as a set of actions or functions - triggered by a button.",
};

const usageImport = `import { Button } from "@/components/cubix/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/cubix/dropdown-menu"`;

const usageSnippet = `<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline" />}>
Open
</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuGroup>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Billing</DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem>Team</DropdownMenuItem>
      <DropdownMenuItem>Subscription</DropdownMenuItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>`;

const compositionSnippet = `DropdownMenu
├── DropdownMenuTrigger
└── DropdownMenuContent
    ├── DropdownMenuGroup
    │   ├── DropdownMenuLabel
    │   ├── DropdownMenuItem
    │   └── DropdownMenuItem
    ├── DropdownMenuSeparator
    ├── DropdownMenuGroup
    │   ├── DropdownMenuLabel
    │   ├── DropdownMenuCheckboxItem
    │   └── DropdownMenuCheckboxItem
    ├── DropdownMenuSeparator
    ├── DropdownMenuGroup
    │   ├── DropdownMenuLabel
    │   └── DropdownMenuRadioGroup
    │       ├── DropdownMenuRadioItem
    │       └── DropdownMenuRadioItem
    └── DropdownMenuSub
        ├── DropdownMenuSubTrigger
        └── DropdownMenuSubContent
            └── DropdownMenuGroup
                ├── DropdownMenuLabel
                ├── DropdownMenuItem
                └── DropdownMenuItem`;

const basicSnippet = `<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline" />}>
Open
</DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuGroup>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Billing</DropdownMenuItem>
      <DropdownMenuItem>Settings</DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem>GitHub</DropdownMenuItem>
      <DropdownMenuItem>Support</DropdownMenuItem>
      <DropdownMenuItem>API</DropdownMenuItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>`;

const submenuSnippet = `<DropdownMenuSub>
  <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
  <DropdownMenuSubContent>
    <DropdownMenuItem>Email</DropdownMenuItem>
    <DropdownMenuItem>Message</DropdownMenuItem>
    <DropdownMenuItem>More...</DropdownMenuItem>
  </DropdownMenuSubContent>
</DropdownMenuSub>`;

const shortcutsSnippet = `<DropdownMenuItem>
  Profile
  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
</DropdownMenuItem>`;

const iconsSnippet = `<DropdownMenuItem>
  <UserIcon />
  Profile
</DropdownMenuItem>`;

const checkboxesSnippet = `<DropdownMenuCheckboxItem
  checked={statusBar}
  onCheckedChange={setStatusBar}
>
  Status Bar
</DropdownMenuCheckboxItem>`;

const checkboxesIconsSnippet = `<DropdownMenuCheckboxItem
  checked={notifications.email}
  onCheckedChange={setEmail}
>
  <MailIcon />
  Email notifications
</DropdownMenuCheckboxItem>`;

const radioSnippet = `<DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
  <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
  <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
  <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
</DropdownMenuRadioGroup>`;

const radioIconsSnippet = `<DropdownMenuRadioItem value="card">
  <CreditCardIcon />
  Credit Card
</DropdownMenuRadioItem>`;

const destructiveSnippet = `<DropdownMenuItem variant="destructive">
  <Trash2Icon />
  Delete
</DropdownMenuItem>`;

const avatarSnippet = `<DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="rounded-full" />}>
CN
</DropdownMenuTrigger>`;

const complexSnippet = `<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline" />}>
Open
</DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuCheckboxItem>Sidebar</DropdownMenuCheckboxItem>
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Invite Users</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem>Email</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  </DropdownMenuContent>
</DropdownMenu>`;

const rtlSnippet = `<div dir="rtl">
  <DropdownMenu>
    <DropdownMenuTrigger render={<Button variant="outline" />}>
باز کردن
</DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      <DropdownMenuItem>پروفایل</DropdownMenuItem>
      <DropdownMenuItem>تنظیمات</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</div>`;

function Example({
  title,
  description,
  code,
  children,
}: {
  title: string;
  description: ReactNode;
  code: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-4">
      <h3 className="scroll-m-20 font-semibold tracking-tight">
        {title}
      </h3>
      <p className="leading-relaxed text-muted-foreground">{description}</p>
      <ComponentPreview code={code}>{children}</ComponentPreview>
    </div>
  );
}

export default function DropdownMenuPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Dropdown Menu"
        description="Displays a menu of actions or links to the user, triggered by a button."
        slug="dropdown-menu"
      />

      <ComponentPreview code={usageSnippet}>
        <DropdownMenuDemo />
      </ComponentPreview>

      <ComponentInstall name="dropdown-menu" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Usage
        </h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Composition
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Use the following composition to build a{" "}
          <code className="font-mono text-sm">DropdownMenu</code>:
        </p>
        <CodeBlock code={compositionSnippet} title="Composition" />
      </section>

      <section className="space-y-6">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Examples
        </h2>

        <Example
          title="Basic"
          description="A basic dropdown menu with labels and separators."
          code={basicSnippet}
        >
          <DropdownMenuBasicDemo />
        </Example>

        <Example
          title="Submenu"
          description={
            <>
              Use <code className="font-mono text-sm">DropdownMenuSub</code> to
              nest secondary actions.
            </>
          }
          code={submenuSnippet}
        >
          <DropdownMenuSubmenuDemo />
        </Example>

        <Example
          title="Shortcuts"
          description={
            <>
              Add <code className="font-mono text-sm">DropdownMenuShortcut</code>{" "}
              to show keyboard hints.
            </>
          }
          code={shortcutsSnippet}
        >
          <DropdownMenuShortcutsDemo />
        </Example>

        <Example
          title="Icons"
          description="Combine icons with labels for quick scanning."
          code={iconsSnippet}
        >
          <DropdownMenuIconsDemo />
        </Example>

        <Example
          title="Checkboxes"
          description={
            <>
              Use{" "}
              <code className="font-mono text-sm">DropdownMenuCheckboxItem</code>{" "}
              for toggles.
            </>
          }
          code={checkboxesSnippet}
        >
          <DropdownMenuCheckboxesDemo />
        </Example>

        <Example
          title="Checkboxes Icons"
          description="Add icons to checkbox items."
          code={checkboxesIconsSnippet}
        >
          <DropdownMenuCheckboxesIconsDemo />
        </Example>

        <Example
          title="Radio Group"
          description={
            <>
              Use{" "}
              <code className="font-mono text-sm">DropdownMenuRadioGroup</code>{" "}
              for exclusive choices.
            </>
          }
          code={radioSnippet}
        >
          <DropdownMenuRadioGroupDemo />
        </Example>

        <Example
          title="Radio Icons"
          description="Show radio options with icons."
          code={radioIconsSnippet}
        >
          <DropdownMenuRadioIconsDemo />
        </Example>

        <Example
          title="Destructive"
          description={
            <>
              Use <code className="font-mono text-sm">variant=&quot;destructive&quot;</code>{" "}
              for irreversible actions.
            </>
          }
          code={destructiveSnippet}
        >
          <DropdownMenuDestructiveDemo />
        </Example>

        <Example
          title="Avatar"
          description="An account switcher dropdown triggered by an avatar."
          code={avatarSnippet}
        >
          <DropdownMenuAvatarDemo />
        </Example>

        <Example
          title="Complex"
          description="A richer example combining groups, icons, and submenus."
          code={complexSnippet}
        >
          <DropdownMenuComplexDemo />
        </Example>

        <Example
          title="RTL"
          description="Wrap the menu in a RTL container to mirror layout and chevrons."
          code={rtlSnippet}
        >
          <DropdownMenuRtlDemo />
        </Example>
      </section>

      <section id="api-reference" className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          API Reference
        </h2>
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Note:</strong> The menu is not
            modal. Escape, Tab, and clicking outside close it, and focus
            returns to the trigger. Use arrow keys to move between items.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">DropdownMenu</h3>
        <p className="leading-relaxed text-muted-foreground">
          The container that wraps the trigger and content and manages open
          state.
        </p>
        <PropsTable data={menuPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          DropdownMenuTrigger
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          The element that opens the menu. Use{" "}
          <code className="font-mono text-sm">render</code> to merge onto a
          Button.
        </p>
        <PropsTable data={triggerPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          DropdownMenuContent
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          The menu panel rendered in a portal next to the trigger.
        </p>
        <PropsTable data={contentPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          DropdownMenuItem
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          An action inside the menu. Selecting it closes the menu.
        </p>
        <PropsTable data={itemPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          DropdownMenuCheckboxItem
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          A checkable item. The menu stays open after toggling.
        </p>
        <PropsTable data={checkboxItemPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          DropdownMenuRadioGroup
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          A set of mutually exclusive items. The menu stays open after a
          change.
        </p>
        <PropsTable data={radioGroupPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">
          DropdownMenuRadioItem
        </h3>
        <p className="leading-relaxed text-muted-foreground">
          One option inside a radio group.{" "}
          <code className="font-mono text-sm">value</code> is required.
        </p>
        <PropsTable data={radioItemPropRows} />
      </section>
    </article>
  );
}
