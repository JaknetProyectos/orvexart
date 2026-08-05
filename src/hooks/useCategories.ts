"use client";

import { useEffect, useState, useCallback } from "react";
import { useLocale } from "next-intl";
import type { Category } from "@/types";
import { supabase } from "@/supabase/client";
import { getOptimizedUrl } from "@/lib/images";

const categoryOrder = [
  "memorias",
  "laptops",
  "monitores",
  "tarjetas",
  "gabinetes",
  "toneres",
] as const;

const categoryImageMap: Record<string, string> = {
  gabinetes: getOptimizedUrl(
    "https://images.unsplash.com/photo-1618339220157-daa2cd9ade56?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ),
  laptops: getOptimizedUrl(
    "https://images.unsplash.com/photo-1771015310937-6754da25e49a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ),
  memorias: getOptimizedUrl(
    "https://images.unsplash.com/photo-1672923491001-3e58a608e418?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ),
  monitores: getOptimizedUrl(
    "https://images.unsplash.com/photo-1547658718-1cdaa0852790?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ),
  tarjetas: getOptimizedUrl(
    "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ),
  toneres: getOptimizedUrl(
    "https://images.unsplash.com/photo-1551971868-1bc03829fd98?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ),
};

const categoryLabels: Record<string, { es: string; en: string }> = {
  gabinetes: { es: "Gabinetes", en: "Cases" },
  laptops: { es: "Laptops", en: "Laptops" },
  memorias: { es: "Memorias", en: "Memory" },
  monitores: { es: "Monitores", en: "Monitors" },
  tarjetas: { es: "Tarjetas gráficas", en: "Graphics Cards" },
  toneres: { es: "Tóneres", en: "Toners" },
};

interface UseCategoriesReturn {
  categories: Category[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const fallbackLabel = (slug: string) =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

function getCategoryName(slug: string, locale: string) {
  const key = locale === "en" ? "en" : "es";
  return categoryLabels[slug]?.[key] ?? fallbackLabel(slug);
}

function buildStaticCategories(
  locale: string,
  counts: Map<string, number>
): Category[] {
  return categoryOrder.map((slug) => ({
    id: slug,
    name: getCategoryName(slug, locale),
    slug,
    image: categoryImageMap[slug] ?? "",
    productCount: counts.get(slug) ?? 0,
  }));
}

export function useCategories(): UseCategoriesReturn {
  const locale = useLocale();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("products_datnex")
        .select("category");

      if (error) throw error;

      const counts = new Map<string, number>();

      for (const slug of categoryOrder) {
        counts.set(slug, 0);
      }

      for (const product of data ?? []) {
        const category = product.category as string;

        if (counts.has(category)) {
          counts.set(category, (counts.get(category) ?? 0) + 1);
        }
      }

      setCategories(buildStaticCategories(locale, counts));
    } catch (err) {
      console.error(err);
      setError(
        locale === "en"
          ? "Error loading categories"
          : "Error al cargar las categorías"
      );
    } finally {
      setLoading(false);
    }
  }, [locale]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
  };
}

export function useCategory(slug: string) {
  const locale = useLocale();

  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("products_datnex")
        .select("category")
        .eq("category", slug);

      if (error) throw error;

      if (!data || data.length === 0) {
        setError(
          locale === "en"
            ? "Category not found"
            : "Categoría no encontrada"
        );
        setCategory(null);
        return;
      }

      const categoryData: Category = {
        id: slug,
        name: getCategoryName(slug, locale),
        slug,
        image: categoryImageMap[slug] ?? "",
        productCount: data.length,
      };

      setCategory(categoryData);
    } catch (err) {
      console.error(err);
      setError(
        locale === "en"
          ? "Error loading category"
          : "Error al cargar la categoría"
      );
    } finally {
      setLoading(false);
    }
  }, [slug, locale]);

  useEffect(() => {
    if (!slug) return;
    fetchCategory();
  }, [slug, fetchCategory]);

  return {
    category,
    loading,
    error,
    refetch: fetchCategory,
  };
}