import type { Metadata } from "next";

import { SpacingWorkspace } from "../_components/spacing-workspace";

export const metadata: Metadata = {
  title: "Spacing",
  description:
    "Set the base spacing unit of a Cubix system, preview the scale and real surfaces at that density, and copy the result as code.",
};

export default function SpacingPage() {
  return <SpacingWorkspace />;
}
