import { Currency } from '@/types/currency';

export const convertCurrency = (
  amount: number,
  from: Currency,
  to: Currency,
  rates: Record<Currency, number>
): number => {
  if (from === to) return amount;

  if (from === Currency.USD) {
    const rate = rates[to];

    return amount * rate;
  }

  if (to === Currency.USD) {
    const rate = rates[from];

    return amount / rate;
  }

  const rateFrom = rates[from];
  const rateTo = rates[to];

  return (amount / rateFrom) * rateTo;
};
