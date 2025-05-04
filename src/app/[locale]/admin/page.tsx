"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";

import { Add } from "@/components/common/icons/actions/Add";
import { queryKeys } from "@/constants/fetch";
import { deleteListingFetcher, userListingsFetcher } from "@/fetchers/listings";
import { useToast } from "@/hooks/use-toast/useToast";
import { useTranslation } from "@/hooks/use-translation/useTranslation";

import { ListingForm } from "./components/listing-form/listingForm";
import { ListingList } from "./components/listing-list/ListingList";
import { AdminPanelContentComponents } from "./enums";

export default function ListingManager() {
  const [componentToShow, setComponentToShow] = useState(
    AdminPanelContentComponents.LISTINGS_LIST
  );
  const [listingIdToUpdate, setListingIdToUpdate] = useState("");
  const { user, isLoading, error } = useUser();
  const {
    data: listings,
    error: listingsError,
    isLoading: isListingsLoading,
  } = useQuery({
    queryKey: [queryKeys.listings.userListings],
    queryFn: async () => userListingsFetcher(),
  });
  const { t } = useTranslation();
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const [isListDisabled, setIsListDisabled] = useState(false);

  const onCloseListingForm = () => {
    setComponentToShow(AdminPanelContentComponents.LISTINGS_LIST);
    setListingIdToUpdate("");
  };
  const onOpenListing = (id: string) => {
    setListingIdToUpdate(id);
    setComponentToShow(AdminPanelContentComponents.LISTING_FORM);
  };
  const onDeleteListing = async (id: string) => {
    try {
      setIsListDisabled(true);
      await deleteListingFetcher(id);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.listings.userListings],
      });
    } catch (_error) {
      showToast(t("errors.deleteFailed"), "error");
    } finally {
      setIsListDisabled(false);
    }
  };

  const formData = listingIdToUpdate
    ? listings?.find((listing) => listing.id === listingIdToUpdate)
    : undefined;

  console.log("listings list", listings);
  console.log(listingsError);

  if (error || listingsError) {
    return (
      <main>
        <h1>Error</h1>
      </main>
    );
  }

  if (isLoading || isListingsLoading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  if (!user) {
    return (
      <main>
        <h1>Auth required!</h1>
        <Link href="/auth/login">Login</Link>
      </main>
    );
  }

  return (
    <>
      {componentToShow === AdminPanelContentComponents.LISTINGS_LIST && (
        <div className="relative">
          <ListingList
            {...{
              listings,
              onOpenListing,
              onDeleteListing,
              isDisabled: isListDisabled,
            }}
          />
          <div className="sticky bottom-8 w-full flex justify-end z-5">
            <button
              type="button"
              className={classNames(
                "mr-2 bg-primary-content text-primary p-2 rounded-sm shadow-sm shadow-primary-content/40 duration-300 cursor-pointer",
                "hover:bg-secondary-content"
              )}
              onClick={() =>
                setComponentToShow(AdminPanelContentComponents.LISTING_FORM)
              }
            >
              <Add className="w-6 h-6 stroke-primary" />
            </button>
          </div>
        </div>
      )}
      {componentToShow === AdminPanelContentComponents.LISTING_FORM && (
        <ListingForm onClose={onCloseListingForm} initialListing={formData} />
      )}
    </>
  );
}
