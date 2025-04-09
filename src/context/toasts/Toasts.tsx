import { createContext, ReactNode, useState } from "react";

type Toast = {
  id: number;
  message: string;
  type: "success" | "error" | "info";
};

type ToastContextType = {
  toasts: Toast[];
  showToast: (message: string, type: Toast["type"]) => void;
  removeToast: (id: number) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: Toast["type"]) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => removeToast(id), 3000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};
