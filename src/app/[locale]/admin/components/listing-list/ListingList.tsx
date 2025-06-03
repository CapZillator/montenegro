import { FC } from "react";
import { useLocale } from "next-intl";
import classNames from "classnames";

import { DeleteStroke } from "@/components/common/icons/actions/DeleteStroke";
import { Edit } from "@/components/common/icons/actions/Edit";
import { Area } from "@/components/common/icons/realty/Area";
import { Bed } from "@/components/common/icons/realty/Bed";
import { Calendar } from "@/components/common/icons/realty/Calendar";
import { Door } from "@/components/common/icons/realty/Door";
import { Location } from "@/components/common/icons/realty/Location";
import { ImageButton } from "@/components/common/image-button/ImageButton";
import { isoUTCStringToLocaleString } from "@/formatters/date";
import { formatNumberToFinancialAmount } from "@/formatters/finance";
import { useTranslation } from "@/hooks/use-translation/useTranslation";
import { ResidentialPremises } from "@/types/realEstate";
import { getFullAddress, getLocalizedStringValue } from "@/utils/listings";

type Props = {
  onOpenListing: (id: string) => void;
  onDeleteListing: (id: string) => void;
  listings?: ResidentialPremises[];
  isDisabled?: boolean;
};

export const ListingList: FC<Props> = ({
  onOpenListing,
  onDeleteListing,
  listings,
  isDisabled,
}) => {
  const locale = useLocale();
  const { t } = useTranslation();

  return (
    <div
      className={classNames(
        "grid grid-cols-1 gap-2",
        "sm:grid-cols-2",
        "md:grid-cols-3",
        "lg:grid-cols-4 lg:gap-3"
      )}
    >
      {listings?.map((listing) => (
        <div
          key={listing.id}
          className="relative flex flex-col gap-2 border-solid border-divider/25 border-1 shadow-md p-2 rounded-md bg-primary"
        >
          <img
            src={listing.images[0]}
            alt="Preview image"
            className="relative w-full aspect-4/3 object-cover rounded-md"
          />
          <div>
            <div
              className={classNames("flex items-center justify-between gap-2")}
            >
              <p className={classNames("font-semibold")}>
                {formatNumberToFinancialAmount(listing.price)} €
              </p>
              <span
                className={classNames(
                  "lowercase py-0.5 px-2 bg-primary-content text-primary rounded-sm"
                )}
              >
                {t(`listings.types.${listing.listingType}`)}
              </span>
            </div>

            <h3 className={classNames("font-semibold truncate")}>
              {getLocalizedStringValue(listing.title, locale)}
            </h3>
            <div className={classNames("flex items-center gap-1")}>
              <Location
                className={classNames("w-5 h-5 stroke-primary-content")}
              />
              <span className="truncate">
                {getFullAddress(listing.location, listing.address)}
              </span>
            </div>
          </div>
          <div className={classNames("grid grid-cols-4 text-sm")}>
            <div className={classNames("flex items-center gap-2")}>
              <Door className={classNames("w-4 h-4 fill-primary-content")} />
              <span>{listing.rooms}</span>
            </div>
            <div className={classNames("flex items-center gap-2")}>
              <Bed className={classNames("w-4 h-4 stroke-primary-content")} />
              <span>{listing.bedrooms}</span>
            </div>
            <div className={classNames("col-span-2 flex items-center gap-2")}>
              <Area className={classNames("w-4 h-4 fill-primary-content")} />
              <span>
                {listing.area} {t("measures.m")}
                <sup>2</sup>
              </span>
            </div>
          </div>
          <div className={classNames("flex items-center gap-2")}>
            <Calendar
              className={classNames("w-4 h-4 stroke-primary-content")}
            />
            <span className="text-sm">
              {isoUTCStringToLocaleString(listing.createdAt)}
            </span>
          </div>
          <div
            className={classNames(
              "absolute top-4 left-4 right-4 flex justify-end gap-2"
            )}
          >
            <ImageButton
              onClick={() => onOpenListing(listing.id)}
              isDisabled={isDisabled}
            >
              <Edit
                className={classNames(
                  "w-5 h-5 fill-primary-content duration-300 group-hover:fill-primary"
                )}
              />
            </ImageButton>
            <ImageButton
              onClick={() => onDeleteListing(listing.id)}
              isDisabled={isDisabled}
            >
              <DeleteStroke
                className={classNames(
                  "w-5 h-5 stroke-primary-content duration-300 group-hover:stroke-primary"
                )}
              />
            </ImageButton>
          </div>
        </div>
      ))}
    </div>
  );
};
