"use client";

import * as React from "react";
import { CheckIcon, CopyIcon, SquareTerminalIcon } from "lucide-react";

import { Button } from "@/components/cubix/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/cubix/tabs";
import {
  type PackageManager,
  addComponentCommands,
  installDependencyCommands,
} from "@/lib/package-manager-commands";
import { cn } from "@/lib/utils";

export type { PackageManager };
export { addComponentCommands, installDependencyCommands };

const PACKAGE_MANAGERS: PackageManager[] = ["pnpm", "npm", "yarn", "bun"];
const STORAGE_KEY = "cubix.packageManager";

export function CodeBlockCommand({
  commands,
  className,
}: {
  commands: Record<PackageManager, string>;
  className?: string;
}) {
  const [packageManager, setPackageManager] =
    React.useState<PackageManager>("pnpm");
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (PACKAGE_MANAGERS.includes(stored as PackageManager)) {
        setPackageManager(stored as PackageManager);
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  React.useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  function selectPackageManager(value: string) {
    const next = value as PackageManager;
    setPackageManager(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage unavailable
    }
  }

  async function copyCommand() {
    const command = commands[packageManager];
    if (!command) return;
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
    } catch {
      // clipboard not available
    }
  }

  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-xl border bg-muted/40",
        className
      )}
    >
      <Tabs
        dir="ltr"
        value={packageManager}
        onValueChange={selectPackageManager}
        className="flex-col gap-0"
      >
        <div className="flex items-center gap-2 border-b px-3 py-1">
          <div className="flex size-4 items-center justify-center rounded-sm bg-foreground/80">
            <SquareTerminalIcon className="size-3 text-background" />
          </div>
          <TabsList className="h-7 w-fit justify-start rounded-none bg-transparent p-0">
            {PACKAGE_MANAGERS.map((key) => (
              <TabsTrigger
                key={key}
                value={key}
                className="h-7 w-fit flex-none rounded-md border border-transparent px-2 pt-0.5 font-normal text-muted-foreground shadow-none after:hidden hover:text-foreground data-active:border-transparent data-active:bg-background data-active:font-normal data-active:text-foreground data-active:shadow-none data-active:after:hidden dark:data-active:border-transparent dark:data-active:bg-background dark:data-active:text-foreground"
              >
                {key}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {PACKAGE_MANAGERS.map((key) => (
          <TabsContent key={key} value={key} className="mt-0 px-4 py-3.5">
            <pre className="overflow-x-auto">
              <code className="font-mono text-sm leading-none text-foreground">
                {commands[key]}
              </code>
            </pre>
          </TabsContent>
        ))}
      </Tabs>
      <Button
        type="button"
        size="icon-sm"
        variant="ghost"
        aria-label="Copy"
        className="absolute top-2 right-2 z-10 size-7 text-muted-foreground hover:text-foreground"
        onClick={copyCommand}
      >
        {copied ? (
          <CheckIcon className="size-3.5" />
        ) : (
          <CopyIcon className="size-3.5" />
        )}
      </Button>
    </figure>
  );
}
