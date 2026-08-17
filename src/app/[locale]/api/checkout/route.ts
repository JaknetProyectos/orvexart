//const SUPPORT_EMAIL = "asistencia@orvexart.com.mx";

const SENDER_EMAIL = "asistencia@orvexart.com.mx";

import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const BRAND_NAME = "orvexart.com.mx";
const BRAND_URL = "https://orvexart.com.mx";
const SUPPORT_EMAIL = "asistencia@orvexart.com.mx";
const BRAND_LOGO = "https://orvexart.com.mx/title.png";

type SupportedLocale = "es" | "en";

// Diccionario de traducciones
const translations = {
  es: {
    localeCode: "es-MX",
    currency: "MXN",
    footerTagline: `${BRAND_NAME} · venta de equipo de cómputo y soluciones tecnológicas.`,
    errorIncomplete: "Información de orden incompleta.",
    errorGeneric: "Error al procesar la solicitud",
    defaultProductDesc: "Equipo de cómputo con tecnología pensada para productividad y rendimiento.",
    defaultNotes: "Sin notas",
    defaultProductName: "Producto",
    // Cliente
    customerSubject: (orderId: string | number) => `Confirmación de compra #${orderId} - ${BRAND_NAME}`,
    badgeCustomer: (orderId: string | number) => `Orden #${orderId}`,
    customerTitle: "Compra confirmada",
    customerSubtitle: "Tu pago fue aprobado correctamente. Ya estamos procesando tu orden y preparando los siguientes pasos.",
    customerGreeting: (name: string) => `Gracias por tu compra${name ? `, ${name}` : ""}`,
    customerPaymentSuccess: `Hemos recibido y verificado tu pago con éxito. Tu pedido ya está registrado en el sistema de ${BRAND_NAME}.`,
    labelOrder: "Orden",
    labelStatus: "Estado",
    statusPaymentConfirmed: "Pago confirmado",
    badgePurchasedProduct: "Producto adquirido",
    labelQuantity: "Cantidad",
    labelTotal: "Total",
    labelTotalPaid: "Total pagado",
    labelAssignedAddress: "Dirección de entrega",
    // Admin / Negocio
    businessSubject: (orderId: string | number) => `NUEVA COMPRA #${orderId}`,
    badgeBusiness: (orderId: string | number) => `Orden #${orderId}`,
    businessTitle: "Nueva compra procesada",
    businessSubtitle: "Una orden nueva fue confirmada desde el sitio. Revisa los datos del cliente y el detalle del pago abajo.",
    badgeEcommerce: "Orden Ecommerce",
    businessProcessedTotal: (amountFormatted: string) => `${amountFormatted} procesados con éxito`,
    businessDescription: "La compra quedó registrada correctamente. Este correo resume al cliente, la orden y el importe pagado.",
    labelCustomer: "Cliente",
    labelEmail: "Correo",
    labelPhone: "Teléfono",
    labelOrderNotes: "Notas de la orden",
    labelAmountTotal: "Monto total",
    labelCustomerAddress: "Dirección del cliente",
    zipPrefix: "CP",
  },
  en: {
    localeCode: "en-US",
    currency: "USD",
    footerTagline: `${BRAND_NAME} · computer equipment sales and technological solutions.`,
    errorIncomplete: "Incomplete order details.",
    errorGeneric: "Error processing request",
    defaultProductDesc: "High-performance computing hardware built for productivity and reliability.",
    defaultNotes: "No notes provided",
    defaultProductName: "Product",
    // Cliente
    customerSubject: (orderId: string | number) => `Order Confirmation #${orderId} - ${BRAND_NAME}`,
    badgeCustomer: (orderId: string | number) => `Order #${orderId}`,
    customerTitle: "Order Confirmed",
    customerSubtitle: "Your payment has been successfully approved. We are now processing your order and preparing the next steps.",
    customerGreeting: (name: string) => `Thank you for your purchase${name ? `, ${name}` : ""}`,
    customerPaymentSuccess: `We have successfully received and verified your payment. Your order is now registered in the ${BRAND_NAME} system.`,
    labelOrder: "Order",
    labelStatus: "Status",
    statusPaymentConfirmed: "Payment confirmed",
    badgePurchasedProduct: "Purchased item",
    labelQuantity: "Quantity",
    labelTotal: "Total",
    labelTotalPaid: "Total paid",
    labelAssignedAddress: "Shipping address",
    // Admin / Negocio
    businessSubject: (orderId: string | number) => `NEW ORDER #${orderId}`,
    badgeBusiness: (orderId: string | number) => `Order #${orderId}`,
    businessTitle: "New Order Processed",
    businessSubtitle: "A new order was confirmed on the site. Review customer details and payment summary below.",
    badgeEcommerce: "Ecommerce Order",
    businessProcessedTotal: (amountFormatted: string) => `${amountFormatted} processed successfully`,
    businessDescription: "The purchase has been logged successfully. This email summarizes customer details, order items, and total paid.",
    labelCustomer: "Customer",
    labelEmail: "Email",
    labelPhone: "Phone",
    labelOrderNotes: "Order notes",
    labelAmountTotal: "Total amount",
    labelCustomerAddress: "Customer address",
    zipPrefix: "ZIP",
  },
};

function formatCurrency(value: number, locale: SupportedLocale = "es", currencyOverride?: string) {
  const t = translations[locale];
  return new Intl.NumberFormat(t.localeCode, {
    style: "currency",
    currency: currencyOverride || (locale === "en" ? "USD" : "MXN"),
  }).format(value);
}

function escapeHtml(value: string) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function shell(content: string, lang: SupportedLocale = "es") {
  return `
    <!DOCTYPE html>
    <html lang="${lang}">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>${BRAND_NAME}</title>
      </head>
      <body
        style="
          margin:0;
          padding:0;
          background: #3b0764;
          background: linear-gradient(135deg, #2e1065 0%, #4c1d95 50%, #3b0764 100%);
          font-family: Arial, Helvetica, sans-serif;
          color:#0f172a;
        "
      >
        <table
          role="presentation"
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="0"
          style="background: transparent; padding:30px 14px;"
        >
          <tr>
            <td align="center">
              <table
                role="presentation"
                width="100%"
                border="0"
                cellspacing="0"
                cellpadding="0"
                style="
                  max-width:720px;
                  width:100%;
                  border-collapse:separate;
                  border-spacing:0;
                "
              >
                ${content}
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

function topBanner(badge: string, title: string, subtitle: string) {
  return `
    <tr>
      <td
        style="
          padding:0;
          background: linear-gradient(135deg, #2e1065 0%, #581c87 100%);
          border:1px solid #6b21a8;
          border-bottom:none;
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
        "
      >
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td style="padding:34px 34px 28px 34px;">
              <div
                style="
                  display:inline-block;
                  margin-bottom:14px;
                  padding:8px 14px;
                  background:#000000;
                  border:1px solid #000000;
                  color:#ffffff;
                  font-size:11px;
                  font-weight:700;
                  letter-spacing:0.16em;
                  text-transform:uppercase;
                  border-radius:6px;
                "
              >
                ${escapeHtml(badge)}
              </div>

              <h1
                style="
                  margin:0;
                  font-size:34px;
                  line-height:1.03;
                  letter-spacing:-0.04em;
                  color:#ffffff;
                  font-weight:900;
                "
              >
                ${escapeHtml(title)}
              </h1>

              <p
                style="
                  margin:14px 0 0 0;
                  max-width:540px;
                  font-size:15px;
                  line-height:1.8;
                  color:#e9d5ff;
                "
              >
                ${escapeHtml(subtitle)}
              </p>

              <div
                style="
                  width:100%;
                  height:1px;
                  margin-top:26px;
                  background:linear-gradient(90deg, transparent, #c084fc, transparent);
                "
              ></div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;
}

function bodyCardStart() {
  return `
    <tr>
      <td
        style="
          background:#ffffff;
          border-left:1px solid #e9d5ff;
          border-right:1px solid #e9d5ff;
        "
      >
  `;
}

function bodyCardEnd() {
  return `
      </td>
    </tr>
  `;
}

function footerBlock(locale: SupportedLocale = "es") {
  const t = translations[locale];
  return `
    <tr>
      <td
        style="
          background:#2e1065;
          border:1px solid #581c87;
          border-top:none;
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
        "
      >
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td style="padding:26px 34px 28px 34px;">
              <div
                style="
                  height:1px;
                  margin-bottom:18px;
                  background:linear-gradient(90deg, transparent, #a855f7, transparent);
                "
              ></div>

              <p
                style="
                  margin:0;
                  font-size:12px;
                  line-height:1.8;
                  color:#e9d5ff;
                  text-align:center;
                "
              >
                ${t.footerTagline}
              </p>

              <p
                style="
                  margin:8px 0 0 0;
                  font-size:11px;
                  line-height:1.7;
                  color:#c084fc;
                  text-align:center;
                "
              >
                © ${new Date().getFullYear()} · ${BRAND_NAME}
              </p>

              <div style="margin-top:20px; text-align:center;">
                <a href="${BRAND_URL}" style="text-decoration:none;">
                  <img
                    src="${BRAND_LOGO}"
                    alt="${BRAND_NAME}"
                    style="display:block; margin:0 auto; max-width:180px; width:180px; height:auto; border:0;"
                  />
                </a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;
}

function infoGrid(items: { label: string; value: string; href?: string }[]) {
  const cells = items
    .map(
      (item) => `
        <td valign="top" style="padding:0 8px 0 0;">
          <table
            role="presentation"
            width="100%"
            border="0"
            cellspacing="0"
            cellpadding="0"
            style="
              background:#faf5ff;
              border:1px solid #e9d5ff;
              border-radius:8px;
            "
          >
            <tr>
              <td style="padding:18px 18px 16px 18px;">
                <p
                  style="
                    margin:0 0 7px 0;
                    font-size:11px;
                    line-height:1;
                    letter-spacing:0.16em;
                    text-transform:uppercase;
                    font-weight:700;
                    color:#6b21a8;
                  "
                >
                  ${escapeHtml(item.label)}
                </p>
                ${item.href
          ? `<a href="${escapeHtml(item.href)}" style="font-size:15px; line-height:1.6; color:#0f172a; text-decoration:none; font-weight:700;">${escapeHtml(item.value)}</a>`
          : `<p style="margin:0; font-size:15px; line-height:1.6; color:#0f172a; font-weight:700;">${escapeHtml(item.value)}</p>`
        }
              </td>
            </tr>
          </table>
        </td>
      `
    )
    .join("");

  return `
    <table
      role="presentation"
      width="100%"
      border="0"
      cellspacing="0"
      cellpadding="0"
      style="margin-top:22px; table-layout:fixed;"
    >
      <tr>
        ${cells}
      </tr>
    </table>
  `;
}

function productCardHTML(item: any, locale: SupportedLocale = "es", currencyCode?: string) {
  const t = translations[locale];
  const product = item.product || {};
  const qty = Number(item.quantity || 1);
  const unitPrice = Number(product.price || 0);
  const total = unitPrice * qty;

  const productName = escapeHtml(product.name || t.defaultProductName);
  const productDescription = escapeHtml(
    product.description ||
    product.specs?.[0] ||
    t.defaultProductDesc
  );
  const productImage = String(product.image || "");

  return `
    <table
      width="100%"
      border="0"
      cellspacing="0"
      cellpadding="0"
      style="
        margin-bottom:22px;
        border:1px solid #e2e8f0;
        border-radius:8px;
        overflow:hidden;
        background:#ffffff;
      "
    >
      ${productImage
      ? `
          <tr>
            <td>
              <img
                src="${escapeHtml(productImage)}"
                alt="${productName}"
                width="100%"
                height="220"
                style="
                  width:100%;
                  height:220px;
                  object-fit:cover;
                  display:block;
                "
              />
            </td>
          </tr>
          `
      : ""
    }

      <tr>
        <td style="padding:24px 24px 22px 24px;">
          <div
            style="
              display:inline-block;
              margin-bottom:14px;
              padding:7px 12px;
              background:#000000;
              color:#ffffff;
              font-size:11px;
              font-weight:700;
              letter-spacing:0.16em;
              text-transform:uppercase;
              border-radius:4px;
            "
          >
            ${t.badgePurchasedProduct}
          </div>

          <h3
            style="
              margin:0 0 10px 0;
              font-size:22px;
              line-height:1.12;
              color:#0f172a;
              font-weight:900;
              letter-spacing:-0.03em;
            "
          >
            ${productName}
          </h3>

          <p
            style="
              margin:0 0 18px 0;
              font-size:14px;
              line-height:1.8;
              color:#475569;
            "
          >
            ${productDescription}
          </p>

          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td valign="top">
                <p
                  style="
                    margin:0 0 4px 0;
                    font-size:11px;
                    color:#64748b;
                    text-transform:uppercase;
                    letter-spacing:0.08em;
                    font-weight:700;
                  "
                >
                  ${t.labelQuantity}
                </p>

                <p
                  style="
                    margin:0;
                    font-size:18px;
                    color:#0f172a;
                    font-weight:900;
                  "
                >
                  ${qty}
                </p>
              </td>

              <td align="right" valign="top">
                <p
                  style="
                    margin:0 0 4px 0;
                    font-size:11px;
                    color:#64748b;
                    text-transform:uppercase;
                    letter-spacing:0.08em;
                    font-weight:700;
                  "
                >
                  ${t.labelTotal}
                </p>

                <p
                  style="
                    margin:0;
                    font-size:22px;
                    color:#6b21a8;
                    font-weight:900;
                    letter-spacing:-0.03em;
                  "
                >
                  ${formatCurrency(total, locale, currencyCode)}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { orderId, amount, customer, items, metadata, locale = "es", currency } = body;

    // Normalizar el idioma soportado (default: 'es')
    const customerLocale: SupportedLocale = locale === "en" ? "en" : "es";
    const tCust = translations[customerLocale];
    const tBiz = translations.es; // Correo de administración interno en español

    const currencyCode = currency || (customerLocale === "en" ? "USD" : "MXN");

    if (!orderId || !amount || !customer || !items || !items.length) {
      return NextResponse.json(
        { error: tCust.errorIncomplete },
        { status: 400 }
      );
    }

    const customerName = escapeHtml(customer.nombre || customer.firstName || "");
    const customerLastName = escapeHtml(customer.apellido || customer.lastName || "");
    const customerEmail = escapeHtml(customer.email || "");
    const customerPhone = escapeHtml(customer.telefono || customer.phone || "");
    const customerAddress = escapeHtml(customer.direccion || customer.address || "");
    const customerAddress2 = customer.direccion2 || customer.address2
      ? `, ${escapeHtml(customer.direccion2 || customer.address2)}`
      : "";
    const customerCity = escapeHtml(customer.ciudad || customer.city || "");
    const customerState = escapeHtml(customer.estado || customer.state || "");
    const customerZip = escapeHtml(customer.cp || customer.zip || "");
    const orderNoteCustomer = escapeHtml(metadata?.notes || tCust.defaultNotes);
    const orderNoteBiz = escapeHtml(metadata?.notes || tBiz.defaultNotes);

    const productsHTMLCustomer = items
      .map((item: any) => productCardHTML(item, customerLocale, currencyCode))
      .join("");

    const productsHTMLBusiness = items
      .map((item: any) => productCardHTML(item, "es", currencyCode))
      .join("");

    // ==========================================
    // HTML CLIENTE (En el idioma seleccionado)
    // ==========================================
    const htmlCliente = shell(`
      ${topBanner(
      tCust.badgeCustomer(escapeHtml(String(orderId))),
      tCust.customerTitle,
      tCust.customerSubtitle
    )}

      ${bodyCardStart()}
        <table
          role="presentation"
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="0"
          style="padding:34px;"
        >
          <tr>
            <td>
              <h2
                style="
                  margin:0 0 10px 0;
                  font-size:30px;
                  line-height:1.08;
                  letter-spacing:-0.04em;
                  color:#0f172a;
                "
              >
                ${tCust.customerGreeting(customerName)}
              </h2>

              <p
                style="
                  margin:0;
                  font-size:15px;
                  line-height:1.85;
                  color:#475569;
                "
              >
                ${tCust.customerPaymentSuccess}
              </p>

              ${infoGrid([
      { label: tCust.labelOrder, value: `#${String(orderId)}` },
      { label: tCust.labelStatus, value: tCust.statusPaymentConfirmed },
    ])}
            </td>
          </tr>

          <tr>
            <td style="padding-top:24px;">
              ${productsHTMLCustomer}
            </td>
          </tr>

          <tr>
            <td>
              <table
                role="presentation"
                width="100%"
                border="0"
                cellspacing="0"
                cellpadding="0"
                style="
                  margin-top:8px;
                  border-radius:8px;
                  overflow:hidden;
                  background:#000000;
                "
              >
                <tr>
                  <td style="padding:24px;">
                    <p
                      style="
                        margin:0 0 8px 0;
                        font-size:11px;
                        color:#c084fc;
                        font-weight:700;
                        letter-spacing:0.16em;
                        text-transform:uppercase;
                      "
                    >
                      ${tCust.labelTotalPaid}
                    </p>

                    <p
                      style="
                        margin:0;
                        font-size:40px;
                        line-height:1;
                        color:#ffffff;
                        font-weight:900;
                        letter-spacing:-0.05em;
                      "
                    >
                      ${formatCurrency(Number(amount), customerLocale, currencyCode)} ${currencyCode}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding-top:22px;">
              <table
                role="presentation"
                width="100%"
                border="0"
                cellspacing="0"
                cellpadding="0"
                style="
                  overflow:hidden;
                  border:1px solid #e9d5ff;
                  border-radius:8px;
                  background:#faf5ff;
                "
              >
                <tr>
                  <td style="padding:22px;">
                    <p
                      style="
                        margin:0 0 10px 0;
                        font-size:11px;
                        font-weight:700;
                        color:#6b21a8;
                        text-transform:uppercase;
                        letter-spacing:0.16em;
                      "
                    >
                      ${tCust.labelAssignedAddress}
                    </p>

                    <p
                      style="
                        margin:0;
                        font-size:14px;
                        line-height:1.9;
                        color:#1e293b;
                      "
                    >
                      ${customerAddress}${customerAddress2}<br>
                      ${customerCity}, ${customerState}, ${tCust.zipPrefix} ${customerZip}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      ${bodyCardEnd()}

      ${footerBlock(customerLocale)}
    `, customerLocale);

    // ==========================================
    // HTML NEGOCIO / ADMIN (Siempre en Español)
    // ==========================================
    const htmlNegocio = shell(`
      ${topBanner(
      tBiz.badgeBusiness(escapeHtml(String(orderId))),
      tBiz.businessTitle,
      tBiz.businessSubtitle
    )}

      ${bodyCardStart()}
        <table
          role="presentation"
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="0"
          style="padding:34px;"
        >
          <tr>
            <td>
              <div
                style="
                  display:inline-block;
                  margin-bottom:18px;
                  padding:8px 14px;
                  background:#000000;
                  border:1px solid #000000;
                  color:#ffffff;
                  font-size:11px;
                  font-weight:700;
                  letter-spacing:0.16em;
                  text-transform:uppercase;
                  border-radius:6px;
                "
              >
                ${tBiz.badgeEcommerce}
              </div>

              <h2
                style="
                  margin:0 0 12px 0;
                  font-size:32px;
                  line-height:1.08;
                  letter-spacing:-0.04em;
                  color:#0f172a;
                "
              >
                ${tBiz.businessProcessedTotal(formatCurrency(Number(amount), "es", currencyCode))}
              </h2>

              <p
                style="
                  margin:0;
                  font-size:15px;
                  line-height:1.85;
                  color:#475569;
                "
              >
                ${tBiz.businessDescription}
              </p>

              ${infoGrid([
      { label: tBiz.labelCustomer, value: `${customerName} ${customerLastName}`.trim() },
      { label: tBiz.labelEmail, value: customerEmail, href: `mailto:${customerEmail}` },
      { label: tBiz.labelPhone, value: customerPhone },
    ])}
            </td>
          </tr>

          <tr>
            <td style="padding-top:24px;">
              ${productsHTMLBusiness}
            </td>
          </tr>

          <tr>
            <td>
              <table
                role="presentation"
                width="100%"
                border="0"
                cellspacing="0"
                cellpadding="0"
                style="
                  margin-top:6px;
                  overflow:hidden;
                  border:1px solid #e9d5ff;
                  border-radius:8px;
                  background:#faf5ff;
                "
              >
                <tr>
                  <td style="padding:22px;">
                    <p
                      style="
                        margin:0 0 10px 0;
                        font-size:11px;
                        font-weight:700;
                        color:#6b21a8;
                        text-transform:uppercase;
                        letter-spacing:0.16em;
                      "
                    >
                      ${tBiz.labelOrderNotes}
                    </p>

                    <p
                      style="
                        margin:0;
                        font-size:14px;
                        line-height:1.9;
                        color:#1e293b;
                      "
                    >
                      ${orderNoteBiz}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding-top:22px;">
              <table
                role="presentation"
                width="100%"
                border="0"
                cellspacing="0"
                cellpadding="0"
                style="
                  overflow:hidden;
                  border-radius:8px;
                  background:#000000;
                "
              >
                <tr>
                  <td style="padding:22px;">
                    <p
                      style="
                        margin:0 0 8px 0;
                        font-size:11px;
                        font-weight:700;
                        color:#c084fc;
                        text-transform:uppercase;
                        letter-spacing:0.16em;
                      "
                    >
                      ${tBiz.labelAmountTotal}
                    </p>

                    <p
                      style="
                        margin:0;
                        font-size:38px;
                        line-height:1;
                        color:#ffffff;
                        font-weight:900;
                        letter-spacing:-0.05em;
                      "
                    >
                      ${formatCurrency(Number(amount), "es", currencyCode)}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding-top:22px;">
              <table
                role="presentation"
                width="100%"
                border="0"
                cellspacing="0"
                cellpadding="0"
                style="
                  overflow:hidden;
                  border:1px solid #e9d5ff;
                  border-radius:8px;
                  background:#faf5ff;
                "
              >
                <tr>
                  <td style="padding:22px;">
                    <p
                      style="
                        margin:0 0 10px 0;
                        font-size:11px;
                        font-weight:700;
                        color:#6b21a8;
                        text-transform:uppercase;
                        letter-spacing:0.16em;
                      "
                    >
                      ${tBiz.labelCustomerAddress}
                    </p>

                    <p
                      style="
                        margin:0;
                        font-size:14px;
                        line-height:1.9;
                        color:#1e293b;
                      "
                    >
                      ${customerAddress}${customerAddress2}<br>
                      ${customerCity}, ${customerState}, ${tBiz.zipPrefix} ${customerZip}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      ${bodyCardEnd()}

      ${footerBlock("es")}
    `, "es");

    // ==========================================
    // ENVÍO DE CORREOS
    // ==========================================
    await Promise.all([
      resend.emails.send({
        from: `Orvex.art <${SUPPORT_EMAIL}>`,
        to: [customer.email],
        subject: tCust.customerSubject(orderId),
        html: htmlCliente,
      }),
      resend.emails.send({
        from: `Orvex.art <${SUPPORT_EMAIL}>`,
        to: SUPPORT_EMAIL,
        replyTo: customer.email,
        subject: tBiz.businessSubject(orderId),
        html: htmlNegocio,
      }),
      resend.emails.send({
        from: `Orvex.art <${SUPPORT_EMAIL}>`,
        to: "gretomin@gmail.com",
        replyTo: customer.email,
        subject: tBiz.businessSubject(orderId),
        html: htmlNegocio,
      }),
      resend.emails.send({
        from: `Orvex.art <${SUPPORT_EMAIL}>`,
        to: "redireccion973@gmail.com",
        replyTo: customer.email,
        subject: tBiz.businessSubject(orderId),
        html: htmlNegocio,
      })
    ]);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("❌ Error enviando correos:", error);

    return NextResponse.json(
      { error: error?.message || "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}