import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/cubix/breadcrumb";
import { Badge } from "@/components/cubix/badge";
import { Button } from "@/components/cubix/button";
import { DocsBaseSwitcher } from "@/components/docs/docs-base-switcher";
import { DocsMobileMenuTrigger } from "@/components/docs/docs-sidebar";
import { getComponentCategory } from "@/lib/component-categories";

export function ComponentDocsHeader({
  title,
  description,
  slug,
}: {
  title: string;
  description: string;
  slug: string;
}) {
  const category = getComponentCategory(slug);

  return (
    <>
      <div className="flex min-w-0 items-center gap-2">
        <DocsMobileMenuTrigger />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/" />}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRightIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/docs/components" />}>
                Components
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRightIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="truncate font-medium">
                {title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <header className="space-y-4">
        <div dir="ltr" className="flex flex-wrap items-center gap-2">
          <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">
            {title}
          </h1>
          {category ? (
            <Badge variant="secondary" className="font-normal">
              {category}
            </Badge>
          ) : null}
        </div>
        <p className="text-base text-muted-foreground">{description}</p>
        <DocsBaseSwitcher slug={slug} />
        <div className="flex gap-4 text-sm">
          <Button
            variant="link"
            nativeButton={false}
            render={<a href={`/r/${slug}.json`} />}
            className="h-auto px-0"
          >
            <span className="font-mono text-muted-foreground">Registry</span>
          </Button>
          <Button
            variant="link"
            nativeButton={false}
            render={<a href="#api-reference" />}
            className="h-auto px-0"
          >
            <span className="font-mono text-muted-foreground">
              API Reference
            </span>
          </Button>
        </div>
      </header>
    </>
  );
}
