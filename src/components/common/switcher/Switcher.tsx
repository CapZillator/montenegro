import { FC, useState } from "react";
import classNames from "classnames";

type Props = {
  value?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
};

export const Switcher: FC<Props> = ({ value, onChange, disabled }) => {
  const [isOn, setIsOn] = useState<boolean>(value ?? false);

  const toggle = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    onChange?.(newValue);
  };

  return (
    <button
      onClick={toggle}
      aria-pressed={isOn}
      {...{disabled}}
      className={classNames(
        "relative rounded-xl w-15 h-7.5 duration-300 cursor-pointer inset-shadow-sm inset-shadow-primary-content/30",
        "focus:outline-primary-content/80 focus:outline-2 disabled:bg-disable  disabled:focus:outline-none",
        {
          "bg-secondary-content": isOn,
          "bg-secondary": !isOn,
        }
      )}
      type="button"
    >
      <div
        className={classNames(
          "w-6 h-6 absolute top-1/2 -translate-y-1/2 rounded-xl duration-300 shadow-md shadow-primary-content/40",
          {
            "translate-x-8 bg-primary/90": isOn,
            "left-1 bg-primary ": !isOn,
          }
        )}
      />
    </button>
  );
};
