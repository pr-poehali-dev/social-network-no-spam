CREATE TABLE IF NOT EXISTS t_p78119248_social_network_no_sp.users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS t_p78119248_social_network_no_sp.sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES t_p78119248_social_network_no_sp.users(id),
  token VARCHAR(64) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);