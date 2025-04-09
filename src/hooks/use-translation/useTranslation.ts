"use client";

import { useCallback,useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { AVAILABLE_LOCALES,DEFAULT_LOCALE } from "@/constants/i18n";

const getNestedValue = (
  obj: Record<string, any>,
  key: string
): string | undefined => {
  const result = key
    .split(".")
    .reduce(
      (acc, part) => (acc && typeof acc === "object" ? acc[part] : undefined),
      obj
    );

  return typeof result === "string" ? result : undefined;
};

export const useTranslation = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const locale = AVAILABLE_LOCALES.includes(segments[0])
    ? segments[0]
    : DEFAULT_LOCALE;

  const [translations, setTranslations] = useState<Record<string, any>>({});

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const messages = await import(`../../../messages/${locale}.json`);
        setTranslations(messages.default);
      } catch (error) {
        console.error(
          `Error loading translations for locale: ${locale}`,
          error
        );
      }
    };

    loadTranslations();
  }, [locale]);

  const t = useCallback(
    (key: string, params?: Record<string, string>) => {
      const translation = getNestedValue(translations, key);

      if (typeof translation !== "string") return key;

      return params
        ? Object.entries(params).reduce(
            (result, [param, value]) => result.replace(`{{${param}}}`, value),
            translation
          )
        : translation;
    },
    [translations]
  );

  return { t };
};
