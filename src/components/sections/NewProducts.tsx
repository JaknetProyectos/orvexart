"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";

import { ProductCard } from "@/components/cards/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

import { useProducts } from "@/hooks";
import { useCart } from "@/context/CartContext";

export function NewProducts() {
  const t = useTranslations("newProducts");

  const { products, loading } = useProducts({
    newOnly: true,
  });

  const locale = useLocale();

  const { addItem } = useCart();

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 320;

    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative overflow-hidden bg-black px-4 py-14 md:px-6">
      {/* Background glow y gradiente RGB */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-0 h-[320px] w-[320px] rounded-full bg-purple-600/15 blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-80px] h-[260px] w-[260px] rounded-full bg-pink-500/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
              {t("title")}
            </h2>

            <div className="mt-3 h-[3px] w-24 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 shadow-[0_0_18px_rgba(168,85,247,0.5)]" />

            <p className="mt-4 text-sm text-gray-400 md:text-base">
              {t("subtitle")}
            </p>
          </div>

          {/* Controls */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => scroll("left")}
              aria-label={t("navigation.previous")}
              className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-purple-500/20 bg-neutral-900/80 text-gray-300 backdrop-blur-xl transition-all duration-300 hover:border-purple-500/50 hover:bg-purple-600/20 hover:text-white active:scale-95"
            >
              <ChevronLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            </button>

            <button
              onClick={() => scroll("right")}
              aria-label={t("navigation.next")}
              className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-purple-500/20 bg-neutral-900/80 text-gray-300 backdrop-blur-xl transition-all duration-300 hover:border-purple-500/50 hover:bg-purple-600/20 hover:text-white active:scale-95"
            >
              <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Products */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={`skeleton-${i}`}
                    className="w-[280px] flex-shrink-0 snap-start"
                  >
                    <div className="overflow-hidden rounded-3xl border border-purple-500/10 bg-neutral-900">
                      <Skeleton className="aspect-square bg-white/5" />

                      <div className="space-y-3 p-4">
                        <Skeleton className="h-4 w-full bg-white/5" />

                        <Skeleton className="h-4 w-2/3 bg-white/5" />

                        <Skeleton className="h-7 w-1/2 bg-white/5" />
                      </div>
                    </div>
                  </div>
                ))
              : products.map((product) => {
                  const productName =
                    locale === "es"
                      ? product.name
                      : (product.name_english as string);

                  return (
                    <div
                      key={product.id}
                      className="w-[280px] flex-shrink-0 snap-start"
                    >
                      <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-b from-neutral-900 to-black p-[1px] transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.18)]">
                        <div className="rounded-[calc(1.5rem-1px)] bg-black">
                          <ProductCard
                            product={product}
                            onAddToCart={() => {
                              addItem(
                                {
                                  ...product,
                                  specs:
                                    locale === "es"
                                      ? product.specs
                                      : (product.specs_english as unknown as string[]),
                                  name: productName,
                                },
                                1
                              );
                              toast.success(productName);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </section>
  );
}