import { ArrowLeft, Shield, Clock, Users, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function ResponsibleGamingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Link href="/" className="text-white/70 hover:text-white mr-4">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white">Juego Responsable</h1>
              <p className="text-xs text-gray-300">Tu bienestar es nuestra prioridad</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
        <div className="bg-white/10 border-white/20 backdrop-blur-sm rounded-lg p-8">
          <div className="prose prose-invert max-w-none">
            <h1 className="text-3xl font-bold text-white mb-8">Juego Responsable</h1>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Nuestro Compromiso</h2>
              <p className="text-gray-300 mb-4">
                En TuttiFrutti Pro, creemos que el juego debe ser una experiencia divertida y segura. Estamos
                comprometidos a promover el juego responsable y proporcionar herramientas para ayudar a nuestros
                usuarios a mantener el control.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Señales de Advertencia</h2>
              <p className="text-gray-300 mb-4">
                Es importante reconocer las señales que pueden indicar un problema con el juego:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li>Gastar más tiempo o dinero del planeado</li>
                <li>Jugar para escapar de problemas o sentimientos negativos</li>
                <li>Mentir sobre el tiempo o dinero gastado en juegos</li>
                <li>Descuidar responsabilidades familiares, laborales o sociales</li>
                <li>Intentar recuperar pérdidas con más juego</li>
                <li>Sentirse ansioso o irritable cuando no se puede jugar</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Herramientas de Control</h2>
              <p className="text-gray-300 mb-4">
                Ofrecemos las siguientes herramientas para ayudarte a jugar de manera responsable:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="border border-white/20 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <Clock className="w-6 h-6 text-blue-400 mr-2" />
                    <h3 className="text-white font-semibold">Límites de Tiempo</h3>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Establece límites diarios, semanales o mensuales para el tiempo de juego.
                  </p>
                </div>

                <div className="border border-white/20 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <Shield className="w-6 h-6 text-green-400 mr-2" />
                    <h3 className="text-white font-semibold">Límites de Depósito</h3>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Controla cuánto dinero puedes depositar en períodos específicos.
                  </p>
                </div>

                <div className="border border-white/20 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <Users className="w-6 h-6 text-purple-400 mr-2" />
                    <h3 className="text-white font-semibold">Auto-exclusión</h3>
                  </div>
                  <p className="text-gray-300 text-sm">Suspende temporalmente tu cuenta por el período que elijas.</p>
                </div>

                <div className="border border-white/20 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <AlertTriangle className="w-6 h-6 text-yellow-400 mr-2" />
                    <h3 className="text-white font-semibold">Recordatorios</h3>
                  </div>
                  <p className="text-gray-300 text-sm">Recibe notificaciones sobre tu tiempo de juego y gastos.</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Consejos para Jugar de Manera Responsable</h2>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li>Establece un presupuesto antes de jugar y respétalo</li>
                <li>Nunca juegues con dinero que no puedes permitirte perder</li>
                <li>Toma descansos regulares durante las sesiones de juego</li>
                <li>No juegues cuando estés molesto, deprimido o bajo la influencia</li>
                <li>Mantén un equilibrio entre el juego y otras actividades</li>
                <li>Busca ayuda si sientes que estás perdiendo el control</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Recursos de Ayuda</h2>
              <p className="text-gray-300 mb-4">
                Si necesitas ayuda o apoyo relacionado con el juego, estos recursos están disponibles:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li>Línea Nacional de Ayuda para Ludopatía: 1-800-522-4700</li>
                <li>Jugadores Anónimos: www.jugadoresanonimos.org</li>
                <li>Centro Nacional de Juego Responsable: www.ncpgambling.org</li>
                <li>Nuestro equipo de soporte: support@tuttifruttipro.com</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Protección de Menores</h2>
              <p className="text-gray-300 mb-4">
                Nuestros servicios están estrictamente prohibidos para menores de 18 años. Implementamos medidas para
                verificar la edad y prevenir el acceso de menores:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                <li>Verificación de edad durante el registro</li>
                <li>Monitoreo continuo de cuentas sospechosas</li>
                <li>Cooperación con padres y tutores</li>
                <li>Educación sobre los riesgos del juego</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Configurar Límites</h2>
              <p className="text-gray-300 mb-4">
                Para configurar límites en tu cuenta, inicia sesión y ve a la sección "Juego Responsable" en tu perfil.
                Los límites entran en vigor inmediatamente y solo pueden ser aumentados después de un período de
                reflexión de 24 horas.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Contacto</h2>
              <p className="text-gray-300 mb-4">
                Si tienes preguntas sobre juego responsable o necesitas ayuda para configurar límites, contáctanos en:
                responsible@tuttifruttipro.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
