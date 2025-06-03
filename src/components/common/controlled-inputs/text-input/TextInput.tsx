import { FC, ReactNode } from "react";
import { Control, Controller } from "react-hook-form";
import classNames from "classnames";

import { InputContainer } from "../../inputs/input-container/InputContainer";

type Props = {
  name: string;
  control: Control<any, any>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  icon?: ReactNode;
  containerStyles?: string;
};

export const TextInput: FC<Props> = ({
  name,
  control,
  label,
  placeholder,
  disabled,
  icon,
  containerStyles,
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState }) => (
      <InputContainer
        error={fieldState.error?.message}
        {...{ name, label, icon, styles: containerStyles }}
      >
        <input
          {...field}
          placeholder={placeholder}
          onChange={(event) => {
            field.onChange(event.target.value);
          }}
          value={field.value ?? ""}
          {...{ disabled }}
          className={classNames(
            "px-2 py-1.5 text-primary-content rounded-sm w-full inset-shadow-sm inset-shadow-primary-content/20",
            "bg-secondary text-primary-content focus:outline-2 focus:outline-primary-content/80",
            "disabled:bg-disable disabled:text-primary-content/30",
            {
              "outline-2 outline-secondary-content": fieldState.error?.message,
            }
          )}
        />
      </InputContainer>
    )}
  />
);
