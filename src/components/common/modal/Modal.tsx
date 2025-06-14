"use client";

import { FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";

type Props = {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
};

export const Modal: FC<Props> = ({ isOpen, children, onClose }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  if (!isClient) return null;

  const container = document.querySelector("#modal-container");

  if (!container) return null;

  return createPortal(
    <div
      className={classNames("fixed top-0 right-0 left-0 bottom-0 z-50", {
        block: isOpen,
        hidden: !isOpen,
      })}
    >
      <div
        onClick={onClose}
        className="absolute top-0 right-0 left-0 bottom-0 bg-primary-content/75 backdrop-blur-sm"
      />
      {children}
    </div>,
    container
  );
};
