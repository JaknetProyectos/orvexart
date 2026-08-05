"use client";

import { useParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import { ChevronRight, Layers, Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/cards/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

import { useProducts, useCategory } from "@/hooks";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";

export default function CategoryPage() {
  const t = useTranslations("categoryPage");

  const params = useParams();
  const slug = params.slug as string;

  const { category, loading: categoryLoading } = useCategory(slug);
  const { products, loading: productsLoading } = useProducts({
    category: slug,
  });

  const { addItem } = useCart();
  const locale = useLocale();

  const loading = categoryLoading || productsLoading;

  const handleAddToCart = (product: Product) => {
    if (product)
      addItem(
        {
          ...product,
          specs:
            locale == "es"
              ? product.specs
              : (product.specs_english as unknown as string[]),
          name:
            locale == "es"
              ? product.name
              : (product.name_english as unknown as string),
        },
        1
      );
  };

  // Patrón SVG de Placa de Circuito Impreso (PCB)
  const pcbBackgroundStyle = {
    backgroundColor: "#1e0b3c", // Fondo morado base
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a855f7' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  };

  return (
    <div
      className="min-h-screen text-slate-100 selection:bg-purple-300 selection:text-purple-950 overflow-x-hidden"
      style={pcbBackgroundStyle}
    >
      <main className="py-8 md:py-12">
        {/* HERO / CATEGORY HEADER */}
        <section className="relative border-b border-purple-500/20 bg-purple-950/40 backdrop-blur-md">
          {/* Neon Glow Effects */}
          <div className="pointer-events-none absolute -top-24 right-0 w-[500px] h-[500px] bg-purple-500/20 blur-[130px]" />
          <div className="pointer-events-none absolute top-1/2 left-0 w-[400px] h-[400px] bg-pink-500/15 blur-[120px]" />

          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 relative">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs font-semibold text-purple-300/70 mb-6">
              <Link
                href="/"
                className="hover:text-white transition-colors"
              >
                {t("breadcrumb.home")}
              </Link>

              <ChevronRight className="w-3.5 h-3.5 opacity-50 text-purple-400" />

              {loading ? (
                <Skeleton className="h-4 w-24 bg-purple-400/20 rounded-md" />
              ) : (
                <span className="text-white font-bold">{category?.name}</span>
              )}
            </nav>

            {/* Category Header Info */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex flex-col gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/20 text-purple-300 text-xs font-mono tracking-wider w-fit">
                  <Layers className="w-3.5 h-3.5 text-purple-400" />
                  <span>{t("breadcrumb.home") /* O etiqueta de categoría */}</span>
                </div>

                {loading ? (
                  <Skeleton className="h-12 w-64 bg-purple-400/20 rounded-xl" />
                ) : (
                  <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white drop-shadow-sm">
                    {category?.name}
                  </h1>
                )}
              </div>

              <div className="text-xs font-semibold px-4 py-2 rounded-xl bg-purple-900/60 border border-purple-400/20 text-purple-200 backdrop-blur-md w-fit">
                {loading ? (
                  <Skeleton className="h-4 w-32 bg-purple-400/20 rounded-md" />
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                    {t("availableProducts", { count: products.length })}
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCTS SECTION */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-[1.85rem] border border-slate-200 bg-white p-4 space-y-3 shadow-lg"
                >
                  <Skeleton className="aspect-square bg-slate-100 rounded-2xl" />
                  <Skeleton className="h-4 w-full bg-slate-100 rounded-md" />
                  <Skeleton className="h-4 w-3/4 bg-slate-100 rounded-md" />
                  <Skeleton className="h-6 w-1/2 bg-purple-100 rounded-md" />
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                /* Contenedor wrapper para forzar estética de card blanca con bordes RGB animados */
                <div
                  key={product.id}
                  className="group relative overflow-hidden rounded-[1.85rem] bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-600 p-[2px] shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_35px_rgba(168,85,247,0.35)] text-slate-900"
                >
                  {/* Glow RGB animado */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 opacity-20 blur-sm transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Wrapper blanco para forzar la card blanca en ProductCard */}
                  <div className="relative h-full w-full rounded-[calc(1.85rem-2px)] bg-white p-1 text-slate-900">
                    <ProductCard
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="group relative overflow-hidden rounded-[1.85rem] bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-600 p-[2px] shadow-lg max-w-md mx-auto my-12">
              <div className="rounded-[calc(1.85rem-2px)] bg-white p-8 text-center space-y-4">
                <p className="text-sm font-medium text-slate-600">
                  {t("emptyState.message")}
                </p>

                <Link
                  href="/"
                  className="inline-flex px-6 py-3 rounded-xl bg-purple-600 text-white font-bold text-xs transition-all duration-300 hover:bg-purple-700 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                >
                  {t("emptyState.backHome")}
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}