import { FC } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/common/button';

type Props = {
  loading: boolean;
  onClick: () => void;
};

export const LoadMore: FC<Props> = ({ loading, onClick }) => {
  const t = useTranslations();

  return (
    <Button onClick={onClick} disabled={loading}>
      {t('actions.showMore')}
    </Button>
  );
};
