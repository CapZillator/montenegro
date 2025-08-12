import { createElement, FC } from 'react';
import { getTranslations } from 'next-intl/server';
import classNames from 'classnames';

import { BENEFIT_ENTRIES_MAP } from './constants';
import { Badge } from '../common/badge/Badge';

type BenefitKey = keyof typeof BENEFIT_ENTRIES_MAP;

type Props = {
  benefits: string[];
};

export const AdditionalBenefits: FC<Props> = async ({ benefits }) => {
  const t = await getTranslations();

  return (
    <>
      <h3 className={classNames('my-1 font-semibold', 'lg:text-lg')}>
        {t('listings.features')}
      </h3>
      <div className={classNames('flex flex-wrap gap-2')}>
        {(benefits as BenefitKey[]).map((benefit) => (
          <Badge
            key={benefit}
            label={t(BENEFIT_ENTRIES_MAP[benefit].i18nKey)}
            icon={BENEFIT_ENTRIES_MAP[benefit].icon}
          />
        ))}
      </div>
    </>
  );
};
