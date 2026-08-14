"use client";

import { useLocale } from "next-intl";
import LegalStyle from "@/components/layout/LegalStyle";

function LegalEs() {
  return (
    <div className="legal-container">
      <LegalStyle />
      <section>
        <h1>Aviso de Privacidad</h1>

        <h2>I. ¿Quiénes somos?</h2>
        <ul>
          <li><strong>Denominación legal:</strong> CODEWAVE TECHNOLOGIES, S.A. DE C.V.</li>
          <li><strong>Marca comercial:</strong> Orvex.art</li>
          <li><strong>Giro principal:</strong> Venta de equipos de cómputo, accesorios y tecnología.</li>
          <li><strong>Canal digital:</strong> orvexart.com.mx</li>
          <li><strong>Contacto especializado:</strong> asistencia@orvexart.com.mx</li>
        </ul>
        <p>Nos especializamos en computadoras de escritorio y portátiles, componentes de cómputo, accesorios tecnológicos y gaming, software y servicios de configuración.</p>

        <h2>II. ¿Qué información recopilamos?</h2>
        <ul>
          <li><strong>Datos de compras:</strong> nombre, dirección de entrega, teléfono, correo electrónico, datos fiscales.</li>
          <li><strong>Datos de navegación:</strong> páginas visitadas, carrito de compras, dispositivo y navegador utilizado, ubicación aproximada.</li>
          <li><strong>Datos de soporte:</strong> descripción de problemas, modelo y número de serie del producto, fecha de compra, historial de consultas previas.</li>
        </ul>

        <h2>III. ¿Para qué usamos su información?</h2>
        <ul>
          <li><strong>Proceso de compra:</strong> validar pedidos, procesar pagos, coordinar envíos y dar seguimiento hasta la entrega.</li>
          <li><strong>Mejora de servicios:</strong> analizar productos más populares, optimizar navegación, personalizar ofertas y medir la satisfacción del cliente.</li>
          <li><strong>Comunicaciones obligatorias:</strong> confirmaciones, facturas, garantías y avisos de servicio.</li>
          <li><strong>Comunicaciones secundarias (con consentimiento):</strong> promociones, encuestas y prospección comercial.</li>
        </ul>

        <h2>IV. ¿Con quién compartimos sus datos?</h2>
        <ul>
          <li><strong>Paquetería:</strong> datos de entrega necesarios para envío.</li>
          <li><strong>Procesadores de pago:</strong> datos de transacción para cobros seguros.</li>
          <li><strong>Fabricantes/distribuidores:</strong> información técnica para soporte o garantías.</li>
          <li><strong>Autoridades:</strong> únicamente cuando la ley lo requiera.</li>
        </ul>
        <p>Nunca compartimos datos con competidores, telemarketing, brokers comerciales ni terceros sin su consentimiento expreso.</p>

        <h2>V. ¿Cuáles son sus derechos como cliente?</h2>
        <p>Usted tiene derecho a:</p>
        <ul>
          <li><strong>Acceso:</strong> conocer qué datos tenemos y cómo los usamos.</li>
          <li><strong>Rectificación:</strong> corregir información inexacta o desactualizada.</li>
          <li><strong>Cancelación:</strong> eliminar datos no necesarios, salvo los exigidos por ley.</li>
          <li><strong>Oposición:</strong> limitar el uso de sus datos para fines comerciales o de análisis.</li>
        </ul>
        <p><strong>Cómo ejercerlos:</strong></p>
        <p>Envíe un correo a asistencia@orvexart.com.mx con identificación oficial y descripción del derecho que desea ejercer. Tiempo de respuesta: máximo 20 días hábiles.</p>

        <h2>VI. ¿Qué pasa con las cookies y la navegación?</h2>
        <ul>
          <li><strong>Esenciales:</strong> necesarias para carrito y sesión, se eliminan al cerrar navegador.</li>
          <li><strong>Rendimiento:</strong> miden velocidad y funcionamiento, vigencia hasta 12 meses.</li>
          <li><strong>Personalización:</strong> recuerdan preferencias y productos vistos, vigencia hasta 24 meses.</li>
        </ul>
        <p>El usuario puede aceptar todas, rechazar las no esenciales o configurarlas desde su navegador en cualquier momento.</p>

        <h2>VII. ¿Por cuánto tiempo conservamos su información?</h2>
        <ul>
          <li><strong>Clientes activos:</strong> durante la relación comercial + 12 meses.</li>
          <li><strong>Transacciones fiscales:</strong> 5 años (según ley).</li>
          <li><strong>Datos de pago:</strong> eliminados al procesarse la transacción.</li>
          <li><strong>Soporte técnico:</strong> 2 años tras la resolución.</li>
          <li><strong>Navegación:</strong> hasta 12 meses.</li>
          <li><strong>Garantías:</strong> durante su vigencia + 6 meses.</li>
        </ul>
        <p>Los datos se eliminan automáticamente al cumplirse el periodo, cuando dejan de ser necesarios o cuando usted lo solicite (si procede).</p>

        <h2>VIII. ¿Qué ocurre con los menores de edad?</h2>
        <ul>
          <li>En caso de detectar datos de menores sin autorización, serán eliminados de inmediato.</li>
        </ul>

        <h2>IX. ¿Cuándo cambia este aviso?</h2>
        <p>Podemos actualizar este aviso en cualquier momento por: cambios en la ley, nuevos servicios, mejoras de seguridad o requerimientos de autoridad.</p>
        <p>Usted puede aceptar los cambios, oponerse a finalidades específicas o cancelar su cuenta si no está de acuerdo.</p>

        <h2>X. ¿Cómo puede contactarnos?</h2>
        <ul>
          <li><strong>Correo electrónico:</strong> asistencia@orvexart.com.mx (asunto: “Privacidad”).</li>
          <li><strong>Horario de atención:</strong> lunes a viernes, 9:00 – 18:00 hrs.</li>
          <li><strong>Tiempo de respuesta:</strong> máximo 48 horas.</li>
        </ul>
        <p><strong>Autoridad de control:</strong> Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI). Portal: www.inai.org.mx | Teléfono: 55-5004-2400</p>
        <p>Este aviso cumple con la Ley Federal de Protección de Datos Personales en Posesión de Particulares y su Reglamento, aplicables en México.</p>

        <p>Tienda en línea: orvexart.com.mx</p>
        <p>Soporte: asistencia@orvexart.com.mx</p>
      </section>
    </div>
  );
}

function LegalEn() {
  return (
    <div className="legal-container">
      <LegalStyle />
      <section>
        <h1>Privacy Notice</h1>

        <h2>I. Who are we?</h2>
        <ul>
          <li><strong>Legal name:</strong> CODEWAVE TECHNOLOGIES, S.A. DE C.V.</li>
          <li><strong>Trademark:</strong> Orvex.art</li>
          <li><strong>Main business:</strong> Sale of computer equipment, accessories and technology.</li>
          <li><strong>Digital channel:</strong> orvexart.com.mx</li>
          <li><strong>Specialized contact:</strong> asistencia@orvexart.com.mx</li>
        </ul>
        <p>We specialize in desktop and laptop computers, computer components, technology and gaming accessories, software and configuration services.</p>

        <h2>II. What information do we collect?</h2>
        <ul>
          <li><strong>Purchase data:</strong> name, shipping address, phone number, email, tax information.</li>
          <li><strong>Browsing data:</strong> pages visited, shopping cart, device and browser used, approximate location.</li>
          <li><strong>Support data:</strong> problem description, product model and serial number, purchase date, history of previous inquiries.</li>
        </ul>

        <h2>III. How do we use your information?</h2>
        <ul>
          <li><strong>Purchase process:</strong> validate orders, process payments, coordinate shipments and provide follow-up until delivery.</li>
          <li><strong>Service improvement:</strong> analyze most popular products, optimize navigation, personalize offers and measure customer satisfaction.</li>
          <li><strong>Mandatory communications:</strong> confirmations, invoices, warranties and service notices.</li>
          <li><strong>Secondary communications (with consent):</strong> promotions, surveys and commercial prospecting.</li>
        </ul>

        <h2>IV. Who do we share your data with?</h2>
        <ul>
          <li><strong>Courier companies:</strong> delivery data necessary for shipping.</li>
          <li><strong>Payment processors:</strong> transaction data for secure payments.</li>
          <li><strong>Manufacturers/distributors:</strong> technical information for support or warranties.</li>
          <li><strong>Authorities:</strong> only when required by law.</li>
        </ul>
        <p>We never share data with competitors, telemarketing companies, commercial brokers or third parties without your express consent.</p>

        <h2>V. What are your rights as a customer?</h2>
        <p>You have the right to:</p>
        <ul>
          <li><strong>Access:</strong> know what data we have and how we use it.</li>
          <li><strong>Rectification:</strong> correct inaccurate or outdated information.</li>
          <li><strong>Cancellation:</strong> delete unnecessary data, except those required by law.</li>
          <li><strong>Objection:</strong> limit the use of your data for commercial or analytical purposes.</li>
        </ul>
        <p><strong>How to exercise them:</strong></p>
        <p>Send an email to asistencia@orvexart.com.mx with official identification and a description of the right you wish to exercise. Response time: maximum 20 business days.</p>

        <h2>VI. What about cookies and browsing?</h2>
        <ul>
          <li><strong>Essential:</strong> necessary for cart and session, deleted when closing the browser.</li>
          <li><strong>Performance:</strong> measure speed and functionality, valid for up to 12 months.</li>
          <li><strong>Personalization:</strong> remember preferences and viewed products, valid for up to 24 months.</li>
        </ul>
        <p>The user can accept all, reject non-essential ones or configure them from their browser at any time.</p>

        <h2>VII. How long do we keep your information?</h2>
        <ul>
          <li><strong>Active customers:</strong> during the commercial relationship + 12 months.</li>
          <li><strong>Tax transactions:</strong> 5 years (as per law).</li>
          <li><strong>Payment data:</strong> deleted once the transaction is processed.</li>
          <li><strong>Technical support:</strong> 2 years after resolution.</li>
          <li><strong>Browsing:</strong> up to 12 months.</li>
          <li><strong>Warranties:</strong> during their validity period + 6 months.</li>
        </ul>
        <p>Data is automatically deleted when the period ends, when it is no longer necessary, or when you request it (if applicable).</p>

        <h2>VIII. What about minors?</h2>
        <ul>
          <li>If we detect data from minors without authorization, it will be deleted immediately.</li>
        </ul>

        <h2>IX. When does this notice change?</h2>
        <p>We may update this notice at any time due to: changes in the law, new services, security improvements or authority requirements.</p>
        <p>You may accept the changes, object to specific purposes or cancel your account if you do not agree.</p>

        <h2>X. How can you contact us?</h2>
        <ul>
          <li><strong>Email:</strong> asistencia@orvexart.com.mx (subject: "Privacy").</li>
          <li><strong>Business hours:</strong> Monday to Friday, 9:00 AM – 6:00 PM.</li>
          <li><strong>Response time:</strong> maximum 48 hours.</li>
        </ul>
        <p><strong>Control authority:</strong> Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI). Portal: www.inai.org.mx | Phone: 55-5004-2400</p>
        <p>This notice complies with the Mexican Federal Law on the Protection of Personal Data Held by Private Parties and its Regulations.</p>

        <p>Online store: orvexart.com.mx</p>
        <p>Support: asistencia@orvexart.com.mx</p>
      </section>

    </div>
  );
}

export default function LegalPage() {
  const locale = useLocale();

  return (
    <div className="min-h-screen flex flex-col bg-white">

      <main className="flex-grow container mx-auto py-6 max-w-6xl px-6">
        {locale === "es" ? <LegalEs /> : <LegalEn />}
      </main>

    </div>
  );
}