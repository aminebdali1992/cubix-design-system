import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InstallationGuidePage } from "../installation-guide";
import {
  getInstallationGuide,
  installationGuideSlugs,
} from "../installation-guides";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return installationGuideSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getInstallationGuide(slug);
  if (!guide) {
    return { title: "Installation" };
  }
  return {
    title: `${guide.name} - Installation`,
    description: guide.description,
  };
}

export default async function InstallationFrameworkPage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getInstallationGuide(slug);
  if (!guide) notFound();
  return <InstallationGuidePage guide={guide} />;
}
