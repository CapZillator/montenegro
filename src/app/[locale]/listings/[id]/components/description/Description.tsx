import { FC } from 'react';
import { getTranslations } from 'next-intl/server';
import classNames from 'classnames';

import { getLocalizedStringValue } from '@/utils/listings';

type Props = {
  text: Record<string, string>;
  locale: string;
};

export const Description: FC<Props> = async ({ text, locale }) => {
  const t = await getTranslations();

  return (
    <>
      <h3 className={classNames('font-semibold', 'lg:text-lg')}>
        {t('listings.elements.description')}
      </h3>
      <p>{getLocalizedStringValue(text, locale)}s</p>
    </>
  );
};
