"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";

import type { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({
  category,
}: CategoryCardProps) {
  return (
    <Link
      href={`/categoria/${category.slug}`}
      className="
        group
        relative
        block
        h-56
        overflow-hidden
        rounded-[2rem]
        border border-cyan-400/10
        bg-[#0b1119]
        transition-all
        duration-500
        hover:border-cyan-400/30
        hover:shadow-[0_0_40px_rgba(34,211,238,0.18)]
        hover:-translate-y-1
      "
    >
      {/* Background Image */}
      <Image
        src={category.image}
        alt={category.name}
        fill
        className="
          object-cover
          transition-all
          duration-700
          group-hover:scale-110
        "
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#05080d] via-[#05080d]/60 to-[#05080d]/20" />

      {/* Tech Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.15),transparent_45%)]" />

      {/* Animated Light Sweep */}
      <div className="pointer-events-none absolute left-[-40%] top-0 h-full w-[100px] rotate-12 bg-white/[0.06] blur-2xl transition-all duration-1000 group-hover:left-[140%]" />

      {/* Top Tech Line */}
      <div className="absolute top-0 left-0 h-[2px] w-0 bg-cyan-400 transition-all duration-500 group-hover:w-full" />

      {/* Bottom Content */}
      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="mb-3 h-px w-full bg-gradient-to-r from-cyan-400/60 via-cyan-300/20 to-transparent" />

        <h3
          className="
            text-xl
            font-black
            uppercase
            tracking-[0.15em]
            text-white
            transition-colors
            duration-300
            group-hover:text-cyan-300
          "
        >
          {category.name}
        </h3>
      </div>

      {/* Corner Glow */}
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </Link>
  );
}