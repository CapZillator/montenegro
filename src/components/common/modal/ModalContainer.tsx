import { FC } from "react";
import { createPortal } from "react-dom";

import { useModal } from "./ModalContext";

export const ModalContainer: FC = () => {
  const { modals } = useModal();
  const container = document.getElementById("modal-container");

  if (!container) return null;

  return createPortal(
    <>
      {modals.map((modal) => (
        <div key={modal.id}>
          {modal.isOpen && modal.content}
        </div>
      ))}
    </>,
    container
  );
}; 