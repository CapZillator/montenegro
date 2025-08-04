'use client';

import { FC } from 'react';
import classNames from 'classnames';

import { formatNumberToFinancialAmount } from '@/formatters/finance';
import { useConvertedPrice } from '@/hooks/use-converted-price/useConvertedPrice';
import { useTranslation } from '@/hooks/use-translation/useTranslation';
import { Currency } from '@/types/currency';

type Props = {
  price: number;
  area: number;
};

export const Price: FC<Props> = ({ price, area }) => {
  const { t } = useTranslation();
  const {
    price: convertedPrice,
    currencySymbol,
    isLoading,
  } = useConvertedPrice(price, Currency.USD);

  if (isLoading) return <div>...</div>;

  const pricePerUnit = Math.round(convertedPrice / area);

  return (
    <div>
      <p className={classNames('font-semibold', 'lg:text-lg')}>
        {formatNumberToFinancialAmount(convertedPrice)} {currencySymbol}
      </p>
      {pricePerUnit ? (
        <p className="text-sm">
          1 {t('measures.m')}
          <sup>2</sup> - {formatNumberToFinancialAmount(pricePerUnit)}{' '}
          {currencySymbol}
        </p>
      ) : null}
    </div>
  );
};
