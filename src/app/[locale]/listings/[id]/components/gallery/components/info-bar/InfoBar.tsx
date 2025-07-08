import { FC } from 'react';
import classNames from 'classnames';

import { PhotoIcon } from '@/components/common/icons';

type Props = {
  imageCount: number;
};

export const InfoBar: FC<Props> = ({ imageCount }) => {
  return (
    <div
      className={classNames(
        'bg-primary-content/75 px-3 py-1 flex gap-2 items-center rounded-md absolute bottom-1 left-1 text-primary'
      )}
    >
      <PhotoIcon className="w-4 h-4 fill-primary" />
      <span className="text-sm">{imageCount}</span>
    </div>
  );
};
