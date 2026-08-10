import { NextResponse } from "next/server";
import { Resend } from "resend";

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
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>${BRAND_NAME}</title>
      </head>
      <body
        style="
          margin:0;
          padding:0;
          background-color:#f4f4f5;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          color:#18181b;
        "
      >
        <table
          role="presentation"
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="0"
          style="background-color:#f4f4f5; padding:40px 14px;"
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
                  max-width:600px;
                  width:100%;
                  background-color:#ffffff;
                  border-radius:12px;
                  overflow:hidden;
                  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
                  border: 1px solid #e4e4e7;
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

function topBanner(pretitle: string, title: string, subtitle: string) {
  return `
    <tr>
      <td style="padding:32px 32px 24px 32px; background-color:#ffffff; border-bottom:1px solid #f4f4f5;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td>
              <div
                style="
                  display:inline-block;
                  margin-bottom:12px;
                  padding:4px 10px;
                  background-color:#f3e8ff;
                  border-radius:6px;
                  color:#7c3aed;
                  font-size:11px;
                  font-weight:700;
                  letter-spacing:0.08em;
                  text-transform:uppercase;
                "
              >
                ${escapeHtml(pretitle)}
              </div>

              <h1
                style="
                  margin:0;
                  font-size:26px;
                  line-height:1.2;
                  color:#0f172a;
                  font-weight:800;
                  letter-spacing:-0.02em;
                "
              >
                ${escapeHtml(title)}
              </h1>

              <p
                style="
                  margin:10px 0 0 0;
                  font-size:15px;
                  line-height:1.6;
                  color:#64748b;
                "
              >
                ${escapeHtml(subtitle)}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;
}

function cardStart() {
  return `
    <tr>
      <td style="padding:0; background-color:#ffffff;">
  `;
}

function cardEnd() {
  return `
      </td>
    </tr>
  `;
}

function footerBlock() {
  return `
    <tr>
      <td style="padding:28px 32px; background-color:#fafafa; border-top:1px solid #f4f4f5;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center">
              <div style="margin-bottom:16px;">
                <a href="${BRAND_URL}" style="text-decoration:none;">
                  <img
                    src="${BRAND_LOGO}"
                    alt="${BRAND_NAME}"
                    style="display:block; margin:0 auto; max-width:140px; width:140px; height:auto; border:0;"
                  />
                </a>
              </div>

              <p
                style="
                  margin:0;
                  font-size:13px;
                  line-height:1.5;
                  color:#71717a;
                "
              >
                ${BRAND_NAME} · Venta de equipo de cómputo y soluciones tecnológicas.
              </p>

              <p
                style="
                  margin:6px 0 0 0;
                  font-size:12px;
                  color:#a1a1aa;
                "
              >
                © 2026 · ${BRAND_NAME}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;
}

function metaGrid(items: { label: string; value: string; href?: string }[]) {
  const cells = items
    .map(
      (item) => `
      <td valign="top" style="padding:0 6px;">
        <table
          role="presentation"
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="0"
          style="
            background-color:#fafafa;
            border:1px solid #f4f4f5;
            border-radius:8px;
          "
        >
          <tr>
            <td style="padding:14px 16px;">
              <p
                style="
                  margin:0 0 4px 0;
                  font-size:11px;
                  line-height:1;
                  letter-spacing:0.05em;
                  text-transform:uppercase;
                  font-weight:700;
                  color:#6b21a8;
                "
              >
                ${escapeHtml(item.label)}
              </p>
              ${
                item.href
                  ? `<a href="${escapeHtml(item.href)}" style="font-size:14px; line-height:1.4; color:#7c3aed; text-decoration:none; font-weight:600;">${escapeHtml(item.value)}</a>`
                  : `<p style="margin:0; font-size:14px; line-height:1.4; color:#18181b; font-weight:600;">${escapeHtml(item.value)}</p>`
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
      style="margin-top:20px; table-layout:fixed;"
    >
      <tr>
        ${cells}
      </tr>
    </table>
  `;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nombre, email, mensaje } = body;

    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: "Faltan campos requeridos (nombre, email, mensaje)" },
        { status: 400 }
      );
    }

    const safeNombre = escapeHtml(String(nombre).trim());
    const safeEmail = escapeHtml(String(email).trim());
    const safeMessage = formatMessage(String(mensaje).trim());

    const htmlNegocio = shell(`
      ${topBanner(
        "Nuevo contacto",
        "Nuevo mensaje recibido",
        "Se ha enviado una solicitud desde el formulario de contacto web."
      )}

      ${cardStart()}
        <table
          role="presentation"
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="0"
          style="padding:24px 32px;"
        >
          <tr>
            <td>
              <h2
                style="
                  margin:0 0 8px 0;
                  font-size:20px;
                  color:#0f172a;
                  font-weight:700;
                "
              >
                ${safeNombre}
              </h2>

              <p
                style="
                  margin:0;
                  font-size:14px;
                  line-height:1.6;
                  color:#475569;
                "
              >
                Un usuario solicita información o asistencia a través del portal.
              </p>

              ${metaGrid([
                { label: "Nombre", value: String(nombre).trim() },
                {
                  label: "Correo",
                  value: String(email).trim(),
                  href: `mailto:${String(email).trim()}`,
                },
              ])}
            </td>
          </tr>

          <tr>
            <td style="padding-top:20px;">
              <div
                style="
                  padding:18px;
                  background-color:#faf5ff;
                  border:1px solid #f3e8ff;
                  border-radius:8px;
                "
              >
                <p
                  style="
                    margin:0 0 8px 0;
                    font-size:11px;
                    line-height:1;
                    letter-spacing:0.05em;
                    text-transform:uppercase;
                    font-weight:700;
                    color:#6b21a8;
                  "
                >
                  Mensaje
                </p>

                <p
                  style="
                    margin:0;
                    font-size:14px;
                    line-height:1.7;
                    color:#334155;
                  "
                >
                  ${safeMessage}
                </p>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding-top:20px;">
              <a
                href="mailto:${safeEmail}"
                style="
                  display:inline-block;
                  padding:12px 20px;
                  background-color:#7c3aed;
                  color:#ffffff;
                  text-decoration:none;
                  font-size:14px;
                  font-weight:600;
                  border-radius:6px;
                "
              >
                Responder a ${safeEmail}
              </a>
            </td>
          </tr>
        </table>
      ${cardEnd()}

      ${footerBlock()}
    `);

    const htmlUsuario = shell(`
      ${topBanner(
        "Mensaje recibido",
        "¡Gracias por contactarnos!",
        "Hemos recibido tu mensaje y nos pondremos en contacto contigo lo antes posible."
      )}

      ${cardStart()}
        <table
          role="presentation"
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="0"
          style="padding:24px 32px;"
        >
          <tr>
            <td>
              <h2
                style="
                  margin:0 0 8px 0;
                  font-size:20px;
                  color:#0f172a;
                  font-weight:700;
                "
              >
                Hola, ${safeNombre}
              </h2>

              <p
                style="
                  margin:0;
                  font-size:15px;
                  line-height:1.6;
                  color:#475569;
                "
              >
                Tu mensaje ha sido registrado exitosamente en nuestro sistema. A continuación encontrarás un resumen de los datos enviados:
              </p>

              ${metaGrid([
                {
                  label: "Correo registrado",
                  value: String(email).trim(),
                  href: `mailto:${String(email).trim()}`,
                },
                { label: "Sitio web", value: BRAND_NAME, href: BRAND_URL },
              ])}
            </td>
          </tr>

          <tr>
            <td style="padding-top:20px;">
              <div
                style="
                  padding:18px;
                  background-color:#faf5ff;
                  border:1px solid #f3e8ff;
                  border-radius:8px;
                "
              >
                <p
                  style="
                    margin:0 0 8px 0;
                    font-size:11px;
                    line-height:1;
                    letter-spacing:0.05em;
                    text-transform:uppercase;
                    font-weight:700;
                    color:#6b21a8;
                  "
                >
                  Copia de tu mensaje
                </p>

                <p
                  style="
                    margin:0;
                    font-size:14px;
                    line-height:1.7;
                    color:#334155;
                  "
                >
                  ${safeMessage}
                </p>
              </div>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding-top:28px;">
              <a
                href="${BRAND_URL}"
                style="
                  display:inline-block;
                  padding:12px 24px;
                  background-color:#7c3aed;
                  color:#ffffff;
                  text-decoration:none;
                  font-size:14px;
                  font-weight:600;
                  border-radius:6px;
                "
              >
                Volver a ${BRAND_NAME}
              </a>
            </td>
          </tr>
        </table>
      ${cardEnd()}

      ${footerBlock()}
    `);

    await Promise.all([
      resend.emails.send({
        from: `Orvex.art <${SUPPORT_EMAIL}>`,
        to: [SUPPORT_EMAIL],
        replyTo: String(email).trim(),
        subject: `Nuevo mensaje web: ${String(nombre).trim()}`,
        html: htmlNegocio,
      }),

      resend.emails.send({
        from: `Orvex.art <${SUPPORT_EMAIL}>`,
        to: [String(email).trim()],
        subject: "Hemos recibido tu mensaje - Orvex.art",
        html: htmlUsuario,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("❌ Error enviando correos:", error);

    return NextResponse.json(
      {
        error: error?.message || "Error al procesar la solicitud",
      },
      { status: 500 }
    );
  }
}