import { cn } from "@/lib/utils";

/** Shared underline tab list used in docs (Installation, component install). */
export const docsLineTabsListClassName =
  "h-auto w-fit justify-start gap-6 rounded-none bg-transparent p-0";

/** Compact trigger - content-sized, never flex-stretched. */
export const docsLineTabsTriggerClassName = cn(
  "h-auto w-fit flex-none justify-start rounded-none border-0 border-b-2 border-transparent bg-transparent px-0 pb-3",
  "text-base font-normal text-muted-foreground shadow-none after:hidden",
  "hover:text-foreground",
  "data-active:border-foreground data-active:bg-transparent data-active:text-foreground data-active:shadow-none data-active:after:hidden",
  "data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
);
