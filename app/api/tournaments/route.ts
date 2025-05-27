import { type NextRequest, NextResponse } from "next/server"
import { dbHelpers } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    const tournaments = await dbHelpers.getTournaments(status || undefined)

    return NextResponse.json(tournaments)
  } catch (error) {
    console.error("Error obteniendo torneos:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const tournamentData = await request.json()

    // Obtener configuración del sistema
    const basicPrice = await dbHelpers.getSystemConfig("basic_room_price")
    const vipPrice = await dbHelpers.getSystemConfig("vip_room_price")
    const maxPlayersBasic = await dbHelpers.getSystemConfig("max_players_basic")
    const maxPlayersVip = await dbHelpers.getSystemConfig("max_players_vip")

    const tournament = await dbHelpers.createTournament({
      ...tournamentData,
      entry_fee: tournamentData.type === "vip" ? Number.parseFloat(vipPrice) : Number.parseFloat(basicPrice),
      max_players: tournamentData.type === "vip" ? Number.parseInt(maxPlayersVip) : Number.parseInt(maxPlayersBasic),
      status: "registering",
    })

    return NextResponse.json(tournament)
  } catch (error) {
    console.error("Error creando torneo:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
