import type { Metadata } from "next"

import { BlockList } from "@/components/blocks/block-list"
import { BlocksPageHeader } from "@/components/blocks/blocks-page-header"
import { otpBlocks } from "@/components/blocks/templates/otp-blocks"

export const metadata: Metadata = {
  title: "OTP",
  description: "Verification code (OTP) page templates for landing pages - built with Cubix.",
}

export default function OtpSectionsPage() {
  return (
    <div className="mx-auto w-full max-w-[1352px] px-4 pt-8 pb-12 md:px-5 md:pt-10 md:pb-16">
      <BlocksPageHeader
        title="OTP"
        description="Verification code templates built from Cubix InputOTP. Drop one into app/verify/page.tsx and point the form at your verify route."
        actions={
          <p className="text-sm text-muted-foreground">
            {otpBlocks.length} template{otpBlocks.length === 1 ? "" : "s"}
          </p>
        }
      />

      <BlockList blocks={otpBlocks} />
    </div>
  )
}
