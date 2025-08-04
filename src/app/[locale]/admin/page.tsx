'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';

import { QUERY_KEYS } from '@/constants/fetch';
import { ListingState } from '@/enums/listing';
import {
  deleteListingFetcher,
  updateListingStateFetcher,
  userListingsFetcher,
} from '@/fetchers/listings';
import { useToast } from '@/hooks/use-toast/useToast';
import { useTranslation } from '@/hooks/use-translation/useTranslation';

import { ConfirmDeleteModal } from './components/confirm-delete-modal/ConfirmDeleteModal';
import { ListingForm } from './components/listing-form/listingForm';
import { ListingList } from './components/listing-list/ListingList';
import { AdminPanelContentComponents } from './enums';
import { ConfirmDeletion } from './types';

export default function AdminDashboard() {
  const [componentToShow, setComponentToShow] = useState(
    AdminPanelContentComponents.LISTINGS_LIST
  );
  const [confirmDeletion, setConfirmDeletion] = useState<ConfirmDeletion>({
    isShowModal: false,
  });
  const [listingIdToUpdate, setListingIdToUpdate] = useState('');
  const { data: session, status } = useSession();
  const { data: listings, isLoading: isListingsLoading } = useQuery({
    queryKey: [QUERY_KEYS.listings.userListings],
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

  const onChangeVisibility = async (id: string, state: ListingState) => {
    try {
      setIsListDisabled(true);
      await updateListingStateFetcher(id, state);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.listings.userListings],
      });
    } catch (_error) {
      showToast(t('errors.listingUpdateFailed'), 'error');
    } finally {
      setIsListDisabled(false);
    }
  };

  const onDeleteListing = (id: string) =>
    setConfirmDeletion({
      isShowModal: true,
      listingId: id,
    });

  const onDeleteConfirmed = async () => {
    try {
      setConfirmDeletion({
        isShowModal: false,
        listingId: null,
      });
      if (confirmDeletion.listingId) {
        setIsListDisabled(true);
        await deleteListingFetcher(confirmDeletion.listingId);
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.listings.userListings],
        });

        return;
      }

      showToast(t('errors.deleteFailed'), 'error');
    } catch (_error) {
      showToast(t('errors.deleteFailed'), 'error');
    } finally {
      setIsListDisabled(false);
    }
  };

  const onCancelDeletion = () =>
    setConfirmDeletion({
      isShowModal: false,
      listingId: null,
    });

  const formData = listingIdToUpdate
    ? listings?.find((listing) => listing.id === listingIdToUpdate)
    : undefined;

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
    <>
      <div
        className={classNames('w-full', '2xl:max-w-container-md 2xl:mx-auto')}
      >
        {componentToShow === AdminPanelContentComponents.LISTINGS_LIST && (
          <ListingList
            {...{
              listings,
              onOpenListing,
              onChangeVisibility,
              onDeleteListing,
              isDisabled: isListDisabled,
            }}
          />
        )}
        {componentToShow === AdminPanelContentComponents.LISTING_FORM && (
          <ListingForm onClose={onCloseListingForm} initialListing={formData} />
        )}
      </div>

      {confirmDeletion.isShowModal && (
        <ConfirmDeleteModal
          handleClose={onCancelDeletion}
          handleConfirm={onDeleteConfirmed}
        />
      )}
    </>
  );
}
