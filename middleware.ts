import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  getComponentSlugFromDocsPath,
  isComponentReady,
} from "@/lib/component-readiness";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const slug = getComponentSlugFromDocsPath(pathname);
  if (!slug || isComponentReady(slug)) {
    return NextResponse.next();
  }

  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = `/docs/components/upcoming/${slug}`;
  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  matcher: ["/docs/components/:path*"],
};
