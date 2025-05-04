"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/constants/fetch";
import { userProfileFetcher } from "@/fetchers/user";

import { UserForm } from "./components/user-form/UserForm";

export default function ListingManager() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: [queryKeys.user.data],
    queryFn: userProfileFetcher,
  });

  console.log("U", user);

  if (error) {
    return (
      <main>
        <h1>Error</h1>
      </main>
    );
  }

  if (isLoading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <h1>Auth required!</h1>
        <Link href="/auth/login">Login</Link>
      </>
    );
  }

  return <UserForm {...{ user }} />;
}
