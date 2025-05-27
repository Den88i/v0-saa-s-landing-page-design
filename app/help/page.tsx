"use client" // Asegúrate de que esta línea esté siempre arriba

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, HelpCircle, MessageCircle, Mail, Phone, CheckCircle } from "lucide-react"
import Link from "next/link" // 'Link' en lugar de 'enlace' y 'next/link' en lugar de 'siguiente/enlace'

export default function HelpPage() { // 'export default' en lugar de 'export función predeterminada'
  const faqItems = [
    {
      question: "¿Cómo puedo retirar mis ganancias?",
      answer: "Puedes retirar tus ganancias desde tu panel de usuario. Los retiros se procesan en 24-48 horas hábiles a través de transferencia bancaria o MercadoPago.",
      category: "Pagos" // 'category' en lugar de 'categoría'
    },
    {
      question: "¿Cuál es el mínimo para retirar?",
      answer: "El mínimo para retirar es de $1,000 pesos. No hay comisiones por retiros superiores a $5,000.",
      category: "Pagos"
    },
    {
      question: "¿Cómo funcionan los torneos?",
      answer: "Los torneos son partidas en tiempo real donde compites completando categorías con palabras que empiecen con una letra específica. Los primeros 3 lugares ganan premios.",
      category: "Juego"
    },
    {
      question: "¿Qué pasa si pierdo conexión durante un torneo?",
      answer: "Si pierdes conexión, tienes 60 segundos para reconectarte. Si no logras reconectarte, se considerará que abandonaste el torneo.",
      category: "Técnico"
    },
    {
      question: "¿Puedo jugar desde mi celular?",
      answer: "Sí, la plataforma está optimizada para dispositivos móviles. Puedes jugar desde cualquier navegador en tu teléfono o tablet.",
      category: "Técnico"
    },
    {
      question: "¿Cómo se validan las respuestas?",
      answer: "Las respuestas se validan automáticamente contra nuestra base de datos. También hay moderadores que revisan respuestas dudosas.",
      category: "Juego"
    }
  ]

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "Chat en Vivo",
      description: "Respuesta inmediata",
      availability: "24/7",
      action: "Iniciar Chat",
      color: "bg-green-500"
    },
    {
      icon: Mail,
      title: "Email",
      description: "soporte@tuttifrutti.pro",
      availability: "Respuesta en 2-4 horas",
      action: "Enviar Email",
      color: "bg-blue-500"
    },
    {
      icon: Phone,
      title: "WhatsApp",
      description: "+54 11 1234-5678",
      availability: "Lun-Vie 9:00-18:00",
      action: "Contactar",
      color: "bg-green-600"
    }
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
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Centro de Ayuda</h1>
                <p className="text-xs text-gray-300">Estamos aquí para ayudarte</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">¿En qué podemos ayudarte?</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Encuentra respuestas rápidas o contacta con nuestro equipo de soporte
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all">
              <CardHeader className="text-center">
                <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <method.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white">{method.title}</CardTitle>
                <CardDescription className="text-gray-300">{method.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-gray-400 mb-4">{method.availability}</p>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  {method.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Preguntas Frecuentes</CardTitle>
            <CardDescription className="text-gray-300">
              Las respuestas a las preguntas más comunes de nuestros usuarios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <div key={index} className="border border-white/10 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-white font-semibold text-lg">{item.question}</h3>
                    <Badge className="bg-blue-500 text-white ml-4">{item.category}</Badge>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Resources */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Guías y Tutoriales</CardTitle>
              <CardDescription className="text-gray-300">Aprende a usar la plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3 border-b border-white/10 pb-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <Link href="/how-to-play" className="text-white hover:text-yellow-400 transition-colors">
                  Cómo jugar TuttiFrutti
                </Link>
              </div>
              <div className="flex items-center space-x-3 border-b border-white/10 pb-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <Link href="/tournaments" className="text-white hover:text-yellow-400 transition-colors">
                  Guía de torneos
                </Link>
              </div>
              <div className="flex items-center space-x-3 border-b border-white/10 pb-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <Link href="/dashboard" className="text-white hover:text-yellow-400 transition-colors">
                  Gestionar tu cuenta
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <Link href="/responsible" className="text-white hover:text-yellow-400 transition-colors">
                  Juego responsable
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Estado del Sistema</CardTitle>
              <CardDescription className="text-gray-300">Información en tiempo real</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white">Servidores de Juego</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-green-400 text-sm">Operativo</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Sistema de Pagos</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-green-400 text-sm">Operativo</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Chat en Vivo</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-green-400 text-sm">Disponible</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Tiempo de Respuesta</span>
                {/* ESTA ES LA LÍNEA QUE CAUSABA EL ERROR: eliminado el '\' */}
                <span className="text-blue-400 text-sm">&lt; 2 minutos</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <h2 className="text-3xl font-bold text-white mb-4">¿No encontraste lo que buscabas?</h2>
          <p className="text-gray-300 mb-8">Nuestro equipo de soporte está disponible 24/7 para ayudarte</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              Iniciar Chat en Vivo
            </Button>
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Mail className="mr-2 w-5 h-5" />
              Enviar Email
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
