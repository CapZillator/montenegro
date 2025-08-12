'use client';

import { FC } from 'react';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';

import { CalendarIcon } from '@/components/common/icons';
import { getRelativeDate } from '@/utils/time';

type Props = {
  date: string | Date;
  className?: string;
};

export const PublishDate: FC<Props> = ({ date, className }) => {
  const t = useTranslations();
  const publishedAtRelative = getRelativeDate(date);

  return (
    <div className={classNames('flex items-center gap-2 text-sm', className)}>
      <CalendarIcon className={classNames('w-4 h-4 stroke-primary-content')} />
      <p>
        {publishedAtRelative.ago ? `${publishedAtRelative.ago} ` : null}
        {
          <span
            className={classNames({
              capitalize: !publishedAtRelative.ago,
            })}
          >
            {t(`date.${publishedAtRelative.i18nKey}`)}
          </span>
        }
        {publishedAtRelative.time ? ` ${publishedAtRelative.time}` : null}
      </p>
    </div>
  );
};
