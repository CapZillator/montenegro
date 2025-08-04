import { Currency } from '@/types/currency';

export const DEFAULT_CURRENCY: Currency = Currency.USD;

export const CurrencySymbols: Record<Currency, string> = {
  [Currency.USD]: '$',
  [Currency.VND]: '₫',
  [Currency.EUR]: '€',
};
