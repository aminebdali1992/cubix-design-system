import type { Metadata } from "next";

import { TypographyWorkspace } from "../_components/typography-workspace";

export const metadata: Metadata = {
  title: "Typography",
  description:
    "Pick the Persian body, heading, and mono faces of a Cubix system, tune letter spacing, and copy the result as code.",
};

export default function TypographyPage() {
  return <TypographyWorkspace />;
}
