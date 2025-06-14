// import { getTranslations } from "next-intl/server";
import classNames from "classnames";

import { getListings } from "@/utils/db/listings";
import { parseSearchParamsToFilters } from "@/utils/filters";

import { FiltersForm } from "./components/filters-form/FiltersForm";
import { ListingsList } from "./components/listings-list/ListingsList";

export default async function Home({ searchParams }: any) {
  const params = await Promise.resolve(searchParams);
  const filters = parseSearchParamsToFilters(params);
  const listings = await getListings(filters);

  return (
    <div className={classNames("")}>
      <FiltersForm />
      <ListingsList data={listings} />
    </div>
  );
}
