import { SVGProps } from 'react';

import { Telegram } from '@/components/common/icons/contacts/Telegram';
import { Viber } from '@/components/common/icons/contacts/Viber';
import { WhatsApp } from '@/components/common/icons/contacts/WhatsApp';
import { Phone } from '@/components/common/icons/user/Phone';
import { Messengers } from '@/enums/user';

import { ContactType } from './types';

export const CONTACTS_MAP: Record<
  ContactType,
  {
    icon: (props: SVGProps<SVGSVGElement>) => React.JSX.Element;
    i18nKey: string;
  }
> = {
  phone: {
    icon: Phone,
    i18nKey: 'phone',
  },
  [Messengers.TELEGRAM]: {
    icon: Telegram,
    i18nKey: 'telegram',
  },
  [Messengers.WHATSAPP]: {
    icon: WhatsApp,
    i18nKey: 'whatsapp',
  },
  [Messengers.VIBER]: {
    icon: Viber,
    i18nKey: 'viber',
  },
};
