"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/cubix/tabs";
import { CodeBlock } from "@/components/docs/code-block";
import {
  addComponentCommands,
  CodeBlockCommand,
  installDependencyCommands,
} from "@/components/docs/code-block-command";
import {
  DEFAULT_BASE,
  type BaseName,
  parseComponentPath,
} from "@/lib/bases";
import { cn } from "@/lib/utils";

export type InstallVariant = {
  filePath: string;
  source: string;
  dependencies: string[];
};

function ManualStep({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "docs-step mt-8 scroll-m-20 font-heading text-base font-medium tracking-tight first:mt-0",
        className
      )}
    >
      {children}
    </h3>
  );
}

export function ComponentInstallTabs({
  name,
  variants,
}: {
  name: string;
  variants: Record<BaseName, InstallVariant>;
}) {
  const pathname = usePathname();
  const base = parseComponentPath(pathname)?.base ?? DEFAULT_BASE;
  const variant = variants[base] ?? variants[DEFAULT_BASE];

  return (
    <Tabs defaultValue="cli" className="relative mt-6 w-full flex-col gap-0">
      <TabsList
        variant="line"
        className="h-auto w-full justify-start gap-6 rounded-none bg-transparent p-0 px-0"
      >
        <TabsTrigger
          value="cli"
          className="h-auto w-fit flex-none justify-start rounded-none border-0 border-b-2 border-transparent bg-transparent px-0 pb-3 text-base font-normal text-muted-foreground shadow-none after:hidden hover:text-foreground data-active:border-primary data-active:bg-transparent data-active:text-foreground data-active:shadow-none data-active:after:hidden"
        >
          Command
        </TabsTrigger>
        <TabsTrigger
          value="manual"
          className="h-auto w-fit flex-none justify-start rounded-none border-0 border-b-2 border-transparent bg-transparent px-0 pb-3 text-base font-normal text-muted-foreground shadow-none after:hidden hover:text-foreground data-active:border-primary data-active:bg-transparent data-active:text-foreground data-active:shadow-none data-active:after:hidden"
        >
          Manual
        </TabsTrigger>
      </TabsList>
      <TabsContent value="cli" className="relative mt-6">
        <CodeBlockCommand commands={addComponentCommands(name, base)} />
      </TabsContent>
      <TabsContent value="manual" className="relative">
        <div className="docs-steps mb-0 pt-2 md:ml-4 md:border-l md:pl-8">
          {variant.dependencies.length > 0 ? (
            <>
              <ManualStep>Install the following dependencies:</ManualStep>
              <CodeBlockCommand
                className="mt-6"
                commands={installDependencyCommands(variant.dependencies)}
              />
            </>
          ) : null}
          <ManualStep>
            Copy and paste the following code into your project.
          </ManualStep>
          <div className="mt-6">
            <CodeBlock
              code={variant.source}
              title={variant.filePath}
              lang="tsx"
              collapsible
            />
          </div>
          <ManualStep>
            Update the import paths to match your project setup.
          </ManualStep>
        </div>
      </TabsContent>
    </Tabs>
  );
}
