import { FC } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import { ArrowBack } from "@/components/common/icons/navigation/ArrowBack";
import { useOverflowX } from "@/hooks/use-overflow-x/useOverflowX";

import { StepIndicator } from "./components/step-indicator/StepIndicator";

type Props = {
  steps: string[];
  step: number;
  onGoBack: () => void;
  isDisabled?: boolean;
};

export const HeaderNavigation: FC<Props> = ({
  steps,
  step,
  isDisabled,
  onGoBack,
}) => {
  const { ref, isOverflowing } = useOverflowX<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={classNames(
        "flex flex-wrap items-center gap-3 relative w-full pb-5 overflow-x-hidden",
        "lg:pb-10",
        {
          "justify-between": !isOverflowing,
        }
      )}
    >
      <button
        type="button"
        onClick={onGoBack}
        className="cursor-pointer"
        disabled={isDisabled}
      >
        <ArrowBack
          className={twMerge(
            classNames(
              "w-7 h-7 stroke-primary-content hover:stroke-secondary-content duration-300",
              {
                "stroke-disable hover:stroke-disable": isDisabled,
              }
            )
          )}
        />
      </button>
      <div className={classNames({ "h-6": isOverflowing })}>
        <StepIndicator {...{ steps, currentStep: step, isOverflowing }} />
        {isOverflowing ? (
          <div className={classNames("flex items-center gap-3")}>
            <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold bg-secondary-content text-primary border-secondary-content">
              <span>{step}</span>
            </div>
            <span className="text-primary-content text-lg">
              {steps[step - 1]}
            </span>
          </div>
        ) : null}
      </div>
      <div className={classNames("w-7", { hidden: isOverflowing })} />
    </div>
  );
};
