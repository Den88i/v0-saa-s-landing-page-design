"use client"

import { useState, useEffect, useRef } from "react" // Added useEffect and useRef
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy,
  DollarSign,
  Users,
  Play,
  MessageCircle,
  Settings,
  LogOut,
  Crown,
  Star,
  TrendingUp,
  Calendar,
  Zap,
  Gift,
  Bell,
} from "lucide-react"

export default function DashboardPage() {
  const [user] = useState({
    username: "ProPlayer123",
    email: "player@example.com",
    balance: 47.5,
    level: 12,
    xp: 2450,
    xpToNext: 3000,
    wins: 89,
    totalGames: 156,
    winRate: 57,
    rank: "Gold III",
    avatar: "/placeholder.svg?height=40&width=40", // Ensure this path is correct or adjust
  })

  const [activeTournaments] = useState([
    {
      id: 1,
      name: "Copa de Oro Semanal",
      prize: 500,
      players: 128,
      maxPlayers: 128,
      entryFee: 5,
      startTime: "2024-01-15T20:00:00",
      status: "live",
      timeLeft: "2h 15m",
    },
    {
      id: 2,
      name: "Torneo Relámpago",
      prize: 100,
      players: 45,
      maxPlayers: 64,
      entryFee: 2,
      startTime: "2024-01-14T18:30:00",
      status: "registering",
      timeLeft: "45m",
    },
  ])

  const [recentGames] = useState([
    { id: 1, opponent: "WordMaster", result: "win", score: 85, prize: 12.5, date: "2024-01-13" },
    { id: 2, opponent: "QuickThink", result: "loss", score: 72, prize: 0, date: "2024-01-13" },
    { id: 3, opponent: "BrainStorm", result: "win", score: 91, prize: 8.75, date: "2024-01-12" },
  ])

  const [notifications] = useState([
    { id: 1, type: "tournament", message: "Nuevo torneo disponible: Copa Mensual", time: "5m" },
    { id: 2, type: "achievement", message: "¡Logro desbloqueado: 50 victorias!", time: "1h" },
    { id: 3, type: "payment", message: "Retiro procesado exitosamente", time: "2h" },
  ])

  // --- New State and Functions for Chat ---
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { id: 1, user: "ProGamer", text: "¡Alguien para un duelo rápido?", color: "text-yellow-400" },
    { id: 2, user: "WordMaster", text: "Acabo de ganar el torneo de la tarde 🏆", color: "text-green-400" },
    { id: 3, user: "QuickThink", text: "¿Consejos para mejorar en la categoría 'Países'?", color: "text-blue-400" },
    { id: 4, user: "BrainStorm", text: "El próximo torneo mensual va a estar épico", color: "text-purple-400" },
  ]);

  const chatMessagesEndRef = useRef<HTMLDivElement>(null); // Ref for auto-scrolling chat

  // Scroll to the bottom of the chat when new messages are added
  useEffect(() => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleSendMessage = () => {
    if (chatMessage.trim() !== "") {
      setChatHistory((prevChat) => [
        ...prevChat,
        {
          id: prevChat.length + 1, // Simple ID generation
          user: user.username,
          text: chatMessage,
          color: "text-orange-300", // A distinct color for the current user's messages
        },
      ]);
      setChatMessage(""); // Clear the input field
      console.log("Message sent:", chatMessage);
      // In a real application, you'd send this message to a backend server here
    }
  };

  // --- Functions for other interactive buttons ---
  const handleSettingsClick = () => {
    alert("¡Ajustes clickeados! Aquí iría la lógica para abrir la página o modal de ajustes.");
    // Example: router.push('/settings'); // If you're using Next.js router
  };

  const handleLogoutClick = () => {
    alert("¡Cerrar Sesión clickeado! Aquí iría la lógica para cerrar la sesión del usuario.");
    // Example: perform API call to log out, clear user session, then redirect to login page
  };

  const handleWithdrawClick = () => {
    alert("¡Retirar clickeado! Aquí iría la lógica para iniciar un proceso de retiro de fondos.");
    // Example: open a withdrawal form or dialog
  };

  const handleClaimBonusClick = () => {
    alert("¡Bono Diario Reclamado! Tu saldo se ha actualizado.");
    // Example: Update user balance state, make an API call to record the claim
  };

  const handleNotificationsClick = () => {
    alert("¡Notificaciones clickeadas! Aquí podrías mostrar un centro de notificaciones.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">TuttiFrutti Pro</h1>
                <p className="text-xs text-gray-300">Dashboard</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 relative" onClick={handleNotificationsClick}>
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-[10px]"></span> {/* Changed to show notification count if dynamic */}
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" onClick={handleSettingsClick}>
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" onClick={handleLogoutClick}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Profile Section */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card className="lg:col-span-1 bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader className="text-center">
              <Avatar className="w-20 h-20 mx-auto mb-4">
                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-lg">
                  {user.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-white">{user.username}</CardTitle>
              <CardDescription className="text-gray-300">{user.rank}</CardDescription>
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black">Nivel {user.level}</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">XP Progress</span>
                  <span className="text-white">
                    {user.xp}/{user.xpToNext}
                  </span>
                </div>
                <Progress value={(user.xp / user.xpToNext) * 100} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-400">{user.wins}</p>
                  <p className="text-xs text-gray-400">Victorias</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-400">{user.winRate}%</p>
                  <p className="text-xs text-gray-400">Win Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-3 grid md:grid-cols-3 gap-6">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Balance</CardTitle>
                <DollarSign className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">${user.balance.toFixed(2)}</div>
                <p className="text-xs text-gray-400">Disponible para retiro</p>
                <Button size="sm" className="mt-2 bg-green-600 hover:bg-green-700" onClick={handleWithdrawClick}>
                  Retirar
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Partidas Hoy</CardTitle>
                <Play className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">7</div>
                <p className="text-xs text-gray-400">+2 desde ayer</p>
                <div className="flex items-center text-xs text-green-400 mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +28.6%
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Ranking</CardTitle>
                <Trophy className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">#247</div>
                <p className="text-xs text-gray-400">Global</p>
                <div className="flex items-center text-xs text-green-400 mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +15 posiciones
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="tournaments" className="space-y-6">
          <TabsList className="bg-white/10 border-white/20">
            <TabsTrigger value="tournaments" className="data-[state=active]:bg-white/20">
              Torneos
            </TabsTrigger>
            <TabsTrigger value="games" className="data-[state=active]:bg-white/20">
              Mis Partidas
            </TabsTrigger>
            <TabsTrigger value="social" className="data-[state=active]:bg-white/20">
              Social
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-white/20">
              Logros
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tournaments" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                      Torneos Activos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {activeTournaments.map((tournament) => (
                      <div key={tournament.id} className="border border-white/10 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-white">{tournament.name}</h3>
                            <p className="text-sm text-gray-400">
                              {tournament.players}/{tournament.maxPlayers} jugadores
                            </p>
                          </div>
                          <Badge
                            className={`${tournament.status === "live" ? "bg-red-500" : "bg-green-500"} text-white`}
                          >
                            {tournament.status === "live" ? "EN VIVO" : "REGISTRANDO"}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="text-center">
                            <p className="text-lg font-bold text-yellow-400">${tournament.prize}</p>
                            <p className="text-xs text-gray-400">Premio</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-bold text-white">${tournament.entryFee}</p>
                            <p className="text-xs text-gray-400">Entrada</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-bold text-blue-400">{tournament.timeLeft}</p>
                            <p className="text-xs text-gray-400">Tiempo</p>
                          </div>
                        </div>

                        <Button
                          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                          disabled={tournament.status === "live"}
                        >
                          {tournament.status === "live" ? "Continuar Partida" : "Unirse al Torneo"}
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Bell className="w-5 h-5 mr-2 text-blue-400" />
                      Notificaciones
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="border-l-2 border-yellow-400 pl-3 py-2">
                        <p className="text-sm text-white">{notification.message}</p>
                        <p className="text-xs text-gray-400">{notification.time} ago</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-500/30">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Gift className="w-5 h-5 mr-2 text-green-400" />
                      Bono Diario
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300 mb-3">¡Reclama tu bono diario de $2.50!</p>
                    <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleClaimBonusClick}>
                      Reclamar Bono
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="games" className="space-y-6">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Historial de Partidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentGames.map((game) => (
                    <div
                      key={game.id}
                      className="flex items-center justify-between border border-white/10 rounded-lg p-4"
                    >
                      <div className="flex items-center space-x-4">
                        <Badge className={`${game.result === "win" ? "bg-green-500" : "bg-red-500"} text-white`}>
                          {game.result === "win" ? "Victoria" : "Derrota"}
                        </Badge>
                        <div>
                          <p className="text-white font-medium">vs {game.opponent}</p>
                          <p className="text-sm text-gray-400">{game.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">Puntos: {game.score}</p>
                        <p className={`text-sm ${game.prize > 0 ? "text-green-400" : "text-gray-400"}`}>
                          {game.prize > 0 ? `+$${game.prize}` : "Sin premio"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Tab - Chat functionality added here */}
          <TabsContent value="social" className="space-y-6">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2 text-blue-400" />
                  Chat Global
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-black/20 rounded-lg p-4 mb-4 overflow-y-auto flex flex-col"> {/* Added flex-col */}
                  <div className="space-y-2 text-sm">
                    {chatHistory.map((msg) => (
                      <div key={msg.id} className="flex items-start space-x-2">
                        <span className={`${msg.color} font-semibold`}>{msg.user}:</span>
                        <span className="text-gray-300">{msg.text}</span>
                      </div>
                    ))}
                    <div ref={chatMessagesEndRef} /> {/* Auto-scroll target */}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Escribe un mensaje..."
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" // Added focus styles
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && chatMessage.trim() !== '') {
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={handleSendMessage}
                    disabled={chatMessage.trim() === ''} // Button disabled if input is empty
                  >
                    Enviar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-white">Primera Victoria</CardTitle>
                  <CardDescription className="text-gray-300">Gana tu primera partida</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge className="bg-green-500 text-white">Completado</Badge>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-white">Racha de Fuego</CardTitle>
                  <CardDescription className="text-gray-300">Gana 5 partidas seguidas</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge className="bg-green-500 text-white">Completado</Badge>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-white">Social</CardTitle>
                  <CardDescription className="text-gray-300">Juega 10 partidas multijugador</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-2">
                    <Progress value={70} className="h-2" />
                  </div>
                  <p className="text-sm text-gray-400">7/10 partidas</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-white">Rey de Palabras</CardTitle>
                  <CardDescription className="text-gray-300">Alcanza el nivel 20</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-2">
                    <Progress value={60} className="h-2" />
                  </div>
                  <p className="text-sm text-gray-400">Nivel 12/20</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <DollarSign className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-white">Gran Ganador</CardTitle>
                  <CardDescription className="text-gray-300">Alcanza $100 en premios</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-2">
                    <Progress value={47} className="h-2" />
                  </div>
                  <p className="text-sm text-gray-400">$47.50/$100</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-white">Dedicado</CardTitle>
                  <CardDescription className="text-gray-300">Juega 30 días consecutivos</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-2">
                    <Progress value={43} className="h-2" />
                  </div>
                  <p className="text-sm text-gray-400">13/30 días</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
