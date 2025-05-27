import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Link href="/" className="text-white/70 hover:text-white mr-4">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white">Términos y Condiciones</h1>
              <p className="text-xs text-gray-300">Última actualización: Enero 2024</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
        <div className="bg-white/10 border-white/20 backdrop-blur-sm rounded-lg p-8">
          <div className="prose prose-invert max-w-none">
            <h1 className="text-3xl font-bold text-white mb-8">Términos y Condiciones de Uso</h1>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">1. Aceptación de los Términos</h2>
              <p className="text-gray-300 mb-4">
                Al acceder y utilizar TuttiFrutti Pro, usted acepta estar sujeto a estos términos y condiciones de uso.
                Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro servicio.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">2. Descripción del Servicio</h2>
              <p className="text-gray-300 mb-4">
                TuttiFrutti Pro es una plataforma de juegos en línea que permite a los usuarios participar en torneos de
                Tutti Frutti con premios. El servicio incluye:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li>Participación en torneos competitivos</li>
                <li>Sistema de premios y recompensas</li>
                <li>Chat social entre jugadores</li>
                <li>Ranking y estadísticas</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">3. Registro y Cuenta de Usuario</h2>
              <p className="text-gray-300 mb-4">
                Para utilizar nuestros servicios, debe crear una cuenta proporcionando información precisa y completa.
                Usted es responsable de:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li>Mantener la confidencialidad de su contraseña</li>
                <li>Todas las actividades que ocurran bajo su cuenta</li>
                <li>Notificar inmediatamente cualquier uso no autorizado</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">4. Reglas del Juego</h2>
              <p className="text-gray-300 mb-4">Los usuarios deben:</p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li>Jugar de manera justa y honesta</li>
                <li>No utilizar software automatizado o bots</li>
                <li>Respetar a otros jugadores en el chat</li>
                <li>No intentar manipular o hacer trampa en los juegos</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">5. Pagos y Premios</h2>
              <p className="text-gray-300 mb-4">
                Los premios se otorgan según las reglas específicas de cada torneo. Los retiros están sujetos a:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li>Verificación de identidad</li>
                <li>Cumplimiento de términos y condiciones</li>
                <li>Límites mínimos de retiro</li>
                <li>Procesamiento en 3-5 días hábiles</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">6. Conducta Prohibida</h2>
              <p className="text-gray-300 mb-4">Está prohibido:</p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li>Crear múltiples cuentas</li>
                <li>Compartir cuentas con otros usuarios</li>
                <li>Usar lenguaje ofensivo o inapropiado</li>
                <li>Intentar hackear o comprometer la plataforma</li>
                <li>Participar en actividades fraudulentas</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">7. Suspensión y Terminación</h2>
              <p className="text-gray-300 mb-4">
                Nos reservamos el derecho de suspender o terminar cuentas que violen estos términos. En caso de
                terminación, los fondos restantes serán devueltos según nuestras políticas.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">8. Limitación de Responsabilidad</h2>
              <p className="text-gray-300 mb-4">
                TuttiFrutti Pro no será responsable por daños indirectos, incidentales o consecuentes que resulten del
                uso de nuestros servicios.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">9. Modificaciones</h2>
              <p className="text-gray-300 mb-4">
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán efectivos
                inmediatamente después de su publicación en la plataforma.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">10. Contacto</h2>
              <p className="text-gray-300 mb-4">
                Para preguntas sobre estos términos, contáctanos en: support@tuttifruttipro.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
