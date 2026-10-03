import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  DocsPageHeader,
  InlineCode,
  linkClassName,
} from "@/app/docs/docs-shared";
import { components } from "@/app/docs/components/components-data";
import { isComponentReady } from "@/lib/component-readiness";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function catalogEntry(slug: string) {
  return components.find(
    (item) =>
      typeof item.href === "string" &&
      item.href === `/docs/components/${slug}`
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = catalogEntry(slug);
  const title = item?.name ?? slug;
  return {
    title: `${title} - Coming soon`,
    description: `${title} is on the Cubix roadmap and is not available for install yet.`,
    robots: { index: false, follow: true },
  };
}

export default async function UpcomingComponentPage({ params }: PageProps) {
  const { slug } = await params;
  if (isComponentReady(slug)) {
    notFound();
  }

  const item = catalogEntry(slug);
  const title = item?.name ?? slug;
  const description =
    item?.description ??
    "This component is on the Cubix roadmap and has not met the public readiness contract yet.";

  return (
    <article className="space-y-8">
      <DocsPageHeader
        title={title}
        description={description}
      />

      <section className="space-y-4 rounded-xl border border-dashed bg-card p-6">
        <p className="text-sm font-medium text-foreground">Coming soon</p>
        <p className="leading-relaxed text-muted-foreground">
          Cubix only publishes a component when it has sources for Base UI,
          React Aria, and Radix UI, a docs page, and a registry entry. Until
          then there is no public install path and no production docs for{" "}
          <InlineCode>{slug}</InlineCode>.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          See what is available today on the{" "}
          <Link href="/docs/components" className={linkClassName}>
            Components
          </Link>{" "}
          page, or track progress in the{" "}
          <Link href="/docs/changelog" className={linkClassName}>
            Changelog
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
