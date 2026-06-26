CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nama` VARCHAR(100) NOT NULL,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('admin', 'pelanggan') NOT NULL DEFAULT 'pelanggan',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `kategori` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nama_kategori` VARCHAR(50) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `menu` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `kategori_id` INT NOT NULL,
  `nama_menu` VARCHAR(100) NOT NULL,
  `deskripsi` TEXT,
  `harga` DECIMAL(10,2) NOT NULL,
  `gambar` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`kategori_id`) REFERENCES `kategori`(`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `keranjang` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,a
  `user_id` INT NOT NULL,
  `menu_id` INT NOT NULL,
  `jumlah` INT NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`menu_id`) REFERENCES `menu`(`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `pesanan` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `tanggal_pesan` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `total_harga` DECIMAL(10,2) NOT NULL,
  `status` ENUM('diproses', 'selesai', 'dibatalkan') NOT NULL DEFAULT 'diproses',
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `detail_pesanan` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `pesanan_id` INT NOT NULL,
  `menu_id` INT NOT NULL,
  `jumlah` INT NOT NULL,
  `harga_satuan` DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (`pesanan_id`) REFERENCES `pesanan`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`menu_id`) REFERENCES `menu`(`id`) ON DELETE CASCADE
);

-- Insert default admin (password: admin123)
INSERT IGNORE INTO `users` (`id`, `nama`, `username`, `password`, `role`) VALUES
(1, 'Administrator', 'admin', '$2y$10$O03Vl18/X9fC.Jt7BvR9yOiZ.6G41Z0g6A7i5Z124458i/i9lA/1C', 'admin');
