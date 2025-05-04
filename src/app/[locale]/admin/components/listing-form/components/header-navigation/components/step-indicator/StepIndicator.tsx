"use client";

import { FC } from "react";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  steps: string[];
  currentStep: number;
  isOverflowing: boolean;
};

export const StepIndicator: FC<Props> = ({
  steps,
  currentStep,
  isOverflowing,
}) => (
  <div
    className={classNames("flex items-center gap-4", {
      "invisible scale-0 h-0": isOverflowing,
    })}
  >
    {steps.map((step, index) => {
      const stepIndex = index + 1;
      const isActive = stepIndex === currentStep;
      const isCompleted = stepIndex < currentStep;

      return (
        <div key={stepIndex} className="shrink-0 flex items-center gap-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={isActive ? "active" : isCompleted ? "completed" : "idle"}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={classNames(
                "w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold",
                {
                  "bg-secondary-content text-primary border-secondary-content":
                    isActive,
                  "bg-primary-content text-primary border-primary-content":
                    isCompleted,
                  "bg-transparent text-disable border-disable":
                    !isActive && !isCompleted,
                }
              )}
            >
              {stepIndex}
            </motion.div>
          </AnimatePresence>
          <span
            className={classNames("text-sm", {
              "text-secondary-content": isActive,
              "text-primary-content/90": isCompleted,
              "text-disable": !isActive && !isCompleted,
            })}
          >
            {step}
          </span>
          {stepIndex < steps.length && (
            <div className="w-5 h-px bg-disable mx-1" />
          )}
        </div>
      );
    })}
  </div>
);
