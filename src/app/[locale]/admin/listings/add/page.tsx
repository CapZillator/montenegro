"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { navigationPaths } from "@/constants/navigation";

import { ListingForm } from "../../components/listing-form/listingForm";

export default function ListingManager() {
  const { data: session } = useSession();
  const router = useRouter();

  const onCloseListingForm = () => router.back();
  const onSuccess = () => router.push(navigationPaths.LISTING_ADMIN);

  if (!session) {
    return (
      <main>
        <h1>Auth required!</h1>
      </main>
    );
  }

  return <ListingForm onClose={onCloseListingForm} {...{ onSuccess }} />;
}
