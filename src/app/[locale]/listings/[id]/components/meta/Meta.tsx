'use client';

import { FC } from 'react';
import classNames from 'classnames';

import { PublishDate } from '@/components/common/publish-date/PublishDate';
import { formatNumberToFinancialAmount } from '@/formatters/finance';
import { useConvertedPrice } from '@/hooks/use-converted-price/useConvertedPrice';
import { useTranslation } from '@/hooks/use-translation/useTranslation';
import { Currency } from '@/types/currency';

type Props = {
  price: number;
  area: number;
  date: string | Date;
};

export const Meta: FC<Props> = ({ price, area, date }) => {
  const { t } = useTranslation();
  const {
    price: convertedPrice,
    currencySymbol,
    isLoading,
  } = useConvertedPrice(price, Currency.USD);

  if (isLoading) return <div>...</div>;

  const pricePerUnit = Math.round(convertedPrice / area);

  return (
    <div className={classNames('grid grid-cols-2 gap-x-3', 'lg:pr-2')}>
      <p className={classNames('font-semibold col-span-2', 'lg:text-lg')}>
        {formatNumberToFinancialAmount(convertedPrice)} {currencySymbol}
      </p>
      <div>
        {pricePerUnit ? (
          <p className="text-sm">
            1 {t('measures.m')}
            <sup>2</sup> - {formatNumberToFinancialAmount(pricePerUnit)}
            {currencySymbol}
          </p>
        ) : null}
      </div>

      <PublishDate date={date} className="lg:text-base justify-end" />
    </div>
  );
};
