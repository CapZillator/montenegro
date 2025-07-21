import { FETCH_PATHS } from '@/constants/fetch';
import { InternalApiResponse } from '@/types/fetch';
import { UserContacts } from '@/types/user';
import { User, UserStatus } from '@/types/user';

export const checkUserFetcher = async () => {
  const response = await fetch(FETCH_PATHS.internal.user.checkUser);

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const userData = (await response.json()) as InternalApiResponse<
    'userStatus',
    UserStatus
  >;

  return userData.userStatus;
};

export const updateUserContactsFetcher = async (data: UserContacts) => {
  const response = await fetch(FETCH_PATHS.internal.user.updateUserContact, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return;
};

export const userProfileFetcher = async () => {
  const response = await fetch(FETCH_PATHS.internal.user.profile);

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const userData = await response.json();

  return userData.data as User;
};

export const updateUserProfileFetcher = async (data: User) => {
  const response = await fetch(FETCH_PATHS.internal.user.profile, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const userData = await response.json();

  return userData.data as User;
};
