"use client";

import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

import { UserContactsModal } from "@/components/common/user-contacts-modal/UserContactsModal";

import { ListingForm } from "./components/form/listingForm";

export default function ListingManager() {
  const { user, isLoading, error } = useUser();

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

  return (
    <div className="p-5 flex flex-col items-center justify-center gap-2">
      <h1>Welcome to admin panel, {user.name}!</h1>
      <ListingForm onClose={() => {}} />
      <UserContactsModal />
    </div>
  );
}
