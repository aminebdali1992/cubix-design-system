import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { iranSans } from "@/app/fonts/iran-sans";
import { Toaster } from "@/components/cubix/sonner";
import { TooltipProvider } from "@/components/cubix/tooltip";
import { GitHubLink } from "@/components/github-link";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site";

import "./globals.css";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontHeading = Geist({
  subsets: ["latin"],
  variable: "--font-heading",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Cubix - Beautifully designed components",
    template: "%s - Cubix",
  },
  description:
    "Cubix is a design system with beautifully designed, accessible components and an open-source distribution model. Copy, paste, ship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontHeading.variable} ${fontMono.variable} ${iranSans.variable} cubix-scrollbar`}
    >
      <body className="min-h-dvh bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <SiteHeader githubLink={<GitHubLink />} />
            <div className="relative z-0">{children}</div>
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
