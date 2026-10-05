import type { Metadata } from "next";

import { DsManagerShell } from "./_components/shell";
import "./ds-manager.css";

export const metadata: Metadata = {
  title: {
    default: "DS Manager",
    template: "%s - DS Manager",
  },
  description:
    "Edit the Cubix design system live: color tokens in light and dark, Persian-first typography, and copy the result as code.",
};

export default function DsManagerLayout({ children }: { children: React.ReactNode }) {
  return <DsManagerShell>{children}</DsManagerShell>;
}
