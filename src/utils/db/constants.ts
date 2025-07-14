import { SortOption } from '@/types/sorting';

export const SORT_SQL_MAP: Record<SortOption, string> = {
  [SortOption.NEWEST]: 'created_at DESC',
  [SortOption.OLDEST]: 'created_at ASC',
  [SortOption.PRICE_ASC]: 'price ASC',
  [SortOption.PRICE_DESC]: 'price DESC',
  [SortOption.AREA_ASC]: 'area ASC',
  [SortOption.AREA_DESC]: 'area DESC',
};

export const PAGINATION_OPTIONS = {
  defaultPage: 1,
  itemsPerPage: 24,
};
