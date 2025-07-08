'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';

import { AddIcon } from '@/components/common/icons';
import { queryKeys } from '@/constants/fetch';
import { deleteListingFetcher, userListingsFetcher } from '@/fetchers/listings';
import { useToast } from '@/hooks/use-toast/useToast';
import { useTranslation } from '@/hooks/use-translation/useTranslation';

import { ListingForm } from './components/listing-form/listingForm';
import { ListingList } from './components/listing-list/ListingList';
import { AdminPanelContentComponents } from './enums';

export default function AdminDashboard() {
  const [componentToShow, setComponentToShow] = useState(
    AdminPanelContentComponents.LISTINGS_LIST
  );
  const [listingIdToUpdate, setListingIdToUpdate] = useState('');
  const { data: session, status } = useSession();
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
    setListingIdToUpdate('');
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
      showToast(t('errors.deleteFailed'), 'error');
    } finally {
      setIsListDisabled(false);
    }
  };

  const formData = listingIdToUpdate
    ? listings?.find((listing) => listing.id === listingIdToUpdate)
    : undefined;

  console.log('listings list', listings);
  console.log(listingsError);

  if (status === 'loading' || isListingsLoading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  if (!session) {
    return (
      <main>
        <h1>Auth required!</h1>
      </main>
    );
  }

  return (
    <div className={classNames('w-full 2xl:max-w-container-md 2xl:mx-auto')}>
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
                'mr-2 bg-primary-content text-primary p-2 rounded-sm shadow-sm shadow-primary-content/40 duration-300 cursor-pointer',
                'hover:bg-secondary-content'
              )}
              onClick={() =>
                setComponentToShow(AdminPanelContentComponents.LISTING_FORM)
              }
            >
              <AddIcon className="w-6 h-6 stroke-primary" />
            </button>
          </div>
        </div>
      )}
      {componentToShow === AdminPanelContentComponents.LISTING_FORM && (
        <ListingForm onClose={onCloseListingForm} initialListing={formData} />
      )}
    </div>
  );
}
