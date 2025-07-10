// import { getTranslations } from "next-intl/server";
import classNames from 'classnames';

import { SortOption } from '@/types/sorting';
import { getListings } from '@/utils/db/listings';
import { parseSearchParamsToFilters } from '@/utils/filters';

import { FiltersForm } from './components/filters-form/FiltersForm';
import { ListingsList } from './components/listings-list/ListingsList';
import { Sorting } from './components/sorting/Sorting';

export default async function Home({ searchParams }: any) {
  const params = await Promise.resolve(searchParams);
  const filters = parseSearchParamsToFilters(params);
  const sort = (params.sort as SortOption) ?? SortOption.NEWEST;

  const listings = await getListings(filters, sort);

  return (
    <div className={classNames('')}>
      <div
        className={classNames(
          'flex items-center gap-3 my-3 flex-wrap',
          'lg:block'
        )}
      >
        <Sorting />
        <FiltersForm />
      </div>
      <ListingsList data={listings} />
    </div>
  );
}
