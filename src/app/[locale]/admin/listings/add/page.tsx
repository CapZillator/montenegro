"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0";

import { navigationPaths } from "@/constants/navigation";

import { ListingForm } from "../../components/listing-form/listingForm";

export default function ListingManager() {
  const { user, isLoading, error } = useUser();
  const router = useRouter();

  const onCloseListingForm = () => router.back();
  const onSuccess = () => router.push(navigationPaths.LISTING_ADMIN);

  if (error) {
    return (
      <main>
        <h1>Error</h1>
      </main>
    );
  }

  if (isLoading) {
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

  return <ListingForm onClose={onCloseListingForm} {...{ onSuccess }} />;
}
