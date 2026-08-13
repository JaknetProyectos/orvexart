

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getTranslations } from "next-intl/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const SUPPORT_EMAIL = "asistencia@orvexart.com.mx";
const BRAND_NAME = "orvexart.com.mx";
const BRAND_URL = "https://orvexart.com.mx";
const BRAND_LOGO = "https://orvexart.com.mx/title.png";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatMessage(value: string) {
  return escapeHtml(value).replace(/\n/g, "<br />");
}

function shell(content: string) {
  return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${BRAND_NAME}</title>
      </head>
      <body style="margin:0; padding:0; background-color:#f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#18181b;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#f4f4f5; padding:40px 14px;">
          <tr><td align="center">
            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px; width:100%; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); border: 1px solid #e4e4e7;">
              ${content}
            </table>
          </td></tr>
        </table>
      </body>
    </html>
  `;
}

function topBanner(pretitle: string, title: string, subtitle: string) {
  return `<tr><td style="padding:32px 32px 24px 32px; background-color:#ffffff; border-bottom:1px solid #f4f4f5;">
    <div style="display:inline-block; margin-bottom:12px; padding:4px 10px; background-color:#f3e8ff; border-radius:6px; color:#7c3aed; font-size:11px; font-weight:700; text-transform:uppercase;">${escapeHtml(pretitle)}</div>
    <h1 style="margin:0; font-size:26px; line-height:1.2; color:#0f172a; font-weight:800; letter-spacing:-0.02em;">${escapeHtml(title)}</h1>
    <p style="margin:10px 0 0 0; font-size:15px; line-height:1.6; color:#64748b;">${escapeHtml(subtitle)}</p>
  </td></tr>`;
}

function cardStart() { return `<tr><td style="padding:0; background-color:#ffffff;">`; }
function cardEnd() { return `</td></tr>`; }

function footerBlock() {
  return `<tr><td style="padding:28px 32px; background-color:#fafafa; border-top:1px solid #f4f4f5;">
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr><td align="center">
        <div style="margin-bottom:16px;"><a href="${BRAND_URL}"><img src="${BRAND_LOGO}" alt="${BRAND_NAME}" style="display:block; max-width:140px; border:0;"/></a></div>
        <p style="margin:0; font-size:13px; color:#71717a;">${BRAND_NAME}</p>
        <p style="margin:6px 0 0 0; font-size:12px; color:#a1a1aa;">© 2026 · ${BRAND_NAME}</p>
      </td></tr>
    </table>
  </td></tr>`;
}

function metaGrid(items: { label: string; value: string; href?: string }[]) {
  const cells = items.map(item => `
    <td valign="top" style="padding:0 6px;">
      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#fafafa; border:1px solid #f4f4f5; border-radius:8px;">
        <tr><td style="padding:14px 16px;">
          <p style="margin:0 0 4px 0; font-size:11px; font-weight:700; color:#6b21a8; text-transform:uppercase;">${escapeHtml(item.label)}</p>
          ${item.href ? `<a href="${escapeHtml(item.href)}" style="font-size:14px; color:#7c3aed; text-decoration:none; font-weight:600;">${escapeHtml(item.value)}</a>` : `<p style="margin:0; font-size:14px; font-weight:600;">${escapeHtml(item.value)}</p>`}
        </td></tr>
      </table>
    </td>`).join("");
  return `<table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top:20px; table-layout:fixed;"><tr>${cells}</tr></table>`;
}

export async function POST(req: Request) {
  try {
    const { locale, nombre, email, mensaje } = await req.json();
    const t = await getTranslations({ locale, namespace: 'Emails.contactEmail' });

    if (!nombre || !email || !mensaje) return NextResponse.json({ error: "Campos incompletos" }, { status: 400 });

    const safeNombre = escapeHtml(String(nombre).trim());
    const safeEmail = escapeHtml(String(email).trim());
    const safeMessage = formatMessage(String(mensaje).trim());

    const htmlNegocio = shell(`
      ${topBanner(t("business.pretitle"), t("business.title"), t("business.subtitle"))}
      ${cardStart()}
        <table width="100%" style="padding:24px 32px;">
          <tr><td>
            <h2 style="margin:0 0 8px 0; font-size:20px; color:#0f172a;">${safeNombre}</h2>
            <p style="margin:0; font-size:14px; color:#475569;">${t("business.userDescription")}</p>
            ${metaGrid([{ label: t("business.labelName"), value: safeNombre }, { label: t("business.labelEmail"), value: safeEmail, href: `mailto:${safeEmail}` }])}
          </td></tr>
          <tr><td style="padding-top:20px;">
            <div style="padding:18px; background-color:#faf5ff; border:1px solid #f3e8ff; border-radius:8px;">
              <p style="margin:0 0 8px 0; font-size:11px; font-weight:700; color:#6b21a8; text-transform:uppercase;">${t("business.messageLabel")}</p>
              <p style="margin:0; font-size:14px; color:#334155;">${safeMessage}</p>
            </div>
          </td></tr>
          <tr><td style="padding-top:20px;"><a href="mailto:${safeEmail}" style="padding:12px 20px; background-color:#7c3aed; color:#ffffff; text-decoration:none; font-size:14px; border-radius:6px;">${t("business.replyButton", { email: safeEmail })}</a></td></tr>
        </table>
      ${cardEnd()}
      ${footerBlock()}
    `);

    const htmlUsuario = shell(`
      ${topBanner(t("user.pretitle"), t("user.title"), t("user.subtitle"))}
      ${cardStart()}
        <table width="100%" style="padding:24px 32px;">
          <tr><td>
            <h2 style="margin:0 0 8px 0; font-size:20px;">${t("user.greeting", { nombre: safeNombre })}</h2>
            <p style="margin:0; font-size:15px; color:#475569;">${t("user.description")}</p>
            ${metaGrid([{ label: t("user.registeredEmail"), value: safeEmail, href: `mailto:${safeEmail}` }, { label: t("user.webSite"), value: BRAND_NAME, href: BRAND_URL }])}
          </td></tr>
          <tr><td style="padding-top:20px;">
            <div style="padding:18px; background-color:#faf5ff; border:1px solid #f3e8ff; border-radius:8px;">
              <p style="margin:0 0 8px 0; font-size:11px; font-weight:700; color:#6b21a8; text-transform:uppercase;">${t("user.messageLabel")}</p>
              <p style="margin:0; font-size:14px; color:#334155;">${safeMessage}</p>
            </div>
          </td></tr>
          <tr><td align="center" style="padding-top:28px;"><a href="${BRAND_URL}" style="padding:12px 24px; background-color:#7c3aed; color:#ffffff; text-decoration:none; font-size:14px; border-radius:6px;">${t("user.backButton", { brandName: BRAND_NAME })}</a></td></tr>
        </table>
      ${cardEnd()}
      ${footerBlock()}
    `);

    await Promise.all([
      resend.emails.send({ from: `Orvex.art <${SUPPORT_EMAIL}>`, to: [SUPPORT_EMAIL], replyTo: safeEmail, subject: t("subjectBusiness", { nombre: safeNombre }), html: htmlNegocio }),
      resend.emails.send({ from: `Orvex.art <${SUPPORT_EMAIL}>`, to: [safeEmail], subject: t("subjectUser", { brandName: BRAND_NAME }), html: htmlUsuario }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}