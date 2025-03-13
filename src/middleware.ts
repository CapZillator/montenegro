import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { auth0 } from "./lib/auth0";

const intlMiddleware = createMiddleware({
  locales: ["en", "ru"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export async function middleware(request: NextRequest) {
  // Запускаем Auth0 Middleware
  const authResponse = await auth0.middleware(request);

  if (authResponse) {
    console.log("Auth0 middleware applied");
    // Передаём локализацию в `authResponse`, чтобы не терять её
    const localeResponse = intlMiddleware(request);

    // Копируем заголовки из `localeResponse`, чтобы сохранить локаль
    localeResponse.headers.forEach((value, key) => {
      authResponse.headers.set(key, value);
    });

    return authResponse; // Возвращаем объединенный ответ
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
