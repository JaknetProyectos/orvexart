"use client";

import { useTranslations } from "next-intl";

import { CategoryCard } from "@/components/cards/CategoryCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "@/hooks";

export function Categories() {
  const t = useTranslations("categories");

  const { categories, loading } = useCategories();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#16032c] via-[#100322] to-[#0a0216] px-4 py-14 md:px-6">
      {/* Dynamic Purple & RGB Background Lights */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-100px] top-[-60px] h-[360px] w-[360px] animate-pulse rounded-full bg-purple-600/25 blur-3xl duration-[7000ms]" />

        <div className="absolute bottom-[-100px] right-[-60px] h-[320px] w-[320px] animate-pulse rounded-full bg-fuchsia-600/20 blur-3xl duration-[5000ms]" />

        <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/15 blur-3xl" />

        {/* RGB Gradient Divider Lines */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600" />

        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
            {t("title")}
          </h2>

          <div className="mt-3 h-[3px] w-24 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 shadow-[0_0_20px_rgba(168,85,247,0.6)]" />

          <p className="mt-4 text-sm text-purple-200/70 md:text-base">
            {t("subtitle")}
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={`cat-skeleton-${i}`}
                  className="overflow-hidden rounded-[1.8rem] border border-purple-500/20 bg-gradient-to-b from-purple-950/40 to-neutral-950 p-[1px]"
                >
                  <div className="rounded-[calc(1.8rem-1px)] bg-[#120524]/90 p-5 backdrop-blur-md">
                    <Skeleton className="aspect-square rounded-2xl bg-purple-300/10" />

                    <Skeleton className="mx-auto mt-5 h-5 w-2/3 bg-purple-300/10" />
                  </div>
                </div>
              ))
            : categories.map((category, index) => (
                <div
                  key={category.id}
                  className="group relative"
                  style={{
                    animationDelay: `${index * 70}ms`,
                  }}
                >
                  {/* RGB Glow Effect on Hover */}
                  <div className="pointer-events-none absolute -inset-[1px] rounded-[1.9rem] bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 opacity-0 blur-md transition-all duration-500 group-hover:opacity-80 group-hover:scale-[1.03]" />

                  {/* Floating effect */}
                  <div className="relative transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-[1.02]">
                    <div className="rounded-[1.8rem] border border-purple-500/20 bg-gradient-to-b from-[#210940]/80 via-[#15052a]/90 to-[#0e031c] p-[1px] shadow-lg shadow-purple-950/40 transition-all duration-300 group-hover:border-purple-400/50 group-hover:shadow-[0_10px_30px_rgba(168,85,247,0.25)]">
                      <div className="rounded-[calc(1.8rem-1px)] bg-[#120524]/90 backdrop-blur-md">
                        <CategoryCard category={category} />
                      </div>
                    </div>
                  </div>

                  {/* Hover light sweep */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.9rem]">
                    <div className="absolute left-[-120%] top-0 h-full w-[40%] rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-xl transition-all duration-1000 group-hover:left-[140%]" />
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}