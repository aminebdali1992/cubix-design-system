import type { Metadata } from "next"

import { BlockList } from "@/components/blocks/block-list"
import { BlocksPageHeader } from "@/components/blocks/blocks-page-header"
import { loginBlocks } from "@/components/blocks/templates/login-blocks"

export const metadata: Metadata = {
  title: "Login",
  description: "Login page templates for landing pages - built with Cubix.",
}

export default function LoginSectionsPage() {
  return (
    <div className="mx-auto w-full max-w-[1352px] px-4 pt-8 pb-12 md:px-5 md:pt-10 md:pb-16">
      <BlocksPageHeader
        title="Login"
        description="Sign-in page templates built from Cubix fields. Drop one into app/login/page.tsx and point the form at your auth route."
        actions={
          <p className="text-sm text-muted-foreground">
            {loginBlocks.length} template{loginBlocks.length === 1 ? "" : "s"}
          </p>
        }
      />

      <BlockList blocks={loginBlocks} />
    </div>
  )
}
