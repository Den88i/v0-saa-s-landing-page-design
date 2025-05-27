"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy,
  Users,
  Clock,
  MessageCircle,
  Send,
  Crown,
  Star,
  Zap,
  ArrowLeft,
  Volume2,
  VolumeX,
  CheckCircle,
  XCircle,
  Medal,
} from "lucide-react"
import Link from "next/link"

const categories = ["Nombre", "Animal", "Color", "Fruta", "País", "Objeto", "Profesión", "Comida"]
const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "L", "M", "N", "O", "P", "R", "S", "T", "V"]

interface Player {
  id: number
  username: string
  score: number
  position: number
  status: "playing" | "completed" | "eliminated"
  avatar: string
  currentRoundScore: number
  completedAt?: number
  answers: { [key: string]: string }
  isReady: boolean
}

interface GameState {
  phase: "waiting" | "starting" | "playing" | "reviewing" | "results" | "finished"
  currentRound: number
  totalRounds: number
  currentLetter: string
  timeLeft: number
  roundTimeLimit: number
  playersCompleted: number
  winners: Player[]
}

export default function TournamentGamePage({ params }: { params: { id: string } }) {
  const [gameState, setGameState] = useState<GameState>({
    phase: "waiting",
    currentRound: 1,
    totalRounds: 5,
    currentLetter: "",
    timeLeft: 60,
    roundTimeLimit: 60,
    playersCompleted: 0,
    winners: [],
  })

  const [players, setPlayers] = useState<Player[]>([
    {
      id: 1,
      username: "WordMaster",
      score: 0,
      position: 1,
      status: "playing",
      avatar: "/placeholder.svg?height=32&width=32",
      currentRoundScore: 0,
      answers: {},
      isReady: true,
    },
    {
      id: 2,
      username: "QuickThink",
      score: 0,
      position: 2,
      status: "playing",
      avatar: "/placeholder.svg?height=32&width=32",
      currentRoundScore: 0,
      answers: {},
      isReady: true,
    },
    {
      id: 3,
      username: "BrainStorm",
      score: 0,
      position: 3,
      status: "playing",
      avatar: "/placeholder.svg?height=32&width=32",
      currentRoundScore: 0,
      answers: {},
      isReady: true,
    },
    {
      id: 4,
      username: "FastWords",
      score: 0,
      position: 4,
      status: "playing",
      avatar: "/placeholder.svg?height=32&width=32",
      currentRoundScore: 0,
      answers: {},
      isReady: true,
    },
    {
      id: 5,
      username: "LetterKing",
      score: 0,
      position: 5,
      status: "playing",
      avatar: "/placeholder.svg?height=32&width=32",
      currentRoundScore: 0,
      answers: {},
      isReady: false,
    },
  ])

  const [myAnswers, setMyAnswers] = useState<{ [key: string]: string }>({})
  const [chatMessage, setChatMessage] = useState("")
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [isCompleted, setIsCompleted] = useState(false)
  const [completionTime, setCompletionTime] = useState<number | null>(null)

  // Safe params handling
  const tournamentId = params?.id || "1"
  const tournament = {
    id: tournamentId,
    name: tournamentId === "3" ? "Copa VIP - Premium" : "Copa Básica - Tarde",
    type: tournamentId === "3" ? "vip" : "basic",
    entryFee: tournamentId === "3" ? 5000 : 2500,
    players: tournamentId === "3" ? 28 : 45,
    maxPlayers: tournamentId === "3" ? 32 : 64,
  }

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

  const prizes = calculatePrizePool(tournament.players, tournament.entryFee)

  const chatMessages = [
    { id: 1, username: "Sistema", message: "¡Bienvenidos al torneo!", time: "14:30", type: "system" },
    { id: 2, username: "WordMaster", message: "¡Buena suerte a todos!", time: "14:32", type: "chat" },
    { id: 3, username: "QuickThink", message: "¡Que gane el mejor!", time: "14:33", type: "chat" },
  ]

  // Función para iniciar una nueva ronda
  const startNewRound = useCallback(() => {
    const newLetter = letters[Math.floor(Math.random() * letters.length)]
    setGameState((prev) => ({
      ...prev,
      phase: "starting",
      currentLetter: newLetter,
      timeLeft: 3,
      playersCompleted: 0,
    }))

    // Limpiar respuestas
    setMyAnswers({})
    setIsCompleted(false)
    setCompletionTime(null)

    // Countdown de 3 segundos antes de empezar
    setTimeout(() => {
      setGameState((prev) => ({
        ...prev,
        phase: "playing",
        timeLeft: prev.roundTimeLimit,
      }))
    }, 3000)
  }, [])

  // Timer principal del juego
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (gameState.phase === "starting" && gameState.timeLeft > 0) {
      interval = setInterval(() => {
        setGameState((prev) => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
        }))
      }, 1000)
    } else if (gameState.phase === "playing" && gameState.timeLeft > 0) {
      interval = setInterval(() => {
        setGameState((prev) => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
        }))
      }, 1000)
    } else if (gameState.phase === "playing" && gameState.timeLeft === 0) {
      // Tiempo agotado, pasar a revisión
      setGameState((prev) => ({
        ...prev,
        phase: "reviewing",
      }))
      processRoundResults()
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [gameState.phase, gameState.timeLeft])

  // Inicializar el juego
  useEffect(() => {
    // Simular que todos los jugadores están listos después de 2 segundos
    const timer = setTimeout(() => {
      setPlayers((prev) => prev.map((p) => ({ ...p, isReady: true })))
      startNewRound()
    }, 2000)

    return () => clearTimeout(timer)
  }, [startNewRound])

  // Función para manejar cambios en las respuestas
  const handleAnswerChange = (category: string, value: string) => {
    try {
      // Verificar que category sea válido
      if (!category || typeof category !== "string") {
        console.warn("handleAnswerChange: category inválido:", category)
        return
      }

      // Verificar que value sea string y manejarlo de forma segura
      const safeValue = value != null ? String(value).trim() : ""

      console.log("handleAnswerChange:", { category, value: safeValue })

      setMyAnswers((prev) => ({
        ...prev,
        [category]: safeValue,
      }))
    } catch (error) {
      console.error("Error en handleAnswerChange:", error, { category, value })
    }
  }

  // Función para validar si una palabra es correcta - MEJORADA CON VERIFICACIONES SEGURAS
  const validateAnswer = (answer: string, category: string, letter: string): boolean => {
    try {
      // Validar que todos los parámetros existan y sean strings válidos
      if (!answer || typeof answer !== "string") {
        console.warn("validateAnswer: answer es inválido:", answer)
        return false
      }

      if (!category || typeof category !== "string") {
        console.warn("validateAnswer: category es inválido:", category)
        return false
      }

      if (!letter || typeof letter !== "string") {
        console.warn("validateAnswer: letter es inválido:", letter)
        return false
      }

      const trimmedAnswer = answer.trim()
      if (!trimmedAnswer || trimmedAnswer.length === 0) {
        console.warn("validateAnswer: respuesta vacía después de trim")
        return false
      }

      // Safe toLowerCase calls con verificaciones adicionales
      const firstChar = trimmedAnswer.charAt(0)
      const targetChar = letter.charAt(0)

      if (!firstChar || !targetChar) {
        console.warn("validateAnswer: no se pudo obtener primer carácter")
        return false
      }

      const firstLetter = firstChar.toLowerCase?.() || firstChar.toLocaleLowerCase?.() || firstChar
      const targetLetter = targetChar.toLowerCase?.() || targetChar.toLocaleLowerCase?.() || targetChar

      if (!firstLetter || !targetLetter) {
        console.warn("validateAnswer: error en conversión a minúsculas")
        return false
      }

      // Validaciones básicas por categoría (en producción sería más robusta)
      const validations: { [key: string]: (word: string) => boolean } = {
        Nombre: (word) => {
          try {
            return /^[a-záéíóúñ]+$/i.test(word) && word.length >= 2
          } catch (e) {
            console.warn("Error validando Nombre:", e)
            return false
          }
        },
        Animal: (word) => {
          try {
            return /^[a-záéíóúñ\s]+$/i.test(word) && word.length >= 3
          } catch (e) {
            console.warn("Error validando Animal:", e)
            return false
          }
        },
        Color: (word) => {
          try {
            return /^[a-záéíóúñ\s]+$/i.test(word) && word.length >= 3
          } catch (e) {
            console.warn("Error validando Color:", e)
            return false
          }
        },
        Fruta: (word) => {
          try {
            return /^[a-záéíóúñ\s]+$/i.test(word) && word.length >= 3
          } catch (e) {
            console.warn("Error validando Fruta:", e)
            return false
          }
        },
        País: (word) => {
          try {
            return /^[a-záéíóúñ\s]+$/i.test(word) && word.length >= 3
          } catch (e) {
            console.warn("Error validando País:", e)
            return false
          }
        },
        Objeto: (word) => {
          try {
            return /^[a-záéíóúñ\s]+$/i.test(word) && word.length >= 3
          } catch (e) {
            console.warn("Error validando Objeto:", e)
            return false
          }
        },
        Profesión: (word) => {
          try {
            return /^[a-záéíóúñ\s]+$/i.test(word) && word.length >= 3
          } catch (e) {
            console.warn("Error validando Profesión:", e)
            return false
          }
        },
        Comida: (word) => {
          try {
            return /^[a-záéíóúñ\s]+$/i.test(word) && word.length >= 3
          } catch (e) {
            console.warn("Error validando Comida:", e)
            return false
          }
        },
      }

      const validator = validations[category]
      const categoryValid = validator ? validator(trimmedAnswer) : true
      const letterMatch = firstLetter === targetLetter

      console.log("validateAnswer debug:", {
        answer: trimmedAnswer,
        category,
        letter,
        firstLetter,
        targetLetter,
        letterMatch,
        categoryValid,
        result: letterMatch && categoryValid,
      })

      return letterMatch && categoryValid
    } catch (error) {
      console.error("Error crítico en validateAnswer:", error, {
        answer,
        category,
        letter,
      })
      return false
    }
  }

  // Función para verificar si el jugador completó todas las categorías
  const checkCompletion = useCallback(() => {
    if (!gameState.currentLetter || gameState.phase !== "playing") {
      return
    }

    const allAnswered = categories.every((category) => {
      const answer = myAnswers[category]
      return answer && validateAnswer(answer, category, gameState.currentLetter)
    })

    if (allAnswered && !isCompleted) {
      setIsCompleted(true)
      setCompletionTime(gameState.roundTimeLimit - gameState.timeLeft)

      // Simular que otros jugadores también completan
      setGameState((prev) => ({
        ...prev,
        playersCompleted: prev.playersCompleted + 1,
      }))
    }
  }, [myAnswers, gameState.currentLetter, gameState.phase, gameState.timeLeft, gameState.roundTimeLimit, isCompleted])

  // Verificar completion cuando cambian las respuestas
  useEffect(() => {
    checkCompletion()
  }, [myAnswers, checkCompletion])

  // Función para procesar resultados de la ronda
  const processRoundResults = () => {
    setTimeout(() => {
      // Calcular puntuaciones
      const updatedPlayers = players.map((player) => {
        let roundScore = 0

        // Simular respuestas de otros jugadores
        if (player.id === 1) {
          // Yo
          categories.forEach((category) => {
            const answer = myAnswers[category]
            if (answer && validateAnswer(answer, category, gameState.currentLetter)) {
              roundScore += 10 // Respuesta correcta
            }
          })

          // Bonus por velocidad si completé
          if (isCompleted && completionTime) {
            if (completionTime <= 30)
              roundScore += 20 // Muy rápido
            else if (completionTime <= 45)
              roundScore += 10 // Rápido
            else roundScore += 5 // Normal
          }
        } else {
          // Simular puntuaciones de otros jugadores
          roundScore = Math.floor(Math.random() * 60) + 20
        }

        return {
          ...player,
          currentRoundScore: roundScore,
          score: player.score + roundScore,
        }
      })

      // Ordenar por puntuación
      updatedPlayers.sort((a, b) => b.score - a.score)
      updatedPlayers.forEach((player, index) => {
        player.position = index + 1
      })

      setPlayers(updatedPlayers)

      // Mostrar resultados por 5 segundos
      setGameState((prev) => ({
        ...prev,
        phase: "results",
        timeLeft: 5,
      }))

      setTimeout(() => {
        if (gameState.currentRound < gameState.totalRounds) {
          // Siguiente ronda
          setGameState((prev) => ({
            ...prev,
            currentRound: prev.currentRound + 1,
            phase: "waiting",
          }))

          setTimeout(() => {
            startNewRound()
          }, 2000)
        } else {
          // Fin del torneo
          const winners = updatedPlayers.slice(0, 3)
          setGameState((prev) => ({
            ...prev,
            phase: "finished",
            winners,
          }))
        }
      }, 5000)
    }, 2000)
  }

  const handleSendMessage = () => {
    if (chatMessage && chatMessage.trim()) {
      setChatMessage("")
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getPositionColor = (position: number) => {
    switch (position) {
      case 1:
        return "text-yellow-400"
      case 2:
        return "text-gray-400"
      case 3:
        return "text-amber-600"
      default:
        return "text-blue-400"
    }
  }

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="w-4 h-4" />
      case 2:
      case 3:
        return <Medal className="w-4 h-4" />
      default:
        return <Star className="w-4 h-4" />
    }
  }

  const getAnswerStatus = (category: string) => {
    try {
      if (!category || typeof category !== "string") {
        console.warn("getAnswerStatus: category inválido:", category)
        return null
      }

      const answer = myAnswers[category]
      if (!answer || typeof answer !== "string" || !gameState.currentLetter) {
        return null
      }

      console.log("getAnswerStatus debug:", { category, answer, currentLetter: gameState.currentLetter })

      const isValid = validateAnswer(answer, category, gameState.currentLetter)
      return isValid ? "correct" : "incorrect"
    } catch (error) {
      console.error("Error en getAnswerStatus:", error, { category })
      return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/tournaments" className="text-white/70 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-lg font-bold text-white">{tournament.name}</h1>
                <p className="text-xs text-gray-300">
                  Ronda {gameState.currentRound}/{gameState.totalRounds} • Premio: $
                  {Math.floor(prizes.prizePool).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="text-white hover:bg-white/10"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
              <Badge className="bg-red-500 text-white">EN VIVO</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Game Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Game Status */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-2">
                        <span className="text-2xl font-bold text-white">{gameState.currentLetter || "?"}</span>
                      </div>
                      <p className="text-sm text-gray-400">Letra Actual</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Clock className="w-6 h-6 text-red-400 mr-2" />
                        <span className="text-2xl font-bold text-white">{formatTime(gameState.timeLeft)}</span>
                      </div>
                      <p className="text-sm text-gray-400">
                        {gameState.phase === "starting"
                          ? "Iniciando..."
                          : gameState.phase === "playing"
                            ? "Tiempo Restante"
                            : gameState.phase === "reviewing"
                              ? "Revisando..."
                              : gameState.phase === "results"
                                ? "Resultados"
                                : "Esperando..."}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-400">Progreso de Ronda</p>
                    <Progress value={(gameState.currentRound / gameState.totalRounds) * 100} className="w-32 h-2" />
                    <p className="text-xs text-gray-400 mt-1">
                      {gameState.currentRound}/{gameState.totalRounds}
                    </p>
                  </div>
                </div>

                {gameState.phase === "playing" && (
                  <div className="space-y-2">
                    <Progress
                      value={((gameState.roundTimeLimit - gameState.timeLeft) / gameState.roundTimeLimit) * 100}
                      className="h-3"
                    />
                    {isCompleted && (
                      <div className="text-center">
                        <Badge className="bg-green-500 text-white">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          ¡Completado en {completionTime}s!
                        </Badge>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Waiting Phase */}
            {gameState.phase === "waiting" && (
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-2xl text-center">
                    Preparando Ronda {gameState.currentRound}
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-center">
                    Esperando a que todos los jugadores estén listos...
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Starting Phase */}
            {gameState.phase === "starting" && (
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-4xl text-center">¡Ronda {gameState.currentRound}!</CardTitle>
                  <CardDescription className="text-gray-300 text-center text-xl">
                    Letra: <span className="text-yellow-400 font-bold text-3xl">{gameState.currentLetter}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-6xl font-bold text-white mb-4">{gameState.timeLeft}</div>
                    <p className="text-gray-300">¡Prepárate!</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Playing Phase */}
            {gameState.phase === "playing" && (
              <div className="grid md:grid-cols-2 gap-4">
                {categories.map((category) => {
                  const status = getAnswerStatus(category)
                  return (
                    <Card key={category} className="bg-white/10 border-white/20 backdrop-blur-sm">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-white text-lg flex items-center justify-between">
                          {category}
                          {status === "correct" && (
                            <Badge className="bg-green-500 text-white">
                              <CheckCircle className="w-3 h-3 mr-1" />✓
                            </Badge>
                          )}
                          {status === "incorrect" && (
                            <Badge className="bg-red-500 text-white">
                              <XCircle className="w-3 h-3 mr-1" />✗
                            </Badge>
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Input
                          placeholder={`${category} con "${gameState.currentLetter}"`}
                          value={myAnswers[category] || ""}
                          onChange={(e) => handleAnswerChange(category, e.target.value)}
                          className={`bg-white/10 border-white/20 text-white placeholder:text-gray-400 ${
                            status === "correct" ? "border-green-500" : status === "incorrect" ? "border-red-500" : ""
                          }`}
                          disabled={isCompleted}
                        />
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}

            {/* Reviewing Phase */}
            {gameState.phase === "reviewing" && (
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-2xl text-center">¡Tiempo Terminado!</CardTitle>
                  <CardDescription className="text-gray-300 text-center">
                    Revisando respuestas y calculando puntuaciones...
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {categories.map((category) => {
                      const answer = myAnswers[category]
                      const isValid = answer && validateAnswer(answer, category, gameState.currentLetter)
                      return (
                        <div key={category} className="border border-white/10 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <span className="text-white font-medium">{category}</span>
                            <span className="text-gray-300">{answer || "Sin respuesta"}</span>
                            {isValid ? (
                              <Badge className="bg-green-500 text-white">+10</Badge>
                            ) : (
                              <Badge className="bg-red-500 text-white">0</Badge>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Results Phase */}
            {gameState.phase === "results" && (
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-2xl text-center">
                    Resultados de la Ronda {gameState.currentRound}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {players.slice(0, 5).map((player, index) => (
                      <div
                        key={player.id}
                        className="flex items-center justify-between border border-white/10 rounded-lg p-4"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`flex items-center ${getPositionColor(player.position)}`}>
                            {getPositionIcon(player.position)}
                            <span className="ml-1 font-bold">#{player.position}</span>
                          </div>
                          <span className="text-white">{player.username}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-green-400 font-bold">+{player.currentRoundScore} pts</p>
                          <p className="text-white text-sm">Total: {player.score}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Finished Phase */}
            {gameState.phase === "finished" && (
              <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-3xl text-center">¡Torneo Finalizado!</CardTitle>
                  <CardDescription className="text-gray-300 text-center text-lg">
                    Pozo Final: ${Math.floor(prizes.prizePool).toLocaleString()} - Felicitaciones a los ganadores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {gameState.winners.map((winner, index) => {
                      const winnerPrizes = [
                        Math.floor(prizes.firstPlace),
                        Math.floor(prizes.secondPlace),
                        Math.floor(prizes.thirdPlace),
                      ]
                      return (
                        <div
                          key={winner.id}
                          className={`flex items-center justify-between p-6 rounded-lg ${
                            index === 0
                              ? "bg-yellow-500/20 border border-yellow-500/30"
                              : index === 1
                                ? "bg-gray-500/20 border border-gray-500/30"
                                : "bg-amber-600/20 border border-amber-600/30"
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-500" : "bg-amber-600"
                              }`}
                            >
                              {index === 0 ? (
                                <Crown className="w-6 h-6 text-white" />
                              ) : (
                                <Medal className="w-6 h-6 text-white" />
                              )}
                            </div>
                            <div>
                              <h3 className="text-white font-bold text-xl">{winner.username}</h3>
                              <p className="text-gray-300">{winner.score} puntos totales</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-green-400 font-bold text-2xl">${winnerPrizes[index].toLocaleString()}</p>
                            <p className="text-gray-400">Premio</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="bg-white/10 border border-white/20 rounded-lg p-4 mt-6">
                    <h4 className="text-white font-semibold mb-2">Resumen del Torneo</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Total Recaudado:</p>
                        <p className="text-white font-bold">${prizes.totalPool.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Pozo de Premios:</p>
                        <p className="text-green-400 font-bold">${Math.floor(prizes.prizePool).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-8">
                    <Link href="/tournaments">
                      <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                        <Trophy className="w-4 h-4 mr-2" />
                        Ver Más Torneos
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Tabs defaultValue="players" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/10 border-white/20">
                <TabsTrigger value="players" className="data-[state=active]:bg-white/20">
                  <Users className="w-4 h-4 mr-2" />
                  Jugadores
                </TabsTrigger>
                <TabsTrigger value="chat" className="data-[state=active]:bg-white/20">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat
                </TabsTrigger>
              </TabsList>

              <TabsContent value="players" className="mt-4">
                <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                      Clasificación
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {players.map((player) => (
                      <div key={player.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`flex items-center ${getPositionColor(player.position)}`}>
                            {getPositionIcon(player.position)}
                            <span className="ml-1 font-bold">#{player.position}</span>
                          </div>
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={player.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-gradient-to-r from-purple-400 to-pink-500 text-white text-xs">
                              {player.username.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="text-white text-sm">{player.username}</span>
                            {player.id === 1 && <Badge className="ml-2 bg-blue-500 text-white text-xs">Tú</Badge>}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold">{player.score}</p>
                          <Badge
                            className={`text-xs ${
                              player.status === "completed"
                                ? "bg-green-500"
                                : player.status === "playing"
                                  ? "bg-blue-500"
                                  : "bg-gray-500"
                            } text-white`}
                          >
                            {player.status === "completed"
                              ? "Terminó"
                              : player.status === "playing"
                                ? "Jugando"
                                : "Eliminado"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="chat" className="mt-4">
                <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <MessageCircle className="w-5 h-5 mr-2 text-blue-400" />
                      Chat del Torneo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 overflow-y-auto mb-4 space-y-2">
                      {chatMessages.map((msg) => (
                        <div key={msg.id} className="text-sm">
                          {msg.type === "system" ? (
                            <div className="text-center">
                              <Badge className="bg-blue-500 text-white text-xs">{msg.message}</Badge>
                            </div>
                          ) : (
                            <div>
                              <span className="text-yellow-400 font-semibold">{msg.username}:</span>
                              <span className="text-gray-300 ml-2">{msg.message}</span>
                              <span className="text-gray-500 text-xs ml-2">{msg.time}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Escribe un mensaje..."
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                      <Button size="sm" onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Tournament Info */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                  Info del Torneo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-lg p-3">
                  <div className="text-center">
                    <p className="text-sm text-gray-300">Pozo Acumulado</p>
                    <p className="text-2xl font-bold text-green-400">
                      ${Math.floor(prizes.prizePool).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400">{tournament.players} jugadores inscritos</p>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Sala:</span>
                  <Badge className={`${tournament.type === "vip" ? "bg-purple-500" : "bg-blue-500"} text-white`}>
                    {tournament.type === "vip" ? "VIP" : "BÁSICA"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">1er Lugar:</span>
                  <span className="text-yellow-400 font-bold">${Math.floor(prizes.firstPlace).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">2do Lugar:</span>
                  <span className="text-gray-400 font-bold">${Math.floor(prizes.secondPlace).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">3er Lugar:</span>
                  <span className="text-amber-600 font-bold">${Math.floor(prizes.thirdPlace).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Jugadores:</span>
                  <span className="text-white">
                    {tournament.players}/{tournament.maxPlayers}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Ronda Actual:</span>
                  <span className="text-white">
                    {gameState.currentRound}/{gameState.totalRounds}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
