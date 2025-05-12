// import { getTranslations } from "next-intl/server";

import { getListings } from "@/utils/db/listings";
import { parseSearchParamsToFilters } from "@/utils/filters";

import { ListingsList } from "./components/listings-list/ListingsList";

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const filters = parseSearchParamsToFilters(searchParams);
  // const t = await getTranslations("welcome");
  const listings = await getListings(filters);
  console.log("filters", filters);
  console.log("listings", listings);

  return (
    <div>
      <ListingsList data={listings} />
    </div>
  );
}
