"use client";

import { useLocale } from "next-intl";
import LegalStyle from "@/components/layout/LegalStyle";

function LegalEs() {
  return (
    <div className="legal-container">
      <LegalStyle/>

    </div>
  );
}

function LegalEn() {
  return (
    <div className="legal-container">
      <LegalStyle/>

      
    </div>
  );
}

export default function LegalPage() {
  const locale = useLocale();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      
      <main className="flex-grow container mx-auto max-w-6xl px-6">
        {locale === "es" ? <LegalEs /> : <LegalEn />}
      </main>
      
    </div>
  );
}