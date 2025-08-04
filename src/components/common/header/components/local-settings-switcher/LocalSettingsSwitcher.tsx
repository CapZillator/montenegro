'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import classNames from 'classnames';

import { Button } from '@/components/common/button';
import {
  CurrencyIcon,
  GlobeIcon,
  LanguageIcon,
} from '@/components/common/icons';
import { CurrencySymbols } from '@/constants/currency';
import { AVAILABLE_LOCALES } from '@/constants/i18n';
import { useCurrency } from '@/context/currency/Currency';
import { useTranslation } from '@/hooks/use-translation/useTranslation';
import { Currency } from '@/types/currency';

import { Dropdown } from '../dropdown/Dropdown';
import { SubMenu } from './components/sub-menu/SubMenu';

type Props = {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
};

export const LocalSettingsSwitcher = forwardRef<HTMLDivElement, Props>(
  ({ isOpen, onToggle }, ref) => {
    const router = useRouter();
    const { currency, setCurrency } = useCurrency();
    const currentLocale = useLocale();
    const [currentSettings, setCurrentSettings] = useState({
      currency: currency,
      locale: currentLocale,
    });
    const { t } = useTranslation();
    const wasApplied = useRef(false);

    const onCurrencySelect = (currency: Currency) =>
      setCurrentSettings({ ...currentSettings, currency });

    const onLocaleSelect = (locale: string) =>
      setCurrentSettings({ ...currentSettings, locale });

    const handleLocaleChange = (locale: string) => {
      const path = window.location.pathname;
      const segments = path.split('/');
      if (AVAILABLE_LOCALES.includes(segments[1])) {
        segments[1] = locale;
      } else {
        segments.unshift('', locale);
      }
      const newPath = segments.join('/');
      router.push(newPath);
    };

    const onApplySettings = () => {
      wasApplied.current = true;
      onToggle(false);
      handleLocaleChange(currentSettings.locale);
      setCurrency(currentSettings.currency);
    };

    const currencies = Object.values(Currency);

    useEffect(() => {
      setCurrentSettings({
        currency,
        locale: currentLocale,
      });
    }, [currency, currentLocale]);

    useEffect(() => {
      if (!isOpen) {
        if (!wasApplied.current) {
          setCurrentSettings({ currency, locale: currentLocale });

          return;
        }
        wasApplied.current = false;
      }
    }, [isOpen, currency, currentLocale]);

    return (
      <Dropdown
        ref={ref}
        buttonChildren={
          <div className="flex items-center gap-2">
            <GlobeIcon className="w-4.5 h-4.5 fill-primary-content" />
            <span className="capitalize">{`${currentLocale}, ${CurrencySymbols[currency]}`}</span>
          </div>
        }
        menuChildren={
          <div className="min-w-40">
            <SubMenu
              entries={AVAILABLE_LOCALES}
              onEntrySelect={onLocaleSelect}
              icon={<LanguageIcon className="w-4 h-4 fill-primary-content " />}
              label={t('localSettings.language')}
              selectedValue={currentSettings.locale}
              entryClassName="p-0.5"
            />

            <SubMenu
              entries={currencies}
              onEntrySelect={(currency) =>
                onCurrencySelect(currency as Currency)
              }
              icon={
                <CurrencyIcon className="w-4 h-4 stroke-primary-content " />
              }
              label={t('localSettings.currency')}
              selectedValue={currentSettings.currency}
              entryClassName="text-sm p-1"
            />

            <div className={classNames('flex justify-end')}>
              <Button onClick={onApplySettings} className="w-full">
                {t('actions.apply')}
              </Button>
            </div>
          </div>
        }
        {...{ isOpen, onToggle }}
        menuAs={'div'}
      />
    );
  }
);

LocalSettingsSwitcher.displayName = 'LocalSettingsSwitcher';
