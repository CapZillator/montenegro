import { FETCH_PATHS } from '@/constants/fetch';
import { Currency } from '@/types/currency';

export const fetchExchangeRates = async (): Promise<
  Record<Currency, number>
> => {
  const res = await fetch(FETCH_PATHS.internal.currency.exchangeRates);
  if (!res.ok) throw new Error('Failed to fetch exchange rates');

  const data = await res.json();

  const filtered = {
    EUR: data.EUR,
    VND: data.VND,
  } as Record<Currency, number>;

  return filtered;
};
