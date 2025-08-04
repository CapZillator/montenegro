import { ComponentPropsWithoutRef,ElementType, ReactNode } from 'react';
import classNames from 'classnames';

type Props<T extends ElementType> = {
  children: ReactNode;
  as?: T;
} & ComponentPropsWithoutRef<T>;

export const DropdownMenu = <T extends ElementType = 'ul'>({
  as,
  children,
  className,
  ...rest
}: Props<T>) => {
  const Component = as || 'ul';

  return (
    <Component
      className={classNames(
        'absolute -bottom-4 translate-y-full right-0 px-5 py-3 flex flex-col border-1 border-divider/25 gap-1 bg-primary rounded-sm shadow-md',
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};
