"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRightIcon, SearchIcon, XIcon } from "lucide-react";

import { components } from "@/app/docs/components/components-data";
import { Button } from "@/components/cubix/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/cubix/collapsible";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/cubix/input-group";
import { ScrollArea } from "@/components/cubix/scroll-area";
import { cn } from "@/lib/utils";

import { SIDEBAR_WIDTH } from "../_lib/layout";
import {
  BlocksIcon,
  BrandIcon,
  ColorIcon,
  ComponentsIcon,
  IconsIcon,
  LintIcon,
  OverviewIcon,
  RadiusIcon,
  ShadowIcon,
  SpacingIcon,
  StyleIcon,
  TypographyIcon,
} from "./section-icons";

type SectionItem = {
  id: string;
  label: string;
  icon: React.ComponentType<React.ComponentProps<"svg">>;
  /** Sections without a route are on the roadmap and render disabled. */
  href?: string;
};

const DESIGN_SECTIONS: readonly SectionItem[] = [
  { id: "overview", label: "Overview", icon: OverviewIcon },
  { id: "style", label: "Style", icon: StyleIcon },
  { id: "color", label: "Color", icon: ColorIcon, href: "/ds-manager/color" },
  { id: "typography", label: "Typography", icon: TypographyIcon, href: "/ds-manager/typography" },
  { id: "radius", label: "Radius", icon: RadiusIcon, href: "/ds-manager/radius" },
  { id: "shadow", label: "Shadow", icon: ShadowIcon },
  { id: "spacing", label: "Spacing", icon: SpacingIcon },
  { id: "icons", label: "Icons", icon: IconsIcon },
  { id: "brand", label: "Brand", icon: BrandIcon },
  { id: "blocks", label: "Blocks", icon: BlocksIcon },
  { id: "lint", label: "Lint", icon: LintIcon },
];

type ComponentLink = { label: string; href: string };

const COMPONENT_LINKS: readonly ComponentLink[] = [
  { label: "All components", href: "/docs/components" },
  ...components
    .filter(
      (item): item is (typeof components)[number] & { href: string } =>
        item.ready === true && typeof item.href === "string"
    )
    .map((item) => ({ label: item.name, href: item.href }))
    .sort((a, b) => a.label.localeCompare(b.label)),
];

function matches(label: string, query: string) {
  return label.toLowerCase().includes(query.trim().toLowerCase());
}

type NavGroupProps = {
  label?: string;
  forceOpen?: boolean;
  children: React.ReactNode;
};

function NavGroup({ label, forceOpen = false, children }: NavGroupProps) {
  const [open, setOpen] = React.useState(true);
  const list = <ul className="flex flex-col gap-0.5">{children}</ul>;

  if (!label) return list;

  return (
    <Collapsible open={forceOpen || open} onOpenChange={setOpen} className="flex flex-col">
      <CollapsibleTrigger className="group/nav-group mt-3 mb-1 flex min-w-0 items-center gap-1.5 rounded-md px-2 py-1 text-caption text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
        <ChevronRightIcon
          aria-hidden
          className="size-3.5 shrink-0 transition-transform duration-200 group-data-panel-open/nav-group:rotate-90"
        />
        <span className="truncate">{label}</span>
      </CollapsibleTrigger>
      <CollapsibleContent>{list}</CollapsibleContent>
    </Collapsible>
  );
}

function SectionLink({ item, active }: { item: SectionItem; active: boolean }) {
  const content = (
    <>
      <item.icon data-icon="inline-start" />
      {item.label}
    </>
  );

  if (!item.href) {
    return (
      <Button variant="ghost" size="sm" disabled className="w-full justify-start">
        {content}
      </Button>
    );
  }

  return (
    <Button
      variant={active ? "gray" : "ghost"}
      size="sm"
      nativeButton={false}
      render={<Link href={item.href} aria-current={active ? "page" : undefined} />}
      className="w-full justify-start"
    >
      {content}
    </Button>
  );
}

export function SectionNav() {
  const pathname = usePathname();
  const [query, setQuery] = React.useState("");
  const sections = DESIGN_SECTIONS.filter((item) => matches(item.label, query));
  const links = COMPONENT_LINKS.filter((item) => matches(item.label, query));

  return (
    <aside
      aria-label="Design system sections"
      className={cn("flex shrink-0 flex-col border-e bg-background", SIDEBAR_WIDTH)}
    >
      <div className="px-2 py-3">
        <InputGroup variant="filled">
          <InputGroupInput
            role="searchbox"
            aria-label="Filter sections"
            placeholder="Search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape" && query !== "") {
                event.preventDefault();
                setQuery("");
              }
            }}
          />
          <InputGroupAddon>
            <SearchIcon aria-hidden className="size-3.5" />
          </InputGroupAddon>
          {query !== "" ? (
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                size="icon-xs"
                aria-label="Clear search"
                onClick={() => setQuery("")}
              >
                <XIcon />
              </InputGroupButton>
            </InputGroupAddon>
          ) : null}
        </InputGroup>
      </div>
      <ScrollArea className="min-h-0 flex-1">
        <nav className="flex flex-col px-2 pb-3">
          {sections.length > 0 ? (
            <NavGroup>
              {sections.map((item) => (
                <li key={item.id}>
                  <SectionLink item={item} active={item.href === pathname} />
                </li>
              ))}
            </NavGroup>
          ) : null}
          {links.length > 0 ? (
            <NavGroup label="Default Components" forceOpen={query.trim() !== ""}>
              {links.map((item) => (
                <li key={item.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    nativeButton={false}
                    render={<Link href={item.href} />}
                    className="w-full justify-start"
                  >
                    <ComponentsIcon data-icon="inline-start" />
                    {item.label}
                  </Button>
                </li>
              ))}
            </NavGroup>
          ) : null}
          {sections.length === 0 && links.length === 0 ? (
            <p className="px-2 py-6 text-center text-caption text-muted-foreground">
              No sections match &ldquo;{query.trim()}&rdquo;.
            </p>
          ) : null}
        </nav>
      </ScrollArea>
    </aside>
  );
}
