import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Trophy, Users, Zap, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function HowToPlayPage() {
  const categories = ["Nombre", "Animal", "Color", "Fruta", "País", "Objeto", "Profesión", "Comida"]

  const gameRules = [
    {
      title: "Objetivo del Juego",
      description:
        "Completa todas las categorías con palabras que empiecen con la letra indicada antes que se acabe el tiempo.",
      icon: Trophy,
    },
    {
      title: "Tiempo Límite",
      description: "Tienes 60 segundos para completar todas las categorías. ¡Cada segundo cuenta!",
      icon: Clock,
    },
    {
      title: "Puntuación",
      description: "Ganas 10 puntos por cada respuesta correcta que empiece con la letra correcta.",
      icon: Zap,
    },
    {
      title: "Competencia",
      description: "Compite contra otros jugadores en tiempo real. El que más puntos obtenga, gana.",
      icon: Users,
    },
  ]

  const scoringRules = [
    { condition: "Respuesta correcta y única", points: 10, color: "text-green-400" },
    { condition: "Respuesta correcta pero repetida", points: 5, color: "text-yellow-400" },
    { condition: "Respuesta incorrecta o vacía", points: 0, color: "text-red-400" },
  ]

  const tips = [
    "Piensa rápido: Las primeras palabras que se te ocurran suelen ser las mejores",
    "Usa palabras comunes: Es menos probable que otros jugadores las usen",
    "No te quedes atascado: Si no sabes una categoría, pasa a la siguiente",
    "Practica las categorías: Familiarízate con palabras de cada categoría",
    "Mantén la calma: La presión del tiempo puede hacer que cometas errores",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Link href="/" className="text-white/70 hover:text-white mr-4">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white">Cómo Jugar</h1>
              <p className="text-xs text-gray-300">Aprende las reglas de TuttiFrutti Pro</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">¿Cómo se Juega TuttiFrutti?</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Aprende las reglas básicas y conviértete en un maestro de las palabras
          </p>
        </div>

        {/* Game Rules */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {gameRules.map((rule, index) => (
            <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <rule.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white">{rule.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{rule.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Categories */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm mb-12">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Categorías del Juego</CardTitle>
            <CardDescription className="text-gray-300">
              Estas son las 8 categorías que debes completar en cada ronda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category, index) => (
                <div key={index} className="text-center">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-sm">
                    {category}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Scoring System */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm mb-12">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Sistema de Puntuación</CardTitle>
            <CardDescription className="text-gray-300">Así es como se calculan tus puntos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scoringRules.map((rule, index) => (
                <div key={index} className="flex items-center justify-between border border-white/10 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    {rule.points > 0 ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    )}
                    <span className="text-white">{rule.condition}</span>
                  </div>
                  <span className={`font-bold ${rule.color}`}>{rule.points} puntos</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Game Flow */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm mb-12">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Flujo del Juego</CardTitle>
            <CardDescription className="text-gray-300">Paso a paso de una partida típica</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-white font-semibold">Únete al Torneo</h3>
                  <p className="text-gray-300">Paga la inscripción y espera a que se llene la sala</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-white font-semibold">Se Sortea la Letra</h3>
                  <p className="text-gray-300">El sistema elige una letra aleatoria para la ronda</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-white font-semibold">¡A Jugar!</h3>
                  <p className="text-gray-300">Tienes 60 segundos para completar todas las categorías</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-white font-semibold">Revisión de Respuestas</h3>
                  <p className="text-gray-300">Se validan las respuestas y se calculan los puntos</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold">
                  5
                </div>
                <div>
                  <h3 className="text-white font-semibold">Resultados</h3>
                  <p className="text-gray-300">Se muestran los ganadores y se reparten los premios</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm mb-12">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Consejos para Ganar</CardTitle>
            <CardDescription className="text-gray-300">Estrategias de los mejores jugadores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3 border border-white/10 rounded-lg p-4">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300">{tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">¿Listo para Jugar?</h2>
          <p className="text-gray-300 mb-8">Únete a un torneo y pon en práctica lo que aprendiste</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tournaments">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
              >
                Ver Torneos Disponibles
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Crear Cuenta Gratis
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
