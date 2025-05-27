"use client"

import { useEffect, useState, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Trophy, ArrowRight, Home } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const tournamentId = searchParams?.get("tournament") || "1"
  const paymentId = searchParams?.get("payment_id") || `MP-${Date.now()}`
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          // Redirigir automáticamente al torneo
          window.location.href = `/tournament/${tournamentId}`
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [tournamentId])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <Card className="bg-white/10 border-white/20 backdrop-blur-sm max-w-md w-full">
        <CardHeader className="text-center space-y-4">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl text-white">¡Pago Exitoso!</CardTitle>
            <CardDescription className="text-gray-300">Tu inscripción al torneo ha sido confirmada</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 text-center">
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">¡Estás inscrito!</h3>
            <p className="text-sm text-gray-300">
              Recibirás un email de confirmación con todos los detalles del torneo.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-gray-300">
              Serás redirigido automáticamente a la sala del torneo en{" "}
              <span className="text-yellow-400 font-bold">{countdown}</span> segundos
            </p>

            <div className="flex flex-col space-y-3">
              <Link href={`/tournament/${tournamentId}`}>
                <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                  <Trophy className="w-4 h-4 mr-2" />
                  Ir al Torneo Ahora
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              <Link href="/dashboard">
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  <Home className="w-4 h-4 mr-2" />
                  Volver al Dashboard
                </Button>
              </Link>
            </div>
          </div>

          <div className="text-xs text-gray-400">
            <p>ID de Transacción: {paymentId}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
          <div className="text-white">Cargando...</div>
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  )
}
