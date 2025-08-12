import { createElement, FC, SVGProps } from 'react';
import classNames from 'classnames';

type Props = {
  label: string;
  icon: FC<SVGProps<SVGSVGElement>>;
};

export const Badge: FC<Props> = async ({ label, icon }) => (
  <div
    className={classNames(
      'flex items-center gap-2 px-3 py-1.5 bg-primary border-1 border-solid border-divider/25 rounded-md'
    )}
  >
    {createElement(icon, {
      className: 'w-4 h-4 text-primary-content lg:w-5 lg:h-5',
    })}
    <span className="text-sm lg:text-base">{label}</span>
  </div>
);
