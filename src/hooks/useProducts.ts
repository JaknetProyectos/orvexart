"use client";

import { useState, useEffect, useCallback } from "react";

import type { Product } from "@/types";
import { supabase } from "@/supabase/client";

interface UseProductsOptions {
  category?: string;
  featured?: boolean;
  newOnly?: boolean;
}

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useProducts(
  options: UseProductsOptions = {}
): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from("products_datnex")
        .select("*");

      /**
       * filters
       */
      if (options.category) {
        query = query.eq("category", options.category);
      }

      if (options.featured) {
        query = query.eq("is_featured", true);
      }

      if (options.newOnly) {
        query = query.eq("is_new", true);
      }

      /**
       * execute query
       */
      const { data, error } = await query.order("created_at", {
        ascending: false,
      });

      if (error) {
        throw error;
      }

      setProducts(data ?? []);
    } catch (err) {
      console.error(err);

      setError("Error loading products");
    } finally {
      setLoading(false);
    }
  }, [options.category, options.featured, options.newOnly]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
}

export function useProduct(slug: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("products_datnex")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        throw error;
      }

      setProduct(data);
    } catch (err) {
      console.error(err);

      setError("Product not found");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (!slug) return;

    fetchProduct();
  }, [slug, fetchProduct]);

  return {
    product,
    loading,
    error,
    refetch: fetchProduct,
  };
}