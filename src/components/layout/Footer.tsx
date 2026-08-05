"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

import { useProducts } from "@/hooks";

export function Footer() {
  const t = useTranslations("footer");

  const { products: featuredProducts } = useProducts({
    featured: true,
  });

  const locale = useLocale();

  const footerLinks = [
    { label: t("navigation.home"), href: "/" },
    { label: t("navigation.store"), href: "/tienda" },
    { label: t("navigation.shipping"), href: "/paga-tu-envio" },
    { label: t("navigation.contact"), href: "/contacto" },
  ];

  const legalLinks = [
    {
      label: t("legal.privacy"),
      href: "/legal/privacidad",
    },
    {
      label: t("legal.terms"),
      href: "/legal/terminos",
    },
    {
      label: t("legal.returns"),
      href: "/legal/reembolsos",
    },
  ];

  const formatPrice = (price: number) =>
    price.toLocaleString("es-MX", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <footer className="relative overflow-hidden bg-[#070b12] text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-[-80px] h-[300px] w-[300px] rounded-full bg-purple-400/10 blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-80px] h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-3xl" />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <div className="relative overflow-hidden rounded-2xl border border-purple-400/10 bg-gradient-to-b from-[#111827] to-[#0b1119] p-4">
                <Image
                  src="/title.png"
                  alt={t("logoAlt")}
                  width={250}
                  height={20}
                />
              </div>
            </Link>

            <p className="mt-6 text-sm leading-relaxed text-gray-400">
              {t("description")}
            </p>
          </div>

          {/* Featured products */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-purple-300">
              {t("featured")}
            </h3>

            <div className="mt-6 space-y-4">
              {featuredProducts?.slice(0, 2).map((product) => (
                <Link
                  key={product.id}
                  href={`/producto/${product.slug}`}
                  className="group flex gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-3 transition-all duration-300 hover:border-purple-400/20 hover:bg-purple-400/5"
                >
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-white/5 bg-[#0b1119]">
                    <Image
                      src={product.image}
                      alt={"no"}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="line-clamp-2 text-sm text-gray-300 transition-colors group-hover:text-purple-300">
                      {locale === "es"
                        ? product.name
                        : product.name_english}
                    </h4>

                    <p className="mt-1 text-sm font-semibold text-white">
                      ${formatPrice(product.price)}{" "}
                      <span className="text-xs text-purple-300">
                        {t("currency")}
                      </span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-purple-300">
              {t("navigation.title")}
            </h3>

            <ul className="mt-6 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-all duration-300 hover:translate-x-1 hover:text-purple-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/5 pt-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            {/* Legal */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500">
              {legalLinks.map((link, index) => (
                <div key={link.href} className="flex items-center gap-3">
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-purple-300"
                  >
                    {link.label}
                  </Link>

                  {index < legalLinks.length - 1 && (
                    <span className="text-gray-700">•</span>
                  )}
                </div>
              ))}
            </div>

            {/* Payment */}
            <div className="flex items-center gap-3">
              {["/visa.png", "/mastercard.png"].map((m) => (
                <Image
                  key={m}
                  src={m}
                  alt={t("paymentMethodAlt")}
                  width={50}
                  height={20}
                  className="object-contain"
                />
              ))}
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-gray-600">
            © {new Date().getFullYear()} Orvex.art. {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}