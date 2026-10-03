import readyComponents from "@/lib/ready-components.json";

/**
 * Public readiness contract:
 * ready = base + aria + radix sources, docs page, and registry entry.
 * Anything else is Coming soon: no public docs, no public install.
 */
export const READY_COMPONENT_SLUGS: ReadonlySet<string> = new Set(
  readyComponents.slugs
);

export function isComponentReady(slug: string): boolean {
  return READY_COMPONENT_SLUGS.has(slug);
}

/** Parses /docs/components/<slug> and /docs/components/<base>/<slug>. */
export function getComponentSlugFromDocsPath(pathname: string): string | null {
  if (pathname.startsWith("/docs/components/upcoming/")) return null;

  const match = pathname.match(
    /^\/docs\/components\/(?:(base|aria|radix)\/)?([^/]+)\/?$/
  );
  if (!match) return null;
  const slug = match[2];
  if (!slug || slug === "upcoming") return null;
  return slug;
}
