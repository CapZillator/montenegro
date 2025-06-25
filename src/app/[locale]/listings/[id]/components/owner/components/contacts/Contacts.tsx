'use client';

import { createElement,FC, useRef, useState } from 'react';
import classNames from 'classnames';

import { CopyToClipboard } from '@/components/common/copy-to-clipboard/CopyToClipboard';
import { formatPhoneForTel } from '@/formatters/contacts';
import { useClickOutside } from '@/hooks/use-click-outside/useOutsideClick';
import { useTranslation } from '@/hooks/use-translation/useTranslation';
import { UserContacts } from '@/types/user';

import { CONTACTS_MAP } from './constants';
import { ContactType } from './types';

export const Contacts: FC<UserContacts> = ({ phone, contacts }) => {
  const [isShow, setIsShow] = useState(false);
  const { t } = useTranslation();
  const ref = useRef(null);

  const allContacts: Array<{
    type: ContactType;
    contact: string;
  }> = [
    {
      type: 'phone',
      contact: phone,
    },
    ...contacts,
  ];

  useClickOutside(ref, () => setIsShow(false));

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsShow(!isShow)}
        className="text-sm underline decoration-dotted underline-offset-4 cursor-pointer"
      >
        {t('actions.showContacts')}
      </button>
      {isShow ? (
        <div className="absolute py-2 px-3 bg-primary border-divider/25 border rounded-md space-y-2 -bottom-2 translate-y-full shadow-md">
          {allContacts.map((contact, index) => (
            <div
              key={contact.type}
              className={classNames({
                'border-t-1 border-divider/25 border-solid pt-2': index,
              })}
            >
              <div className="flex items-center gap-2">
                {createElement(CONTACTS_MAP[contact.type].icon, {
                  className:
                    'w-5 h-5 fill-primary-content stroke-primary-content',
                })}
                <span className="grow">
                  {contact.type === 'phone' ? (
                    <a href={`tel:${formatPhoneForTel(contact.contact)}`}>
                      {contact.contact}
                    </a>
                  ) : (
                    contact.contact
                  )}
                </span>
                <CopyToClipboard text={contact.contact} />
              </div>
              <p className="text-xs text-divider">
                {t(`user.contactWays.${CONTACTS_MAP[contact.type].i18nKey}`)}
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
