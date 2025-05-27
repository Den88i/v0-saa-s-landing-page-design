"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trophy, Search, Filter, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TournamentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterBy, setFilterBy] = useState("all")
  const [sortBy, setSortBy] = useState("prize")

  const tournaments = [
    // Sala Básica
    {
      id: 1,
      name: "Copa Básica - Tarde",
      description: "Sala básica para todos los jugadores",
      type: "basic",
      entryFee: 2500,
      players: 45,
      maxPlayers: 64,
      startTime: "2024-01-15T18:00:00",
      status: "registering",
      timeLeft: "2h 15m",
      difficulty: "Intermedio",
      format: "Eliminación",
      duration: "2 horas",
    },
    {
      id: 2,
      name: "Copa Básica - Noche",
      description: "Sala básica nocturna",
      type: "basic",
      entryFee: 2500,
      players: 38,
      maxPlayers: 64,
      startTime: "2024-01-15T21:00:00",
      status: "registering",
      timeLeft: "5h 15m",
      difficulty: "Intermedio",
      format: "Eliminación",
      duration: "2 horas",
    },
    {
      id: 3,
      name: "Copa VIP - Premium",
      description: "Sala VIP para jugadores experimentados",
      type: "vip",
      entryFee: 5000,
      players: 28,
      maxPlayers: 32,
      startTime: "2024-01-15T20:00:00",
      status: "registering",
      timeLeft: "3h 15m",
      difficulty: "Pro",
      format: "Eliminación",
      duration: "2.5 horas",
    },
    {
      id: 4,
      name: "Copa VIP - Elite",
      description: "Sala VIP de élite",
      type: "vip",
      entryFee: 5000,
      players: 15,
      maxPlayers: 16,
      startTime: "2024-01-15T22:00:00",
      status: "registering",
      timeLeft: "7h 15m",
      difficulty: "Pro",
      format: "Eliminación",
      duration: "2.5 horas",
    },
  ]

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-red-500"
      case "registering":
        return "bg-green-500"
      case "upcoming":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "live":
        return "EN VIVO"
      case "registering":
        return "ABIERTO"
      case "upcoming":
        return "PRÓXIMO"
      default:
        return "CERRADO"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Principiante":
        return "bg-green-500"
      case "Intermedio":
        return "bg-yellow-500"
      case "Pro":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const filteredTournaments = tournaments.filter((tournament) => {
    const matchesSearch =
      tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tournament.description.toLowerCase().includes(searchTerm.toLowerCase())

    if (filterBy === "all") return matchesSearch
    return matchesSearch && tournament.status === filterBy
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-white/70 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Torneos</h1>
                  <p className="text-xs text-gray-300">Compite y gana premios</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge className="bg-green-500 text-white">
                {tournaments.filter((t) => t.status === "live").length} En Vivo
              </Badge>
              <Badge className="bg-blue-500 text-white">
                {tournaments.filter((t) => t.status === "registering").length} Abiertos
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar torneos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>

              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-full md:w-48 bg-white/10 border-white/20 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="live">En Vivo</SelectItem>
                  <SelectItem value="registering">Abiertos</SelectItem>
                  <SelectItem value="upcoming">Próximos</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48 bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prize">Premio</SelectItem>
                  <SelectItem value="players">Jugadores</SelectItem>
                  <SelectItem value="time">Tiempo</SelectItem>
                  <SelectItem value="entry">Entrada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tournament Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTournaments.map((tournament) => {
            const prizes = calculatePrizePool(tournament.players, tournament.entryFee)

            return (
              <Card
                key={tournament.id}
                className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all"
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg mb-1">{tournament.name}</CardTitle>
                      <CardDescription className="text-gray-300 text-sm">{tournament.description}</CardDescription>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge className={`${getStatusColor(tournament.status)} text-white`}>
                        {getStatusText(tournament.status)}
                      </Badge>
                      <Badge className={`${tournament.type === "vip" ? "bg-purple-500" : "bg-blue-500"} text-white`}>
                        {tournament.type === "vip" ? "VIP" : "BÁSICA"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-lg p-3">
                    <div className="text-center">
                      <p className="text-sm text-gray-300">Pozo Acumulado</p>
                      <p className="text-2xl font-bold text-green-400">${prizes.prizePool.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">De ${prizes.totalPool.toLocaleString()} total</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div>
                      <p className="text-yellow-400 font-bold">${Math.floor(prizes.firstPlace).toLocaleString()}</p>
                      <p className="text-gray-400 text-xs">1er Lugar</p>
                    </div>
                    <div>
                      <p className="text-gray-400 font-bold">${Math.floor(prizes.secondPlace).toLocaleString()}</p>
                      <p className="text-gray-400 text-xs">2do Lugar</p>
                    </div>
                    <div>
                      <p className="text-amber-600 font-bold">${Math.floor(prizes.thirdPlace).toLocaleString()}</p>
                      <p className="text-gray-400 text-xs">3er Lugar</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div>
                      <p className="text-green-400 font-semibold">${tournament.entryFee.toLocaleString()}</p>
                      <p className="text-gray-400 text-xs">Inscripción</p>
                    </div>
                    <div>
                      <p className="text-blue-400 font-semibold">
                        {tournament.players}/{tournament.maxPlayers}
                      </p>
                      <p className="text-gray-400 text-xs">Jugadores</p>
                    </div>
                    <div>
                      <p className="text-purple-400 font-semibold">{tournament.timeLeft}</p>
                      <p className="text-gray-400 text-xs">Tiempo</p>
                    </div>
                  </div>

                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all"
                      style={{ width: `${(tournament.players / tournament.maxPlayers) * 100}%` }}
                    ></div>
                  </div>

                  <Link href={`/payment/${tournament.id}`}>
                    <Button
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                      disabled={tournament.status === "live" || tournament.players >= tournament.maxPlayers}
                    >
                      {tournament.status === "live"
                        ? "En Progreso"
                        : tournament.players >= tournament.maxPlayers
                          ? "Completo"
                          : "Unirse al Torneo"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredTournaments.length === 0 && (
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="text-center py-12">
              <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No se encontraron torneos</h3>
              <p className="text-gray-400">Intenta ajustar tus filtros de búsqueda</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
