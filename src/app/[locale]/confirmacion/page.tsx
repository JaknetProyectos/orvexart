'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import { useTranslations } from 'next-intl';

/* ==========================================================================
   CONFIGURACIÓN DEL TEMA (Personaliza colores y bordes desde aquí)
   ========================================================================== */
const THEME_CONFIG = {
  // Bordes redondeados: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
  borderRadius: {
    card: 'rounded-[32px]', // Redondeo de la tarjeta principal
    innerCard: 'rounded-2xl', // Redondeo del contenedor de detalles
    iconBadge: 'rounded-2xl', // Redondeo del contenedor del icono
    button: 'rounded-full',   // Redondeo del botón principal
  },

  // Paleta de Colores
  colors: {
    // Fondo de la página
    pageBg: 'bg-neutral-100',
    pageText: 'text-neutral-800',

    // Tarjeta Principal (Siempre tema claro)
    cardBg: 'bg-white',
    cardText: 'text-neutral-800',
    cardBorder: 'border-neutral-100',
    cardShadow: 'shadow-2xl',

    // Elementos decorativos de fondo (glows)
    glowgreen: 'bg-green-500/10',
    glowGreen: 'bg-purple-500/10',

    // Tarjeta Interna de Detalles
    innerCardBg: 'bg-neutral-50',
    innerCardBorder: 'ring-1 ring-neutral-200',
    innerCardDivider: 'border-neutral-200',
    labelColor: 'text-neutral-500',
    valueColor: 'text-neutral-800',

    // Contenedor e iconos por estado
    iconBadgeBg: 'bg-green-50 ring-1 ring-green-200',
    iconApproved: 'text-purple-600',
    iconPending: 'text-green-500',
    iconFailed: 'text-rose-500',

    // Badges de estado (Aprobado / Pendiente / Error)
    badgeApproved: 'bg-purple-100 text-purple-800 ring-1 ring-purple-300',
    badgePending: 'bg-green-100 text-green-800 ring-1 ring-green-300',
    badgeFailed: 'bg-rose-100 text-rose-800 ring-1 ring-rose-300',

    // Destacado del Total
    totalAmount: 'text-purple-700',

    // Botón de Acción Principal (Naranja)
    buttonBg: 'bg-green-500 hover:bg-green-600',
    buttonText: 'text-white',
    buttonShadow: 'shadow-lg shadow-green-500/20 hover:shadow-green-500/40',

    // Spinner de carga
    spinnerBorder: 'border-green-500',
  },
};

function ConfirmationContent() {
  const t = useTranslations('confirmationPage');
  const searchParams = useSearchParams();

  // Obtención de parámetros URL
  const status = searchParams.get('status') || searchParams.get('state') || 'UNKNOWN';
  const reference = searchParams.get('reference') || searchParams.get('orderId') || 'N/A';
  const amount = searchParams.get('amount');

  // Normalizar estado
  const isApproved = status.toUpperCase() === 'APPROVED' || status.toUpperCase() === 'SUCCESS';
  const isPending = status.toLowerCase() === 'pending_authentication' || status.toUpperCase() === 'PENDING';

  const { borderRadius, colors } = THEME_CONFIG;

  return (
    <div className={`min-h-screen ${colors.pageBg} ${colors.pageText} flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans`}>
      <main className="w-full max-w-lg">
        {/* Contenedor Principal */}
        <div className={`${colors.cardBg} ${colors.cardText} ${borderRadius.card} p-6 sm:p-8 ${colors.cardShadow} border ${colors.cardBorder} transition-all duration-300 relative overflow-hidden`}>
          
          {/* Esferas decorativas orgánicas en el fondo */}
          <div className={`absolute -top-16 -right-16 w-40 h-40 ${colors.glowgreen} rounded-full blur-2xl pointer-events-none`} />
          <div className={`absolute -bottom-16 -left-16 w-40 h-40 ${colors.glowGreen} rounded-full blur-2xl pointer-events-none`} />

          <div className="relative z-10 flex flex-col items-center text-center">

            {/* Ícono dinámico según estado */}
            <div className={`mb-6 p-4 ${borderRadius.iconBadge} ${colors.iconBadgeBg} shadow-inner`}>
              {isApproved ? (
                // Éxito
                <svg className={`w-12 h-12 ${colors.iconApproved}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : isPending ? (
                // Pendiente
                <svg className={`w-12 h-12 ${colors.iconPending} animate-pulse`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                // Error
                <svg className={`w-12 h-12 ${colors.iconFailed}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>

            {/* Encabezado */}
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 text-neutral-900">
              {isApproved
                ? t('status.approved.title')
                : isPending
                  ? t('status.pending.title')
                  : t('status.failed.title')}
            </h1>
            <p className="text-neutral-600 text-sm sm:text-base mb-8 max-w-sm">
              {isApproved
                ? t('status.approved.description')
                : isPending
                  ? t('status.pending.description')
                  : t('status.failed.description')}
            </p>

            {/* Card Interna de Detalles */}
            <div className={`w-full ${colors.innerCardBg} ${borderRadius.innerCard} p-5 mb-8 text-left ${colors.innerCardBorder} space-y-3`}>
              <div className={`flex justify-between items-center py-1 border-b ${colors.innerCardDivider}`}>
                <span className={`text-xs font-semibold uppercase tracking-wider ${colors.labelColor}`}>
                  {t('details.statusLabel')}
                </span>
                <span className={`text-xs font-bold px-2.5 py-1 ${borderRadius.button} uppercase tracking-wider ${
                  isApproved
                    ? colors.badgeApproved
                    : isPending
                      ? colors.badgePending
                      : colors.badgeFailed
                }`}>
                  {status}
                </span>
              </div>

              <div className={`flex justify-between items-center py-1 border-b ${colors.innerCardDivider}`}>
                <span className={`text-xs font-semibold uppercase tracking-wider ${colors.labelColor}`}>
                  {t('details.referenceLabel')}
                </span>
                <span className={`text-sm font-mono font-medium ${colors.valueColor}`}>{reference}</span>
              </div>

              {amount && (
                <div className="flex justify-between items-center pt-1">
                  <span className={`text-xs font-semibold uppercase tracking-wider ${colors.labelColor}`}>
                    {t('details.totalLabel')}
                  </span>
                  <span className={`text-base font-bold ${colors.totalAmount}`}>
                    ${Number(amount).toFixed(2)} MXN
                  </span>
                </div>
              )}
            </div>

            {/* Botón Principal */}
            <Link
              href="/"
              className={`w-full inline-flex items-center justify-center px-6 py-3.5 text-sm font-bold ${colors.buttonText} ${colors.buttonBg} ${borderRadius.button} transition-all duration-200 transform active:scale-95 ${colors.buttonShadow}`}
            >
              {t('backToStore')}
            </Link>

          </div>
        </div>
      </main>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className={`min-h-screen ${THEME_CONFIG.colors.pageBg} flex items-center justify-center`}>
          <div className={`animate-spin rounded-full h-10 w-10 border-4 ${THEME_CONFIG.colors.spinnerBorder} border-t-transparent`} />
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}