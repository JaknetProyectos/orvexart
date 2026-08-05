"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";

import {
  X,
  CheckCircle2,
  Info,
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";

import Image from "next/image";
import { cn } from "@/lib/utils";

export type AlertType = "error" | "success" | "warning" | "info";

export interface AlertOptions {
  title: string;
  message: string;
  icon?: React.ReactNode;
  image?: string;
  confirmText?: string;
  onClose?: () => void;
  type?: AlertType;
}

interface AlertContextType {
  showAlert: (options: AlertOptions) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<AlertOptions | null>(null);

  const showAlert = useCallback((opts: AlertOptions) => {
    setOptions(opts);
    setIsOpen(true);
  }, []);

  const hideAlert = useCallback(() => {
    setIsOpen(false);

    options?.onClose?.();

    setTimeout(() => {
      setOptions(null);
    }, 200);
  }, [options]);

  const type: AlertType = options?.type || "info";

  const DefaultIcon =
    type === "success"
      ? CheckCircle2
      : type === "error"
        ? ShieldAlert
        : type === "warning"
          ? AlertTriangle
          : Info;

  const themeMap = {
    success: {
      border: "border-cyan-400/20 shadow-[0_0_40px_rgba(34,211,238,0.08)]",
      accent: "text-cyan-300",
      glow: "from-cyan-400/10 via-cyan-400/5 to-transparent",
      iconBg: "bg-[#0b0f12]",
    },
    error: {
      border: "border-red-500/20 shadow-[0_0_40px_rgba(239,68,68,0.08)]",
      accent: "text-red-400",
      glow: "from-red-500/10 via-red-500/5 to-transparent",
      iconBg: "bg-[#0b0f12]",
    },
    warning: {
      border: "border-amber-500/20 shadow-[0_0_40px_rgba(245,158,11,0.08)]",
      accent: "text-amber-400",
      glow: "from-amber-500/10 via-amber-500/5 to-transparent",
      iconBg: "bg-[#0b0f12]",
    },
    info: {
      border: "border-cyan-400/20 shadow-[0_0_40px_rgba(34,211,238,0.08)]",
      accent: "text-cyan-300",
      glow: "from-cyan-400/10 via-cyan-400/5 to-transparent",
      iconBg: "bg-[#0b0f12]",
    },
  };

  const currentTheme = themeMap[type];

  const renderButton = () => {
    const base =
      "flex h-14 w-full items-center justify-center border px-5 text-xs font-extrabold uppercase tracking-[0.18em] transition-all duration-300 hover:-translate-y-0.5";

    if (type === "success") {
      return (
        <button
          onClick={hideAlert}
          className={cn(
            base,
            "border-cyan-400/25 bg-blue-400 text-[#020617] hover:bg-[#38bdf8] shadow-[0_0_20px_rgba(34,211,238,0.18)]"
          )}
        >
          {options?.confirmText || "Continuar"}
        </button>
      );
    }

    if (type === "error") {
      return (
        <button
          onClick={hideAlert}
          className={cn(
            base,
            "border-red-500/25 bg-red-500 text-white hover:bg-red-600 shadow-[0_0_20px_rgba(239,68,68,0.18)]"
          )}
        >
          {options?.confirmText || "Cerrar"}
        </button>
      );
    }

    if (type === "warning") {
      return (
        <button
          onClick={hideAlert}
          className={cn(
            base,
            "border-amber-500/25 bg-amber-400 text-[#020617] hover:bg-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.18)]"
          )}
        >
          {options?.confirmText || "Entendido"}
        </button>
      );
    }

    return (
      <button
        onClick={hideAlert}
        className={cn(
          base,
          "border-cyan-400/25 bg-[#cdef24] text-[#0b0f12] hover:bg-[#b8d71f] shadow-[0_0_20px_rgba(205,239,36,0.16)]"
        )}
      >
        {options?.confirmText || "Continuar"}
      </button>
    );
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}

      {isOpen && options && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 selection:bg-[#cdef24] selection:text-[#0b0f12]">
          <div
            onClick={hideAlert}
            className="absolute inset-0 bg-[#05070c]/85 backdrop-blur-md"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="alert-title"
            className={cn(
              "relative w-full overflow-hidden border bg-[#070b14] text-white shadow-2xl",
              currentTheme.border
            )}
          >
            <div
              className={cn(
                "absolute inset-0 -z-10 h-40 bg-gradient-to-br",
                currentTheme.glow
              )}
            />

            <div className="flex items-center justify-between border-b border-white/5 bg-black px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 border border-red-500/20 bg-red-500/30" />
                <span className="h-2.5 w-2.5 border border-amber-500/20 bg-amber-500/30" />
                <span className="h-2.5 w-2.5 border border-cyan-400/20 bg-cyan-400/30" />
              </div>

              <button
                onClick={hideAlert}
                className="flex h-8 w-8 items-center justify-center border border-white/10 text-slate-400 transition-all hover:bg-white/5 hover:text-white"
                aria-label="Cerrar alerta"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative bg-black p-6 sm:p-8">
              <div className="mb-6 flex justify-center">
                <div
                  className={cn(
                    "flex h-20 w-20 items-center justify-center border border-white/10 shadow-inner",
                    currentTheme.iconBg
                  )}
                >
                  <div className={currentTheme.accent}>
                    {options.icon || (
                      <DefaultIcon className="h-9 w-9 stroke-[1.75]" />
                    )}
                  </div>
                </div>
              </div>

              {options.image && (
                <div className="relative mb-6 aspect-video overflow-hidden border border-white/10 bg-[#0b0f12]">
                  <Image
                    src={options.image}
                    alt="Alert visual attachment"
                    fill
                    className="object-cover opacity-90"
                  />
                </div>
              )}

              <div className="mb-6 text-center space-y-2">
                <h3
                  id="alert-title"
                  className="text-xl font-bold tracking-tight text-white"
                >
                  {options.title}
                </h3>

                <p className="px-1 text-xs leading-relaxed text-slate-400">
                  {options.message}
                </p>
              </div>

              {renderButton()}

              <div className="mt-5 flex items-center justify-center gap-2 text-[10px] font-mono tracking-[0.18em] text-slate-600">
                <div className="h-1 w-1 bg-slate-800" />
                <span>SYSTEM_STATUS_ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
}

export const useAlert = () => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error("useAlert must be used within AlertProvider");
  }

  return context;
};