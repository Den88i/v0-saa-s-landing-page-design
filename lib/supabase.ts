import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos de TypeScript para la base de datos
export interface User {
  id: string
  email: string
  username: string
  balance: number
  total_winnings: number
  level: number
  xp: number
  wins: number
  total_games: number
  win_rate: number
  rank_title: string
  avatar_url?: string
  is_online: boolean
  last_active: string
  created_at: string
  updated_at: string
}

export interface Tournament {
  id: string
  name: string
  description?: string
  type: "basic" | "vip"
  entry_fee: number
  max_players: number
  current_players: number
  total_pool: number
  prize_pool: number
  admin_commission: number
  status: "waiting" | "registering" | "live" | "finished" | "cancelled"
  start_time: string
  end_time?: string
  rounds: number
  time_per_round: number
  created_at: string
  updated_at: string
}

export interface TournamentRegistration {
  id: string
  tournament_id: string
  user_id: string
  payment_id?: string
  amount_paid: number
  status: "pending" | "confirmed" | "cancelled"
  registered_at: string
}

export interface Game {
  id: string
  tournament_id: string
  round_number: number
  letter: string
  status: "waiting" | "playing" | "finished"
  start_time?: string
  end_time?: string
  time_limit: number
  created_at: string
}

export interface GameAnswer {
  id: string
  game_id: string
  user_id: string
  category: string
  answer?: string
  is_valid: boolean
  points: number
  completion_time?: number
  submitted_at: string
}

export interface Transaction {
  id: string
  user_id: string
  tournament_id?: string
  type: "entry_fee" | "prize" | "withdrawal" | "bonus" | "refund"
  amount: number
  description?: string
  payment_method?: string
  external_payment_id?: string
  status: "pending" | "completed" | "failed" | "cancelled"
  created_at: string
}

// Funciones helper para la base de datos
export const dbHelpers = {
  // Usuarios
  async createUser(userData: Partial<User>) {
    const { data, error } = await supabase.from("users").insert(userData).select().single()

    if (error) throw error
    return data
  },

  async getUserByEmail(email: string) {
    const { data, error } = await supabase.from("users").select("*").eq("email", email).single()

    if (error && error.code !== "PGRST116") throw error
    return data
  },

  async updateUserBalance(userId: string, amount: number) {
    const { data, error } = await supabase.from("users").update({ balance: amount }).eq("id", userId).select().single()

    if (error) throw error
    return data
  },

  // Torneos
  async getTournaments(status?: string) {
    let query = supabase.from("tournaments").select("*").order("start_time", { ascending: true })

    if (status) {
      query = query.eq("status", status)
    }

    const { data, error } = await query
    if (error) throw error
    return data
  },

  async createTournament(tournamentData: Partial<Tournament>) {
    const { data, error } = await supabase.from("tournaments").insert(tournamentData).select().single()

    if (error) throw error
    return data
  },

  async registerForTournament(registrationData: Partial<TournamentRegistration>) {
    const { data, error } = await supabase.from("tournament_registrations").insert(registrationData).select().single()

    if (error) throw error
    return data
  },

  // Transacciones
  async createTransaction(transactionData: Partial<Transaction>) {
    const { data, error } = await supabase.from("transactions").insert(transactionData).select().single()

    if (error) throw error
    return data
  },

  async getUserTransactions(userId: string) {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  },

  // Configuración del sistema
  async getSystemConfig(key: string) {
    const { data, error } = await supabase.from("system_config").select("value").eq("key", key).single()

    if (error) throw error
    return data?.value
  },

  async updateSystemConfig(key: string, value: string) {
    const { data, error } = await supabase.from("system_config").upsert({ key, value }).select().single()

    if (error) throw error
    return data
  },
}
