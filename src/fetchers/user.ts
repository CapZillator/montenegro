import { fetchPaths } from "@/constants/fetch";
import { InternalApiResponse } from "@/types/fetch";
import { UserContacts } from "@/types/user";
import { UserStatus } from "@/types/user";

export const checkUserFetcher = async () => {
  const response = await fetch(fetchPaths.internal.user.CHECK_USER);

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const userData = (await response.json()) as InternalApiResponse<
    "userStatus",
    UserStatus
  >;

  return userData.userStatus;
};

export const updateUserContactsFetcher = async (data: UserContacts) => {
  const response = await fetch(fetchPaths.internal.user.UPDATE_USER_CONTACT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return;
};
