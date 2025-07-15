'use client';

import { FC } from 'react';
import { useTranslations } from 'next-intl';

import { Button, ButtonIcon } from '@/components/common/button';
import { GenericModal } from '@/components/common/generic-modal/GenericModal';

type Props = {
  handleClose: () => void;
  handleConfirm: () => void;
};

export const ConfirmDeleteModal: FC<Props> = ({
  handleConfirm,
  handleClose,
}) => {
  const t = useTranslations();

  return (
    <GenericModal id="confirm-listing-deletion" onClose={handleClose}>
      <div className="p-2 md:p-4">
        <h2 className="text-xl font-semibold">{t('actions.confirmAction')}</h2>
        <p className="mb-4">{t('warnings.listingDeletion')}</p>
        <div className="flex gap-3">
          <Button onClick={handleClose} icon={ButtonIcon.CLOSE}>
            {t('actions.cancel')}
          </Button>
          <Button onClick={handleConfirm} icon={ButtonIcon.DELETE}>
            {t('actions.delete')}
          </Button>
        </div>
      </div>
    </GenericModal>
  );
};
