"use client";

import { useLocale } from "next-intl";
import Image from "next/image";

const brands = [
  {
    id: "samsung",
    name: "Samsung",
    logo: "/logos/samsung.png",
  },
  {
    id: "amd",
    name: "AMD",
    logo: "/logos/amd.png",
  },
  {
    id: "nvidia",
    name: "NVIDIA",
    logo: "/logos/nvidia.png",
  },
  {
    id: "lenovo",
    name: "Lenovo",
    logo: "/logos/lenovo.webp",
  },
  {
    id: "xpg",
    name: "XPG",
    logo: "/logos/xpg.webp",
  },
  {
    id: "kingston",
    name: "Kingston",
    logo: "/logos/kingston.png",
  },
  {
    id: "dell",
    name: "Dell",
    logo: "/logos/dell.webp",
  },
  {
    id: "hp",
    name: "HP",
    logo: "/logos/hp.png",
  },
];

export function Brands() {
  const locale = useLocale();

  const duplicatedBrands = [
    ...brands,
    ...brands,
    ...brands,
  ];

  return (
    <section className="relative overflow-hidden bg-white px-4 py-14 md:px-6">
      {/* Light Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-120px] top-[-80px] h-[280px] w-[280px] rounded-full bg-purple-200/40 blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-80px] h-[260px] w-[260px] rounded-full bg-pink-200/30 blur-3xl" />

        {/* Top RGB Line */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500" />

        {/* Bottom subtle divider */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        {/* Side Fades for Infinite Scroll (White gradient) */}
        <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white via-white/80 to-transparent" />

        <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white via-white/80 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-center text-3xl font-black uppercase tracking-tight text-slate-900 md:text-4xl">
            {locale === "es" ? "Mejores Marcas" : "Best Brands"}
          </h2>

          <div className="mx-auto mt-3 h-[3px] w-24 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 shadow-[0_0_18px_rgba(168,85,247,0.4)]" />
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <div className="flex min-w-max animate-[brands-scroll_20s_linear_infinite] items-center hover:[animation-play-state:paused]">
            {duplicatedBrands.map((brand, index) => (
              <div
                key={`${brand.id}-${index}`}
                className="group flex-shrink-0 px-4 md:px-6"
              >
                <div className="relative flex h-28 w-[180px] items-center justify-center overflow-hidden rounded-[1.8rem] border border-slate-200/80 bg-gradient-to-b from-slate-50 to-white p-4 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/10">
                  {/* Top RGB Accent Glow on Hover */}
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Animated light sweep */}
                  <div className="pointer-events-none absolute left-[-120%] top-0 h-full w-[40%] rotate-12 bg-gradient-to-r from-transparent via-purple-100/60 to-transparent blur-xl transition-all duration-1000 group-hover:left-[140%]" />

                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={140}
                    height={60}
                    className="relative h-12 w-auto object-contain opacity-80 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100 md:h-14"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes brands-scroll {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </section>
  );
}