'use client';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';

import { ContactMethodInput } from '@/components/common/controlled-inputs/contact-method-input/ContactMethodInput';
import { PhoneInput } from '@/components/common/controlled-inputs/phone-input/PhoneInput';
import { GenericModal } from '@/components/common/generic-modal/GenericModal';
import { QUERY_KEYS } from '@/constants/fetch';
import { validationSchema } from '@/constants/validationSchemas';
import { updateUserContactsFetcher } from '@/fetchers/user';
import { useCurrentUser } from '@/hooks/use-current-user/useCurrentUser';
import { useToast } from '@/hooks/use-toast/useToast';
import { UserContacts } from '@/types/user';

import { Button } from '../button/Button';
import { ButtonIcon } from '../button/enums';
import { Contacts } from '../icons/user/Contacts';
import { Phone } from '../icons/user/Phone';

type Props = {
  handleClose: () => void;
};

export const UserContactsModal: FC<Props> = ({ handleClose }) => {
  const { data: session } = useSession();
  const { data: userData } = useCurrentUser();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const t = useTranslations();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UserContacts>({
    resolver: zodResolver(validationSchema.userContacts),
    mode: 'onChange',
    defaultValues: {
      contacts: [],
    },
  });

  const onSubmit = async (data: UserContacts) => {
    try {
      await updateUserContactsFetcher(data);
      queryClient.setQueryData(
        [QUERY_KEYS.user.status, session?.user?.id],
        () => {
          return {
            ...userData,
            needsPhone: false,
          };
        }
      );
      handleClose();
    } catch (_error) {
      showToast(t('errors.genericRequest'), 'error');
    }
  };

  return (
    <GenericModal id="user-contacts" onClose={handleClose}>
      <div className="p-4">
        <h2 className="text-xl font-semibold">{t('user.addContactHeader')}</h2>
        <p className="mb-4">{t('user.addContactIntro')}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <PhoneInput
            name="phone"
            control={control}
            label={t('user.phone')}
            placeholder="+123 4567 890"
            disabled={isSubmitting}
            icon={<Phone className="w-5 h-5 fill-primary-content" />}
            containerStyles="mb-4"
          />
          <ContactMethodInput
            name="contacts"
            control={control}
            label={t('user.additionalContacts')}
            disabled={isSubmitting}
            icon={<Contacts className="w-5 h-5 fill-primary-content" />}
            submitButton={
              <Button
                type="submit"
                disabled={isSubmitting}
                icon={ButtonIcon.SAVE}
              >
                <span>{t('actions.save')}</span>
              </Button>
            }
          />
        </form>
      </div>
    </GenericModal>
  );
};
