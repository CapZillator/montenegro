"use client";

import { FC } from "react";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export const Accordion: FC<Props> = ({
  title,
  children,
  isOpen,
  onOpenChange,
}) => {
  return (
    <div>
      <button
        type="button"
        onClick={() => onOpenChange(!isOpen)}
        className="w-full text-left transition cursor-pointer"
      >
        <span
          className={classNames(
            "underline decoration-dotted underline-offset-4"
          )}
        >
          {title}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { height: "auto", opacity: 1 },
              collapsed: { height: 0, opacity: 0 },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mt-2"
          >
            <div>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
