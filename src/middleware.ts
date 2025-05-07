import createIntlMiddleware from "next-intl/middleware";

import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from "@/constants/i18n";

export default createIntlMiddleware({
  locales: AVAILABLE_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "as-needed",
});

export const config = {
  matcher: [
    // Все пути, кроме _next, API, статики и файлов
    "/((?!_next|api|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};
