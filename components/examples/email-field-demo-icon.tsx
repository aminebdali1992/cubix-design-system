import type { SVGProps } from "react"

/** Envelope mark used in Email Field docs previews. */
export function EmailFieldDemoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M16.9188 9.37595L13.2161 12.3868C12.5165 12.9418 11.5322 12.9418 10.8326 12.3868L7.09863 9.37595"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.0906 19.5C18.625 19.507 20.3332 17.4246 20.3332 14.8653V9.14168C20.3332 6.58235 18.625 4.5 16.0906 4.5H7.90912C5.37466 4.5 3.6665 6.58235 3.6665 9.14168V14.8653C3.6665 17.4246 5.37466 19.507 7.90912 19.5H16.0906Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
