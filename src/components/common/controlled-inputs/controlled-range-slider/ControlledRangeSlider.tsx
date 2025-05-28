"use client";

import { FC, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { motion } from "framer-motion";

type Props = {
  onChangeFrom: (val: number | undefined | null) => void;
  onChangeTo: (val: number | undefined | null) => void;
  valueFrom?: number | null;
  valueTo?: number | null;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  icon?: ReactNode;
};

export const ControlledRangeSlider: FC<Props> = ({
  valueFrom,
  valueTo,
  onChangeFrom,
  onChangeTo,
  min = 1,
  max = 10,
  step = 1,
  label,
  icon,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<null | "from" | "to">(null);

  const realMax = max + step;

  const from = valueFrom ? valueFrom : min;
  const to = valueTo ? valueTo : realMax;

  const percent = (val: number) => ((val - min) / (realMax - min)) * 100;
  const roundToStep = (val: number) => Math.round(val / step) * step;

  const getValueFromClientX = (clientX: number) => {
    if (!trackRef.current) return min;
    const rect = trackRef.current.getBoundingClientRect();
    const rel = (clientX - rect.left) / rect.width;
    const rawValue = min + rel * (realMax - min);

    return roundToStep(Math.min(realMax, Math.max(min, rawValue)));
  };

  const updatePosition = useCallback(
    (clientX: number) => {
      const val = getValueFromClientX(clientX);

      if (dragging === "from") {
        onChangeFrom(Math.min(val, to));
      } else if (dragging === "to") {
        if (val >= realMax - step / 2) {
          onChangeTo(undefined);
        } else {
          onChangeTo(Math.max(val, from));
        }
      }
    },
    [dragging, from, to, onChangeFrom, onChangeTo, realMax, step]
  );

  const stopDragging = useCallback(() => setDragging(null), []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => updatePosition(e.clientX);
    const handleTouchMove = (e: TouchEvent) =>
      updatePosition(e.touches[0].clientX);

    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("mouseup", stopDragging);
      window.addEventListener("touchend", stopDragging);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchend", stopDragging);
    };
  }, [dragging, updatePosition, stopDragging]);

  return (
    <div className="w-full space-y-2">
      {label?.length || icon ? (
        <label
          className={classNames("block", {
            "flex items-center gap-1.5": icon,
          })}
        >
          {icon}
          {label}
        </label>
      ) : null}

      <div
        ref={trackRef}
        className="relative mx-2 h-2 rounded bg-divider inset-shadow-sm inset-shadow-primary-content/30"
      >
        {/* Active range */}
        <motion.div
          className="absolute top-1/2 h-2 bg-primary-content rounded"
          style={{
            left: `${percent(from)}%`,
            transform: "translateY(-50%)",
            width: `${Math.max(0, percent(to) - percent(from))}%`,
            willChange: "left, width, transform",
          }}
          transition={{ type: "spring", stiffness: 250, damping: 30 }}
        />

        {/* From */}
        <motion.div
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={typeof valueFrom === "number" ? valueFrom : undefined}
          className="absolute top-1/2 w-4 h-4 bg-primary rounded-sm cursor-pointer touch-none shadow-sm shadow-primary-content/50 border-1 border-primary-content/80"
          style={{
            left: `${percent(from)}%`,
            transform: "translate(-50%, -50%)",
            zIndex: dragging === "from" ? 10 : 5,
            willChange: "transform",
          }}
          onMouseDown={() => setDragging("from")}
          onTouchStart={() => setDragging("from")}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />

        {/* To */}
        <motion.div
          role="slider"
          aria-valuemin={min}
          aria-valuemax={realMax}
          aria-valuenow={typeof valueTo === "number" ? valueTo : undefined}
          className="absolute top-1/2 w-4 h-4 bg-primary rounded-sm cursor-pointer touch-none shadow-sm shadow-primary-content/50 border-1 border-primary-content/80"
          style={{
            left: `${percent(to)}%`,
            transform: "translate(-50%, -50%)",
            zIndex: dragging === "to" ? 10 : 5,
            willChange: "transform",
          }}
          onMouseDown={() => setDragging("to")}
          onTouchStart={() => setDragging("to")}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      </div>

      <div className="flex justify-between text-sm">
        <span>{from}</span>
        <span>{valueTo ? to : `${max}+`}</span>
      </div>
    </div>
  );
};
