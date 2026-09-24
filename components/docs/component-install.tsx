import fs from "node:fs";
import path from "node:path";

import { ComponentInstallTabs } from "@/components/docs/component-install-tabs";
import type { InstallVariant } from "@/components/docs/component-install-tabs";
import { BASES, type BaseName } from "@/lib/bases";

const initPackages = new Set([
  "react",
  "react-dom",
  "next",
  "clsx",
  "tailwind-merge",
  "class-variance-authority",
  "lucide-react",
]);

function packageName(specifier: string) {
  if (specifier.startsWith("@")) {
    return specifier.split("/").slice(0, 2).join("/");
  }
  return specifier.split("/")[0] ?? specifier;
}

function npmDependencies(source: string) {
  const matches = source.matchAll(/from ["']([^"']+)["']/g);
  const packages = new Set<string>();

  for (const match of matches) {
    const specifier = match[1];
    if (!specifier || specifier.startsWith(".") || specifier.startsWith("@/")) {
      continue;
    }
    const name = packageName(specifier);
    if (!initPackages.has(name)) {
      packages.add(name);
    }
  }

  return [...packages].sort();
}

function resolveComponentFile(name: string, base: string) {
  const candidates = [
    `components/cubix/${base}/${name}.tsx`,
    `components/cubix/base/${name}.tsx`,
    `components/cubix/${name}.tsx`,
  ];

  for (const relative of candidates) {
    if (fs.existsSync(path.join(process.cwd(), relative))) {
      return relative;
    }
  }

  throw new Error(`No Cubix source found for ${name} (${base}).`);
}

export function ComponentInstall({ name }: { name: string }) {
  const variants = Object.fromEntries(
    BASES.map((item) => {
      const filePath = resolveComponentFile(name, item.name);
      const source = fs.readFileSync(
        path.join(process.cwd(), filePath),
        "utf8"
      );
      return [
        item.name,
        {
          filePath: `components/cubix/${name}.tsx`,
          source,
          dependencies: npmDependencies(source),
        } satisfies InstallVariant,
      ];
    })
  ) as Record<BaseName, InstallVariant>;

  return (
    <section id="installation">
      <h2 className="scroll-m-20 font-semibold tracking-tight">
        Installation
      </h2>
      <ComponentInstallTabs name={name} variants={variants} />
    </section>
  );
}
