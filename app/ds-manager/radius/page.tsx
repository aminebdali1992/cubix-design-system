import type { Metadata } from "next";

import { RadiusWorkspace } from "../_components/radius-workspace";

export const metadata: Metadata = {
  title: "Radius",
  description:
    "Set the base corner radius of a Cubix system, pin any step of the derived scale, and copy the result as code.",
};

export default function RadiusPage() {
  return <RadiusWorkspace />;
}
