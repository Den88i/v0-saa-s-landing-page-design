"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Trophy, Crown, Medal, Star, TrendingUp, Calendar, Zap, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function LeaderboardPage() {
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [isLive, setIsLive] = useState(true)

  // Simular actualizaciones en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date())
      // Simular cambios en los datos
    }, 30000) // Actualizar cada 30 segundos

    return () => clearInterval(interval)
  }, [])

  const globalLeaders = [
    {
      rank: 1,
      username: "WordMaster",
      totalWinnings: 2450.75,
      tournamentsWon: 23,
      winRate: 78,
      avatar: "/placeholder.svg?height=40&width=40",
      badge: "Leyenda",
      isOnline: true,
      currentStreak: 5,
      lastActive: "Ahora",
    },
    {
      rank: 2,
      username: "QuickThink",
      totalWinnings: 1890.25,
      tournamentsWon: 18,
      winRate: 72,
      avatar: "/placeholder.svg?height=40&width=40",
      badge: "Maestro",
      isOnline: true,
      currentStreak: 3,
      lastActive: "2 min",
    },
    {
      rank: 3,
      username: "BrainStorm",
      totalWinnings: 1654.5,
      tournamentsWon: 15,
      winRate: 69,
      avatar: "/placeholder.svg?height=40&width=40",
      badge: "Experto",
      isOnline: false,
      currentStreak: 2,
      lastActive: "15 min",
    },
    {
      rank: 4,
      username: "FastWords",
      totalWinnings: 1432.0,
      tournamentsWon: 12,
      winRate: 65,
      avatar: "/placeholder.svg?height=40&width=40",
      badge: "Pro",
      isOnline: true,
      currentStreak: 1,
      lastActive: "Ahora",
    },
    {
      rank: 5,
      username: "LetterKing",
      totalWinnings: 1298.75,
      tournamentsWon: 11,
      winRate: 63,
      avatar: "/placeholder.svg?height=40&width=40",
      badge: "Pro",
      isOnline: false,
      currentStreak: 0,
      lastActive: "1 hora",
    },
  ]

  const liveMatches = [
    {
      id: 1,
      tournament: "Copa VIP - Elite",
      players: ["WordMaster", "QuickThink", "BrainStorm"],
      currentRound: 3,
      totalRounds: 5,
      timeLeft: "2:45",
      prize: 58800,
    },
    {
      id: 2,
      tournament: "Copa Básica - Noche",
      players: ["FastWords", "LetterKing", "NewPlayer"],
      currentRound: 1,
      totalRounds: 3,
      timeLeft: "4:12",
      prize: 31500,
    },
  ]

  const weeklyWinners = [
    {
      tournament: "Copa de Oro Semanal",
      winner: "WordMaster",
      prize: 500,
      date: "2024-01-14",
      participants: 128,
      duration: "45 min",
    },
    {
      tournament: "Torneo Relámpago",
      winner: "QuickThink",
      prize: 100,
      date: "2024-01-13",
      participants: 64,
      duration: "20 min",
    },
    {
      tournament: "Copa Nocturna",
      winner: "BrainStorm",
      prize: 150,
      date: "2024-01-12",
      participants: 96,
      duration: "35 min",
    },
    {
      tournament: "Duelos 1v1",
      winner: "FastWords",
      prize: 25,
      date: "2024-01-11",
      participants: 16,
      duration: "15 min",
    },
  ]

  const monthlyChampions = [
    {
      month: "Enero 2024",
      champion: "WordMaster",
      prize: 2000,
      tournaments: 8,
      winRate: 85,
      totalPlayers: 1247,
    },
    {
      month: "Diciembre 2023",
      champion: "QuickThink",
      prize: 1800,
      tournaments: 6,
      winRate: 82,
      totalPlayers: 1156,
    },
    {
      month: "Noviembre 2023",
      champion: "BrainStorm",
      prize: 1600,
      tournaments: 5,
      winRate: 79,
      totalPlayers: 1089,
    },
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />
      default:
        return <Trophy className="w-6 h-6 text-blue-400" />
    }
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Leyenda":
        return "bg-gradient-to-r from-yellow-400 to-orange-500"
      case "Maestro":
        return "bg-gradient-to-r from-purple-400 to-pink-500"
      case "Experto":
        return "bg-gradient-to-r from-blue-400 to-cyan-500"
      case "Pro":
        return "bg-gradient-to-r from-green-400 to-teal-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Link href="/" className="text-white/70 hover:text-white mr-4">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Ranking en Vivo</h1>
                  <p className="text-xs text-gray-300">Actualizado en tiempo real</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isLive ? "bg-green-400" : "bg-red-400"} animate-pulse`}></div>
                <span className="text-sm text-gray-300">{isLive ? "EN VIVO" : "DESCONECTADO"}</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => setLastUpdate(new Date())}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualizar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Tabla de Clasificación</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Descubre quiénes son los mejores jugadores de TuttiFrutti Pro
          </p>
          <p className="text-sm text-gray-400 mt-2">Última actualización: {lastUpdate.toLocaleTimeString("es-ES")}</p>
        </div>

        {/* Live Matches */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Zap className="w-6 h-6 mr-2 text-yellow-400" />
              Partidas en Vivo
            </CardTitle>
            <CardDescription className="text-gray-300">Torneos que se están jugando ahora mismo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {liveMatches.map((match) => (
                <div key={match.id} className="border border-green-500/30 bg-green-500/5 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-white font-semibold">{match.tournament}</h4>
                      <p className="text-sm text-gray-400">
                        Ronda {match.currentRound}/{match.totalRounds}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-bold">{match.timeLeft}</p>
                      <p className="text-xs text-gray-400">restante</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-300">Jugadores:</p>
                    <div className="flex flex-wrap gap-1">
                      {match.players.map((player, index) => (
                        <Badge key={index} className="bg-blue-500 text-white text-xs">
                          {player}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-yellow-400 font-semibold">Premio: ${match.prize.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="global" className="space-y-8">
          <TabsList className="bg-white/10 border-white/20 grid w-full grid-cols-3">
            <TabsTrigger value="global" className="data-[state=active]:bg-white/20">
              Ranking Global
            </TabsTrigger>
            <TabsTrigger value="weekly" className="data-[state=active]:bg-white/20">
              Ganadores Semanales
            </TabsTrigger>
            <TabsTrigger value="monthly" className="data-[state=active]:bg-white/20">
              Campeones Mensuales
            </TabsTrigger>
          </TabsList>

          <TabsContent value="global" className="space-y-6">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
                  Top 5 Jugadores Globales
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Clasificación basada en ganancias totales y torneos ganados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {globalLeaders.map((player) => (
                    <div
                      key={player.rank}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        player.rank <= 3 ? "border-yellow-400/30 bg-yellow-400/5" : "border-white/10"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-12 h-12">{getRankIcon(player.rank)}</div>
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={player.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-gradient-to-r from-purple-400 to-pink-500 text-white">
                              {player.username.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          {player.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-white font-semibold">{player.username}</h3>
                            <Badge className={`${getBadgeColor(player.badge)} text-white text-xs`}>
                              {player.badge}
                            </Badge>
                            {player.isOnline && <Badge className="bg-green-500 text-white text-xs">EN LÍNEA</Badge>}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span>
                              #{player.rank} • {player.winRate}% win rate
                            </span>
                            {player.currentStreak > 0 && (
                              <span className="text-orange-400">🔥 {player.currentStreak} racha</span>
                            )}
                            <span>Activo: {player.lastActive}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-green-400">${player.totalWinnings.toFixed(2)}</p>
                        <p className="text-sm text-gray-400">{player.tournamentsWon} torneos ganados</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
                  <CardTitle className="text-white">Jugador del Mes</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-2xl font-bold text-white">WordMaster</p>
                  <p className="text-green-400 font-semibold">$2,450.75 ganados</p>
                  <p className="text-sm text-gray-400">23 torneos ganados</p>
                  <Badge className="bg-green-500 text-white mt-2">🔥 Racha de 5</Badge>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-2" />
                  <CardTitle className="text-white">Mejor Racha</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-2xl font-bold text-white">QuickThink</p>
                  <p className="text-green-400 font-semibold">12 victorias seguidas</p>
                  <p className="text-sm text-gray-400">Racha activa</p>
                  <Badge className="bg-orange-500 text-white mt-2">🏆 Récord Personal</Badge>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <Star className="w-12 h-12 text-purple-400 mx-auto mb-2" />
                  <CardTitle className="text-white">Jugador Más Activo</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-2xl font-bold text-white">BrainStorm</p>
                  <p className="text-purple-400 font-semibold">156 partidas</p>
                  <p className="text-sm text-gray-400">Este mes</p>
                  <Badge className="bg-blue-500 text-white mt-2">⚡ Muy Activo</Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-6">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-blue-400" />
                  Ganadores de la Semana
                </CardTitle>
                <CardDescription className="text-gray-300">Últimos ganadores de torneos semanales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyWinners.map((winner, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border border-white/10 rounded-lg p-4 hover:bg-white/5 transition-colors"
                    >
                      <div>
                        <h3 className="text-white font-semibold">{winner.tournament}</h3>
                        <p className="text-sm text-gray-400">
                          {winner.date} • {winner.participants} participantes • {winner.duration}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">{winner.winner}</p>
                        <p className="text-green-400 font-bold">${winner.prize}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-6">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Crown className="w-6 h-6 mr-2 text-yellow-400" />
                  Campeones Mensuales
                </CardTitle>
                <CardDescription className="text-gray-300">Los mejores jugadores de cada mes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {monthlyChampions.map((champion, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border border-yellow-400/30 bg-yellow-400/5 rounded-lg p-6"
                    >
                      <div className="flex items-center space-x-4">
                        <Crown className="w-8 h-8 text-yellow-400" />
                        <div>
                          <h3 className="text-xl font-bold text-white">{champion.champion}</h3>
                          <p className="text-gray-300">{champion.month}</p>
                          <p className="text-sm text-gray-400">
                            Compitió contra {champion.totalPlayers.toLocaleString()} jugadores
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-400">${champion.prize}</p>
                        <p className="text-sm text-gray-400">
                          {champion.tournaments} torneos • {champion.winRate}% win rate
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CTA */}
        <div className="text-center mt-12">
          <h2 className="text-3xl font-bold text-white mb-4">¿Quieres Aparecer Aquí?</h2>
          <p className="text-gray-300 mb-8">Únete a los torneos y compite por tu lugar en el ranking</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tournaments">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold"
              >
                Ver Torneos Disponibles
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                Crear Cuenta Gratis
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
