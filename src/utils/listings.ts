import { DEFAULT_LOCALE } from "@/constants/i18n";

export const getFullAddress = (city: string, address?: string) =>
  `${city}${address ? `, ${address}` : ""}`;

export const getLocalizedStringValue = (
  data: Record<string, string>,
  currentLocale: string
) => {
  if (data[currentLocale]) return data[currentLocale];
  if (data[DEFAULT_LOCALE]) return data[DEFAULT_LOCALE];

  const fallbackLocales = Object.values(data);

  return fallbackLocales[0];
};
