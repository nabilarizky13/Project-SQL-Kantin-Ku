-- Tabel users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'pelanggan' CHECK (role IN ('admin', 'pelanggan')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel kategori
CREATE TABLE IF NOT EXISTS kategori (
  id SERIAL PRIMARY KEY,
  nama_kategori VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel menu
CREATE TABLE IF NOT EXISTS menu (
  id SERIAL PRIMARY KEY,
  kategori_id INT NOT NULL,
  nama_menu VARCHAR(100) NOT NULL,
  deskripsi TEXT,
  harga DECIMAL(10,2) NOT NULL,
  gambar VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (kategori_id) REFERENCES kategori(id) ON DELETE CASCADE
);

-- Tabel keranjang
CREATE TABLE IF NOT EXISTS keranjang (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  menu_id INT NOT NULL,
  jumlah INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (menu_id) REFERENCES menu(id) ON DELETE CASCADE
);

-- Tabel pesanan
CREATE TABLE IF NOT EXISTS pesanan (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  tanggal_pesan TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total_harga DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'diproses' CHECK (status IN ('diproses', 'selesai', 'dibatalkan')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabel detail_pesanan
CREATE TABLE IF NOT EXISTS detail_pesanan (
  id SERIAL PRIMARY KEY,
  pesanan_id INT NOT NULL,
  menu_id INT NOT NULL,
  jumlah INT NOT NULL,
  harga_satuan DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (pesanan_id) REFERENCES pesanan(id) ON DELETE CASCADE,
  FOREIGN KEY (menu_id) REFERENCES menu(id) ON DELETE CASCADE
);

-- Session table for connect-pg-simple
CREATE TABLE IF NOT EXISTS "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");

-- Insert default admin (password: admin123)
INSERT INTO users (nama, username, password, role) VALUES
('Administrator', 'admin', '$2y$10$O03Vl18/X9fC.Jt7BvR9yOiZ.6G41Z0g6A7i5Z124458i/i9lA/1C', 'admin')
ON CONFLICT (username) DO NOTHING;
