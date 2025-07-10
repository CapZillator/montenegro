'use client';

import { FC, useEffect,useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import classNames from 'classnames';

import { Dropdown } from '@/components/common/inputs';
import { useTranslation } from '@/hooks/use-translation/useTranslation';
import { SortOption } from '@/types/sorting';

export const Sorting: FC = () => {
  const [sortBy, setSortBy] = useState<SortOption>(SortOption.NEWEST);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();

  useEffect(() => {
    const currentSort = searchParams.get('sort') as SortOption | null;
    if (currentSort && Object.values(SortOption).includes(currentSort)) {
      setSortBy(currentSort);
    }
  }, [searchParams]);

  const onSortByUpdate = (
    value: string | boolean | Array<string | boolean>
  ) => {
    const sort = value as SortOption;
    setSortBy(sort);

    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set('sort', sort);

    router.push(`?${params.toString()}`);
  };

  const sortOptionValues = [
    { name: t('sorting.new'), value: SortOption.NEWEST },
    { name: t('sorting.old'), value: SortOption.OLDEST },
    { name: t('sorting.priceAsc'), value: SortOption.PRICE_ASC },
    { name: t('sorting.priceDesc'), value: SortOption.PRICE_DESC },
    { name: t('sorting.areaAsc'), value: SortOption.AREA_ASC },
    { name: t('sorting.areaDesc'), value: SortOption.AREA_DESC },
  ];

  return (
    <div className={classNames('xl:pl-82 xl:pt-4')}>
      <Dropdown
        selectedValue={sortBy}
        values={sortOptionValues}
        onUpdate={onSortByUpdate}
        controlButtonStyles={classNames(
          'min-w-32 w-32',
          'xl:w-fit xl:min-w-40'
        )}
      />
    </div>
  );
};
