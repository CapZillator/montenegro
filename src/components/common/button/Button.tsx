import { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

import { ButtonIcon } from './enums';
import { getButtonIcon } from './helpers';

type Props = {
  type?: 'button' | 'submit' | 'reset' | undefined;
  icon?: ButtonIcon;
  iconSide?: 'left' | 'right';
  children?: ReactNode;
  className?: string;
  iconClassName?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export const Button: FC<Props> = ({
  type = 'button',
  icon,
  iconSide = 'left',
  children,
  className,
  iconClassName,
  onClick,
  disabled,
}) => (
  <button
    {...{ type, onClick, disabled }}
    className={twMerge(
      classNames(
        'text-sm text-primary uppercase rounded-sm cursor-pointer bg-primary-content shadow-sm shadow-primary-content/40  duration-300',
        'px-3 py-2 hover:bg-secondary-content',
        'disabled:bg-disable disabled:focus:outline-none disabled:text-primary/30 disabled:hover:bg-none',
        {
          'flex items-center gap-2': icon,
          'flex-row-reverse': iconSide === 'right' && icon,
        },
        className
      )
    )}
  >
    {icon ? (
      <>
        {getButtonIcon(
          icon,
          classNames('fill-primary stroke-primary', iconClassName)
        )}
        {children}
      </>
    ) : (
      children
    )}
  </button>
);
