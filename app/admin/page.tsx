"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  DollarSign,
  Users,
  Trophy,
  Settings,
  Eye,
  Plus,
  Edit,
  Trash2,
  Crown,
  AlertCircle,
  CheckCircle,
} from "lucide-react"

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("overview")

  // Datos simulados de administración
  const adminStats = {
    totalRevenue: 45750.0,
    adminCommission: 13725.0, // 30%
    activeTournaments: 12,
    totalPlayers: 1247,
    todayRevenue: 8950.0,
    todayCommission: 2685.0,
  }

  const tournaments = [
    {
      id: 1,
      name: "Copa Básica - Tarde",
      type: "basic",
      players: 45,
      maxPlayers: 64,
      entryFee: 2500,
      totalPool: 112500,
      adminCommission: 33750,
      prizePool: 78750,
      status: "active",
      startTime: "2024-01-15T18:00:00",
    },
    {
      id: 2,
      name: "Copa VIP - Premium",
      type: "vip",
      players: 28,
      maxPlayers: 32,
      entryFee: 5000,
      totalPool: 140000,
      adminCommission: 42000,
      prizePool: 98000,
      status: "filling",
      startTime: "2024-01-15T20:00:00",
    },
    {
      id: 3,
      name: "Copa Básica - Noche",
      type: "basic",
      players: 38,
      maxPlayers: 64,
      entryFee: 2500,
      totalPool: 95000,
      adminCommission: 28500,
      prizePool: 66500,
      status: "active",
      startTime: "2024-01-15T21:00:00",
    },
  ]

  const recentTransactions = [
    { id: 1, player: "WordMaster", amount: 2500, type: "entry", tournament: "Copa Básica", time: "14:30" },
    { id: 2, player: "QuickThink", amount: 5000, type: "entry", tournament: "Copa VIP", time: "14:25" },
    { id: 3, player: "BrainStorm", amount: 47250, type: "prize", tournament: "Copa Nocturna", time: "14:20" },
    { id: 4, player: "FastWords", amount: 2500, type: "entry", tournament: "Copa Básica", time: "14:15" },
    { id: 5, player: "LetterKing", amount: 23625, type: "prize", tournament: "Copa Tarde", time: "14:10" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Panel de Administración</h1>
                <p className="text-xs text-gray-300">TuttiFrutti Pro</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => (window.location.href = "/")}
            >
              <Eye className="w-4 h-4 mr-2" />
              Ver Sitio
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-white/10 border-white/20 grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white/20">
              Resumen
            </TabsTrigger>
            <TabsTrigger value="tournaments" className="data-[state=active]:bg-white/20">
              Torneos
            </TabsTrigger>
            <TabsTrigger value="finances" className="data-[state=active]:bg-white/20">
              Finanzas
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-white/20">
              Configuración
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Ingresos Totales</CardTitle>
                  <DollarSign className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">${adminStats.totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-gray-400">+12% desde ayer</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Mi Comisión (30%)</CardTitle>
                  <Crown className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-400">
                    ${adminStats.adminCommission.toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-400">Hoy: ${adminStats.todayCommission.toLocaleString()}</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Torneos Activos</CardTitle>
                  <Trophy className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{adminStats.activeTournaments}</div>
                  <p className="text-xs text-gray-400">3 llenándose</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Jugadores Activos</CardTitle>
                  <Users className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{adminStats.totalPlayers.toLocaleString()}</div>
                  <p className="text-xs text-gray-400">+23 nuevos hoy</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Transacciones Recientes</CardTitle>
                  <CardDescription className="text-gray-300">Últimas actividades de pago</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between border-b border-white/10 pb-2"
                      >
                        <div>
                          <p className="text-white font-medium">{transaction.player}</p>
                          <p className="text-sm text-gray-400">
                            {transaction.tournament} • {transaction.time}
                          </p>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-bold ${transaction.type === "entry" ? "text-green-400" : "text-blue-400"}`}
                          >
                            {transaction.type === "entry" ? "+" : "-"}${transaction.amount.toLocaleString()}
                          </p>
                          <Badge className={`text-xs ${transaction.type === "entry" ? "bg-green-500" : "bg-blue-500"}`}>
                            {transaction.type === "entry" ? "Inscripción" : "Premio"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Estado de Torneos</CardTitle>
                  <CardDescription className="text-gray-300">Resumen de torneos activos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tournaments.slice(0, 3).map((tournament) => (
                      <div key={tournament.id} className="border border-white/10 rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-medium">{tournament.name}</h4>
                          <Badge className={`${tournament.status === "active" ? "bg-green-500" : "bg-yellow-500"}`}>
                            {tournament.status === "active" ? "Activo" : "Llenándose"}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-gray-400">
                              Jugadores: {tournament.players}/{tournament.maxPlayers}
                            </p>
                            <p className="text-gray-400">Tipo: {tournament.type === "vip" ? "VIP" : "Básica"}</p>
                          </div>
                          <div>
                            <p className="text-green-400">
                              Mi comisión: ${tournament.adminCommission.toLocaleString()}
                            </p>
                            <p className="text-blue-400">Pozo: ${tournament.prizePool.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tournaments Tab */}
          <TabsContent value="tournaments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Gestión de Torneos</h2>
              <Button className="bg-gradient-to-r from-green-500 to-blue-500">
                <Plus className="w-4 h-4 mr-2" />
                Crear Torneo
              </Button>
            </div>

            <div className="space-y-4">
              {tournaments.map((tournament) => (
                <Card key={tournament.id} className="bg-white/10 border-white/20 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-xl font-bold text-white">{tournament.name}</h3>
                          <Badge className={`${tournament.type === "vip" ? "bg-purple-500" : "bg-blue-500"}`}>
                            {tournament.type === "vip" ? "VIP" : "BÁSICA"}
                          </Badge>
                          <Badge className={`${tournament.status === "active" ? "bg-green-500" : "bg-yellow-500"}`}>
                            {tournament.status === "active" ? "Activo" : "Llenándose"}
                          </Badge>
                        </div>
                        <p className="text-gray-300">
                          {new Date(tournament.startTime).toLocaleDateString("es-ES", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="border-white/20 text-white">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-500 text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4 mt-4">
                      <div className="text-center p-3 bg-white/5 rounded-lg">
                        <p className="text-sm text-gray-400">Jugadores</p>
                        <p className="text-lg font-bold text-white">
                          {tournament.players}/{tournament.maxPlayers}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-white/5 rounded-lg">
                        <p className="text-sm text-gray-400">Total Recaudado</p>
                        <p className="text-lg font-bold text-green-400">${tournament.totalPool.toLocaleString()}</p>
                      </div>
                      <div className="text-center p-3 bg-white/5 rounded-lg">
                        <p className="text-sm text-gray-400">Mi Comisión (30%)</p>
                        <p className="text-lg font-bold text-yellow-400">
                          ${tournament.adminCommission.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-white/5 rounded-lg">
                        <p className="text-sm text-gray-400">Pozo Premios</p>
                        <p className="text-lg font-bold text-blue-400">${tournament.prizePool.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Finances Tab */}
          <TabsContent value="finances" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Gestión Financiera</h2>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Resumen de Comisiones</CardTitle>
                  <CardDescription className="text-gray-300">Tus ganancias como administrador</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-gray-300">Comisión Total Acumulada</span>
                    <span className="text-2xl font-bold text-yellow-400">
                      ${adminStats.adminCommission.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-gray-300">Comisión de Hoy</span>
                    <span className="text-lg font-bold text-green-400">
                      ${adminStats.todayCommission.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-gray-300">Promedio Diario</span>
                    <span className="text-lg font-bold text-blue-400">$1,245</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Proyección Mensual</span>
                    <span className="text-lg font-bold text-purple-400">$37,350</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Configuración de Comisiones</CardTitle>
                  <CardDescription className="text-gray-300">Ajusta los porcentajes de comisión</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-white">Comisión Administrador (%)</Label>
                    <Input type="number" defaultValue="30" className="bg-white/10 border-white/20 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Distribución Premios</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label className="text-xs text-gray-400">1er Lugar (%)</Label>
                        <Input type="number" defaultValue="60" className="bg-white/10 border-white/20 text-white" />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-400">2do Lugar (%)</Label>
                        <Input type="number" defaultValue="30" className="bg-white/10 border-white/20 text-white" />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-400">3er Lugar (%)</Label>
                        <Input type="number" defaultValue="10" className="bg-white/10 border-white/20 text-white" />
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500">Guardar Configuración</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Configuración del Sistema</h2>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Configuración de Torneos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-white">Precio Sala Básica ($)</Label>
                    <Input type="number" defaultValue="2500" className="bg-white/10 border-white/20 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Precio Sala VIP ($)</Label>
                    <Input type="number" defaultValue="5000" className="bg-white/10 border-white/20 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Tiempo de Juego (segundos)</Label>
                    <Input type="number" defaultValue="60" className="bg-white/10 border-white/20 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Máximo Jugadores por Torneo</Label>
                    <Input type="number" defaultValue="64" className="bg-white/10 border-white/20 text-white" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Estado del Sistema</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white">MercadoPago</span>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-green-400">Conectado</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Base de Datos</span>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-green-400">Operativa</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Servidor de Juegos</span>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-green-400">En Línea</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Sistema de Chat</span>
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-yellow-400" />
                      <span className="text-yellow-400">Mantenimiento</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
