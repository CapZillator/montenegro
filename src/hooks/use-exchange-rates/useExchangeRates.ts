import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/fetch';
import { fetchExchangeRates } from '@/fetchers/currency';
import { Currency } from '@/types/currency';

export const useExchangeRates = () =>
  useQuery<Record<Currency, number>>({
    queryKey: [QUERY_KEYS.currency.exchangeRates],
    queryFn: fetchExchangeRates,
    staleTime: 1000 * 60 * 60 * 24, // 24h
    gcTime: 1000 * 60 * 60 * 24, // 24h
  });
