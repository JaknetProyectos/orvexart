"use client";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import type { ReactNode } from "react";

interface ClientBodyProps {
  children: ReactNode;
}

export function ClientBody({ children }: ClientBodyProps) {
  return (
    <>
      {children}
    </>
  );
}
