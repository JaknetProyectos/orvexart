"use client";

import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ChevronLeft,
  CreditCard,
  User,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { processEtominPayment } from "@/lib/payment";
import { formatPrice } from "@/lib/price";

const VALID_COUPONS = [
  { code: "DATNX10", discount: 0.1 },
  { code: "ORVEXARTPRO15", discount: 0.15 },
  { code: "ORVEXARTELITE20", discount: 0.2 },
];

type Step = 1 | 2 | 3;

function CardShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-[1.85rem] p-[2px] shadow-lg transition-all duration-500 ">
      {/* Animated RGB Glow */}
      

      {/* White Card Inner */}
      <div
        className={[
          "relative h-full w-full rounded-[calc(1.85rem-2px)] bg-white",
          className,
        ].join(" ")}
      >
        {/* Animated Sweep Effect */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[calc(1.85rem-2px)]">
          <div className="absolute left-[-50%] top-0 h-full w-[40%] rotate-12 bg-gradient-to-r from-transparent via-purple-100/50 to-transparent blur-xl transition-all duration-1000 group-hover:left-[150%]" />
        </div>
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}

function SectionTitle({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-purple-200 bg-purple-50 transition-colors group-hover:border-purple-300 group-hover:bg-purple-100">
        <Icon className="h-4 w-4 text-purple-600" />
      </div>
      <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-slate-800">
        {title}
      </h3>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder,
  className = "",
  maxLength,
  mono = false,
  inputClassName = "",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  maxLength?: number;
  mono?: boolean;
  inputClassName?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-[11px] font-bold text-slate-500">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={[
          "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3",
          "text-xs text-slate-900 outline-none transition-all placeholder:text-slate-400",
          "focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10",
          mono ? "font-mono tracking-widest" : "",
          inputClassName,
        ].join(" ")}
      />
    </div>
  );
}

export default function CarritoCheckoutPage() {
  const t = useTranslations("cartPage");
  const locale = useLocale();

  const { items, total, updateQuantity, removeItem, clearCart } = useCart();

  const [step, setStep] = useState<Step>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successData, setSuccessData] = useState<any>(null);

  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
  } | null>(null);
  const [couponError, setCouponError] = useState("");

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    empresa: "",
    direccion: "",
    direccion2: "",
    ciudad: "",
    estado: "",
    cp: "",
    pais: "MX",
    cardNumber: "",
    cardName: "",
    cardMonth: "",
    cardYear: "",
    cardCvv: "",
  });

  const discountAmount = appliedCoupon ? total * appliedCoupon.discount : 0;
  const totalWithDiscount = total - discountAmount;
  const iva = totalWithDiscount * 0.16;
  const grandTotal = totalWithDiscount + iva;

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = (e: FormEvent) => {
    e.preventDefault();
    setCouponError("");

    const found = VALID_COUPONS.find(
      (c) => c.code === couponInput.trim().toUpperCase()
    );

    if (found) {
      setAppliedCoupon(found);
      setCouponInput("");
      return;
    }

    setCouponError(t("financial.couponInvalid"));
  };

  const handleCheckoutSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMessage("");

    const uniqueOrderId = `MC-${Date.now()}`;

    const paymentPayload = {
      amount: Number(grandTotal.toFixed(2)),
      orderId: uniqueOrderId,
      cardData: {
        number: formData.cardNumber.replace(/\s/g, ""),
        name: formData.cardName.trim(),
        month: formData.cardMonth.padStart(2, "0"),
        year: formData.cardYear.trim(),
        cvv: formData.cardCvv.trim(),
      },
      customer: {
        nombre: formData.nombre.trim(),
        apellido: formData.apellido.trim(),
        email: formData.email.trim(),
        telefono: formData.telefono.trim(),
        direccion: formData.direccion.trim(),
        direccion2: formData.direccion2.trim() || undefined,
        ciudad: formData.ciudad.trim(),
        estado: formData.estado.trim(),
        pais: formData.pais,
        cp: formData.cp.trim(),
        empresa: formData.empresa.trim() || undefined,
      },
      metadata: {
        notes: appliedCoupon
          ? `${t("metadata.couponApplied")}: ${appliedCoupon.code}`
          : t("metadata.standardSale"),
      },
    };

    try {
      const response = await processEtominPayment(paymentPayload);

      if (response.success) {
        setSuccessData(response.data);

        try {
          await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: uniqueOrderId,
              amount: paymentPayload.amount,
              customer: paymentPayload.customer,
              items,
              metadata: paymentPayload.metadata,
              locale
            }),
          });
        } catch (emailError) {
          console.error(
            "⚠️ Falló el despacho de correos informativos:",
            emailError
          );
        }

        clearCart();
        setStep(3);
      } else {
        setErrorMessage(response.error || t("errors.declined"));
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(t("errors.connection"));
    } finally {
      setIsProcessing(false);
    }
  };

  // SVG de Placas de Circuito (PCB)
  const pcbBackgroundStyle = {
    backgroundColor: "#1e0b3c", // Base morada oscura
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a855f7' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  };

  if (step === 3) {
    return (
      <div
        className="min-h-screen text-slate-100 selection:bg-purple-300 selection:text-purple-950"
        style={pcbBackgroundStyle}
      >
        <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-4 pb-14 md:px-6">
          <section className="relative mx-auto w-full max-w-xl">
            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/20 blur-[120px]" />

            <CardShell className="p-7 text-center sm:p-9">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-purple-200 bg-purple-100 text-purple-600 shadow-[0_0_30px_rgba(168,85,247,0.25)]">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <h1 className="text-3xl font-black tracking-tight text-slate-900">
                {t("success.title")}
              </h1>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-500">
                {t("success.description")}
              </p>

              <div className="mt-8 rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5 text-left">
                <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
                  <span className="text-xs font-semibold text-slate-500">
                    {t("success.transactionStatus")}
                  </span>
                  <span className="text-[11px] font-bold text-purple-600">
                    {t("success.approved")}
                  </span>
                </div>
              </div>

              <Link href="/tienda" className="mt-8 block">
                <Button className="w-full rounded-xl bg-purple-600 py-6 text-sm font-bold text-white transition-all duration-300 hover:bg-purple-700 hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]">
                  {t("success.backToCatalog")}
                </Button>
              </Link>
            </CardShell>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen overflow-y-hidden overflow-x-hidden text-slate-100 selection:bg-purple-300 selection:text-purple-950"
      style={pcbBackgroundStyle}
    >
      {/* Space for fixed header */}
      <div className="h-5" />

      {/* Sticky progress */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-[#1e0b3c]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <nav className="flex items-center gap-2 text-xs font-semibold text-purple-300/70">
            <Link href="/" className="transition hover:text-white">
              {t("breadcrumb.home")}
            </Link>
            <span className="text-purple-400/40">/</span>
            <span
              className={
                step === 1 ? "font-bold text-white" : "text-purple-300/70"
              }
            >
              {t("breadcrumb.summary")}
            </span>
            <span className="text-purple-400/40">/</span>
            <span
              className={
                step === 2 ? "font-bold text-white" : "text-purple-300/70"
              }
            >
              {t("breadcrumb.shippingPayment")}
            </span>
          </nav>

          <div className="flex items-center gap-3">
            <div
              className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${step >= 1
                  ? "bg-gradient-to-r from-purple-400 to-pink-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                  : "bg-purple-900"
                }`}
            />
            <div
              className={`h-0.5 w-12 rounded-full transition-colors duration-300 ${step >= 2 ? "bg-pink-500" : "bg-purple-900"
                }`}
            />
            <div
              className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${step >= 2
                  ? "bg-gradient-to-r from-pink-500 to-indigo-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]"
                  : "bg-purple-900"
                }`}
            />
          </div>
        </div>
      </div>

      <main className="relative z-10 py-8 md:py-12">
        <div className="pointer-events-none absolute right-0 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-[140px]" />
        <div className="pointer-events-none absolute left-0 top-1/3 -z-10 h-[420px] w-[420px] rounded-full bg-pink-500/15 blur-[130px]" />

        <div className="mx-auto max-w-7xl px-4 md:px-6">
          {items.length === 0 ? (
            <CardShell className="mx-auto max-w-lg p-8 text-center sm:p-10">
              <ShoppingBag className="mx-auto mb-5 h-14 w-14 text-purple-200" />
              <h2 className="text-xl font-bold text-slate-900">
                {t("empty.title")}
              </h2>
              <p className="mx-auto mt-2 max-w-xs text-xs leading-relaxed text-slate-500">
                {t("empty.description")}
              </p>
              <Link href="/tienda" className="mt-8 inline-block">
                <Button className="rounded-xl border border-purple-600 bg-purple-600 px-8 py-5 text-xs font-semibold text-white transition-all duration-300 hover:bg-purple-700 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                  {t("empty.goToStore")}
                </Button>
              </Link>
            </CardShell>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
              {/* Main column */}
              <div className="space-y-5 lg:col-span-2">
                {errorMessage && (
                  <div className="flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-50 p-4 text-xs font-semibold text-red-600 shadow-sm">
                    <AlertTriangle className="h-4 w-4 flex-shrink-0 text-red-500" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-4">
                    <CardShell className="flex items-center justify-between p-5">
                      <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900">
                        {t("order.title")}
                      </h2>

                      <button
                        type="button"
                        onClick={clearCart}
                        className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-bold text-red-500 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        {t("order.clear")}
                      </button>
                    </CardShell>

                    <div className="space-y-4">
                      {items.map((item) => (
                        <CardShell
                          key={item.product.slug}
                          className="p-4 sm:p-5"
                        >
                          <div className="flex gap-4 sm:gap-5">
                            <div className="relative flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 shadow-sm">
                              <Link
                                href={`/producto/${item.product.slug}`}
                                className="absolute inset-0 z-10"
                              />
                              <Image
                                src={item.product.image}
                                alt={item.product.name}
                                fill
                                className="rounded-xl object-cover transition-transform duration-500 hover:scale-105"
                              />
                            </div>

                            <div className="flex min-w-0 flex-1 flex-col justify-between">
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                  <p className="mb-1 inline-block rounded-md border border-purple-200 bg-purple-50 px-2 py-0.5 font-mono text-[9px] font-bold tracking-[0.16em] text-purple-700">
                                    {item.product.slug}
                                  </p>

                                  <h3 className="line-clamp-1 text-sm font-bold text-slate-900">
                                    {item.product.name}
                                  </h3>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => removeItem(item.product.slug)}
                                  className="rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>

                              <div className="mt-4 flex items-center justify-between gap-4">
                                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-0.5">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      updateQuantity(
                                        item.product.slug,
                                        item.quantity - 1
                                      )
                                    }
                                    className="rounded-lg p-2 text-slate-500 transition hover:bg-white hover:text-purple-600 hover:shadow-sm"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </button>

                                  <span className="w-9 text-center text-xs font-bold text-slate-700">
                                    {item.quantity}
                                  </span>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      updateQuantity(
                                        item.product.slug,
                                        item.quantity + 1
                                      )
                                    }
                                    className="rounded-lg p-2 text-slate-500 transition hover:bg-white hover:text-purple-600 hover:shadow-sm"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </button>
                                </div>

                                <span className="text-sm font-black tracking-tight text-slate-900">
                                  {formatPrice(
                                    item.product.price * item.quantity,
                                    "MXN",
                                    true
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardShell>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <form
                    id="etomin-payment-form"
                    onSubmit={handleCheckoutSubmit}
                    className="space-y-6"
                  >
                    <CardShell className="space-y-5 p-5 sm:p-8">
                      <SectionTitle
                        icon={User}
                        title={t("form.buyerTitle")}
                      />
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field
                          label={t("form.firstName")}
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleInputChange}
                          required
                        />
                        <Field
                          label={t("form.lastName")}
                          name="apellido"
                          value={formData.apellido}
                          onChange={handleInputChange}
                          required
                        />
                        <Field
                          label={t("form.email")}
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                        <Field
                          label={t("form.phone")}
                          name="telefono"
                          type="tel"
                          value={formData.telefono}
                          onChange={handleInputChange}
                          required
                        />
                        <Field
                          label={t("form.company")}
                          name="empresa"
                          value={formData.empresa}
                          onChange={handleInputChange}
                          className="sm:col-span-2"
                        />
                      </div>
                    </CardShell>

                    <CardShell className="space-y-5 p-5 sm:p-8">
                      <SectionTitle
                        icon={MapPin}
                        title={t("form.addressTitle")}
                      />
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field
                          label={t("form.streetAddress")}
                          name="direccion"
                          value={formData.direccion}
                          onChange={handleInputChange}
                          required
                          placeholder={t("form.streetAddressPlaceholder")}
                          className="sm:col-span-2"
                        />
                        <Field
                          label={t("form.neighborhood")}
                          name="direccion2"
                          value={formData.direccion2}
                          onChange={handleInputChange}
                          placeholder={t("form.neighborhoodPlaceholder")}
                          className="sm:col-span-2"
                        />
                        <Field
                          label={t("form.city")}
                          name="ciudad"
                          value={formData.ciudad}
                          onChange={handleInputChange}
                          required
                        />
                        <Field
                          label={t("form.state")}
                          name="estado"
                          value={formData.estado}
                          onChange={handleInputChange}
                          required
                          placeholder={t("form.statePlaceholder")}
                        />
                        <Field
                          label={t("form.postalCode")}
                          name="cp"
                          value={formData.cp}
                          onChange={handleInputChange}
                          required
                        />
                        <div>
                          <label className="mb-1.5 block text-[11px] font-bold text-slate-500">
                            {t("form.country")}
                          </label>
                          <select
                            name="pais"
                            value={formData.pais}
                            onChange={handleInputChange}
                            className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-900 outline-none transition-all focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
                          >
                            <option value="MX" className="bg-white text-slate-900">
                              {t("form.mexico")}
                            </option>
                          </select>
                        </div>
                      </div>
                    </CardShell>

                    <CardShell className="space-y-5 p-5 sm:p-8">
                      <SectionTitle
                        icon={CreditCard}
                        title={t("form.paymentTitle")}
                      />
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <Field
                          label={t("form.cardNumber")}
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                          maxLength={16}
                          placeholder={t("form.cardNumberPlaceholder")}
                          className="sm:col-span-3"
                          mono
                        />
                        <Field
                          label={t("form.cardHolderName")}
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          required
                          placeholder={t("form.cardHolderPlaceholder")}
                          className="sm:col-span-3"
                        />
                        <Field
                          label={t("form.expiryMonth")}
                          name="cardMonth"
                          value={formData.cardMonth}
                          onChange={handleInputChange}
                          required
                          maxLength={2}
                          placeholder={t("form.expiryMonthPlaceholder")}
                          mono
                          inputClassName="text-center"
                        />
                        <Field
                          label={t("form.expiryYear")}
                          name="cardYear"
                          value={formData.cardYear}
                          onChange={handleInputChange}
                          required
                          maxLength={2}
                          placeholder={t("form.expiryYearPlaceholder")}
                          mono
                          inputClassName="text-center"
                        />
                        <Field
                          label={t("form.cvv")}
                          name="cardCvv"
                          type="password"
                          value={formData.cardCvv}
                          onChange={handleInputChange}
                          required
                          maxLength={4}
                          placeholder={t("form.cvvPlaceholder")}
                          mono
                          inputClassName="text-center"
                        />
                      </div>
                    </CardShell>
                  </form>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <CardShell className="sticky top-[8.2rem] space-y-6 p-5 md:p-6">
                  <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-slate-800">
                    {t("financial.title")}
                  </h2>

                  <div className="flex items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <Image
                      src="/etomin.png"
                      alt={t("images.securePaymentAlt")}
                      width={150}
                      height={20}
                      className="object-contain brightness-0 opacity-80"
                    />
                  </div>

                  {step === 1 && (
                    <div className="space-y-3 border-b border-slate-100 pb-4">
                      {!appliedCoupon ? (
                        <form onSubmit={handleApplyCoupon} className="flex gap-2">
                          <input
                            type="text"
                            placeholder={t("financial.couponPlaceholder")}
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value)}
                            className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
                          />
                          <button
                            type="submit"
                            className="rounded-xl border border-purple-200 bg-purple-50 px-4 text-xs font-bold text-purple-700 transition hover:border-purple-300 hover:bg-purple-100"
                          >
                            {t("financial.applyCoupon")}
                          </button>
                        </form>
                      ) : (
                        <div className="flex items-center justify-between gap-3 rounded-xl border border-purple-200 bg-purple-50 p-3">
                          <div className="min-w-0 text-xs font-medium text-purple-700">
                            {t("financial.appliedCoupon", {
                              code: appliedCoupon.code,
                              discount: appliedCoupon.discount * 100,
                            })}
                          </div>
                          <button
                            type="button"
                            onClick={() => setAppliedCoupon(null)}
                            className="shrink-0 text-[10px] font-bold text-red-500 transition hover:text-red-600"
                          >
                            {t("financial.remove")}
                          </button>
                        </div>
                      )}

                      {couponError && (
                        <p className="pl-1 text-[10px] font-semibold text-red-500">
                          ⚠️ {couponError}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="space-y-3.5 border-b border-slate-100 pb-4 text-xs font-medium text-slate-500">
                    <div className="flex justify-between gap-4">
                      <span>{t("financial.subtotal")}</span>
                      <span className="font-mono font-bold text-slate-900">
                        {formatPrice(total, "MXN", true)}
                      </span>
                    </div>

                    {appliedCoupon && (
                      <div className="flex justify-between gap-4 text-purple-600">
                        <span>{t("financial.discount")}</span>
                        <span className="font-mono font-bold">
                          -{formatPrice(discountAmount, "MXN", true)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-xs font-bold text-slate-700">
                        {t("financial.netTotal")}
                      </span>
                      <span className="text-2xl font-black tracking-tight text-slate-900">
                        {formatPrice(grandTotal, "MXN", true)}
                      </span>
                    </div>

                    <p className="mt-1 text-right text-[10px] text-slate-400">
                      {t("financial.tax", {
                        tax: formatPrice(iva, "MXN", true),
                      })}
                    </p>
                  </div>

                  {step === 1 ? (
                    <Button
                      onClick={() => setStep(2)}
                      className="w-full rounded-xl bg-purple-600 py-6 text-xs font-bold text-white shadow-md transition-all duration-300 hover:bg-purple-700 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                    >
                      {t("actions.proceedToPayment")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <Button
                        type="submit"
                        form="etomin-payment-form"
                        disabled={isProcessing}
                        className={[
                          "w-full rounded-xl py-6 text-xs font-bold tracking-widest transition-all duration-300",
                          isProcessing
                            ? "cursor-wait bg-slate-200 text-slate-500"
                            : "bg-purple-600 text-white shadow-md hover:bg-purple-700 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]",
                        ].join(" ")}
                      >
                        {isProcessing ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>{t("actions.processing")}</span>
                          </span>
                        ) : (
                          t("actions.payAmount", {
                            amount: formatPrice(grandTotal, "MXN", true),
                          })
                        )}
                      </Button>

                      <button
                        type="button"
                        disabled={isProcessing}
                        onClick={() => setStep(1)}
                        className="flex w-full items-center justify-center gap-1 py-1 text-xs font-bold text-slate-400 transition hover:text-slate-700"
                      >
                        <ChevronLeft className="h-3.5 w-3.5" />
                        {t("actions.backToCart")}
                      </button>
                    </div>
                  )}

                  <div className="border-t border-slate-100 pt-4 text-center">
                    <p className="px-2 text-[10px] font-medium leading-relaxed text-slate-400">
                      {t("security.note")}
                    </p>

                    <div className="mt-3 flex items-center justify-center">
                      <Image
                        src="/secure-payment.png"
                        alt={t("images.securePaymentAlt")}
                        width={100}
                        height={20}
                        className="object-contain brightness-0 opacity-60"
                      />
                    </div>
                  </div>
                </CardShell>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}