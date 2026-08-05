"use client";

import { useState, useEffect, useCallback } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Cpu,
  Monitor,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { getOptimizedUrl } from "@/lib/images";

export function HeroSlider() {
  const t = useTranslations("heroSlider");

  const heroSlides = [
    {
      id: "1",
      title: t("slides.1.title"),
      subtitle: t("slides.1.subtitle"),
      buttonText: t("slides.1.buttonText"),
      buttonLink: "/categoria/memorias",
      backgroundImage:
        getOptimizedUrl("https://images.unsplash.com/photo-1592664474505-51c549ad15c5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
      icon: Cpu,
      accent: "purple",
    },
    {
      id: "2",
      title: t("slides.2.title"),
      subtitle: t("slides.2.subtitle"),
      buttonText: t("slides.2.buttonText"),
      buttonLink: "/categoria/monitores",
      backgroundImage:
        getOptimizedUrl("https://images.unsplash.com/photo-1696710257827-75e2e5954059?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
      icon: Monitor,
      accent: "purple",
    },
    {
      id: "3",
      title: t("slides.3.title"),
      subtitle: t("slides.3.subtitle"),
      buttonText: t("slides.3.buttonText"),
      buttonLink: "/categoria/tarjetas",
      backgroundImage:
        getOptimizedUrl("https://images.unsplash.com/photo-1727176763571-811f1c4ea36c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
      icon: Zap,
      accent: "purple",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  }, [heroSlides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);

    setIsAutoPlaying(false);

    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 5000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section className="relative overflow-hidden px-3 pt-3 pb-8 lg:px-5">
      <div className="relative mx-auto h-[420px] max-w-7xl overflow-hidden rounded-[2rem] bg-white shadow-lg md:h-[520px]">
        {/* Gradiente RGB divisor superior */}
        <div className="absolute top-0 left-0 right-0 z-20 h-[2px] bg-gradient-to-r from-purple-500 via-rose-500 to-purple-500" />

        {heroSlides.map((slide, index) => {
          const Icon = slide.icon;

          return (
            <div
              key={slide.id}
              className={cn(
                "absolute inset-0 transition-all duration-700",
                index === currentSlide
                  ? "opacity-100 z-10 scale-100"
                  : "opacity-0 z-0 scale-[1.03]"
              )}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms]"
                style={{
                  backgroundImage: `url(${slide.backgroundImage})`,
                  transform:
                    index === currentSlide
                      ? "scale(1.06)"
                      : "scale(1)",
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/40" />

              <div className="absolute inset-0">
                <div className="absolute left-0 top-0 h-full w-[40%] bg-purple-200/30 blur-3xl" />
                <div className="absolute right-[-10%] top-[-20%] h-[300px] w-[300px] rounded-full bg-purple-200/20 blur-3xl" />
              </div>

              {/* Gradiente RGB divisor inferior */}
              <div className="absolute bottom-0 left-0 right-0 z-20 h-[2px] bg-gradient-to-r from-purple-500 via-rose-500 to-purple-500" />

              <div className="relative z-10 mx-10 flex h-full items-center">
                <div className="mx-auto flex w-full max-w-7xl px-10">
                  <div className="max-w-[620px]">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="h-8 w-8 text-purple-600" />
                      <span className="text-sm font-semibold uppercase tracking-wider text-purple-600">
                        {t("slides.1.subtitle")}
                      </span>
                    </div>

                    <h1 className="max-w-[560px] text-4xl font-black uppercase leading-none tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
                      {slide.title}
                    </h1>

                    <div className="mt-5 h-[3px] w-28 rounded-full bg-gradient-to-r from-purple-500 via-rose-500 to-purple-500 shadow-[0_0_18px_rgba(168,85,247,0.3)]" />

                    <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-700 md:text-lg">
                      {slide.subtitle}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <Link
                        href={slide.buttonLink}
                        className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]"
                      >
                        {slide.buttonText}

                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Gradiente RGB divisor lateral izquierdo */}
        <div className="absolute inset-y-0 left-0 z-20 w-[2px] bg-gradient-to-b from-purple-500 via-rose-500 to-purple-500" />

        {/* Gradiente RGB divisor lateral derecho */}
        <div className="absolute inset-y-0 right-0 z-20 w-[2px] bg-gradient-to-b from-purple-500 via-rose-500 to-purple-500" />

        <button
          onClick={prevSlide}
          aria-label={t("navigation.previous")}
          className="group absolute left-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl border border-gray-200 bg-white/80 text-gray-700 backdrop-blur-md transition-all duration-300 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700 shadow-sm"
        >
          <ChevronLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
        </button>

        <button
          onClick={nextSlide}
          aria-label={t("navigation.next")}
          className="group absolute right-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl border border-gray-200 bg-white/80 text-gray-700 backdrop-blur-md transition-all duration-300 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700 shadow-sm"
        >
          <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>

        <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 rounded-full border border-gray-200 bg-white/80 px-4 py-2 backdrop-blur-xl shadow-sm">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              aria-label={t("navigation.goToSlide", {
                slide: index + 1,
              })}
              className={cn(
                "relative h-2.5 rounded-full transition-all duration-300",
                currentSlide === index
                  ? "w-10 bg-purple-600 shadow-[0_0_14px_rgba(168,85,247,0.4)]"
                  : "w-2.5 bg-gray-300 hover:bg-gray-400"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}