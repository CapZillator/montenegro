'use server';

import { ResidentialPremisesFilters } from '@/types/filters';
import { SortOption } from '@/types/sorting';
import { getListings } from '@/utils/db/listings';

export const fetchListings = async (
  filters: ResidentialPremisesFilters,
  sort: SortOption,
  page: number,
  perPage: number
) => {
  const { listings, totalPages } = await getListings(
    filters,
    sort,
    page,
    perPage
  );

  return { listings, totalPages };
};
