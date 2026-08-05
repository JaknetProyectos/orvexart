"use client";

import { Globe2, Loader2, ArrowLeftRight } from "lucide-react";
import { useLocaleContext } from "@/context/LangContext";

export default function LangSwitcher() {
  const { locale, switchLanguage, isPending } = useLocaleContext();

  const nextLang = locale === "es" ? "en" : "es";

  return (
    <button
      type="button"
      onClick={() => switchLanguage(nextLang)}
      disabled={isPending}
      aria-label="Cambiar idioma"
      className="
        group
        fixed
        bottom-5
        right-5
        z-50

        overflow-hidden

        flex items-center gap-3

        rounded-2xl

        border border-purple-200/80

        bg-white/90
        backdrop-blur-xl

        px-4 py-3

        shadow-[0_10px_30px_rgba(107,33,168,0.12)]

        transition-all duration-300

        hover:-translate-y-1
        hover:border-purple-400
        hover:shadow-[0_15px_35px_rgba(107,33,168,0.2)]

        active:scale-[0.98]

        disabled:cursor-not-allowed
        disabled:opacity-70
      "
    >
      {/* Glow Sutil al Hover */}
      <div
        className="
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
          bg-gradient-to-r
          from-purple-500/5
          via-purple-600/10
          to-purple-500/5
        "
      />

      {/* Icon Container (Negro con ícono morado) */}
      <div
        className="
          relative
          flex
          h-10
          w-10
          items-center
          justify-center

          rounded-xl

          bg-slate-950

          text-purple-300

          transition-all
          duration-500

          group-hover:rotate-12
          group-hover:scale-105
          group-hover:bg-black
          group-hover:text-purple-200
        "
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin text-purple-400" />
        ) : (
          <Globe2 className="h-4 w-4" />
        )}
      </div>

      {/* Content */}
      <div className="relative flex flex-col justify-center items-center leading-none">
        <div className="flex items-center justify-center gap-2">
          <span
            className="
              text-[11px]
              font-extrabold
              uppercase
              tracking-[0.2em]
              text-purple-950
            "
          >
            {locale === "es" ? "Español" : "English"}
          </span>

          <ArrowLeftRight
            className="
              h-3.5
              w-3.5
              text-purple-600
              transition-transform
              duration-300
              group-hover:translate-x-0.5
            "
          />
        </div>
      </div>
    </button>
  );
}