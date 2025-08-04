'use client';

import { FC } from 'react';

import { formatNumberToFinancialAmount } from '@/formatters/finance';
import { useConvertedPrice } from '@/hooks/use-converted-price/useConvertedPrice';
import { Currency } from '@/types/currency';

type Props = {
  amount: number;
  from?: Currency;
};

export const ConvertedPrice: FC<Props> = ({ amount, from }) => {
  const { price, currencySymbol, isLoading } = useConvertedPrice(amount, from);

  if (isLoading) return <span>...</span>;

  return (
    <span>
      {formatNumberToFinancialAmount(price)} {currencySymbol}
    </span>
  );
};
