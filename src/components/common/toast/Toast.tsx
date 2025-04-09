"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";

import { useToast } from "@/hooks/use-toast/useToast";

import { Error } from "../icons/state/Error";
import { Success } from "../icons/state/Success";

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2">
      {toasts.map(({ id, message, type }) => (
        <div
          key={id}
          className={classNames(
            "flex items-center  gap-3 px-4 py-3 rounded-md shadow-md transition-transform",
            {
              "bg-success text-primary": type === "success",
              "bg-error text-primary-content": type === "error",
              "bg-warning text-primary-content": type === "info",
            }
          )}
        >
          {type === "success" && (
            <Success className="w-6 h-6 stroke-primary/80" />
          )}
          {type === "error" && <Error className="w-6 h-6 fill-primary-content/80" />}
          {type === "info" && <Error className="w-6 h-6 fill-primary-content/80 -scale-100" />}
          <span>{message}</span>
          <button
            className={classNames(
              "ml-auto opacity-80 duration-300 cursor-pointer hover:opacity-100 hover:scale-125",
              {
                "text-primary": type === "success",
                "text-primary-content": type !== "success",
              }
            )}
            onClick={() => removeToast(id)}
          >
            ✖
          </button>
        </div>
      ))}
    </div>,
    document.body
  );
};
