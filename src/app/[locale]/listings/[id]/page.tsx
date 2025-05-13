import { notFound } from "next/navigation";
import classNames from "classnames";

import { getListingById } from "@/utils/db/listings";

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
    <div>
      <img
        src={listing.images[0]}
        alt="Preview image"
        className={classNames(
          "relative w-full aspect-4/3 object-cover rounded-md",
          "lg:max-w-100"
        )}
      />
    </div>
  );
}
