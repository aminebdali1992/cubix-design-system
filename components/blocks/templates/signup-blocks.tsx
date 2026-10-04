import type { BlockListItem } from "@/components/blocks/block-list"
import { Signup01, signup01Files } from "@/components/blocks/templates/signup-01"
import { Signup02, signup02Files } from "@/components/blocks/templates/signup-02"
import { Signup03, signup03Files } from "@/components/blocks/templates/signup-03"
import { Signup04, signup04Files } from "@/components/blocks/templates/signup-04"
import { Signup05, signup05Files } from "@/components/blocks/templates/signup-05"

export const signupBlocks: BlockListItem[] = [
  {
    id: "signup-01",
    title: "Split sign-up with media panel",
    description:
      "Social and email sign-up with name, password rules, terms acceptance, and a placeholder media panel. Posts to /api/auth/signup.",
    files: signup01Files,
    preview: <Signup01 />,
  },
  {
    id: "signup-02",
    title: "Centered card with sign-up method tabs",
    description:
      "Name with a phone number and one-time code or email and password, switched with tabs inside a single card. Posts to /api/auth/otp or /api/auth/signup.",
    files: signup02Files,
    preview: <Signup02 />,
  },
  {
    id: "signup-03",
    title: "Social-first sign-up with site header",
    description:
      "Google and GitHub buttons, email verification link, a site header with sign-in, and terms footer. Posts to /api/auth/signup.",
    files: signup03Files,
    preview: <Signup03 />,
  },
  {
    id: "signup-04",
    title: "Card with cover image",
    description:
      "Card with a full-bleed cover image that fills the screen on mobile, name, email, password, terms acceptance, and a sticky submit footer. Posts to /api/auth/signup.",
    files: signup04Files,
    preview: <Signup04 />,
  },
  {
    id: "signup-05",
    title: "Two-step sign-up with account confirmation",
    description:
      "Email first, then name, password, and terms for the confirmed address with a change option, plus footer links. Posts to /api/auth/signup.",
    files: signup05Files,
    preview: <Signup05 />,
  },
]
