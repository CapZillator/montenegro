import { FC } from "react";
import classNames from "classnames";

import { ResidentialPremises } from "@/types/realEstate";

type Props = {
  onOpenListing: (id: string) => void;
  onDeleteListing: (id: string) => void;
  listings?: ResidentialPremises[];
};

export const ListingList: FC<Props> = ({
  listings,
  onOpenListing,
  onDeleteListing,
}) => (
  <div className={classNames("space-y")}>
    {listings?.map((listing) => (
      <div
        key={listing.id}
        className="flex items-center gap-2 border-secondary p-2 rounded-sm"
      >
        <div onClick={() => onOpenListing(listing.id)}>{listing.id}</div>
        <button onClick={() => onDeleteListing(listing.id)}>X</button>
      </div>
    ))}
  </div>
);
