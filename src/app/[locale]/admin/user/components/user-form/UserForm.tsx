import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';

import { Button } from '@/components/common/button/Button';
import { ButtonIcon } from '@/components/common/button/enums';
import {
  ContactMethodInput,
  PhoneInput,
  TextInput,
} from '@/components/common/controlled-inputs';
import {
  ContactsIcon,
  EmailICon,
  PhoneIcon,
  ProfileIcon,
} from '@/components/common/icons';
import { QUERY_KEYS } from '@/constants/fetch';
import { validationSchema } from '@/constants/validationSchemas';
import { updateUserProfileFetcher } from '@/fetchers/user';
import { useToast } from '@/hooks/use-toast/useToast';
import { useTranslation } from '@/hooks/use-translation/useTranslation';
import { User } from '@/types/user';

import { DEFAULT_USER_DATA } from './constants';

type Props = {
  user?: User;
};

export const UserForm: FC<Props> = ({ user }) => {
  const { showToast } = useToast();
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm({
    defaultValues: user ?? DEFAULT_USER_DATA,
    resolver: zodResolver(validationSchema.user),
    mode: 'onChange',
    shouldUnregister: false,
  });
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const onSubmit = async (data: User) => {
    try {
      await updateUserProfileFetcher(data);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.user.data],
      });
      showToast(t('states.updated'), 'success');
    } catch (_error) {
      showToast(t('errors.genericRequest'), 'error');
    }
  };

  return (
    <>
      <div
        className={classNames(
          'flex flex-1 flex-col w-full mb-5',
          'md:max-w-container-xs md:mx-auto'
        )}
      >
        <div className={classNames('mb-5 flex items-center gap-4')}>
          <div
            className={classNames(
              'w-8 h-8 flex justify-center items-center text-primary bg-secondary-content rounded-full '
            )}
          >
            <span className="capitalize">{user?.name[0] ?? '?'}</span>
          </div>
          <h5 className={classNames('text-lg font-semibold')}>
            {t('user.profile')}
          </h5>
        </div>

        <div
          className={classNames(
            'grid grid-cols-1 gap-5 mb-5',
            'md:grid-cols-2',
            'lg:gap-8 lg:mb-10'
          )}
        >
          <div className={classNames('space-y-2')}>
            <TextInput
              name={'name'}
              control={control}
              label={`${t('user.name')}`}
              disabled={isSubmitting}
              icon={<ProfileIcon className="w-5 h-5 fill-primary-content" />}
            />
            <TextInput
              name={'email'}
              control={control}
              label={`${t('user.email')}`}
              disabled={isSubmitting}
              icon={<EmailICon className="w-5 h-5 fill-primary-content" />}
            />
            <PhoneInput
              name={'phone'}
              control={control}
              label={`${t('user.phone')}`}
              disabled={isSubmitting}
              icon={<PhoneIcon className="w-5 h-5 fill-primary-content" />}
            />
          </div>
          <div>
            <ContactMethodInput
              name="contacts"
              control={control}
              label={t('user.additionalContacts')}
              disabled={isSubmitting}
              icon={<ContactsIcon className="w-5 h-5 fill-primary-content" />}
            />
          </div>
        </div>

        <div className={classNames('mt-auto pt-5', 'lg:mt-0')}>
          <Button
            type="submit"
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
            icon={ButtonIcon.SAVE}
          >
            <span>{t('actions.save')}</span>
          </Button>
        </div>
      </div>
    </>
  );
};
