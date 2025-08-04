import { FC, JSX } from 'react';
import classNames from 'classnames';

type Props = {
  entries: string[];
  label: string;
  icon: JSX.Element;
  onEntrySelect: (entry: string) => void;
  selectedValue?: string;
  entryClassName?: string;
};

export const SubMenu: FC<Props> = ({
  entries,
  label,
  icon,
  onEntrySelect,
  selectedValue,
  entryClassName,
}) => (
  <>
    <div className="flex items-center gap-1.5 mb-1 pb-0.5 text-base border-b border-solid border-divider/25">
      {icon}
      <span className="capitalize">{label}</span>
    </div>
    <div className={classNames('mt-2 grid grid-cols-3 gap-2 mb-3')}>
      {entries.map((entry) => (
        <div
          key={entry}
          onClick={() => onEntrySelect(entry)}
          className={classNames(
            'rounded-sm cursor-pointer capitalize flex justify-center duration-300',
            {
              'ring ring-primary-content': entry === selectedValue,
              'hover:ring hover:ring-divider/50 ': entry !== selectedValue,
            },
            entryClassName
          )}
        >
          <span>{entry}</span>
        </div>
      ))}
    </div>
  </>
);
