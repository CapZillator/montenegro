"use client";

import { createContext, FC, ReactNode, useContext, useState } from "react";

type ModalState = {
  id: string;
  content: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
};

type ModalContextType = {
  openModal: (id: string, content: ReactNode, onClose?: () => void) => void;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
  modals: ModalState[];
};

const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [modals, setModals] = useState<ModalState[]>([]);

  const openModal = (id: string, content: ReactNode, onClose?: () => void) => {
    setModals((prev) => [
      ...prev.filter((modal) => modal.id !== id),
      { id, content, isOpen: true, onClose },
    ]);
  };

  const closeModal = (id: string) => {
    setModals((prev) =>
      prev.map((modal) =>
        modal.id === id
          ? { ...modal, isOpen: false, onClose: undefined }
          : modal
      )
    );
  };

  const closeAllModals = () => {
    setModals((prev) =>
      prev.map((modal) => ({ ...modal, isOpen: false, onClose: undefined }))
    );
  };

  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, closeAllModals, modals }}
    >
      {children}
    </ModalContext.Provider>
  );
};
