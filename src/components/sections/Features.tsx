"use client";

import { useTranslations } from "next-intl";
import {
  Settings,
  Truck,
  Shield,
  Headphones,
} from "lucide-react";

const iconMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  settings: Settings,
  truck: Truck,
  shield: Shield,
  headphones: Headphones,
};

export function Features() {
  const t = useTranslations("features");

  const features = [
    {
      id: "1",
      title: t("items.1.title"),
      description: t("items.1.description"),
      icon: "settings",
    },
    {
      id: "2",
      title: t("items.2.title"),
      description: t("items.2.description"),
      icon: "truck",
    },
    {
      id: "3",
      title: t("items.3.title"),
      description: t("items.3.description"),
      icon: "shield",
    },
    {
      id: "4",
      title: t("items.4.title"),
      description: t("items.4.description"),
      icon: "headphones",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-50 px-4 py-14 md:px-6">
      {/* Light Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-100px] top-[-80px] h-[300px] w-[300px] rounded-full bg-purple-200/40 blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-80px] h-[300px] w-[300px] rounded-full bg-pink-200/30 blur-3xl" />

        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500" />

        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const IconComponent =
              iconMap[feature.icon] || Settings;

            return (
              <div
                key={feature.id}
                className="group relative overflow-hidden rounded-[1.8rem] border border-slate-200/80 bg-gradient-to-b from-white to-slate-100/80 p-[1px] shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/10"
                style={{
                  animationDelay: `${index * 80}ms`,
                }}
              >
                {/* Animated Light Sweep & Glow */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500" />

                  <div className="absolute left-[-120%] top-0 h-full w-[40%] rotate-12 bg-gradient-to-r from-transparent via-purple-100/60 to-transparent blur-xl transition-all duration-1000 group-hover:left-[140%]" />
                </div>

                {/* Content */}
                <div className="relative flex h-full gap-4 rounded-[calc(1.8rem-1px)] bg-white p-5 backdrop-blur-sm">
                  {/* Icon Container */}
                  <div className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-purple-100 bg-purple-50 transition-colors duration-500 group-hover:border-purple-200 group-hover:bg-purple-100/60">
                    <div className="absolute inset-0 scale-75 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 transition-all duration-500 group-hover:scale-125 group-hover:opacity-100" />

                    <IconComponent className="relative h-6 w-6 text-purple-600 transition-all duration-500 group-hover:scale-110 group-hover:text-purple-700" />
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-slate-900 transition-colors duration-300 group-hover:text-purple-700">
                      {feature.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-slate-500 transition-colors duration-300 group-hover:text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}