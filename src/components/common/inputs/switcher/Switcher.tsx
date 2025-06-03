import { FC } from "react";
import classNames from "classnames";

type Props = {
  value?: boolean | null;
  disabled?: boolean;
  onChange: (value: boolean) => void;
};

export const Switcher: FC<Props> = ({ value, onChange, disabled }) => {
  const isOn = typeof value === "boolean" ? value : false;

  const toggle = () => {
    onChange?.(!isOn);
  };

  return (
    <button
      onClick={toggle}
      aria-pressed={isOn}
      {...{ disabled }}
      className={classNames(
        "relative rounded-xl w-15 h-7.5 duration-300 cursor-pointer inset-shadow-sm inset-shadow-primary-content/30",
        "focus:outline-primary-content/90 focus:outline-2 disabled:bg-disable  disabled:focus:outline-none",
        {
          "bg-primary-content": isOn,
          "bg-secondary": !isOn,
        }
      )}
      type="button"
    >
      <div
        className={classNames(
          "w-6 h-6 absolute top-1/2 -translate-y-1/2 rounded-lg duration-300 shadow-md shadow-primary-content/40 bg-primary",
          {
            "translate-x-8": isOn,
            "left-1": !isOn,
          }
        )}
      />
    </button>
  );
};
