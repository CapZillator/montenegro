"use client";

import { useUser } from "@auth0/nextjs-auth0";
import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/constants/fetch";
import { checkUserFetcher } from "@/fetchers/user";

export const useCurrentUser = () => {
  const { user } = useUser();

  return useQuery({
    queryKey: [queryKeys.user.status, user?.sub],
    queryFn: checkUserFetcher,
    enabled: !!user?.sub,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
