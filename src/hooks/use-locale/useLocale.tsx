import { usePathname } from "next/navigation";

import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from "@/constants/i18n";

export const useLocale = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return AVAILABLE_LOCALES.includes(segments[0]) ? segments[0] : DEFAULT_LOCALE;
};
