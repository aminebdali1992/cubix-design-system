import type { Metadata } from "next";
import { BellIcon, ChevronRightIcon, CircleAlertIcon, UserIcon } from "lucide-react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/cubix/tabs";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentDocsHeader } from "@/components/docs/component-docs-header";
import { ComponentInstall } from "@/components/docs/component-install";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import {
  tabsContentPropRows,
  tabsListPropRows,
  tabsPropRows,
  tabsTriggerPropRows,
} from "./tabs-table-data";

export const metadata: Metadata = {
  title: "Tabs",
  description:
    "A set of layered sections of content, known as tab panels, displayed one at a time.",
};

const usageImport = `import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/cubix/tabs"`;

const usageSnippet = `<Tabs defaultValue="account" className="w-full max-w-md">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Make changes to your account here.</TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent>
</Tabs>`;

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border bg-card p-4 text-sm text-card-foreground">
      {children}
    </div>
  );
}

export default function TabsPage() {
  return (
    <article className="space-y-10">
      <ComponentDocsHeader
        title="Tabs"
        description="A set of layered sections of content, known as tab panels, displayed one at a time."
        slug="tabs"
      />

      <ComponentPreview code={usageSnippet}>
        <Tabs defaultValue="account" className="w-full max-w-md">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Panel>Make changes to your account here.</Panel>
          </TabsContent>
          <TabsContent value="password">
            <Panel>Change your password here.</Panel>
          </TabsContent>
        </Tabs>
      </ComponentPreview>

      <ComponentInstall name="tabs" />

      <section className="space-y-4">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Usage
        </h2>
        <CodeBlock code={usageImport} title="Import" />
        <CodeBlock code={usageSnippet} title="Example" />
      </section>

      <section className="space-y-8">
        <h2 className="scroll-m-20 font-semibold tracking-tight">
          Examples
        </h2>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Line variant
          </h3>
          <ComponentPreview
            code={`<Tabs defaultValue="overview" className="w-full max-w-md">
  <TabsList variant="line">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="reports">Reports</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content.</TabsContent>
  <TabsContent value="analytics">Analytics content.</TabsContent>
  <TabsContent value="reports">Reports content.</TabsContent>
</Tabs>`}
          >
            <Tabs defaultValue="overview" className="w-full max-w-md">
              <TabsList variant="line">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <Panel>Overview content.</Panel>
              </TabsContent>
              <TabsContent value="analytics">
                <Panel>Analytics content.</Panel>
              </TabsContent>
              <TabsContent value="reports">
                <Panel>Reports content.</Panel>
              </TabsContent>
            </Tabs>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            With icons
          </h3>
          <ComponentPreview
            code={`<Tabs defaultValue="profile" className="w-full max-w-md">
  <TabsList>
    <TabsTrigger value="profile"><UserIcon /> Profile</TabsTrigger>
    <TabsTrigger value="notifications"><BellIcon /> Notifications</TabsTrigger>
  </TabsList>
  <TabsContent value="profile">Profile preferences.</TabsContent>
  <TabsContent value="notifications">Notification settings.</TabsContent>
</Tabs>`}
          >
            <Tabs defaultValue="profile" className="w-full max-w-md">
              <TabsList>
                <TabsTrigger value="profile">
                  <UserIcon /> Profile
                </TabsTrigger>
                <TabsTrigger value="notifications">
                  <BellIcon /> Notifications
                </TabsTrigger>
              </TabsList>
              <TabsContent value="profile">
                <Panel>Profile preferences.</Panel>
              </TabsContent>
              <TabsContent value="notifications">
                <Panel>Notification settings.</Panel>
              </TabsContent>
            </Tabs>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Vertical
          </h3>
          <ComponentPreview
            code={`<Tabs defaultValue="general" orientation="vertical" className="w-full max-w-lg">
  <TabsList>
    <TabsTrigger value="general">General</TabsTrigger>
    <TabsTrigger value="security">Security</TabsTrigger>
    <TabsTrigger value="billing">Billing</TabsTrigger>
  </TabsList>
  <TabsContent value="general">General settings.</TabsContent>
  <TabsContent value="security">Security settings.</TabsContent>
  <TabsContent value="billing">Billing settings.</TabsContent>
</Tabs>`}
          >
            <Tabs
              defaultValue="general"
              orientation="vertical"
              className="w-full max-w-lg"
            >
              <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
              </TabsList>
              <TabsContent value="general">
                <Panel>General settings.</Panel>
              </TabsContent>
              <TabsContent value="security">
                <Panel>Security settings.</Panel>
              </TabsContent>
              <TabsContent value="billing">
                <Panel>Billing settings.</Panel>
              </TabsContent>
            </Tabs>
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="scroll-m-20 font-semibold tracking-tight">
            Disabled tab
          </h3>
          <ComponentPreview
            code={`<Tabs defaultValue="active" className="w-full max-w-md">
  <TabsList>
    <TabsTrigger value="active">Active</TabsTrigger>
    <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
  </TabsList>
  <TabsContent value="active">The active tab panel.</TabsContent>
  <TabsContent value="disabled">This panel cannot be selected.</TabsContent>
</Tabs>`}
          >
            <Tabs defaultValue="active" className="w-full max-w-md">
              <TabsList>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="disabled" disabled>
                  Disabled
                </TabsTrigger>
              </TabsList>
              <TabsContent value="active">
                <Panel>The active tab panel.</Panel>
              </TabsContent>
              <TabsContent value="disabled">
                <Panel>This panel cannot be selected.</Panel>
              </TabsContent>
            </Tabs>
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
            <strong className="text-foreground">Note:</strong> Tabs follows the
            Tabs uses composable primitive names and renders slots for targeting:{" "}
            <code className="font-mono">tabs</code>,{" "}
            <code className="font-mono">tabs-list</code>,{" "}
            <code className="font-mono">tabs-trigger</code>, and{" "}
            <code className="font-mono">tabs-content</code>.
          </p>
        </div>

        <h3 className="scroll-m-20 font-semibold tracking-tight">Tabs</h3>
        <PropsTable data={tabsPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">TabsList</h3>
        <PropsTable data={tabsListPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">TabsTrigger</h3>
        <PropsTable data={tabsTriggerPropRows} />

        <h3 className="scroll-m-20 font-semibold tracking-tight">TabsContent</h3>
        <PropsTable data={tabsContentPropRows} />
      </section>
    </article>
  );
}
