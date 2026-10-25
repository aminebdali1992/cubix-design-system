import type { Metadata } from "next";

import { CustomizeCanvas } from "./customize-canvas";

export const metadata: Metadata = {
  title: "Customize",
};

export default function CustomizePage() {
  return <CustomizeCanvas />;
}
