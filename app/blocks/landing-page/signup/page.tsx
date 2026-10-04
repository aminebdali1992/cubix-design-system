import type { Metadata } from "next"

import { BlockList } from "@/components/blocks/block-list"
import { BlocksPageHeader } from "@/components/blocks/blocks-page-header"
import { signupBlocks } from "@/components/blocks/templates/signup-blocks"

export const metadata: Metadata = {
  title: "Signup",
  description: "Sign-up page templates for landing pages - built with Cubix.",
}

export default function SignupSectionsPage() {
  return (
    <div className="mx-auto w-full max-w-[1352px] px-4 pt-8 pb-12 md:px-5 md:pt-10 md:pb-16">
      <BlocksPageHeader
        title="Signup"
        description="Sign-up page templates built from Cubix fields. Drop one into app/signup/page.tsx and point the form at your auth route."
        actions={
          <p className="text-sm text-muted-foreground">
            {signupBlocks.length} template{signupBlocks.length === 1 ? "" : "s"}
          </p>
        }
      />

      <BlockList blocks={signupBlocks} />
    </div>
  )
}
