import { FC } from 'react';
import { notFound } from 'next/navigation';
import classNames from 'classnames';

import { ProfileIcon } from '@/components/common/icons';
import { getListingOwnerById } from '@/utils/db/listings';

import { Contacts } from './components/contacts/Contacts';

type Props = {
  userId: string;
};

export const Owner: FC<Props> = async ({ userId }) => {
  const owner = await getListingOwnerById(userId);

  if (!owner) {
    notFound();
  }

  return (
    <div>
      <p className={classNames('flex items-center gap-1.5')}>
        <ProfileIcon className="w-5 h-5 fill-primary-content" />
        <span>{owner.name}</span>
      </p>
      <Contacts phone={owner.phone} contacts={owner.contacts} />
    </div>
  );
};
