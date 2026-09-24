import localFont from "next/font/local"

/*
  Preload the woff2. Used-box overrides and unicode-range live on the
  "IRANSans Cubix" face in app/globals.css. next/font/local writes
  declarations onto the Arial fallback only, so they must not live here.
*/
export const iranSans = localFont({
  src: "./IRANSansXV.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-iran-sans",
  display: "swap",
})
