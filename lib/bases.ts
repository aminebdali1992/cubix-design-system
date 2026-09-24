export const DEFAULT_BASE = "base";

export const BASES = [
  {
    name: "base",
    title: "Base UI",
    description: "Accessible primitives for apps and design systems.",
    flag: undefined as string | undefined,
    logo: "<svg width='17' height='24' viewBox='0 0 17 24' aria-hidden='true'><path fill='currentColor' d='M9.5001 7.01537C9.2245 6.99837 9 7.22385 9 7.49999V23C13.4183 23 17 19.4183 17 15C17 10.7497 13.6854 7.27351 9.5001 7.01537Z'></path><path fill='currentColor' d='M8 9.8V12V23C3.58172 23 0 19.0601 0 14.2V12V1C4.41828 1 8 4.93989 8 9.8Z'></path></svg>",
  },
  {
    name: "aria",
    title: "React Aria",
    description: "Accessible components with first-class keyboard and screen reader support.",
    flag: "aria",
    logo: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='200 206 800 790' fill='none' aria-hidden='true'><path d='M720.67 205.995C867.583 205.995 986.679 325.091 986.68 472.003C986.68 590.753 908.865 691.325 801.446 725.521L979.312 948.055C994.438 966.98 980.963 995 956.736 995H795.612C778.743 995 762.715 987.629 751.734 974.823L697.365 911.421L493.126 653.39C457.134 607.918 489.518 540.979 547.511 540.977L720.67 540.971C758.758 540.971 789.635 510.091 789.635 472.003C789.634 433.915 758.758 403.038 720.67 403.038H429.939C404.955 403.038 388.623 391.886 373.994 373.623L277.349 252.966C262.194 234.045 275.664 205.996 299.905 205.995H720.67Z M396.605 720.706C407.798 705.406 430.443 704.843 442.381 719.568L503.816 797.018H502.786L535.569 838.934C548.074 854.358 549.943 877.191 538.047 893.09L476.638 972.545C465.692 986.707 448.803 995 430.903 995H242.276C218.18 995 204.665 967.248 219.523 948.278L337.992 797.018H337.923L396.605 720.706Z' fill='currentColor' /></svg>",
  },
  {
    name: "radix",
    title: "Radix UI",
    description: "Unstyled, accessible primitives optimized for composition.",
    flag: "radix",
    logo: "<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'><path fill='currentColor' d='M11.52 24a7.68 7.68 0 0 1-7.68-7.68 7.68 7.68 0 0 1 7.68-7.68V24Zm0-24v7.68H3.84V0h7.68Zm4.8 7.68a3.84 3.84 0 1 1 0-7.68 3.84 3.84 0 0 1 0 7.68Z'/></svg>",
  },
] as const;

export type BaseName = (typeof BASES)[number]["name"];

export function isBaseName(value: string): value is BaseName {
  return BASES.some((item) => item.name === value);
}

export function parseComponentPath(
  pathname: string
): { base: BaseName; slug: string } | null {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] !== "docs" || parts[1] !== "components") {
    return null;
  }

  if (parts.length === 3 && parts[2] && !isBaseName(parts[2])) {
    return { base: DEFAULT_BASE, slug: parts[2] };
  }

  if (parts.length === 4 && isBaseName(parts[2]) && parts[3]) {
    return { base: parts[2], slug: parts[3] };
  }

  return null;
}

export function componentDocsHref(slug: string, base: BaseName = DEFAULT_BASE) {
  return `/docs/components/${base}/${slug}`;
}

export function canonicalComponentHref(pathname: string) {
  const parsed = parseComponentPath(pathname);
  if (!parsed) return pathname;
  return `/docs/components/${parsed.slug}`;
}

export function cliBaseFlag(base: string) {
  if (base === DEFAULT_BASE) return "";
  return ` --base ${base}`;
}
