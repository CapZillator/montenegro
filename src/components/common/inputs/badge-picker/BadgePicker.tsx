import { createElement, FC, SVGProps } from 'react';
import classNames from 'classnames';

type Props = {
  values: { name: string; value: string; icon?: FC<SVGProps<SVGSVGElement>> }[];
  selectedValues: string[];
  onUpdate: (value: string[]) => void;
  disabled?: boolean;
};

export const BadgePicker: FC<Props> = ({
  values,
  selectedValues,
  onUpdate,
  disabled,
}) => {
  const onToggle = (value: string) => {
    const newValue = selectedValues.includes(value)
      ? selectedValues.filter((selected) => selected !== value)
      : [...selectedValues, value];
    onUpdate(newValue);
  };

  return (
    <div
      className={classNames('flex flex-wrap items-center gap-2 cursor-pointer')}
    >
      {values.map((badge) => {
        const isSelected = selectedValues.includes(badge.value);
        return (
          <label
            key={badge.value}
            className={classNames(
              'flex items-center gap-2 px-2 py-1 border border-solid border-secondary cursor-pointer shadow-sm rounded-sm duration-300',
              {
                'bg-primary-content text-primary': isSelected,
                'bg-primary hover:border-primary-content': !isSelected,
              }
            )}
          >
            <input
              type="checkbox"
              name="nearbyAmenities"
              value={badge.value}
              checked={isSelected}
              onChange={() => onToggle(badge.value)}
              disabled={disabled}
              className="hidden"
            />
            {badge.icon && (
              <div className="size-5">{createElement(badge.icon)}</div>
            )}

            <span>{badge.name}</span>
          </label>
        );
      })}
    </div>
  );
};
