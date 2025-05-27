import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Link href="/" className="text-white/70 hover:text-white mr-4">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white">Política de Privacidad</h1>
              <p className="text-xs text-gray-300">Última actualización: Enero 2024</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
        <div className="bg-white/10 border-white/20 backdrop-blur-sm rounded-lg p-8">
          <div className="prose prose-invert max-w-none">
            <h1 className="text-3xl font-bold text-white mb-8">Política de Privacidad</h1>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">1. Información que Recopilamos</h2>
              <p className="text-gray-300 mb-4">Recopilamos la siguiente información:</p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li>Información de registro (nombre de usuario, email)</li>
                <li>Datos de juego y estadísticas</li>
                <li>Información de pago para procesamiento de premios</li>
                <li>Datos de uso y navegación</li>
                <li>Comunicaciones en el chat (moderadas por seguridad)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">2. Cómo Utilizamos su Información</h2>
              <p className="text-gray-300 mb-4">Utilizamos su información para:</p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li>Proporcionar y mejorar nuestros servicios</li>
                <li>Procesar pagos y premios</li>
                <li>Comunicarnos con usted sobre su cuenta</li>
                <li>Prevenir fraude y garantizar la seguridad</li>
                <li>Cumplir con obligaciones legales</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">3. Compartir Información</h2>
              <p className="text-gray-300 mb-4">
                No vendemos ni alquilamos su información personal. Podemos compartir información con:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li>Proveedores de servicios de pago</li>
                <li>Autoridades legales cuando sea requerido</li>
                <li>Socios de seguridad para prevenir fraude</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">4. Seguridad de Datos</h2>
              <p className="text-gray-300 mb-4">
                Implementamos medidas de seguridad técnicas y organizativas para proteger su información:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li>Encriptación SSL para todas las transmisiones</li>
                <li>Almacenamiento seguro de datos</li>
                <li>Acceso limitado a información personal</li>
                <li>Monitoreo regular de seguridad</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">5. Sus Derechos</h2>
              <p className="text-gray-300 mb-4">Usted tiene derecho a:</p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li>Acceder a su información personal</li>
                <li>Corregir datos inexactos</li>
                <li>Solicitar la eliminación de su cuenta</li>
                <li>Oponerse al procesamiento de datos</li>
                <li>Portabilidad de datos</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">6. Cookies y Tecnologías Similares</h2>
              <p className="text-gray-300 mb-4">
                Utilizamos cookies para mejorar su experiencia, recordar preferencias y analizar el uso del sitio. Puede
                gestionar las cookies a través de la configuración de su navegador.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">7. Retención de Datos</h2>
              <p className="text-gray-300 mb-4">
                Conservamos su información personal durante el tiempo necesario para cumplir con los propósitos
                descritos en esta política, a menos que la ley requiera un período de retención más largo.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">8. Menores de Edad</h2>
              <p className="text-gray-300 mb-4">
                Nuestros servicios están dirigidos a usuarios mayores de 18 años. No recopilamos intencionalmente
                información de menores de edad.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">9. Cambios a esta Política</h2>
              <p className="text-gray-300 mb-4">
                Podemos actualizar esta política de privacidad ocasionalmente. Le notificaremos sobre cambios
                significativos a través de nuestro sitio web o por email.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">10. Contacto</h2>
              <p className="text-gray-300 mb-4">
                Para preguntas sobre esta política de privacidad, contáctanos en: privacy@tuttifruttipro.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
