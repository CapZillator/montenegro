import { notFound } from "next/navigation";
import classNames from "classnames";

import { getListingById } from "@/utils/db/listings";

import { Gallery } from "./components/gallery/Gallery";
import { ParamsSchema } from "./constants";

export default async function ListingPage({ params }: any) {
  const resolvedParams = await Promise.resolve(params);
  const parseResult = ParamsSchema.safeParse(resolvedParams);

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
        "w-full pt-5",
        "lg:grid lg:grid-cols-3",
        "xl:max-w-container-md xl:mx-auto"
      )}
    >
      <div className={classNames("lg:col-span-2")}>
        <Gallery images={listing.images} />
      </div>
    </div>
  );
}
