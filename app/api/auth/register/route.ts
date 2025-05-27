import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { dbHelpers } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json()

    // Validaciones básicas
    if (!username || !email || !password) {
      return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 })
    }

    // Verificar si el usuario ya existe
    const existingUser = await dbHelpers.getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: "El email ya está registrado" }, { status: 400 })
    }

    // Encriptar contraseña
    const passwordHash = await bcrypt.hash(password, 12)

    // Obtener bono de bienvenida
    const welcomeBonus = await dbHelpers.getSystemConfig("welcome_bonus")

    // Crear usuario
    const newUser = await dbHelpers.createUser({
      username,
      email,
      password_hash: passwordHash,
      balance: Number.parseFloat(welcomeBonus || "500"),
      rank_title: "Novato",
    })

    // Crear transacción de bono de bienvenida
    await dbHelpers.createTransaction({
      user_id: newUser.id,
      type: "bonus",
      amount: Number.parseFloat(welcomeBonus || "500"),
      description: "Bono de bienvenida",
      status: "completed",
    })

    // No devolver la contraseña
    const { password_hash, ...userWithoutPassword } = newUser

    return NextResponse.json({
      message: "Usuario creado exitosamente",
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Error en registro:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
