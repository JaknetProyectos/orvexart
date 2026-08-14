"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import {
  ArrowRight,
  AlertCircle,
  Loader2,
  DollarSign,
  Cpu,
  HardDrive,
  Monitor,
  Server,
  MemoryStick,
  Database,
  Wifi,
  Terminal,
  Zap,
  CircuitBoard,
  FileCheck2,
} from "lucide-react";

import { useCart } from "@/context/CartContext";

export default function CustomProductPage() {
  const t = useTranslations("customPlan");
  const router = useRouter();
  const { addItem } = useCart();

  const [quoteNumber, setQuoteNumber] = useState("");
  const [totalPrice, setTotalPrice] = useState<number | "">("");
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const finalPrice = Number(totalPrice) || 0;

    if (!quoteNumber.trim()) {
      setError(t("errors.quoteRequired"));
      return;
    }

    if (finalPrice <= 0) {
      setError(t("errors.invalidAmount"));
      return;
    }

    setIsAdding(true);

    const folioUpper = quoteNumber.trim().toUpperCase();

    addItem(
      {
        image: "https://orvexart.com.mx/logo-dark.png",
        category: "custom",
        id: `custom-quote-${quoteNumber.trim().toLowerCase()}`,
        name: `Custom - ${folioUpper}`,
        price: finalPrice,
        slug: `custom-quote-${quoteNumber.trim().toLowerCase()}`,
      },
      1
    );

    setTimeout(() => {
      setIsAdding(false);
      router.push("/carrito");
    }, 1000);
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden selection:bg-purple-200 selection:text-purple-900">
      {/* FONDO CON ÍCONOS FLOTANTES COMPUTACIONALES */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0 opacity-20">
        <Cpu className="absolute top-[8%] left-[5%] w-16 h-16 text-purple-600 animate-bounce [animation-duration:6s]" />
        <HardDrive className="absolute top-[20%] right-[8%] w-20 h-20 text-indigo-600 animate-pulse [animation-duration:4s]" />
        <Monitor className="absolute top-[45%] left-[3%] w-24 h-24 text-blue-600 animate-bounce [animation-duration:8s]" />
        <Server className="absolute top-[65%] right-[5%] w-16 h-16 text-purple-600 animate-pulse [animation-duration:5s]" />
        <MemoryStick className="absolute bottom-[10%] left-[8%] w-14 h-14 text-indigo-500 animate-bounce [animation-duration:7s]" />
        <Database className="absolute bottom-[15%] right-[12%] w-16 h-16 text-purple-500 animate-pulse [animation-duration:6s]" />
        <Wifi className="absolute top-[12%] left-[45%] w-12 h-12 text-blue-500 animate-bounce [animation-duration:5s]" />
        <Terminal className="absolute top-[75%] left-[42%] w-16 h-16 text-slate-700 animate-pulse [animation-duration:4s]" />
        <Zap className="absolute top-[35%] right-[30%] w-10 h-10 text-amber-500 animate-bounce [animation-duration:9s]" />
        <CircuitBoard className="absolute bottom-[30%] left-[25%] w-20 h-20 text-indigo-400 animate-pulse [animation-duration:6s]" />
      </div>

      {/* SUTILES GRADIENTES DE FONDO EN TONOS PÚRPURA Y AZUL */}
      <div className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] bg-purple-200/50 rounded-full blur-[140px] z-0" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-200/50 rounded-full blur-[140px] z-0" />

      <main className="relative z-10 py-12 md:py-20">
        {/* Content */}
        <section className="mx-auto max-w-3xl px-4 md:px-6">
          <div className="group relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-purple-200 via-indigo-100 to-pink-200 p-[2px] shadow-xl shadow-slate-200/80 transition-all duration-500">
            {/* Tarjeta interior blanca con backdrop blur */}
            <div className="relative w-full rounded-[calc(2.5rem-2px)] bg-white/90 p-6 backdrop-blur-xl sm:p-10 lg:p-12">
              <div className="w-full">
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3.5 py-1 mb-3">
                    <FileCheck2 className="h-3.5 w-3.5 text-purple-600" />
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-purple-700">
                      {t("form.badge")}
                    </p>
                  </div>

                  <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
                    {t("form.title")}
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-slate-500 font-medium">
                    {t("authorized.description")}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600 shadow-sm">
                      <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label
                      htmlFor="quoteNumber"
                      className="block text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500"
                    >
                      {t("form.quoteLabel")}
                    </label>

                    <input
                      id="quoteNumber"
                      type="text"
                      required
                      placeholder={t("form.quotePlaceholder")}
                      value={quoteNumber}
                      onChange={(e) => setQuoteNumber(e.target.value)}
                      className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-5 text-sm font-mono uppercase tracking-[0.18em] text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="totalPrice"
                      className="block text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500"
                    >
                      {t("form.amountLabel")}
                    </label>

                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5 text-purple-600">
                        <DollarSign className="h-5 w-5" />
                      </div>

                      <input
                        id="totalPrice"
                        type="number"
                        required
                        step="0.01"
                        min="0.01"
                        placeholder={t("form.amountPlaceholder")}
                        value={totalPrice}
                        onChange={(e) =>
                          setTotalPrice(
                            e.target.value !== "" ? Number(e.target.value) : ""
                          )
                        }
                        className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50/80 pl-12 pr-16 text-sm font-bold text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
                      />

                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-5">
                        <span className="text-xs font-black tracking-[0.2em] text-slate-400">
                          MXN
                        </span>
                      </div>
                    </div>

                    <p className="pl-1 text-[11px] font-medium text-slate-400">
                      {t("form.taxNote")}
                    </p>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isAdding}
                      className={[
                        "group flex h-14 w-full items-center justify-center gap-2 rounded-2xl text-sm font-bold transition-all duration-300 shadow-lg",
                        isAdding
                          ? "cursor-not-allowed bg-slate-200 text-slate-400"
                          : "bg-purple-600 text-white shadow-purple-200 hover:bg-purple-700 hover:shadow-purple-300 active:scale-[0.99]",
                      ].join(" ")}
                    >
                      {isAdding ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>{t("buttons.adding")}</span>
                        </>
                      ) : (
                        <>
                          <span>{t("buttons.addToCart")}</span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}