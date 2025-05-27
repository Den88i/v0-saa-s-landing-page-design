"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Trophy, Users, Clock, CreditCard, Shield, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function PaymentPage({ params }: { params: { tournamentId: string } }) {
  const [isLoading, setIsLoading] = useState(false)

  // Datos del torneo (en producción vendrían de la API)
  const tournament = {
    id: params.tournamentId,
    name:
      params.tournamentId === "1"
        ? "Copa Básica - Tarde"
        : params.tournamentId === "3"
          ? "Copa VIP - Premium"
          : "Copa Básica - Tarde",
    description:
      params.tournamentId === "3" ? "Sala VIP para jugadores experimentados" : "Sala básica para todos los jugadores",
    type: params.tournamentId === "3" ? "vip" : "basic",
    entryFee: params.tournamentId === "3" ? 5000 : 2500,
    players: params.tournamentId === "3" ? 28 : 45,
    maxPlayers: params.tournamentId === "3" ? 32 : 64,
    startTime: "2024-01-15T20:00:00",
    duration: "2.5 horas",
    format: "Eliminación",
    difficulty: params.tournamentId === "3" ? "Pro" : "Intermedio",
  }

  const calculatePrizePool = (players: number, entryFee: number) => {
    const totalPool = players * entryFee
    const adminCommission = totalPool * 0.3
    const prizePool = totalPool * 0.7

    return {
      totalPool,
      adminCommission,
      prizePool,
      firstPlace: prizePool * 0.6,
      secondPlace: prizePool * 0.3,
      thirdPlace: prizePool * 0.1,
    }
  }

  const prizes = calculatePrizePool(tournament.players, tournament.entryFee)

  const handlePayment = async () => {
    setIsLoading(true)

    try {
      // Crear preferencia de pago
      const response = await fetch("/api/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tournamentId: tournament.id,
          tournamentName: tournament.name,
          amount: tournament.entryFee,
        }),
      })

      const data = await response.json()

      if (data.initPoint) {
        // Redirigir a MercadoPago
        window.location.href = data.initPoint
      } else {
        throw new Error("Error al crear la preferencia de pago")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Error al procesar el pago. Intenta de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Link href="/tournaments" className="text-white/70 hover:text-white mr-4">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white">Pago del Torneo</h1>
              <p className="text-xs text-gray-300">Confirma tu inscripción</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Tournament Details */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
                Detalles del Torneo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white">{tournament.name}</h3>
                <p className="text-gray-300">{tournament.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
                  <p className="text-lg font-bold text-green-400">${Math.floor(prizes.prizePool).toLocaleString()}</p>
                  <p className="text-xs text-gray-400">Pozo Total</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <Users className="w-6 h-6 text-blue-400 mx-auto mb-1" />
                  <p className="text-lg font-bold text-white">
                    {tournament.players}/{tournament.maxPlayers}
                  </p>
                  <p className="text-xs text-gray-400">Jugadores</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-3">Distribución de Premios</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">🥇 1er Lugar (60%):</span>
                    <span className="text-yellow-400 font-bold">${Math.floor(prizes.firstPlace).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">🥈 2do Lugar (30%):</span>
                    <span className="text-gray-400 font-bold">${Math.floor(prizes.secondPlace).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">🥉 3er Lugar (10%):</span>
                    <span className="text-amber-600 font-bold">${Math.floor(prizes.thirdPlace).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Inicio:</span>
                  <span className="text-white">
                    {new Date(tournament.startTime).toLocaleDateString("es-ES", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duración:</span>
                  <span className="text-white">{tournament.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Formato:</span>
                  <span className="text-white">{tournament.format}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Dificultad:</span>
                  <Badge className="bg-red-500 text-white">{tournament.difficulty}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Details */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CreditCard className="w-6 h-6 mr-2 text-green-400" />
                Resumen de Pago
              </CardTitle>
              <CardDescription className="text-gray-300">Confirma los detalles de tu inscripción</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Inscripción {tournament.type === "vip" ? "VIP" : "Básica"}:</span>
                  <span className="text-white">${tournament.entryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Comisión de plataforma:</span>
                  <span className="text-white">Incluida</span>
                </div>
                <Separator className="bg-white/20" />
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-white">Total a pagar:</span>
                  <span className="text-green-400">${tournament.entryFee.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="text-white font-semibold">
                      Pozo Actual: ${Math.floor(prizes.prizePool).toLocaleString()}
                    </h4>
                    <p className="text-sm text-gray-300 mt-1">
                      Con tu inscripción, el pozo aumentará a $
                      {Math.floor(
                        calculatePrizePool(tournament.players + 1, tournament.entryFee).prizePool,
                      ).toLocaleString()}
                    </p>
                    <ul className="text-sm text-gray-300 mt-2 space-y-1">
                      <li>
                        • Sala {tournament.type === "vip" ? "VIP" : "Básica"} - {tournament.difficulty}
                      </li>
                      <li>• Premios garantizados para top 3</li>
                      <li>• Pozo crece con cada inscripción</li>
                      <li>• Pago inmediato al finalizar</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={handlePayment}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-6 text-lg"
                >
                  {isLoading ? (
                    "Procesando..."
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Pagar con MercadoPago
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                  <Shield className="w-4 h-4" />
                  <span>Pago seguro procesado por MercadoPago</span>
                </div>
              </div>

              <div className="text-center text-xs text-gray-400">
                <p>Al hacer clic en "Pagar", aceptas nuestros términos y condiciones.</p>
                <p className="mt-1">El pago se procesará de forma segura a través de MercadoPago.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Info */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm mt-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>Pago 100% Seguro</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Procesamiento Instantáneo</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Garantía de Reembolso</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
