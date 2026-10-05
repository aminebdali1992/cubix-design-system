import type { Metadata } from "next";

import { ColorWorkspace } from "../_components/color-workspace";

export const metadata: Metadata = {
  title: "Color",
  description:
    "Edit every Cubix color token in light and dark, check contrast live, and copy the result as code.",
};

export default function ColorPage() {
  return <ColorWorkspace />;
}
