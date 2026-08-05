'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { Product } from "@/types";
import type { CartItem } from "@/types/cart-item";

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  total: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  getItemQuantity: (productId: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_STORAGE_KEY = "medconfianza_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Inicializamos con un array vacío para evitar errores de hidratación (SSR/Hydration mismatch) en Next.js
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Cargar el carrito de localStorage únicamente al montar el Provider global una sola vez
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Error loading cart from storage:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // 2. Guardar en localStorage de forma centralizada solo cuando el estado real cambie
  useEffect(() => {
    if (!isLoaded) return; // Evita sobreescribir el storage con un array vacío durante el primer render
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Error saving cart to storage:", error);
    }
  }, [items, isLoaded]);

  // 3. Métodos mutadores memorizados para evitar re-renders innecesarios en los consumidores
  const addItem = useCallback((product: Product, quantity: number = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.slug === product.slug);

      if (existingItem) {
        return prevItems.map((item) =>
          item.product.slug === product.slug
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, quantity }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.slug !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.slug === productId ? { ...item, quantity } : item
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // 4. Métodos de lectura selectiva
  const isInCart = useCallback((productId: string) => {
    return items.some((item) => item.product.slug === productId);
  }, [items]);

  const getItemQuantity = useCallback((productId: string) => {
    const item = items.find((item) => item.product.slug === productId);
    return item?.quantity || 0;
  }, [items]);

  // 5. Cálculos derivados optimizados con useMemo
  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const total = useMemo(() => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0), [items]);

  // 6. Value del contexto envuelto en useMemo para máxima eficiencia
  const value = useMemo(() => ({
    items,
    itemCount,
    total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity
  }), [items, itemCount, total, addItem, removeItem, updateQuantity, clearCart, isInCart, getItemQuantity]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom hook de consumo para que no tengas que cambiar ni una sola línea en tus páginas actuales
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart debe ser utilizado estrictamente dentro de un CartProvider");
  }
  return context;
}