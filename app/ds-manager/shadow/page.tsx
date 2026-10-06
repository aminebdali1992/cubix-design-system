import type { Metadata } from "next";

import { ShadowWorkspace } from "../_components/shadow-workspace";

export const metadata: Metadata = {
  title: "Shadow",
  description:
    "Seed the elevation ramp of a Cubix system, edit any step on its own, and copy the result as code.",
};

export default function ShadowPage() {
  return <ShadowWorkspace />;
}
