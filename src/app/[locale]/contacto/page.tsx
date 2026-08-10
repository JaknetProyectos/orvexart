"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useContact } from "@/hooks/useContact";
import { useTranslations } from "next-intl";

import {
  Phone,
  Mail,
  MapPin,
  Send,
  Laptop,
  Monitor,
  Cpu,
  Server,
  HardDrive,
  AtSign,
  Inbox,
  MessageSquare,
  SendHorizontal,
} from "lucide-react";
import { useAlert } from "@/context/AlertContext";
import { toast } from "sonner";

export default function ContactPage() {
  const t = useTranslations("contact");

  const { sendContactForm, isLoading } = useContact();

  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    asunto: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await sendContactForm({
      nombre: `${formData.nombre} ${formData.apellidos}`.trim(),
      asunto: formData.asunto,
      email: formData.email,
      telefono: formData.telefono,
      mensaje: formData.mensaje,
    });

    if (response.success) {
      setSubmitted(true);

      setFormData({
        nombre: "",
        apellidos: "",
        asunto: "",
        email: "",
        telefono: "",
        mensaje: "",
      });

      toast.success(t("form.success.title"));
    } else {
      toast.error(t("alert.error.title"));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactCards = [
    {
      icon: Phone,
      title: t("cards.phone.title"),
      value: "+ 52 1 55 5359 9895",
      href: "tel:5215553599895",
    },
    {
      icon: Mail,
      title: t("cards.email.title"),
      value: "asistencia@orvexart.com.mx",
      href: "mailto:asistencia@orvexart.com.mx",
    },
    {
      icon: MapPin,
      title: t("cards.address.title"),
      value: "Boulevard Periférico Manuel Ávila Camacho 235, CDMX",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden relative">
      {/* CAPA DE ÍCONOS MORADOS FLOTANTES (CONTACTO Y COMPUTACIÓN) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Computación */}
        <Laptop className="absolute top-[10%] left-[5%] w-12 h-12 text-purple-600/15 animate-bounce [animation-duration:6s]" />
        <Monitor className="absolute top-[25%] right-[8%] w-14 h-14 text-purple-700/15 animate-pulse [animation-duration:4s]" />
        <Cpu className="absolute top-[50%] left-[3%] w-10 h-10 text-purple-800/20 animate-bounce [animation-duration:7s]" />
        <Server className="absolute bottom-[35%] right-[4%] w-12 h-12 text-purple-600/15 animate-pulse [animation-duration:5s]" />
        <HardDrive className="absolute bottom-[12%] left-[8%] w-10 h-10 text-purple-700/15 animate-bounce [animation-duration:8s]" />

        {/* Email y Contacto */}
        <Mail className="absolute top-[18%] left-[12%] w-10 h-10 text-purple-700/20 animate-pulse [animation-duration:5s]" />
        <AtSign className="absolute top-[40%] right-[10%] w-12 h-12 text-purple-800/15 animate-bounce [animation-duration:6s]" />
        <Inbox className="absolute top-[65%] left-[7%] w-11 h-11 text-purple-600/15 animate-pulse [animation-duration:4.5s]" />
        <MessageSquare className="absolute bottom-[28%] right-[12%] w-10 h-10 text-purple-700/20 animate-bounce [animation-duration:7.5s]" />
        <SendHorizontal className="absolute bottom-[8%] right-[6%] w-12 h-12 text-purple-800/15 animate-pulse [animation-duration:6s]" />
      </div>

      <main className="py-12 relative z-10">
        {/* BACKGROUND EFFECTS */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-200/40 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100/50 blur-[140px] pointer-events-none" />

        {/* HERO */}
        <section className="relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="border border-purple-100 bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-xl shadow-purple-950/5 overflow-hidden relative">
              <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#6b21a8_1px,transparent_1px),linear-gradient(to_bottom,#6b21a8_1px,transparent_1px)] bg-[size:40px_40px]" />

              <div className="relative z-10 px-6 md:px-12 py-20 md:py-24 text-center">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-slate-900">
                  {t("hero.title")}
                  <span className="block text-purple-700 mt-1">
                    {t("hero.subtitle")}
                  </span>
                </h1>

                <p className="max-w-2xl mx-auto text-slate-600 text-lg leading-relaxed">
                  {t("hero.description")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="max-w-7xl mx-auto px-6 mt-14">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
            {/* LEFT */}
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-5">
                {contactCards.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-3xl border border-purple-100 bg-white/90 backdrop-blur-xl p-6 shadow-md shadow-purple-950/5 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-900/10 transition-all duration-500 hover:-translate-y-1"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="relative z-10 flex items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                          <Icon className="w-6 h-6 text-purple-700" />
                        </div>

                        <div>
                          <h3 className="font-bold text-slate-900 mb-1">
                            {item.title}
                          </h3>

                          {item.href ? (
                            <a
                              href={item.href}
                              className="text-slate-600 hover:text-purple-700 transition-colors text-sm leading-relaxed"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-slate-600 text-sm leading-relaxed">
                              {item.value}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* FORM */}
            <div className="relative">
              <div className="absolute inset-0 bg-purple-200/30 blur-3xl rounded-[3rem]" />

              <div className="relative border border-purple-100 bg-white/90 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 shadow-xl shadow-purple-950/5 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:30px_30px]" />

                <div className="relative z-10">
                  <div className="mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-200 bg-purple-50 text-purple-800 text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
                      {t("form.badge")}
                    </div>

                    <h2 className="text-3xl font-black tracking-tight text-slate-900">
                      {t("form.title")}
                    </h2>

                    <p className="text-slate-600 text-sm mt-3">
                      {t("form.subtitle")}
                    </p>
                  </div>

                  {submitted ? (
                    <div className="py-16 text-center">
                      <div className="w-20 h-20 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center mx-auto mb-6 animate-pulse">
                        <Send className="w-9 h-9 text-purple-700" />
                      </div>

                      <h3 className="text-2xl font-bold text-slate-900 mb-3">
                        {t("form.success.title")}
                      </h3>

                      <p className="text-slate-600">
                        {t("form.success.text")}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold tracking-wide text-slate-700 mb-2">
                            {t("form.fields.name.label")}
                          </label>

                          <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                            placeholder={t("form.fields.name.placeholder")}
                            className="w-full bg-slate-50 border border-purple-100 rounded-2xl px-5 py-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold tracking-wide text-slate-700 mb-2">
                            {t("form.fields.lastname.label")}
                          </label>

                          <input
                            type="text"
                            name="apellidos"
                            value={formData.apellidos}
                            onChange={handleChange}
                            required
                            placeholder={t("form.fields.lastname.placeholder")}
                            className="w-full bg-slate-50 border border-purple-100 rounded-2xl px-5 py-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold tracking-wide text-slate-700 mb-2">
                          {t("form.fields.subject.label")}
                        </label>

                        <input
                          type="text"
                          name="asunto"
                          value={formData.asunto}
                          onChange={handleChange}
                          required
                          placeholder={t("form.fields.subject.placeholder")}
                          className="w-full bg-slate-50 border border-purple-100 rounded-2xl px-5 py-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold tracking-wide text-slate-700 mb-2">
                            {t("form.fields.email.label")}
                          </label>

                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder={t("form.fields.email.placeholder")}
                            className="w-full bg-slate-50 border border-purple-100 rounded-2xl px-5 py-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold tracking-wide text-slate-700 mb-2">
                            {t("form.fields.phone.label")}
                          </label>

                          <input
                            type="tel"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            placeholder={t("form.fields.phone.placeholder")}
                            className="w-full bg-slate-50 border border-purple-100 rounded-2xl px-5 py-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold tracking-wide text-slate-700 mb-2">
                          {t("form.fields.message.label")}
                        </label>

                        <textarea
                          name="mensaje"
                          value={formData.mensaje}
                          onChange={handleChange}
                          required
                          rows={6}
                          placeholder={t("form.fields.message.placeholder")}
                          className="w-full resize-none bg-slate-50 border border-purple-100 rounded-2xl px-5 py-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="group w-full py-4 rounded-2xl bg-black hover:bg-slate-800 text-white font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-purple-950/10 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform text-purple-400" />

                        {isLoading
                          ? t("form.sending")
                          : t("form.send")}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* DO NOT CHANGE */}
      <iframe className="w-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.4172327364236!2d-99.2128709!3d19.4375699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d2022269d2076f%3A0x6b4e7cf1ca3e43d5!2sPerif.%20Blvd.%20Manuel%20%C3%81vila%20Camacho%20235-interior%20202%2C%20Polanco%2C%20Militar%2C%20Miguel%20Hidalgo%2C%2011510%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses-419!2smx!4v1782238520409!5m2!1ses-419!2smx" width="600" height="450" loading="lazy" ></iframe>

    </div>
  );
}