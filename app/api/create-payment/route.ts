import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { tournamentId, tournamentName, amount } = await request.json()

    // Obtener la URL base del entorno
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

    const preference = {
      items: [
        {
          title: `Inscripción - ${tournamentName}`,
          description: `Inscripción al torneo ${tournamentName}`,
          quantity: 1,
          currency_id: "USD",
          unit_price: amount,
        },
      ],
      back_urls: {
        success: `${baseUrl}/payment/success?tournament=${tournamentId}`,
        failure: `${baseUrl}/payment/failure?tournament=${tournamentId}`,
        pending: `${baseUrl}/payment/pending?tournament=${tournamentId}`,
      },
      auto_return: "approved",
      external_reference: `tournament_${tournamentId}_${Date.now()}`,
      notification_url: `${baseUrl}/api/webhook/mercadopago`,
      statement_descriptor: "TuttiFrutti Pro",
      expires: true,
      expiration_date_from: new Date().toISOString(),
      expiration_date_to: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutos
    }

    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(preference),
    })

    const data = await response.json()

    if (response.ok) {
      return NextResponse.json({
        preferenceId: data.id,
        initPoint: data.init_point,
        sandboxInitPoint: data.sandbox_init_point,
      })
    } else {
      console.error("Error de MercadoPago:", data)
      return NextResponse.json({ error: "Error al crear la preferencia de pago" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
