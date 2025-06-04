"use client";

import { forwardRef } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

import { Language } from "@/components/common/icons/Language";
import { AVAILABLE_LOCALES } from "@/constants/i18n";

import { Dropdown } from "../dropdown/Dropdown";

type Props = {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
};

export const LanguageSwitcher = forwardRef<HTMLDivElement, Props>(
  ({ isOpen, onToggle }, ref) => {
    const router = useRouter();
    const currentLocale = useLocale();

    const handleLocaleChange = (locale: string) => {
      onToggle(false);
      const path = window.location.pathname;
      const segments = path.split("/");
      if (AVAILABLE_LOCALES.includes(segments[1])) {
        segments[1] = locale;
      } else {
        segments.unshift("", locale);
      }
      const newPath = segments.join("/");
      router.push(newPath);
    };

    return (
      <Dropdown
        ref={ref}
        buttonChildren={
          <div className="flex items-center gap-2">
            <Language className="w-4.5 h-4.5 fill-primary-content" />
            <span className="capitalize">{currentLocale}</span>
          </div>
        }
        menuChildren={
          <>
            {AVAILABLE_LOCALES.map((locale) => (
              <li
                key={locale}
                onClick={() => handleLocaleChange(locale)}
                className="cursor-pointer capitalize duration-300 hover:text-divider"
              >
                {locale}
              </li>
            ))}
          </>
        }
        {...{ isOpen, onToggle }}
      />
    );
  }
);

LanguageSwitcher.displayName = "LanguageSwitcher";
