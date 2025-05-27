"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Trophy,
  Users,
  DollarSign,
  Zap,
  Shield,
  MessageCircle,
  Play,
  ArrowRight,
  Crown,
  Target,
  Gift,
} from "lucide-react"
import Link from "next/link" // Asegúrate de que este import esté presente

export default function HomePage() {
  const [hasError, setHasError] = useState(false)

  // Safe tournament data with validation
  const featuredTournaments = [
    {
      id: 1,
      name: "Copa Básica - Tarde",
      type: "basic",
      entryFee: 2500,
      players: 45,
      maxPlayers: 64,
      startTime: "2024-01-15T18:00:00",
      status: "open",
    },
    {
      id: 2,
      name: "Copa VIP - Premium",
      type: "vip",
      entryFee: 5000,
      players: 28,
      maxPlayers: 32,
      startTime: "2024-01-15T20:00:00",
      status: "filling",
    },
    {
      id: 3,
      name: "Copa Básica - Noche",
      type: "basic",
      entryFee: 2500,
      players: 38,
      maxPlayers: 64,
      startTime: "2024-01-15T21:00:00",
      status: "open",
    },
  ]

  const calculatePrizePool = (players: number, entryFee: number) => {
    try {
      // Verificar que los parámetros sean números válidos
      const safePlayersCount = typeof players === "number" && Number.isFinite(players) ? players : 0
      const safeEntryFee = typeof entryFee === "number" && Number.isFinite(entryFee) ? entryFee : 0

      if (safePlayersCount <= 0 || safeEntryFee <= 0) {
        return { totalPool: 0, prizePool: 0 }
      }

      const totalPool = safePlayersCount * safeEntryFee
      const prizePool = totalPool * 0.7

      return { totalPool, prizePool }
    } catch (error) {
      console.error("Error en calculatePrizePool:", error)
      return { totalPool: 0, prizePool: 0 }
    }
  }

  const stats = [
    { label: "Jugadores Activos", value: "15,234", icon: Users },
    { label: "Torneos Diarios", value: "50+", icon: Trophy },
    { label: "Premios Entregados", value: "$125,000", icon: DollarSign },
    { label: "Partidas Jugadas", value: "2.1M", icon: Play },
  ]

  // Error boundary
  if (hasError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Algo salió mal</h1>
          <p className="text-gray-300 mb-4">Por favor, recarga la página</p>
          <button onClick={() => window.location.reload()} className="bg-yellow-500 text-black px-4 py-2 rounded">
            Recargar
          </button>
        </div>
      </div>
    )
  }

  try {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        {/* Header */}
        <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">TuttiFrutti Pro</h1>
                  <p className="text-xs text-gray-300">Torneos & Premios</p>
                </div>
              </div>

              <nav className="hidden md:flex items-center space-x-8">
                <Link href="/tournaments" className="text-gray-300 hover:text-white transition-colors">
                  Torneos
                </Link>
                <Link href="/leaderboard" className="text-gray-300 hover:text-white transition-colors">
                  Ranking
                </Link>
                <Link href="/how-to-play" className="text-gray-300 hover:text-white transition-colors">
                  Cómo Jugar
                </Link>
              </nav>

              <div className="flex items-center space-x-4">
                <Link href="/login">
                  <Button variant="ghost" className="text-white hover:bg-white/10 border border-white/20">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold">
                    Registrarse
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-8 max-w-4xl mx-auto">
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold px-4 py-2">
                🏆 ¡Nuevo! Torneos con Premios Reales
              </Badge>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Compite en
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  {" "}
                  Tutti Frutti
                </span>
                <br />y Gana Premios
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                Únete a torneos diarios, compite contra jugadores de todo el mundo y gana premios reales. El clásico
                juego de palabras ahora con premios increíbles.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="text-lg px-8 py-6 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold"
                  >
                    <Play className="mr-2 w-5 h-5" />
                    Comenzar a Jugar
                  </Button>
                </Link>
                <Link href="/tournaments">
                  <Button
                    size="lg"
                    className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    Ver Torneos
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <stat.icon className="w-6 h-6 text-yellow-400" />
                    </div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Tournaments */}
        <section id="tournaments" className="py-20 bg-black/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl font-bold text-white">Torneos Destacados</h2>
              <p className="text-xl text-gray-300">Únete ahora y compite por premios increíbles</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {featuredTournaments.map((tournament) => {
                // Safe tournament data validation
                if (!tournament || typeof tournament !== "object") {
                  console.warn("Invalid tournament data:", tournament)
                  return null
                }

                const safeId = tournament.id || Math.random()
                const safeName = tournament.name || "Torneo Sin Nombre"
                const safeType = tournament.type || "basic"
                const safeEntryFee = typeof tournament.entryFee === "number" ? tournament.entryFee : 0
                const safePlayers = typeof tournament.players === "number" ? tournament.players : 0
                const safeMaxPlayers = typeof tournament.maxPlayers === "number" ? tournament.maxPlayers : 1
                const safeStatus = tournament.status || "closed"

                const prizes = calculatePrizePool(safePlayers, safeEntryFee)

                return (
                  <Card
                    key={safeId}
                    className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-white text-xl">{safeName}</CardTitle>
                          <CardDescription className="text-gray-300">Lunes 20:00 HS</CardDescription>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                          <Badge className={`${safeStatus === "open" ? "bg-green-500" : "bg-yellow-500"} text-white`}>
                            {safeStatus === "open" ? "Abierto" : "Llenándose"}
                          </Badge>
                          <Badge className={`${safeType === "vip" ? "bg-purple-500" : "bg-blue-500"} text-white`}>
                            {safeType === "vip" ? "VIP" : "BÁSICA"}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-lg p-3">
                        <div className="text-center">
                          <p className="text-sm text-gray-300">Pozo Acumulado</p>
                          <p className="text-2xl font-bold text-green-400">
                            ${Math.floor(prizes.prizePool).toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-400">{safePlayers} jugadores</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-center">
                          <p className="text-lg font-semibold text-green-400">${safeEntryFee.toLocaleString()}</p>
                          <p className="text-xs text-gray-400">Inscripción</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-white">
                            {safePlayers}/{safeMaxPlayers}
                          </p>
                          <p className="text-xs text-gray-400">Jugadores</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-yellow-400">
                            ${Math.floor(prizes.prizePool * 0.6).toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-400">1er Premio</p>
                        </div>
                      </div>

                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all"
                          style={{ width: `${Math.min((safePlayers / safeMaxPlayers) * 100, 100)}%` }}
                        ></div>
                      </div>

                      <Link href={`/payment/${safeId}`}>
                        <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold">
                          Unirse al Torneo
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="text-center mt-12">
              <Link href="/tournaments">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  Ver Todos los Torneos
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl font-bold text-white">¿Por Qué Elegir TuttiFrutti Pro?</h2>
              <p className="text-xl text-gray-300">La mejor experiencia de juego competitivo</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-white">Premios Reales</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-center">
                    Gana premios reales compitiendo en torneos. Retiros rápidos y seguros.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-white">Tiempo Real</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-center">
                    Juega en tiempo real contra oponentes de todo el mundo. Sin esperas, pura emoción.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-white">Chat Social</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-center">
                    Conecta con otros jugadores, forma equipos y disfruta de la experiencia social.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-white">Juego Justo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-center">
                    Sistema anti-trampa avanzado y moderación 24/7 para garantizar competencia justa.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-white">Múltiples Formatos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-center">
                    Torneos eliminatorios, ligas, duelos 1v1 y más formatos para todos los gustos.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gift className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-white">Bonos Diarios</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-center">
                    Recibe bonos diarios, recompensas por racha y promociones especiales.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-yellow-500 to-orange-500">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl font-bold text-black">¿Listo para Ganar?</h2>
              <p className="text-xl text-black/80">
                Únete a miles de jugadores que ya están ganando premios jugando Tutti Frutti. Regístrate gratis y recibe
                $5 de bono de bienvenida.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" className="text-lg px-8 py-6 bg-black text-white hover:bg-gray-800">
                    <Crown className="mr-2 w-5 h-5" />
                    Registrarse Gratis
                  </Button>
                </Link>
                <Link href="/how-to-play">
                  <Button
                    size="lg"
                    className="text-lg px-8 py-6 bg-green-500 text-white hover:bg-green-600" // Aquí está el cambio
                  >
                    Cómo Funciona
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-black/60">🎁 Bono de $5 • 🔒 Pagos Seguros • ⚡ Retiros Instantáneos</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black/40 border-t border-white/10 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white">TuttiFrutti Pro</span>
                </div>
                <p className="text-gray-400">La plataforma líder de torneos de Tutti Frutti con premios reales.</p>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-4">Juego</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link href="/tournaments" className="hover:text-white transition-colors">
                      Torneos
                    </Link>
                  </li>
                  <li>
                    <Link href="/leaderboard" className="hover:text-white transition-colors">
                      Ranking
                    </Link>
                  </li>
                  <li>
                    <Link href="/how-to-play" className="hover:text-white transition-colors">
                      Cómo Jugar
                    </Link>
                  </li>
                  <li>
                    <Link href="/practice" className="hover:text-white transition-colors">
                      Práctica
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-4">Soporte</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link href="/help" className="hover:text-white transition-colors">
                      Centro de Ayuda
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-white transition-colors">
                      Contacto
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="hover:text-white transition-colors">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/security" className="hover:text-white transition-colors">
                      Seguridad
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-4">Legal</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link href="/terms" className="hover:text-white transition-colors">
                      Términos
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="hover:text-white transition-colors">
                      Privacidad
                    </Link>
                  </li>
                  <li>
                    <Link href="/responsable" className="hover:text-white transition-colors">
                      Juego Responsable
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} TuttiFrutti Pro. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    )
  } catch (error) {
    console.error("Error al renderizar la página de inicio:", error)
    setHasError(true)
    return null
  }
}
