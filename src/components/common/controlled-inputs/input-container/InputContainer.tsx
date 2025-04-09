import { FC, ReactNode } from "react";
// import { useTranslations } from "next-intl";
import classNames from "classnames";

type Props = {
  children: ReactNode;
  name?: string;
  label?: string;
  error?: string;
  icon?: ReactNode;
};

export const InputContainer: FC<Props> = ({
  children,
  name,
  label,
  error,
  icon,
}) => {
  // const t = useTranslations("errors");

  return (
    <div>
      {label?.length ? (
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
