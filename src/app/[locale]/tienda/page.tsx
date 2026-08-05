"use client";

import React, { useState, useMemo } from "react";
import { ProductCard } from "@/components/cards/ProductCard";
import { useCategories, useProducts } from "@/hooks";
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal, PackageOpen } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useTranslations } from "next-intl";

const PRODUCTS_PER_PAGE = 12; // Cantidad de productos por página simulada

export default function StorePage() {
    const { categories } = useCategories();
    const t = useTranslations("store");
    const { error, loading, products = [] } = useProducts({ category: "" });

    // Estados para Filtros y Paginación
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    // 1. Filtrado en tiempo real (por categoría seleccionada y término de búsqueda)
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesCategory =
                selectedCategory === "all" ||
                product.category.toLowerCase() === selectedCategory.toLowerCase() ||
                product.slug.includes(selectedCategory); // Fallback por si mapeas por slug

            const matchesSearch = product.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

            return matchesCategory && matchesSearch;
        });
    }, [products, searchTerm, selectedCategory]);

    // 2. Lógica de Paginación Simulada sobre los productos filtrados
    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

    // Ajustar la página actual si los filtros reducen drásticamente los resultados
    const sanitizedPage = Math.min(currentPage, totalPages || 1);

    const paginatedProducts = useMemo(() => {
        const startIndex = (sanitizedPage - 1) * PRODUCTS_PER_PAGE;
        return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
    }, [filteredProducts, sanitizedPage]);

    // Manejadores de cambio de página
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Estilo de fondo: Placa de Circuito PCB sobre morado
    const pcbBackgroundStyle = {
        backgroundColor: "#1e0b3c",
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a855f7' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    };

    if (loading) {
        return (
            <div 
                className="min-h-screen flex flex-col items-center justify-center gap-4 text-purple-200"
                style={pcbBackgroundStyle}
            >
                <div className="relative h-12 w-12 animate-spin rounded-full border-4 border-purple-500/20 border-t-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.5)]" />
                <span className="text-xs font-semibold tracking-widest uppercase text-purple-300 animate-pulse">{t("loading")}</span>
            </div>
        );
    }

    if (error) {
        return (
            <div 
                className="min-h-screen flex items-center justify-center px-4"
                style={pcbBackgroundStyle}
            >
                <div className="relative group overflow-hidden rounded-[1.85rem] bg-gradient-to-br from-red-500 via-pink-500 to-purple-600 p-[2px] shadow-lg max-w-md w-full">
                    <div className="relative h-full w-full rounded-[calc(1.85rem-2px)] bg-white p-6 text-center">
                        <p className="text-sm font-bold text-red-600">{t("error")}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div 
                className="min-h-screen text-slate-100 relative overflow-hidden py-12 selection:bg-purple-300 selection:text-purple-950"
                style={pcbBackgroundStyle}
            >
                {/* Luces de fondo ambientales - Resplandor Magenta/Púrpura */}
                <div className="pointer-events-none absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[140px]" />
                <div className="pointer-events-none absolute bottom-1/3 right-10 h-[450px] w-[450px] rounded-full bg-pink-500/15 blur-[130px]" />

                <main className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">

                    {/* Encabezado Principal */}
                    <div className="mb-10">
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-sans">
                            {t("title")}{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                                {t("titleAccent")}
                            </span>
                        </h1>
                        <p className="mt-2 text-sm text-purple-200/80 max-w-xl">
                            {t("description")}
                        </p>
                    </div>

                    {/* Contenedor tipo Card RGB Blanca para los Controles de Búsqueda y Filtro */}
                    <div className="group relative mb-8 overflow-hidden rounded-[1.85rem] bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-600 p-[2px] shadow-lg transition-all duration-500 hover:shadow-[0_10px_40px_rgba(168,85,247,0.3)]">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 opacity-30 blur-md transition-opacity duration-500 group-hover:opacity-100" />
                        
                        <div className="relative h-full w-full rounded-[calc(1.85rem-2px)] bg-white p-4">
                            <div className="grid gap-4 md:grid-cols-12 items-center">

                                {/* Buscador de Producto por Nombre */}
                                <div className="relative md:col-span-5">
                                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-purple-600">
                                        <Search className="h-4 w-4" />
                                    </span>
                                    <input
                                        type="text"
                                        placeholder={t("searchPlaceholder")}
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setCurrentPage(1); // Reiniciar a la página 1 en cada búsqueda
                                        }}
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-xs font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
                                    />
                                </div>

                                {/* Selector de Categorías */}
                                <div className="relative md:col-span-4">
                                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-purple-600">
                                        <SlidersHorizontal className="h-4 w-4" />
                                    </span>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => {
                                            setSelectedCategory(e.target.value);
                                            setCurrentPage(1); // Reiniciar a la página 1 en cambio de categoría
                                        }}
                                        className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-10 text-xs font-medium text-slate-900 outline-none transition-all focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10 cursor-pointer"
                                    >
                                        <option value="all">{t("allCategories")}</option>
                                        {categories?.map((cat) => (
                                            <option key={cat.id} value={cat.slug || cat.name}>
                                                {cat.name} {cat.productCount ? `(${cat.productCount})` : ""}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                                        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Contador de Resultados Informativo */}
                                <div className="md:col-span-3 text-right text-xs font-bold tracking-wider text-purple-700 bg-purple-50 px-4 py-3 rounded-xl border border-purple-200 justify-self-stretch md:justify-self-end">
                                    {filteredProducts.length} {filteredProducts.length === 1 ? t("resultSingular") : t("resultPlural")}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Grid de Productos usando el ProductCard original */}
                    {paginatedProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {paginatedProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        /* Estado Vacío dentro de Tarjeta Blanca con Borde RGB */
                        <div className="group relative mx-auto my-12 max-w-xl overflow-hidden rounded-[1.85rem] bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-600 p-[2px] shadow-lg">
                            <div className="relative h-full w-full rounded-[calc(1.85rem-2px)] bg-white p-12 text-center">
                                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 border border-purple-200 mb-4 shadow-sm">
                                    <PackageOpen className="h-6 w-6" />
                                </div>
                                <h3 className="text-base font-bold text-slate-900">{t("noResultsTitle")}</h3>
                                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                                    {t("noResultsDescription")}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Componente de Paginación */}
                    {totalPages > 1 && (
                        <div className="mt-14 flex items-center justify-center gap-2">

                            {/* Botón Anterior */}
                            <button
                                onClick={() => handlePageChange(sanitizedPage - 1)}
                                disabled={sanitizedPage === 1}
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-300/30 bg-[#14062a] text-purple-200 transition-all hover:bg-purple-600 hover:text-white hover:border-purple-500 disabled:cursor-not-allowed disabled:opacity-30 shadow-md"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>

                            {/* Números de Páginas Dinámicos */}
                            {Array.from({ length: totalPages }, (_, idx) => {
                                const pageNum = idx + 1;
                                const isSelected = pageNum === sanitizedPage;
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        className={`h-10 px-4 text-xs font-bold rounded-xl transition-all border ${
                                            isSelected
                                                ? "bg-purple-600 border-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                                                : "border-purple-300/20 bg-[#14062a] text-purple-200 hover:bg-purple-900/50 hover:text-white hover:border-purple-400"
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}

                            {/* Botón Siguiente */}
                            <button
                                onClick={() => handlePageChange(sanitizedPage + 1)}
                                disabled={sanitizedPage === totalPages}
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-300/30 bg-[#14062a] text-purple-200 transition-all hover:bg-purple-600 hover:text-white hover:border-purple-500 disabled:cursor-not-allowed disabled:opacity-30 shadow-md"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}