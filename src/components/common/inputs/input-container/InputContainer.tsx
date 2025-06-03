import { FC, ReactNode } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
  name?: string;
  label?: string;
  error?: string;
  icon?: ReactNode;
  styles?: string;
};

export const InputContainer: FC<Props> = ({
  children,
  name,
  label,
  error: _error,
  icon,
  styles,
}) => {
  // const t = useTranslations("errors");

  return (
    <div className={twMerge(classNames(styles))}>
      {label?.length || icon ? (
        <label
          htmlFor={name}
          className={classNames("block mb-1", {
            "flex items-center gap-1.5": icon,
          })}
        >
          {icon}
          {label}
        </label>
      ) : null}
      {children}
      {/* {error?.length ? (
        // <p className={classNames("text-accent")}>{t(`inputs.${error}`)}</p>
        <div className={classNames("absolute text-sm")}>{error}</div>
      ) : null} */}
    </div>
  );
};
