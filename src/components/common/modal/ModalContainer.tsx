"use client";

import { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { useModal } from "./ModalContext";

export const ModalContainer: FC = () => {
  const { modals } = useModal();
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const element = document.getElementById("modal-container");
    setContainer(element);
  }, []);

  if (!container) return null;

  return createPortal(
    <>
      {modals.map((modal) => (
        <div key={modal.id}>{modal.isOpen && modal.content}</div>
      ))}
    </>,
    container
  );
};
