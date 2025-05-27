"use client"

import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { XCircle, ArrowLeft, RefreshCw, Home } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

function PaymentFailureContent() {
  const searchParams = useSearchParams()
  const tournamentId = searchParams?.get("tournament") || "1"

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <Card className="bg-white/10 border-white/20 backdrop-blur-sm max-w-md w-full">
        <CardHeader className="text-center space-y-4">
          <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto">
            <XCircle className="w-12 h-12 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl text-white">Pago No Completado</CardTitle>
            <CardDescription className="text-gray-300">Hubo un problema al procesar tu pago</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 text-center">
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">¿Qué pasó?</h3>
            <p className="text-sm text-gray-300">
              El pago pudo haber sido cancelado, rechazado o hubo un error técnico. No te preocupes, no se realizó
              ningún cargo.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-gray-300">Puedes intentar nuevamente o contactar a soporte si el problema persiste.</p>

            <div className="flex flex-col space-y-3">
              <Link href={`/payment/${tournamentId}`}>
                <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Intentar Nuevamente
                </Button>
              </Link>

              <Link href="/tournaments">
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver a Torneos
                </Button>
              </Link>

              <Link href="/dashboard">
                <Button variant="ghost" className="w-full text-gray-400 hover:text-white hover:bg-white/10">
                  <Home className="w-4 h-4 mr-2" />
                  Ir al Dashboard
                </Button>
              </Link>
            </div>
          </div>

          <div className="text-xs text-gray-400">
            <p>¿Necesitas ayuda? Contáctanos en support@tuttifruttipro.com</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function PaymentFailurePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
          <div className="text-white">Cargando...</div>
        </div>
      }
    >
      <PaymentFailureContent />
    </Suspense>
  )
}
