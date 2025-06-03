import { FC, ReactNode } from "react";
import { Control, Controller } from "react-hook-form";

import { RangeSlider } from "../../inputs/range-slider/RangeSlider";

type Props = {
  nameFrom: string;
  nameTo: string;
  control: Control<any, any>;
  label?: string;
  icon?: ReactNode;
  min?: number;
  max?: number;
  step?: number;
};

export const ControlledRangeSlider: FC<Props> = ({
  nameFrom,
  nameTo,
  control,
  label,
  icon,
  min,
  max,
  step,
}) => (
  <Controller
    control={control}
    name={nameFrom}
    render={({ field: { value: from, onChange: setFrom } }) => (
      <Controller
        control={control}
        name={nameTo}
        render={({ field: { value: to, onChange: setTo } }) => (
          <RangeSlider
            valueFrom={from}
            valueTo={to}
            onChangeFrom={setFrom}
            onChangeTo={setTo}
            {...{ label, icon, min, max, step }}
          />
        )}
      />
    )}
  />
);
