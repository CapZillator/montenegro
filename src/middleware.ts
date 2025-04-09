import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

import { AVAILABLE_LOCALES,DEFAULT_LOCALE } from "@/constants/i18n";

import { auth0 } from "./lib/auth0";

const intlMiddleware = createMiddleware({
  locales: AVAILABLE_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "as-needed",
});

export const config = {
  matcher: [
    // Run middleware on Auth0 routes…
    "/auth/:path*",
    // …and on all other paths that aren’t static files or API routes
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api|.*\\..*).*)",
  ],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/auth/") ||
    pathname.match(/^\/[a-z]{2}(?:-[A-Z]{2})?\/auth\//)
  ) {
    // Auth0 middleware runs on authentication routes
    return auth0.middleware(request);
  }

  // Apply Next-Intl middleware
  const intlResponse = intlMiddleware(request);

  // Apply Auth0 session handling
  const authResponse = await auth0.middleware(request);

  if (authResponse) {
    // Ensure authentication headers are passed through
    for (const [key, value] of authResponse.headers.entries()) {
      intlResponse.headers.set(key, value);
    }
  }

  return intlResponse;
}
