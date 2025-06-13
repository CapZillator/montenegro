"use client";

import { FC, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ModalContainer } from "@/components/common/modal/ModalContainer";
import { ModalProvider } from "@/components/common/modal/ModalContext";
import { ToastProvider } from "@/context/toasts/Toasts";

type Props = {
  children: ReactNode;
};

const queryClient = new QueryClient();

export const Providers: FC<Props> = ({ children }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <ModalProvider>
            {children}
            <ModalContainer />
          </ModalProvider>
        </ToastProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};
