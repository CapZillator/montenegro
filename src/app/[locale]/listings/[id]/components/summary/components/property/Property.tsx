import { FC, ReactNode } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
  icon: ReactNode;
  className?: string;
  label?: string;
};

export const Property: FC<Props> = ({ icon, children, className, label }) => (
  <div>
    <div
      className={twMerge(
        classNames("flex items-center  gap-1.5", "md:gap-2", className)
      )}
    >
      {icon}
      <span>{children}</span>
    </div>
    {label ? (
      <p className={classNames("hidden text-xs text-divider", "md:block")}>
        {label}
      </p>
    ) : null}
  </div>
);
