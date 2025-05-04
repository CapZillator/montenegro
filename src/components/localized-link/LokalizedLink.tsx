"use client";

import { FC, ReactNode } from "react";
import NextLink, { LinkProps } from "next/link";

import { DEFAULT_LOCALE } from "@/constants/i18n";
import { useLocale } from "@/hooks/use-locale/useLocale";

type LocalizedLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
};

export const LocalizedLink: FC<LocalizedLinkProps> = ({
  href,
  children,
  className,
  ...rest
}) => {
  const locale = useLocale();

  const prefixedHref =
    typeof href === "string"
      ? locale === DEFAULT_LOCALE
        ? href
        : `/${locale}${href.startsWith("/") ? href : `/${href}`}`
      : href;

  return (
    <NextLink href={prefixedHref} className={className} {...rest}>
      {children}
    </NextLink>
  );
};
