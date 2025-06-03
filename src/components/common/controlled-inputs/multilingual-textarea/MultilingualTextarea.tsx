import { FC } from "react";
import { Control, Controller } from "react-hook-form";
import classNames from "classnames";

import { InputContainer } from "../../inputs/input-container/InputContainer";

type Props = {
  name: string;
  control: Control<any, any>;
  selectedLocale: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  containerStyles?: string;
};

export const MultilingualTextarea: FC<Props> = ({
  name,
  control,
  selectedLocale,
  label,
  placeholder,
  disabled,
  containerStyles,
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState }) => (
      <InputContainer
        error={fieldState.error?.message}
        {...{ name, label, styles: containerStyles }}
      >
        <textarea
          {...field}
          placeholder={placeholder}
          onChange={(event) => {
            field.onChange({
              ...field.value,
              [selectedLocale]: event.target.value,
            });
          }}
          value={field.value[selectedLocale] ?? ""}
          {...{ disabled }}
          className={classNames(
            "px-2 py-1.5 text-primary-content rounded-sm w-full resize-none inset-shadow-sm inset-shadow-primary-content/20",
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
