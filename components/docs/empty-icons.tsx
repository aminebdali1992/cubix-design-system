import type { ReactNode, SVGProps } from "react"

import { cn } from "@/lib/utils"

type IconProps = SVGProps<SVGSVGElement>

function IconlyIcon({ className, children, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("size-6", className)}
      {...props}
    >
      {children}
    </svg>
  )
}

export function FolderIcon(props: IconProps) {
  return (
    <IconlyIcon {...props}>
      <path d="M21.419 15.732c0 3.578-2.109 5.687-5.687 5.687H7.95c-3.587 0-5.7-2.109-5.7-5.687v-7.8c0-3.573 1.314-5.682 4.893-5.682h2c.718.001 1.394.338 1.824.913l.913 1.214c.432.574 1.108.912 1.826.913h2.83c3.587 0 4.911 1.826 4.911 5.477l-.028 4.965Z" />
      <path d="M7.481 14.463h9.735" />
    </IconlyIcon>
  )
}

export function UploadIcon(props: IconProps) {
  return (
    <IconlyIcon {...props}>
      <path d="M7.389 8.984h-.933a3.685 3.685 0 0 0-3.685 3.685v4.875a3.685 3.685 0 0 0 3.685 3.684h11.13a3.685 3.685 0 0 0 3.686-3.684v-4.885a3.675 3.675 0 0 0-3.674-3.675h-.943" />
      <path d="M12.021 2.19v12.041" />
      <path d="m9.106 5.118 2.915-2.928 2.916 2.928" />
    </IconlyIcon>
  )
}

export function NotificationIcon(props: IconProps) {
  return (
    <IconlyIcon {...props}>
      <path d="M12 17.848c5.639 0 8.248-.724 8.5-3.627 0-2.902-1.819-2.716-1.819-6.276C18.681 5.164 16.045 2 12 2S5.319 5.164 5.319 7.945c0 3.56-1.819 3.374-1.819 6.276.253 2.914 2.862 3.627 8.5 3.627Z" />
      <path d="M14.389 20.857c-1.364 1.515-3.492 1.533-4.87 0" />
    </IconlyIcon>
  )
}

export function SearchIcon(props: IconProps) {
  return (
    <IconlyIcon {...props}>
      <circle cx="11.25" cy="11.25" r="5.75" />
      <path d="m15.5 15.5 3 3" />
    </IconlyIcon>
  )
}

/*
  Input group icons: the box stays 24px (size-6) like the other Iconly icons,
  but the glyph is scaled to 70% so it reads at the same weight as SearchIcon
  inside a 40px field. strokeWidth 2.15 x 0.7 keeps the visible stroke at 1.5.
*/
function FieldGlyph({ children }: { children: ReactNode }) {
  return (
    <g transform="translate(12 12) scale(0.7) translate(-12 -12)" strokeWidth={2.15}>
      {children}
    </g>
  )
}

export function MessageIcon(props: IconProps) {
  return (
    <IconlyIcon {...props}>
      <FieldGlyph>
        <path d="m17.903 8.851-4.444 3.613c-.84.666-2.02.666-2.86 0L6.12 8.851" />
        <path d="M16.909 21C19.948 21.008 22 18.51 22 15.442V8.565C22 5.496 19.948 3 16.909 3H7.091C4.052 3 2 5.496 2 8.565v6.877C2 18.51 4.052 21.008 7.091 21h9.818Z" />
      </FieldGlyph>
    </IconlyIcon>
  )
}

export function HideIcon(props: IconProps) {
  return (
    <IconlyIcon {...props}>
      <FieldGlyph>
        <path d="M9.761 14.367a3.1 3.1 0 0 1-.913-2.192A3.15 3.15 0 0 1 12 9.02c.858 0 1.636.346 2.204.913" />
        <path d="M15.105 12.7a3.13 3.13 0 0 1-2.537 2.541" />
        <path d="M6.655 17.472C5.068 16.226 3.724 14.406 2.75 12.174c.984-2.242 2.337-4.072 3.934-5.328C8.27 5.59 10.102 4.906 12 4.906c1.909 0 3.739.693 5.336 1.957" />
        <path d="M19.448 8.99a15.4 15.4 0 0 1 1.802 3.184c-1.94 4.446-5.368 7.124-9.25 7.124-.88 0-1.747-.143-2.58-.422" />
        <path d="M19.887 4.25 4.113 20.024" />
      </FieldGlyph>
    </IconlyIcon>
  )
}

export function InfoCircleIcon(props: IconProps) {
  return (
    <IconlyIcon {...props}>
      <FieldGlyph>
        <path d="M12 2.75c5.108 0 9.25 4.141 9.25 9.25s-4.142 9.25-9.25 9.25S2.75 17.108 2.75 12 6.891 2.75 12 2.75Z" />
        <path d="M11.995 8.204v4.419" />
        <path d="M11.995 15.796h.01" />
      </FieldGlyph>
    </IconlyIcon>
  )
}

export function StarIcon(props: IconProps) {
  return (
    <IconlyIcon {...props}>
      <FieldGlyph>
        <path d="m13.105 3.453 1.828 3.677c.18.36.524.611.924.669l4.09.59c1.009.146 1.411 1.38.68 2.087l-2.957 2.862a1.215 1.215 0 0 0-.352 1.08l.698 4.04c.172 1-.883 1.763-1.786 1.29l-3.655-1.908a1.23 1.23 0 0 0-1.143 0l-3.655 1.908c-.903.473-1.958-.29-1.786-1.29l.698-4.04a1.215 1.215 0 0 0-.352-1.08L3.38 10.476c-.731-.707-.33-1.94.68-2.087l4.09-.59c.4-.058.744-.31.924-.669l1.828-3.677c.45-.91 1.752-.91 2.203 0Z" />
      </FieldGlyph>
    </IconlyIcon>
  )
}

export function TickIcon(props: IconProps) {
  return (
    <IconlyIcon {...props}>
      <FieldGlyph>
        <path d="m4.75 12.5 4.75 4.75 9.75-10" />
      </FieldGlyph>
    </IconlyIcon>
  )
}

export function WalletIcon(props: IconProps) {
  return (
    <IconlyIcon {...props}>
      <FieldGlyph>
        <path d="M21.639 14.396h-4.048a2.693 2.693 0 0 1 0-5.383h4.048" />
        <path d="M18.05 11.643h-.312" />
        <path d="M7.748 3h8.643a5.248 5.248 0 0 1 5.248 5.248v7.177a5.248 5.248 0 0 1-5.248 5.247H7.748A5.248 5.248 0 0 1 2.5 15.425V8.248A5.248 5.248 0 0 1 7.748 3Z" />
        <path d="M7.036 7.538h5.399" />
      </FieldGlyph>
    </IconlyIcon>
  )
}

export function CopyIcon(props: IconProps) {
  return (
    <IconlyIcon {...props}>
      <FieldGlyph>
        <path d="M15.75 8.25V6.5A3.75 3.75 0 0 0 12 2.75H6.5A3.75 3.75 0 0 0 2.75 6.5V12a3.75 3.75 0 0 0 3.75 3.75h1.75" />
        <rect x="8.25" y="8.25" width="13" height="13" rx="3.75" />
      </FieldGlyph>
    </IconlyIcon>
  )
}

export function DocumentIcon(props: IconProps) {
  return (
    <IconlyIcon {...props}>
      <FieldGlyph>
        <path d="M15.716 16.223h-7.22" />
        <path d="M15.716 12.037h-7.22" />
        <path d="M11.251 7.86H8.496" />
        <path d="M15.909 2.75s-7.677.004-7.689.004c-2.76.017-4.469 1.833-4.469 4.603v9.196c0 2.784 1.722 4.607 4.506 4.607 0 0 7.676-.003 7.689-.003 2.76-.017 4.47-1.834 4.47-4.604V7.357c0-2.784-1.723-4.607-4.507-4.607Z" />
      </FieldGlyph>
    </IconlyIcon>
  )
}

export function RefreshIcon(props: IconProps) {
  return (
    <IconlyIcon {...props}>
      <FieldGlyph>
        <path d="M20.25 12a8.25 8.25 0 0 1-14.6 5.27" />
        <path d="M3.75 12a8.25 8.25 0 0 1 14.6-5.27" />
        <path d="M18.75 3v3.75H15" />
        <path d="M5.25 21v-3.75H9" />
      </FieldGlyph>
    </IconlyIcon>
  )
}

export function MoreIcon(props: IconProps) {
  return (
    <IconlyIcon {...props}>
      <FieldGlyph>
        <path d="M5.5 12h.01" strokeWidth={3.5} />
        <path d="M12 12h.01" strokeWidth={3.5} />
        <path d="M18.5 12h.01" strokeWidth={3.5} />
      </FieldGlyph>
    </IconlyIcon>
  )
}

export function ArrowDownIcon(props: IconProps) {
  return (
    <IconlyIcon {...props}>
      <FieldGlyph>
        <path d="m19 8.5-7 7-7-7" />
      </FieldGlyph>
    </IconlyIcon>
  )
}

export function KeyIcon(props: IconProps) {
  return (
    <IconlyIcon {...props}>
      <FieldGlyph>
        <path d="M10.79 12a3.29 3.29 0 1 1-6.58 0 3.29 3.29 0 0 1 6.58 0Z" />
        <path d="M10.794 12h9.416v2.79" />
        <path d="M16.682 12v2.79" />
      </FieldGlyph>
    </IconlyIcon>
  )
}export function LockIcon(props: IconProps) {
  return (
    <IconlyIcon {...props}>
      <FieldGlyph>
        <path d="M16.423 9.448V7.301a4.55 4.55 0 0 0-4.551-4.551 4.55 4.55 0 0 0-4.57 4.531v2.167" />
        <path d="M15.683 21.25H8.042a3.79 3.79 0 0 1-3.792-3.792v-4.29a3.79 3.79 0 0 1 3.792-3.791h7.641a3.79 3.79 0 0 1 3.792 3.792v4.289a3.79 3.79 0 0 1-3.792 3.792Z" />
        <path d="M11.862 14.203v2.22" />
      </FieldGlyph>
    </IconlyIcon>
  )
}

export function MobileIcon(props: IconProps) {
  return (
    <IconlyIcon {...props}>
      <FieldGlyph>
        <path d="M14.5 2.75h-5a3.5 3.5 0 0 0-3.5 3.5v11.5a3.5 3.5 0 0 0 3.5 3.5h5a3.5 3.5 0 0 0 3.5-3.5V6.25a3.5 3.5 0 0 0-3.5-3.5Z" />
        <path d="M10.75 17.75h2.5" />
      </FieldGlyph>
    </IconlyIcon>
  )
}

export function CallIcon(props: IconProps) {
  return (
    <IconlyIcon {...props}>
      <FieldGlyph>
        <path d="M11.532 12.472c3.989 3.988 4.894-.626 7.434 1.912 2.449 2.448 3.856 2.938.754 6.04-.389.312-2.857 4.068-11.53-4.603C-.484 7.149 3.27 4.678 3.582 4.289c3.11-3.11 3.591-1.695 6.04.753 2.54 2.539-2.072 3.447 1.91 7.43Z" />
      </FieldGlyph>
    </IconlyIcon>
  )
}

export function BookmarkIcon(props: IconProps) {
  return (
    <IconlyIcon {...props}>
      <path d="M11.739 17.854 5.977 21.008c-.46.239-1.026.07-1.279-.381a.98.98 0 0 1-.114-.443V6.208C4.584 3.546 6.403 2.481 9.02 2.481h6.15c2.537 0 4.436.994 4.436 3.55v14.153a.954.954 0 0 1-.954.954.997.997 0 0 1-.454-.114l-5.799-3.17a.693.693 0 0 0-.66 0Z" />
    </IconlyIcon>
  )
}

export function TextItalicIcon(props: IconProps) {
  return (
    <IconlyIcon {...props}>
      <path d="M10 4h8M6 20h8M14.5 4l-5 16" />
    </IconlyIcon>
  )
}

export function TextBoldIcon(props: IconProps) {
  return (
    <IconlyIcon {...props}>
      <path d="M7 4.75h6a3.625 3.625 0 0 1 0 7.25H7V4.75ZM7 12h7a3.625 3.625 0 0 1 0 7.25H7V12Z" />
    </IconlyIcon>
  )
}

export function TextUnderlineIcon(props: IconProps) {
  return (
    <IconlyIcon {...props}>
      <path d="M7 4v7a5 5 0 0 0 10 0V4M5 20h14" />
    </IconlyIcon>
  )
}
