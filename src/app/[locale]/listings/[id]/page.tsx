import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import classNames from "classnames";

import { getListingById } from "@/utils/db/listings";
import { getLocalizedStringValue } from "@/utils/listings";

import { Gallery } from "./components/gallery/Gallery";
import { Price } from "./components/price/Price";
import { Summary } from "./components/summary/Summary";
import { ParamsSchema } from "./constants";

export default async function ListingPage({ params }: any) {
  const resolvedParams = await Promise.resolve(params);
  const parseResult = ParamsSchema.safeParse(resolvedParams);
  const locale = await getLocale();

  if (!parseResult.success) {
    notFound();
  }

  const listing = await getListingById(parseResult.data.id);

  if (!listing) {
    notFound();
  }

  return (
    <div
      className={classNames(
        "w-full space-y-2 ",
        "lg:grid lg:grid-cols-3 lg:gap-2 lg:space-y-0",
        "xl:max-w-container-md xl:mx-auto"
      )}
    >
      <div className={classNames("lg:col-span-3")}>
        <h1 className={classNames("font-semibold text-xl", "lg:text-2xl")}>
          {getLocalizedStringValue(listing.title, locale)}
        </h1>
      </div>
      <div className={classNames("lg:col-span-2")}>
        <Price price={listing.price} area={listing.area}/>
      </div>
      <div className={classNames("lg:col-span-2")}>
        <Gallery images={listing.images} />
      </div>
      <div className={classNames("lg:col-span-2")}>
        <Summary {...listing} />
      </div>
      <p className={classNames("lg:col-span-2")}>
        {getLocalizedStringValue(listing.description, locale)}
      </p>
    </div>
  );
}
