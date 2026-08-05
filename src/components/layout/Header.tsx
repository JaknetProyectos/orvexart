"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  Search,
  ShoppingCart,
  Menu,
  Phone,
  MapPin,
  Cpu,
  Monitor,
  Gamepad2,
  HardDrive,
  Headphones,
  Truck,
  Mail,
  X,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import { useCategories, useProducts } from "@/hooks";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/price";

const categoryIcons = [Cpu, Monitor, HardDrive, Gamepad2, Headphones];

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function Header() {
  const t = useTranslations("header");

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { categories } = useCategories();
  const { products, loading } = useProducts();
  const { total, itemCount } = useCart();
  const locale = useLocale()

  const mappedCategories = useMemo(() => {
    return categories.map((category, index) => {
      const Icon = categoryIcons[index % categoryIcons.length];

      return {
        ...category,
        Icon,
      };
    });
  }, [categories]);

  const filteredProducts = useMemo(() => {
    const q = normalizeText(searchQuery.trim());

    if (!q) return [];

    return products
      .filter((product) => {
        const searchable = normalizeText(
          [
            product.name,
            product.slug,
            product.category,
            product.description || "",
            ...(product.specs || []),
          ].join(" ")
        );

        return searchable.includes(q);
      })
      .sort((a, b) => {
        const aStarts = normalizeText(a.name).startsWith(q) ? 1 : 0;
        const bStarts = normalizeText(b.name).startsWith(q) ? 1 : 0;

        if (aStarts !== bStarts) return bStarts - aStarts;
        return a.name.localeCompare(b.name);
      })
      .slice(0, 8);
  }, [products, searchQuery]);

  const showResults = searchQuery.trim().length > 0;

  return (
    <>
      <header className="w-full top-0 z-50 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4">
          {/* Top bar */}
          <div className="hidden md:flex items-center justify-between border-b border-purple-100 py-2 text-xs">
            <div className="flex items-center gap-6 text-gray-600">
              <a
                href="tel:5215553599895"
                className="flex items-center gap-2 transition hover:text-purple-600"
              >
                <Phone className="h-3.5 w-3.5 text-purple-500" />
                <span>+ 52 1 55 5359 9895</span>
              </a>

              <div className="flex items-center gap-2 text-gray-500">
                <MapPin className="h-3.5 w-3.5 text-purple-400" />
                <span>{t("topbar.address")}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-500">
              <Truck className="h-3.5 w-3.5 text-purple-400" />
              <span>{t("topbar.tagline")}</span>
            </div>
          </div>

          {/* Main header */}
          <div className="relative py-3">
            <div className="flex items-center justify-between gap-4">
              {/* Logo */}
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/title.png"
                  alt={t("logoAlt")}
                  width={350}
                  height={20}
                  className="h-24 w-auto"
                />
              </Link>

              {/* Search desktop */}
              <div className="hidden lg:flex flex-1 max-w-2xl">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t("search.placeholderDesktop")}
                    className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 pr-12 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-purple-400 focus:shadow-[0_0_0_3px_rgba(168,85,247,0.1)]"
                  />

                  {searchQuery ? (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-600"
                      aria-label={t("search.clear")}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-500 transition hover:text-purple-600"
                      aria-label={t("search.search")}
                    >
                      <Search className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {/* Mobile search */}
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-purple-500 transition-all duration-300 hover:border-purple-300 hover:bg-purple-50 lg:hidden"
                  aria-label={t("search.open")}
                >
                  <Search className="h-5 w-5" />
                </button>

                {/* Cart */}
                <Link
                  href="/carrito"
                  className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2 transition-all duration-300 hover:border-purple-300 hover:bg-purple-50"
                >
                  <div className="relative">
                    <ShoppingCart className="h-5 w-5 text-purple-500 transition-transform duration-300 group-hover:scale-110" />

                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-[10px] font-bold text-white">
                      {itemCount}
                    </span>
                  </div>

                  <div className="hidden sm:block leading-tight">
                    <span className="block text-[11px] text-gray-500">
                      {t("cart.label")}
                    </span>

                    <span className="text-sm font-semibold text-gray-900">
                      ${formatPrice(total)}
                    </span>
                  </div>
                </Link>

                {/* Mobile menu */}
                <Sheet>
                  <SheetTrigger asChild>
                    <button
                      aria-label={t("menu.open")}
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 transition-all duration-300 hover:border-purple-300 hover:bg-purple-50 lg:hidden"
                    >
                      <Menu className="h-5 w-5" />
                    </button>
                  </SheetTrigger>

                  <SheetContent
                    side="right"
                    className="w-80 border-l border-purple-100 bg-white p-0 text-gray-900"
                  >
                    <div className="flex h-full flex-col">
                      <div className="border-b border-purple-100 p-5">
                        <Image
                          src="/title.png"
                          alt={t("logoAlt")}
                          width={130}
                          height={36}
                          className="h-8 w-auto"
                        />
                      </div>

                      <nav className="flex-1 overflow-auto p-4">
                        <ul className="space-y-2">
                          {mappedCategories.map(({ id, slug, Icon }) => (
                            <li key={id}>
                              <SheetClose asChild>
                                <Link
                                  href={`/categoria/${slug}`}
                                  className="group flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-300 hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700"
                                >
                                  <Icon className="h-4 w-4 text-purple-500 transition-transform duration-300 group-hover:scale-110" />
                                  <span className="capitalize">{slug}</span>
                                </Link>
                              </SheetClose>
                            </li>
                          ))}

                          <li className="my-3 border-t border-purple-100" />

                          <li>
                            <SheetClose asChild>
                              <Link
                                href="/paga-tu-envio"
                                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-600 transition hover:bg-purple-50 hover:text-purple-700"
                              >
                                <Truck className="h-4 w-4 text-purple-400" />
                                {t("nav.shipping")}
                              </Link>
                            </SheetClose>
                          </li>

                          <li>
                            <SheetClose asChild>
                              <Link
                                href="/contacto"
                                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-600 transition hover:bg-purple-50 hover:text-purple-700"
                              >
                                <Mail className="h-4 w-4 text-purple-400" />
                                {t("nav.contact")}
                              </Link>
                            </SheetClose>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Mobile search */}
            {searchOpen && (
              <div className="mt-3 border-t border-purple-100 pt-3 lg:hidden">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t("search.placeholderMobile")}
                    autoFocus
                    className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 pr-12 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-purple-400 focus:shadow-[0_0_0_3px_rgba(168,85,247,0.1)]"
                  />

                  {searchQuery ? (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      aria-label={t("search.clear")}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-500"
                      aria-label={t("search.search")}
                    >
                      <Search className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Search results below header */}
            {showResults && (
              <div className="mt-3 border-t border-purple-100 pt-3">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    {loading
                      ? t("search.searching")
                      : t("search.results", {
                          count: filteredProducts.length,
                        })}
                  </p>

                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-sm text-purple-600 transition hover:text-purple-700"
                  >
                    {t("search.clearButton")}
                  </button>
                </div>

                {!loading && filteredProducts.length === 0 ? (
                  <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-5 text-sm text-gray-500">
                    {t("search.noResults", {
                      query: searchQuery,
                    })}
                  </div>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={`/producto/${product.slug}`}
                        onClick={() => setSearchQuery("")}
                        className="group flex gap-3 rounded-xl border border-gray-200 bg-white p-3 transition-all duration-300 hover:border-purple-200 hover:bg-purple-50"
                      >
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-sm font-semibold text-gray-900 group-hover:text-purple-700">
                            {locale == "es" ? product.name : product.name_english}
                          </h3>

                          <p className="mt-1 text-sm font-semibold text-purple-600">
                            ${formatPrice(product.price)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Desktop navigation */}
            <nav className="hidden border-t border-purple-100 mt-3 pt-3 lg:block">
              <ul className="flex items-center gap-1 overflow-x-auto">
                {mappedCategories.map(({ id, name, slug, Icon }, index) => (
                  <li key={id}>
                    <Link
                      href={`/categoria/${slug}`}
                      className="group relative flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:bg-purple-50 hover:text-purple-700"
                    >
                      <div className="absolute inset-x-2 bottom-0 h-0.5 scale-x-0 bg-purple-600 transition-transform duration-300 group-hover:scale-x-100" />

                      <Icon
                        className={`h-4 w-4 transition-transform duration-300 group-hover:scale-110 ${
                          index % 2 === 0 ? "text-purple-500" : "text-purple-400"
                        }`}
                      />

                      <span className="capitalize whitespace-nowrap">
                        {name}
                      </span>
                    </Link>
                  </li>
                ))}

                <li className="ml-auto">
                  <Link
                    href="/paga-tu-envio"
                    className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:bg-purple-50 hover:text-purple-700"
                  >
                    <Truck className="h-4 w-4 text-purple-400" />
                    {t("nav.shipping")}
                  </Link>
                </li>

                <li>
                  <Link
                    href="/contacto"
                    className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:bg-purple-50 hover:text-purple-700"
                  >
                    <Mail className="h-4 w-4 text-purple-400" />
                    {t("nav.contact")}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}