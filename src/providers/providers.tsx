"use client";

import { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ModalProvider } from "@/components/common/modal/ModalContext";
import { ToastProvider } from "@/context/toasts/Toasts";

type Props = {
  children: ReactNode;
};

const queryClient = new QueryClient();

export const Providers: FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <ModalProvider>{children}</ModalProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
};
