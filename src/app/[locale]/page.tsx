import { getTranslations } from 'next-intl/server';
import classNames from 'classnames';

import { formatNumberToFinancialAmount } from '@/formatters/finance';
import { SortOption } from '@/types/sorting';
import { PAGINATION_OPTIONS } from '@/utils/db/constants';
import { getListings } from '@/utils/db/listings';
import { parseSearchParamsToFilters } from '@/utils/filters';

import { FiltersForm } from './components/filters-form/FiltersForm';
import { ListingsList } from './components/listings-list/ListingsList';
import { Sorting } from './components/sorting/Sorting';

export default async function Home({ searchParams }: any) {
  const params = await Promise.resolve(searchParams);
  const filters = parseSearchParamsToFilters(params);
  const sort = (params.sort as SortOption) ?? SortOption.NEWEST;
  const t = await getTranslations();

  const currentPage = Number(params.page ?? 1);
  const perPage = PAGINATION_OPTIONS.itemsPerPage;

  const { listings, total, totalPages } = await getListings(
    filters,
    sort,
    currentPage,
    perPage
  );

  return (
    <div className={classNames('')}>
      <div
        className={classNames(
          'flex items-center gap-3 my-3 flex-wrap',
          'xl:block'
        )}
      >
        <FiltersForm />
        <div
          className={classNames(
            'flex items-center gap-5 flex-wrap',
            'xl:pl-84 xl:pr-2 xl:pt-4'
          )}
        >
          <Sorting />
          <p className={classNames('hidden text-lg', 'md:block')}>
            {formatNumberToFinancialAmount(total)} {t('listings.offers')}
          </p>
        </div>
      </div>

      <ListingsList
        data={listings}
        currentPage={currentPage}
        totalPages={totalPages}
        filters={filters}
        sort={sort}
        perPage={perPage}
      />
    </div>
  );
}
