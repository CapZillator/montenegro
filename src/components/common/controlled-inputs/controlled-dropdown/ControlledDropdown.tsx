import { FC, ReactNode } from "react";
import { Control, Controller } from "react-hook-form";

import { Dropdown } from "../../dropdown/Dropdown";
import { InputContainer } from "../input-container/InputContainer";

type Props = {
  name: string;
  control: Control<any, any>;
  label?: string;
  values: { name: string; value: string | boolean }[];
  frozenValues?: string[];
  icon?: ReactNode;
  innerIcon?: ReactNode;
  useValueAsName?: boolean;
  disabled?: boolean;
  searchEnabled?: boolean;
  controlButtonStyles?: string;
  containerStyles?: string;
};

export const ControlledDropdown: FC<Props> = ({
  name,
  control,
  label,
  values,
  frozenValues,
  icon,
  innerIcon,
  useValueAsName,
  disabled,
  searchEnabled,
  controlButtonStyles,
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
        <Dropdown
          onUpdate={(value) => field.onChange(value)}
          selectedValue={field.value}
          {...{
            values,
            frozenValues,
            useValueAsName,
            disabled,
            searchEnabled,
            controlButtonStyles,
            icon: innerIcon,
          }}
        />
      </InputContainer>
    )}
  />
);
