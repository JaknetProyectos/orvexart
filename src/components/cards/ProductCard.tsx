"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";

import type { Product } from "@/types";
import { useLocale, useTranslations } from "next-intl";
import { formatPrice } from "@/lib/price";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product }: ProductCardProps) {
  const locale = useLocale();
  const t = useTranslations("ProductCard");
  const { addItem } = useCart();

  return (
    <div
      className="
        group relative flex h-full flex-col overflow-hidden
        rounded-[1.8rem]
        border border-purple-100
        bg-white/90 backdrop-blur-xl
        shadow-md shadow-purple-950/5
        transition-all duration-300
        hover:-translate-y-1
        hover:border-purple-300
        hover:shadow-xl hover:shadow-purple-900/10
      "
    >
      {/* CLICKABLE LAYER (entire card navigation) */}
      <a
        href={`/producto/${product.slug}`}
        className="absolute inset-0 z-10"
        aria-label={product.name}
      />

      {/* Subtle shine effect */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
        <div className="absolute left-[-40%] top-0 h-full w-[120px] rotate-12 bg-purple-500/[0.04] blur-xl transition-transform duration-700 group-hover:translate-x-[320%]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-300/50 to-transparent" />
      </div>

      {/* IMAGE FULL TOP */}
      <div className="relative h-56 overflow-hidden bg-slate-50/80 border-b border-purple-100/60">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="
            object-cover
            transition-transform duration-500
            group-hover:scale-105
          "
        />

        {/* subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-60" />
      </div>

      {/* CONTENT */}
      <div className="relative z-20 flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-sm font-bold text-slate-900 transition-colors group-hover:text-purple-700">
          {locale === "es" ? product.name : product.name_english}
        </h3>

        {/* PRICE + ACTIONS */}
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              {t("price")}
            </span>

            <div className="flex items-end gap-1.5">
              <span className="text-2xl font-black text-slate-900">
                ${formatPrice(product.price)}
              </span>

              <span className="mb-0.5 text-xs font-semibold text-purple-700">
                MXN {t("tax")}
              </span>
            </div>
          </div>

          {/* ADD TO CART BUTTON (BLACK BUTTON WITH PURPLE ACCENTS) */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addItem(product);
              toast.success(t("added"));
            }}
            className="
              relative z-30
              flex h-11 w-11 items-center justify-center
              rounded-2xl
              bg-slate-950
              text-purple-400
              shadow-md shadow-purple-950/10
              transition-all duration-300
              hover:bg-black
              hover:text-purple-300
              hover:scale-105
              hover:shadow-lg hover:shadow-purple-950/20
              active:scale-95
            "
            aria-label="Agregar al carrito"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* CORNER GLOW */}
      <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-purple-200/30 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
}