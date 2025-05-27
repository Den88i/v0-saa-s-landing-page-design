-- Crear tablas para TuttiFrutti Pro

-- Tabla de usuarios
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  balance DECIMAL(10,2) DEFAULT 0.00,
  total_winnings DECIMAL(10,2) DEFAULT 0.00,
  level INTEGER DEFAULT 1,
  xp INTEGER DEFAULT 0,
  wins INTEGER DEFAULT 0,
  total_games INTEGER DEFAULT 0,
  win_rate DECIMAL(5,2) DEFAULT 0.00,
  rank_title VARCHAR(50) DEFAULT 'Novato',
  avatar_url TEXT,
  is_online BOOLEAN DEFAULT false,
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de torneos
CREATE TABLE tournaments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(20) NOT NULL CHECK (type IN ('basic', 'vip')),
  entry_fee DECIMAL(10,2) NOT NULL,
  max_players INTEGER NOT NULL,
  current_players INTEGER DEFAULT 0,
  total_pool DECIMAL(10,2) DEFAULT 0.00,
  prize_pool DECIMAL(10,2) DEFAULT 0.00,
  admin_commission DECIMAL(10,2) DEFAULT 0.00,
  status VARCHAR(20) DEFAULT 'waiting' CHECK (status IN ('waiting', 'registering', 'live', 'finished', 'cancelled')),
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE,
  rounds INTEGER DEFAULT 5,
  time_per_round INTEGER DEFAULT 60,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de inscripciones a torneos
CREATE TABLE tournament_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tournament_id UUID REFERENCES tournaments(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  payment_id VARCHAR(255),
  amount_paid DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(tournament_id, user_id)
);

-- Tabla de partidas/juegos
CREATE TABLE games (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tournament_id UUID REFERENCES tournaments(id) ON DELETE CASCADE,
  round_number INTEGER NOT NULL,
  letter VARCHAR(1) NOT NULL,
  status VARCHAR(20) DEFAULT 'waiting' CHECK (status IN ('waiting', 'playing', 'finished')),
  start_time TIMESTAMP WITH TIME ZONE,
  end_time TIMESTAMP WITH TIME ZONE,
  time_limit INTEGER DEFAULT 60,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de respuestas de jugadores
CREATE TABLE game_answers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  game_id UUID REFERENCES games(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(50) NOT NULL,
  answer VARCHAR(255),
  is_valid BOOLEAN DEFAULT false,
  points INTEGER DEFAULT 0,
  completion_time INTEGER, -- segundos que tardó en completar
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(game_id, user_id, category)
);

-- Tabla de resultados de torneos
CREATE TABLE tournament_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tournament_id UUID REFERENCES tournaments(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  final_position INTEGER NOT NULL,
  total_score INTEGER DEFAULT 0,
  prize_amount DECIMAL(10,2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(tournament_id, user_id)
);

-- Tabla de transacciones
CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  tournament_id UUID REFERENCES tournaments(id) ON DELETE SET NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('entry_fee', 'prize', 'withdrawal', 'bonus', 'refund')),
  amount DECIMAL(10,2) NOT NULL,
  description TEXT,
  payment_method VARCHAR(50),
  external_payment_id VARCHAR(255),
  status VARCHAR(20) DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de configuración del sistema
CREATE TABLE system_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de chat de torneos
CREATE TABLE tournament_chat (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tournament_id UUID REFERENCES tournaments(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  message_type VARCHAR(20) DEFAULT 'chat' CHECK (message_type IN ('chat', 'system', 'announcement')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de logros/achievements
CREATE TABLE achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  requirement_type VARCHAR(50) NOT NULL,
  requirement_value INTEGER NOT NULL,
  reward_xp INTEGER DEFAULT 0,
  reward_money DECIMAL(10,2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de logros de usuarios
CREATE TABLE user_achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
  progress INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- Insertar configuración inicial del sistema
INSERT INTO system_config (key, value, description) VALUES
('admin_commission_rate', '0.30', 'Porcentaje de comisión del administrador (30%)'),
('first_place_percentage', '0.60', 'Porcentaje del pozo para el primer lugar'),
('second_place_percentage', '0.30', 'Porcentaje del pozo para el segundo lugar'),
('third_place_percentage', '0.10', 'Porcentaje del pozo para el tercer lugar'),
('basic_room_price', '2500', 'Precio de entrada a sala básica'),
('vip_room_price', '5000', 'Precio de entrada a sala VIP'),
('game_time_limit', '60', 'Tiempo límite por ronda en segundos'),
('max_players_basic', '64', 'Máximo de jugadores en sala básica'),
('max_players_vip', '32', 'Máximo de jugadores en sala VIP'),
('minimum_withdrawal', '1000', 'Mínimo para retirar dinero'),
('welcome_bonus', '500', 'Bono de bienvenida para nuevos usuarios'),
('daily_bonus', '250', 'Bono diario para usuarios activos');

-- Insertar logros iniciales
INSERT INTO achievements (name, description, icon, requirement_type, requirement_value, reward_xp, reward_money) VALUES
('Primera Victoria', 'Gana tu primera partida', 'trophy', 'wins', 1, 100, 100),
('Racha de Fuego', 'Gana 5 partidas seguidas', 'fire', 'win_streak', 5, 500, 500),
('Social', 'Juega 10 partidas multijugador', 'users', 'total_games', 10, 200, 200),
('Rey de Palabras', 'Alcanza el nivel 20', 'crown', 'level', 20, 1000, 1000),
('Gran Ganador', 'Alcanza $10,000 en premios', 'dollar-sign', 'total_winnings', 10000, 2000, 1000),
('Dedicado', 'Juega 30 días consecutivos', 'calendar', 'consecutive_days', 30, 1500, 750),
('Velocista', 'Completa una ronda en menos de 30 segundos', 'zap', 'fast_completion', 30, 300, 300),
('Perfeccionista', 'Obtén puntuación perfecta en una ronda', 'star', 'perfect_round', 1, 800, 400);

-- Crear índices para mejorar rendimiento
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_tournaments_status ON tournaments(status);
CREATE INDEX idx_tournaments_start_time ON tournaments(start_time);
CREATE INDEX idx_tournament_registrations_tournament_id ON tournament_registrations(tournament_id);
CREATE INDEX idx_tournament_registrations_user_id ON tournament_registrations(user_id);
CREATE INDEX idx_games_tournament_id ON games(tournament_id);
CREATE INDEX idx_game_answers_game_id ON game_answers(game_id);
CREATE INDEX idx_game_answers_user_id ON game_answers(user_id);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_tournament_chat_tournament_id ON tournament_chat(tournament_id);

-- Crear funciones para actualizar timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear triggers para actualizar timestamps automáticamente
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tournaments_updated_at BEFORE UPDATE ON tournaments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_system_config_updated_at BEFORE UPDATE ON system_config FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Función para calcular win rate automáticamente
CREATE OR REPLACE FUNCTION calculate_win_rate()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.total_games > 0 THEN
        NEW.win_rate = (NEW.wins::DECIMAL / NEW.total_games::DECIMAL) * 100;
    ELSE
        NEW.win_rate = 0;
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER calculate_user_win_rate BEFORE INSERT OR UPDATE ON users FOR EACH ROW EXECUTE FUNCTION calculate_win_rate();

-- Función para actualizar el pozo del torneo cuando se registra un jugador
CREATE OR REPLACE FUNCTION update_tournament_pool()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' AND NEW.status = 'confirmed' THEN
        UPDATE tournaments 
        SET 
            current_players = current_players + 1,
            total_pool = total_pool + NEW.amount_paid,
            prize_pool = (total_pool + NEW.amount_paid) * 0.7,
            admin_commission = (total_pool + NEW.amount_paid) * 0.3
        WHERE id = NEW.tournament_id;
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tournament_pool_trigger AFTER INSERT ON tournament_registrations FOR EACH ROW EXECUTE FUNCTION update_tournament_pool();
