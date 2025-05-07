"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/constants/fetch";
import { checkUserFetcher } from "@/fetchers/user";

export const useCurrentUser = () => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: [queryKeys.user.status, session?.user?.id],
    queryFn: checkUserFetcher,
    enabled: !!session?.user?.id,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
