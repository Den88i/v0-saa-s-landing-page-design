"use client"

import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Home, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

function PaymentPendingContent() {
  const searchParams = useSearchParams()
  const tournamentId = searchParams?.get("tournament") || "1"
  const paymentId = searchParams?.get("payment_id") || `MP-${Date.now()}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <Card className="bg-white/10 border-white/20 backdrop-blur-sm max-w-md w-full">
        <CardHeader className="text-center space-y-4">
          <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto">
            <Clock className="w-12 h-12 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl text-white">Pago Pendiente</CardTitle>
            <CardDescription className="text-gray-300">Tu pago está siendo procesado</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 text-center">
          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Procesando Pago</h3>
            <p className="text-sm text-gray-300">
              Tu pago está siendo verificado. Esto puede tomar unos minutos. Te notificaremos por email cuando esté
              confirmado.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-gray-300">
              Mientras tanto, puedes revisar tu dashboard o explorar otros torneos disponibles.
            </p>

            <div className="flex flex-col space-y-3">
              <Link href="/dashboard">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  <Home className="w-4 h-4 mr-2" />
                  Ir al Dashboard
                </Button>
              </Link>

              <Link href="/tournaments">
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Ver Otros Torneos
                </Button>
              </Link>
            </div>
          </div>

          <div className="text-xs text-gray-400">
            <p>ID de Transacción: {paymentId}</p>
            <p className="mt-1">Recibirás una confirmación por email cuando el pago sea aprobado</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function PaymentPendingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
          <div className="text-white">Cargando...</div>
        </div>
      }
    >
      <PaymentPendingContent />
    </Suspense>
  )
}
