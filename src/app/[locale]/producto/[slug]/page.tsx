"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Skeleton } from "@/components/ui/skeleton";
import { useProduct } from "@/hooks";
import {
  ChevronRight,
  ShoppingCart,
  Check,
  ArrowLeft,
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
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { formatPrice } from "@/lib/price";
import { useLocale, useTranslations } from "next-intl";

export default function ProductPage() {
  const t = useTranslations("productDetail");

  const params = useParams();
  const slug = params.slug as string;
  const { product, loading, error } = useProduct(slug);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const locale = useLocale();

  const productName =
    locale === "es"
      ? (product?.name as string)
      : (product?.name_english as unknown as string);

  const specs =
    locale === "es"
      ? (product?.specs as string[])
      : (product?.specs_english as unknown as string[]);

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    if (product)
      addItem(
        {
          ...product,
          specs,
          name:
            locale === "es"
              ? product.name
              : (product.name_english as unknown as string),
        },
        quantity
      );
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

      {/* SUTILES GRADIENTES DE FONDO EN TONOS PURPURA Y AZUL */}
      <div className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] bg-purple-200/50 rounded-full blur-[140px] z-0" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-200/50 rounded-full blur-[140px] z-0" />

      <main className="relative z-10 py-10">
        {/* BREADCRUMB */}
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Link href="/" className="hover:text-purple-600 transition">
              {t("breadcrumb.home")}
            </Link>

            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />

            {loading ? (
              <Skeleton className="h-4 w-28 bg-slate-200" />
            ) : (
              <>
                <Link
                  href={`/categoria/${product?.category}`}
                  className="hover:text-purple-600 transition capitalize"
                >
                  {product?.category}
                </Link>

                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />

                <span className="text-slate-900 font-semibold truncate max-w-[240px]">
                  {productName}
                </span>
              </>
            )}
          </nav>
        </div>

        {/* CONTENT */}
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="grid lg:grid-cols-2 gap-14">
              <Skeleton className="aspect-square rounded-3xl bg-slate-200" />
              <div className="space-y-6">
                <Skeleton className="h-8 w-3/4 bg-slate-200" />
                <Skeleton className="h-12 w-1/3 bg-slate-200" />
                <Skeleton className="h-24 w-full bg-slate-200" />
                <Skeleton className="h-14 w-full bg-slate-200" />
              </div>
            </div>
          ) : error || !product ? (
            <div className="text-center py-24 bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-xl max-w-xl mx-auto p-8">
              <p className="text-slate-600 text-lg mb-6 font-medium">
                {t("notFound.title")}
              </p>

              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition shadow-lg shadow-purple-200 hover:shadow-purple-300"
              >
                <ArrowLeft className="w-5 h-5" />
                {t("notFound.backHome")}
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* IMAGE HERO PANEL */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-300 to-indigo-300 blur-2xl rounded-3xl opacity-40 group-hover:opacity-70 transition duration-500" />

                <div className="relative h-[520px] w-full overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 backdrop-blur-xl shadow-xl shadow-slate-200/60 flex items-center justify-center p-8">
                  <Image
                    src={product.image}
                    alt={productName}
                    fill
                    className="
                      object-contain
                      p-6
                      transition-transform duration-700
                      group-hover:scale-105
                      drop-shadow-[0_15px_25px_rgba(0,0,0,0.08)]
                    "
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-100/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* INFO PANEL */}
              <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 shadow-xl shadow-slate-200/50 space-y-6">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  {productName}
                </h1>

                <div className="flex items-baseline gap-3 pb-4 border-b border-slate-100">
                  <span className="text-4xl font-black text-purple-600">
                    ${formatPrice(product.price)}
                  </span>

                  <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                    {t("priceLabel")}
                  </span>
                </div>

                {/* SPECS */}
                {specs && specs?.length > 0 && (
                  <div className="border border-slate-100 rounded-2xl p-5 bg-slate-50/70">
                    <h3 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-4">
                      {t("specifications")}
                    </h3>

                    <ul className="space-y-3">
                      {specs.map((spec, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-slate-700 text-sm font-medium"
                        >
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600 mt-0.5">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* QUANTITY */}
                <div className="flex items-center justify-between border border-slate-200 bg-slate-50/50 rounded-2xl px-5 py-3.5">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                    {t("quantity")}
                  </span>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={decrease}
                      className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold hover:text-purple-600 hover:border-purple-300 transition shadow-sm active:scale-95 flex items-center justify-center"
                    >
                      -
                    </button>

                    <span className="w-8 text-center text-slate-900 font-mono font-bold text-base">
                      {quantity}
                    </span>

                    <button
                      onClick={increase}
                      className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold hover:text-purple-600 hover:border-purple-300 transition shadow-sm active:scale-95 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* CTA BUTTON */}
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 rounded-2xl bg-purple-600 text-white font-bold flex items-center justify-center gap-3 hover:bg-purple-700 active:scale-[0.99] transition shadow-lg shadow-purple-200 hover:shadow-purple-300 text-base"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {t("addToCart")}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}