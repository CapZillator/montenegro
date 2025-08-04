import { CurrencySymbols } from '@/constants/currency';
import { useCurrency } from '@/context/currency/Currency';
import { Currency } from '@/types/currency';
import { convertCurrency } from '@/utils/currency';

import { useExchangeRates } from '../use-exchange-rates/useExchangeRates';

export const useConvertedPrice = (
  amount: number,
  from?: Currency // опционально, если нужно указать явно
): {
  price: number;
  currency: Currency;
  currencySymbol: string;
  isLoading: boolean;
} => {
  const { currency: selectedCurrency } = useCurrency();
  const { data: rates, isLoading } = useExchangeRates();

  const source = from ?? Currency.USD;

  const converted =
    !rates || source === selectedCurrency
      ? amount
      : convertCurrency(amount, source, selectedCurrency, rates);

  const currencySymbol = CurrencySymbols[selectedCurrency];

  return {
    price: converted,
    currency: selectedCurrency,
    currencySymbol,
    isLoading,
  };
};
