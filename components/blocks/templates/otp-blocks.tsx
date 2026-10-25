import type { BlockListItem } from "@/components/blocks/block-list"
import { Otp01, otp01Files } from "@/components/blocks/templates/otp-01"
import { Otp02, otp02Files } from "@/components/blocks/templates/otp-02"
import { Otp03, otp03Files } from "@/components/blocks/templates/otp-03"
import { Otp04, otp04Files } from "@/components/blocks/templates/otp-04"

export const otpBlocks: BlockListItem[] = [
  {
    id: "otp-01",
    title: "Phone verification card with auto-submit",
    description:
      "Masked number with an edit link, six digits in two groups that verify as soon as the last digit lands, loading and error states, and a two-minute resend countdown. Posts to /api/auth/otp/verify.",
    files: otp01Files,
    preview: <Otp01 />,
  },
  {
    id: "otp-02",
    title: "Split two-step sign-in verification",
    description:
      "Second step of sign-in beside a media panel: step badge, masked destination, large code boxes, resend countdown, and alternative email or password methods. Posts to /api/auth/login/verify.",
    files: otp02Files,
    preview: <Otp02 />,
  },
  {
    id: "otp-03",
    title: "Email verification with error recovery",
    description:
      "Mail avatar header, masked address with a change link, six-digit code with an inline error on a wrong code, resend countdown, and an open-inbox action. Posts to /api/auth/email/verify.",
    files: otp03Files,
    preview: <Otp03 />,
  },
  {
    id: "otp-04",
    title: "Payment confirmation with SMS code",
    description:
      "Bank transfer card with the amount, recipient, masked card number and fee, an SMS code with resend countdown, pay and cancel actions, and a receipt with a tracking number on success. Posts to /api/payments/transfer/verify.",
    files: otp04Files,
    preview: <Otp04 />,
  },
]
