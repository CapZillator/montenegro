"use client";

import { useUser } from "@auth0/nextjs-auth0";
import { useQuery } from "@tanstack/react-query";

import { checkUserFetcher } from "@/fetchers/user";

type UserResponse = {
  id: string;
  needsPhone: boolean;
  status: "existing" | "created";
};

export const useCurrentUser = () => {
  const { user } = useUser();

  return useQuery<UserResponse>({
    queryKey: ["user", user?.sub],
    queryFn: checkUserFetcher,
    enabled: !!user?.sub,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
