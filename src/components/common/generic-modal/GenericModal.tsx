import { FC, ReactNode } from "react";
import classNames from "classnames";

import { Close } from "../icons/actions/Close";
import { Modal } from "../modal/Modal";
import { useModal } from "../modal/ModalContext";

type Props = {
  id: string;
  children: ReactNode;
  onClose?: () => void;
};

export const GenericModal: FC<Props> = ({ id, children, onClose }) => {
  const { closeModal } = useModal();

  const handleClose = () => {
    onClose?.();
    closeModal(id);
  };

  return (
    <Modal isOpen={true} onClose={handleClose}>
      <div
        className={classNames(
          "absolute top-1/2 left-1/2 -translate-1/2 bg-primary px-5 pb-5 pt-6 rounded-sm min-w-75"
        )}
      >
        {children}
        <button onClick={handleClose} className={classNames("cursor-pointer absolute top-2.5 right-2.5")}>
          <Close className={classNames("w-5 h-5 fill-primary-content")} />
        </button>
      </div>
    </Modal>
  );
};
