import { FC } from 'react';
import { ReactSortable } from 'react-sortablejs';
import classNames from 'classnames';

import { DeleteStroke } from '@/components/common/icons/actions/DeleteStroke';
import { ImageClient } from '@/components/common/image/Image.client';
import { ImageButton } from '@/components/common/image-button/ImageButton';
import { useTranslation } from '@/hooks/use-translation/useTranslation';

type ReactSortableItem = { id: number; url: string };

type Props = {
  uploadedUrls: string[];
  setUploadedUrls: (newUrls: string[]) => void;
  handleDelete: (imagePublicId: string) => void;
  disabled?: boolean;
};

export const ImagePreview: FC<Props> = ({
  uploadedUrls,
  setUploadedUrls,
  handleDelete,
  disabled,
}) => {
  const { t } = useTranslation();
  const sortableItems = uploadedUrls.map((url, i) => ({ id: i, url }));

  const onChangeOrder = (items: ReactSortableItem[]) => {
    setUploadedUrls(items.map((item) => item.url));
  };

  return (
    <ReactSortable
      list={sortableItems}
      setList={onChangeOrder}
      className={classNames('grid grid-cols-2 gap-3', 'md:grid-cols-4')}
    >
      {sortableItems.map((urlItem, index) => (
        <div
          key={urlItem.id}
          className="relative aspect-square shadow-md shadow-primary-content/40 rounded-md"
        >
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-disable rounded-md" />
          <ImageClient
            fullUrl={urlItem.url}
            alt="Uploaded"
            className="relative w-full aspect-square object-cover rounded-md cursor-move"
          />
          <div className="absolute top-1.5 right-1.5 ">
            <ImageButton
              onClick={() => handleDelete(urlItem.url!)}
              isDisabled={disabled}
            >
              <DeleteStroke className="w-5 h-5 stroke-primary-content duration-300 group-hover:stroke-primary" />
            </ImageButton>
          </div>

          {index === 0 && (
            <span
              className={classNames(
                'absolute top-1.5 left-0 bg-primary/90 px-3 py-1 rounded-r-sm shadow-sm shadow-primary-content/40 text-primary-content backdrop-blur-sm font-medium'
              )}
            >
              {t('listings.elements.preview')}
            </span>
          )}
        </div>
      ))}
    </ReactSortable>
  );
};
