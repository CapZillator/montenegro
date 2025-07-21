import { useMemo } from 'react';

import { ListingState } from '@/enums/listing';
import { ResidentialPremises } from '@/types/realEstate';

import { SortOption } from './enums';

export const useSortedListings = (
  listings: ResidentialPremises[] = [],
  sortBy: SortOption
) => {
  return useMemo(() => {
    const statePriority = (state: ListingState): number => {
      switch (state) {
        case ListingState.ACTIVE:
          return 3;
        case ListingState.PAUSED:
          return 2;
        case ListingState.DELETED:
          return 1;
        default:
          return 0;
      }
    };

    return [...listings].sort((a, b) => {
      switch (sortBy) {
        case SortOption.NEWEST:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case SortOption.OLDEST:
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case SortOption.ACTIVE:
          return statePriority(b.state) - statePriority(a.state);
        case SortOption.INACTIVE:
          return statePriority(a.state) - statePriority(b.state);
        default:
          return 0;
      }
    });
  }, [listings, sortBy]);
};
