import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Verificar que es una notificación de pago
    if (body.type === "payment") {
      const paymentId = body.data.id

      // Obtener detalles del pago
      const paymentResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
        },
      })

      const paymentData = await paymentResponse.json()

      if (paymentData.status === "approved") {
        // Aquí procesarías la inscripción al torneo
        // Por ejemplo, guardar en Supabase que el usuario se inscribió
        console.log("Pago aprobado:", {
          paymentId: paymentData.id,
          externalReference: paymentData.external_reference,
          amount: paymentData.transaction_amount,
          payerEmail: paymentData.payer.email,
        })

        // TODO: Integrar con Supabase para guardar la inscripción
        // await supabase.from('tournament_registrations').insert({
        //   tournament_id: extractTournamentId(paymentData.external_reference),
        //   user_email: paymentData.payer.email,
        //   payment_id: paymentData.id,
        //   amount: paymentData.transaction_amount,
        //   status: 'confirmed'
        // })
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error en webhook:", error)
    return NextResponse.json({ error: "Error procesando webhook" }, { status: 500 })
  }
}
