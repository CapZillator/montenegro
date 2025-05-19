// import { getTranslations } from "next-intl/server";
import classNames from "classnames";

import { getListings } from "@/utils/db/listings";
import { parseSearchParamsToFilters } from "@/utils/filters";

import { FiltersForm } from "./components/filters-form/FiltersForm";
import { ListingsList } from "./components/listings-list/ListingsList";

export default async function Home({ searchParams }: any) {
  const s = await Promise.resolve(searchParams);
  const filters = parseSearchParamsToFilters(s);
  // const t = await getTranslations("welcome");
  const listings = await getListings(filters);
  // console.log("filters", filters);
  // console.log("listings", listings);

  return (
    <div className={classNames("")}>
      <FiltersForm />
      <ListingsList data={listings} />
    </div>
  );
}
