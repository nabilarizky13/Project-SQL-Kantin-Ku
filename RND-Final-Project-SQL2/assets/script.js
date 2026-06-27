"use strict";
/* =========================================================
   DATA KANTINKU NABILA RIZKY — AUTO PREFILL
   ========================================================= */
const KANTINKU_PREFILL = {"judulProyek":"KantinKu — Sistem Pemesanan Makanan Kantin Berbasis Web","namaMahasiswa":"Nabila Rizky","nim":"(NIM - Isi NIM kamu)","kelasSemester":"Manajemen Informatika","dosenPengampu":"(Dosen Pengampu)","institusi":"Politeknik Negeri Lampung","tglMulai":"2026-02-01","tglSelesai":"2026-06-26","latarBelakang":"Kantin merupakan salah satu fasilitas penting di lingkungan kampus Politeknik Negeri Lampung. Namun proses pemesanan makanan yang selama ini berjalan masih dilakukan secara manual: pelanggan harus datang langsung ke kantin, mengantri, dan memesan secara tatap muka. Hal ini sering menimbulkan antrean panjang, ketidakefisienan waktu, dan kesulitan bagi pengelola kantin dalam merekap pesanan serta memantau pendapatan.\n\nUntuk mengatasi permasalahan tersebut, dibangun aplikasi web bernama KantinKu yang memungkinkan pelanggan melihat menu, menambahkan item ke keranjang, dan melakukan checkout secara online. Admin kantin dapat mengelola data menu, kategori, dan memantau status pesanan langsung dari dashboard. Aplikasi ini menggunakan database relasional PostgreSQL yang di-hosting di Supabase dan di-deploy ke platform Netlify.","rumusanMasalah":"1. Bagaimana merancang dan mengimplementasikan database relasional yang dapat menyimpan data pengguna, kategori menu, menu, keranjang, pesanan, dan detail pesanan secara terstruktur?\n2. Bagaimana membangun aplikasi web berbasis Node.js + Express.js yang mengintegrasikan operasi CRUD (Create, Read, Update, Delete) pada seluruh entitas data?\n3. Bagaimana mengimplementasikan sistem autentikasi berbasis sesi (session) untuk membedakan hak akses antara admin dan pelanggan?\n4. Bagaimana melakukan deployment aplikasi ke platform cloud (Netlify) dengan database PostgreSQL di Supabase sehingga dapat diakses secara online?","tujuanProyek":"1. Merancang skema database relasional dengan 6 tabel (users, kategori, menu, keranjang, pesanan, detail_pesanan) beserta relasi foreign key yang sesuai.\n2. Mengimplementasikan operasi CRUD lengkap pada setiap entitas: manajemen menu dan kategori oleh admin, serta pemesanan dan keranjang belanja oleh pelanggan.\n3. Membangun sistem autentikasi pengguna dengan enkripsi password menggunakan bcrypt dan manajemen sesi berbasis PostgreSQL.\n4. Mengintegrasikan Supabase Storage untuk menyimpan gambar menu secara cloud.\n5. Melakukan deployment aplikasi ke Netlify sebagai serverless function agar dapat diakses oleh publik.","lingkupDikerjakan":"- Manajemen pengguna (registrasi, login, logout) dengan role admin dan pelanggan\n- CRUD kategori menu (admin)\n- CRUD menu beserta upload gambar ke Supabase Storage (admin)\n- Tampilan beranda pelanggan dengan filter kategori\n- Detail produk dan tambah ke keranjang\n- Manajemen keranjang belanja (tambah, hapus, checkout)\n- Riwayat pesanan pelanggan\n- Dashboard admin: statistik pesanan, pendapatan, menu terbaru\n- Manajemen status pesanan oleh admin\n- Deployment ke Netlify + Supabase","lingkupTidak":"- Notifikasi real-time (WebSocket / push notification)\n- Pembayaran online / payment gateway\n- Manajemen stok / inventaris bahan baku\n- Fitur rating dan ulasan menu\n- Aplikasi mobile (Android / iOS)\n- Multi-kantin / multi-tenant\n- Laporan keuangan dalam bentuk grafik","targetUser":"Pelanggan kantin (mahasiswa, dosen, staf) Politeknik Negeri Lampung dan Admin/pengelola kantin yang mengelola menu dan pesanan.","manfaat":"Bagi pelanggan: mempermudah proses pemesanan makanan tanpa harus mengantri fisik, serta dapat memantau riwayat pesanan secara online.\nBagi admin/pengelola: mempermudah pengelolaan menu, kategori, dan pemantauan pesanan serta pendapatan secara terpusat dan real-time melalui dashboard berbasis web.","techStackDetail":"Arsitektur: aplikasi web full-stack berbasis Node.js dengan pola MVC (Model-View-Controller).\n- Backend: Node.js v18+ dengan framework Express.js v5\n- Database: PostgreSQL (hosting di Supabase) — driver pg (node-postgres)\n- Session Storage: PostgreSQL via connect-pg-simple\n- Frontend: HTML5, CSS3, EJS (Embedded JavaScript) template engine\n- File Storage: Supabase Storage (bucket menu-images) untuk gambar menu\n- Upload: Multer (memory storage, Netlify-compatible)\n- Autentikasi: Express-Session + bcrypt (enkripsi password)\n- Deployment: Netlify (serverless function via serverless-http)\n- ORM/Query: Raw SQL dengan parameterized query ($1, $2, ...)\n- Keamanan: parameterized query (mencegah SQL Injection), bcrypt hash password, validasi sesi per request","folderStructureDetail":"kantinku/\n|-- server.js              # Entry point aplikasi\n|-- package.json           # Dependensi Node.js\n|-- netlify.toml           # Konfigurasi deployment Netlify\n|-- database.sql           # Skema MySQL (referensi lokal)\n|-- database_postgres.sql  # Skema PostgreSQL (production)\n|-- config/\n|   |-- db.js              # Koneksi pool PostgreSQL (pg)\n|   `-- supabase.js        # Klien Supabase Storage\n|-- routes/\n|   |-- auth.js            # Login, register, logout\n|   |-- index.js           # Halaman pelanggan (beranda, keranjang, pesanan)\n|   `-- admin.js           # Dashboard & CRUD admin\n|-- views/\n|   |-- login.ejs\n|   |-- register.ejs\n|   |-- index.ejs          # Beranda (daftar menu)\n|   |-- detail.ejs         # Detail menu\n|   |-- keranjang.ejs      # Keranjang belanja\n|   |-- pesanan_saya.ejs   # Riwayat pesanan pelanggan\n|   `-- admin/\n|       |-- index.ejs      # Dashboard admin\n|       |-- kategori.ejs   # CRUD kategori\n|       |-- menu.ejs       # CRUD menu\n|       `-- pesanan.ejs    # Manajemen pesanan\n|-- assets/\n|   `-- css/style.css      # Stylesheet global\n`-- functions/\n    `-- api.js             # Netlify serverless function wrapper","userFlow":"Pelanggan: Buka aplikasi -> Login / Register -> Beranda (daftar menu, filter kategori) -> Klik \"Lihat Detail\" -> Pilih jumlah -> Tambah ke Keranjang -> Halaman Keranjang -> Checkout -> Riwayat Pesanan\nAdmin: Login (username: admin) -> Redirect ke Dashboard Admin -> Kelola Kategori (tambah/edit/hapus) -> Kelola Menu (tambah/edit/hapus + upload gambar) -> Kelola Pesanan (ubah status: diproses -> selesai / dibatalkan) -> Logout","routingTable":"GET  /login              -> Form login\nPOST /login              -> Proses autentikasi\nGET  /register           -> Form registrasi\nPOST /register           -> Proses pendaftaran\nGET  /logout             -> Hapus sesi, redirect login\nGET  /                   -> Beranda (daftar menu + filter kategori)\nGET  /detail?id=:id      -> Detail menu\nPOST /detail?id=:id      -> Tambah ke keranjang\nGET  /keranjang          -> Halaman keranjang\nGET  /keranjang?hapus=:id-> Hapus item keranjang\nPOST /keranjang          -> Checkout pesanan\nGET  /pesanan_saya       -> Riwayat pesanan pelanggan\nGET  /admin              -> Dashboard admin\nGET  /admin/kategori     -> List + form CRUD kategori\nPOST /admin/kategori     -> Simpan / update kategori\nGET  /admin/menu         -> List + form CRUD menu\nPOST /admin/menu         -> Simpan / update menu (multipart)\nGET  /admin/pesanan      -> List pesanan semua pelanggan\nGET  /admin/pesanan?update_status=:s&id=:id -> Update status pesanan","codeCreate":"-- INSERT menu baru\nINSERT INTO menu (kategori_id, nama_menu, deskripsi, harga, gambar)\nVALUES ($1, $2, $3, $4, $5);\n\n-- INSERT keranjang (cek duplikat dulu)\nINSERT INTO keranjang (user_id, menu_id, jumlah) VALUES ($1, $2, $3);\n\n-- INSERT pesanan + detail_pesanan\nINSERT INTO pesanan (user_id, total_harga, status)\nVALUES ($1, $2, 'diproses') RETURNING id;\n\nINSERT INTO detail_pesanan (pesanan_id, menu_id, jumlah, harga_satuan)\nVALUES ($1, $2, $3, $4);","codeRead":"-- Baca semua menu dengan kategori (LEFT JOIN)\nSELECT m.*, k.nama_kategori\nFROM menu m\nLEFT JOIN kategori k ON m.kategori_id = k.id\nORDER BY m.id DESC;\n\n-- Baca keranjang pelanggan (JOIN menu)\nSELECT k.id AS keranjang_id, k.jumlah, m.*\nFROM keranjang k\nJOIN menu m ON k.menu_id = m.id\nWHERE k.user_id = $1;\n\n-- Baca pesanan dengan nama pelanggan (JOIN users)\nSELECT p.*, u.nama\nFROM pesanan p\nJOIN users u ON p.user_id = u.id\nORDER BY p.id DESC;\n\n-- Baca detail pesanan (JOIN menu)\nSELECT dp.jumlah, m.nama_menu\nFROM detail_pesanan dp\nJOIN menu m ON dp.menu_id = m.id\nWHERE dp.pesanan_id = $1;","codeUpdate":"-- Update kategori\nUPDATE kategori SET nama_kategori = $1 WHERE id = $2;\n\n-- Update menu (tanpa gambar baru)\nUPDATE menu SET kategori_id=$1, nama_menu=$2, deskripsi=$3, harga=$4 WHERE id=$5;\n\n-- Update menu (dengan gambar baru)\nUPDATE menu SET kategori_id=$1, nama_menu=$2, deskripsi=$3, harga=$4, gambar=$5 WHERE id=$6;\n\n-- Update jumlah keranjang (jika item sudah ada)\nUPDATE keranjang SET jumlah = $1 WHERE id = $2;\n\n-- Update status pesanan oleh admin\nUPDATE pesanan SET status = $1 WHERE id = $2;","codeDelete":"-- Hapus kategori (CASCADE ke menu)\nDELETE FROM kategori WHERE id = $1;\n\n-- Hapus menu (CASCADE ke keranjang & detail_pesanan)\nDELETE FROM menu WHERE id = $1;\n\n-- Hapus item dari keranjang pelanggan\nDELETE FROM keranjang WHERE id = $1 AND user_id = $2;\n\n-- Kosongkan keranjang setelah checkout\nDELETE FROM keranjang WHERE user_id = $1;","metodeHosting":"VPS / Cloud","urlHosting":"https://kantinku.netlify.app","langkahDeploy":"1. Buat akun di Supabase, buat project dan jalankan database_postgres.sql di SQL Editor untuk membuat semua tabel.\n2. Ambil DATABASE_URL dari Supabase dan buat bucket \"menu-images\" di Supabase Storage (set public).\n3. Buat akun Netlify dan hubungkan dengan repository GitHub proyek ini.\n4. Tambahkan Environment Variables di Netlify: DATABASE_URL, SUPABASE_URL, SUPABASE_ANON_KEY.\n5. Netlify otomatis membaca netlify.toml: build functions dari folder /functions, semua request di-redirect ke /.netlify/functions/api.\n6. Lakukan push ke main branch — Netlify otomatis trigger build dan deploy.\n7. Uji coba aplikasi melalui URL deployment yang diberikan Netlify.","konfigChange":"Lokal:\n- Database: MySQL / PostgreSQL lokal (localhost)\n- Config: file .env atau hardcode di config/db.js\n- Run: node server.js (port 3000)\n\nHosting (Netlify + Supabase):\n- Database: PostgreSQL Supabase (DATABASE_URL dari environment variable)\n- Storage: Supabase Storage bucket menu-images (SUPABASE_URL, SUPABASE_ANON_KEY)\n- Fungsi: serverless-http wrap Express app di functions/api.js\n- Semua request di-redirect via netlify.toml ke /.netlify/functions/api","ringkasanPengujian":"Seluruh skenario pengujian fungsional telah dijalankan mencakup operasi CRUD pada semua entitas (kategori, menu, keranjang, pesanan), alur autentikasi (login/register/logout), validasi hak akses (admin vs pelanggan), dan proses checkout. Semua 18 skenario utama berhasil dijalankan sesuai harapan. Upload gambar ke Supabase Storage dan sesi berbasis PostgreSQL juga berjalan dengan baik.","kendalaSolusiPengujian":"Kendala 1: Hash password dari PHP ($2y$) tidak kompatibel dengan bcrypt Node.js.\nSolusi: Replace $2y$ menjadi $2a$ saat bcrypt.compare() agar kompatibel.\n\nKendala 2: Multer disk storage tidak kompatibel dengan Netlify serverless (filesystem read-only).\nSolusi: Ganti ke memoryStorage() lalu upload langsung ke Supabase Storage.\n\nKendala 3: Session tidak persisten di serverless.\nSolusi: Gunakan connect-pg-simple untuk simpan sesi di tabel session di PostgreSQL Supabase.","kesimpulanPengujian":"Sistem KantinKu dinyatakan layak digunakan. Seluruh fitur utama berjalan dengan baik pada lingkungan lokal maupun deployment Netlify. Tidak ada bug kritis yang ditemukan pada skenario pengujian.","kesimpulan":"Aplikasi KantinKu berhasil dibangun sebagai sistem pemesanan makanan kantin berbasis web menggunakan Node.js, Express.js, PostgreSQL, dan EJS. Database relasional dengan 6 tabel (users, kategori, menu, keranjang, pesanan, detail_pesanan) berhasil dirancang dengan relasi foreign key yang tepat. Semua operasi CRUD telah diimplementasikan lengkap untuk semua entitas. Sistem autentikasi berbasis sesi dengan enkripsi bcrypt berhasil membedakan hak akses admin dan pelanggan. Aplikasi berhasil di-deploy ke Netlify dengan database PostgreSQL di Supabase dan dapat diakses secara online.","saran":"1. Menambahkan fitur notifikasi real-time (WebSocket atau Supabase Realtime) agar admin mendapat pemberitahuan langsung saat ada pesanan baru.\n2. Mengintegrasikan payment gateway (Midtrans / DOKU) untuk mendukung pembayaran digital.\n3. Menambahkan fitur rating dan ulasan menu oleh pelanggan.\n4. Mengembangkan versi mobile (PWA atau React Native) agar lebih mudah diakses.\n5. Menambahkan laporan keuangan harian/bulanan dalam bentuk grafik untuk admin.","lampiranSQL":"-- ============ DDL (PostgreSQL) ============\n\nCREATE TABLE IF NOT EXISTS users (\n  id SERIAL PRIMARY KEY,\n  nama VARCHAR(100) NOT NULL,\n  username VARCHAR(50) NOT NULL UNIQUE,\n  password VARCHAR(255) NOT NULL,\n  role VARCHAR(20) NOT NULL DEFAULT 'pelanggan' CHECK (role IN ('admin', 'pelanggan')),\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\nCREATE TABLE IF NOT EXISTS kategori (\n  id SERIAL PRIMARY KEY,\n  nama_kategori VARCHAR(50) NOT NULL,\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\nCREATE TABLE IF NOT EXISTS menu (\n  id SERIAL PRIMARY KEY,\n  kategori_id INT NOT NULL,\n  nama_menu VARCHAR(100) NOT NULL,\n  deskripsi TEXT,\n  harga DECIMAL(10,2) NOT NULL,\n  gambar VARCHAR(255),\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  FOREIGN KEY (kategori_id) REFERENCES kategori(id) ON DELETE CASCADE\n);\n\nCREATE TABLE IF NOT EXISTS keranjang (\n  id SERIAL PRIMARY KEY,\n  user_id INT NOT NULL,\n  menu_id INT NOT NULL,\n  jumlah INT NOT NULL DEFAULT 1,\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,\n  FOREIGN KEY (menu_id) REFERENCES menu(id) ON DELETE CASCADE\n);\n\nCREATE TABLE IF NOT EXISTS pesanan (\n  id SERIAL PRIMARY KEY,\n  user_id INT NOT NULL,\n  tanggal_pesan TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  total_harga DECIMAL(10,2) NOT NULL,\n  status VARCHAR(20) NOT NULL DEFAULT 'diproses' CHECK (status IN ('diproses', 'selesai', 'dibatalkan')),\n  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE\n);\n\nCREATE TABLE IF NOT EXISTS detail_pesanan (\n  id SERIAL PRIMARY KEY,\n  pesanan_id INT NOT NULL,\n  menu_id INT NOT NULL,\n  jumlah INT NOT NULL,\n  harga_satuan DECIMAL(10,2) NOT NULL,\n  FOREIGN KEY (pesanan_id) REFERENCES pesanan(id) ON DELETE CASCADE,\n  FOREIGN KEY (menu_id) REFERENCES menu(id) ON DELETE CASCADE\n);\n\n-- ============ DML (Data Contoh) ============\n\nINSERT INTO users (nama, username, password, role) VALUES\n('Administrator', 'admin', '$2a$10$O03Vl18/X9fC.Jt7BvR9yOiZ.6G41Z0g6A7i5Z124458i/i9lA/1C', 'admin')\nON CONFLICT (username) DO NOTHING;\n\nINSERT INTO kategori (nama_kategori) VALUES ('Makanan'), ('Minuman'), ('Snack');\n\nINSERT INTO menu (kategori_id, nama_menu, deskripsi, harga, gambar) VALUES\n(1, 'Nasi Goreng Spesial', 'Nasi goreng dengan telur, ayam, dan sayuran pilihan', 15000, ''),\n(1, 'Mie Ayam Bakso', 'Mie ayam kuah dengan bakso sapi segar', 12000, ''),\n(2, 'Es Teh Manis', 'Teh manis dingin segar', 5000, ''),\n(2, 'Jus Jeruk', 'Jus jeruk segar tanpa pemanis buatan', 8000, ''),\n(3, 'Pisang Goreng', 'Pisang goreng crispy 3 buah', 6000, '');\n\nINSERT INTO pesanan (user_id, total_harga, status) VALUES (1, 27000, 'selesai');\nINSERT INTO detail_pesanan (pesanan_id, menu_id, jumlah, harga_satuan) VALUES\n(1, 1, 1, 15000), (1, 3, 1, 5000), (1, 5, 1, 6000);","githubRepo":"https://github.com/nabilarizky13/Project-SQL-Kantin-Ku","videoLink":"https://youtu.be/(id-video-demo)","referensi":"1. Dokumentasi resmi Express.js — https://expressjs.com/\n2. Dokumentasi resmi PostgreSQL — https://www.postgresql.org/docs/\n3. Dokumentasi Supabase — https://supabase.com/docs\n4. Dokumentasi Netlify Functions — https://docs.netlify.com/functions/overview/\n5. EJS Template Engine — https://ejs.co/\n6. npm: bcrypt — https://www.npmjs.com/package/bcrypt\n7. npm: connect-pg-simple — https://www.npmjs.com/package/connect-pg-simple","pernyataanAI":"Saya menyatakan bahwa proyek KantinKu dan dokumen RND ini merupakan hasil karya sendiri berdasarkan pemahaman yang telah dipelajari selama perkuliahan Pemrograman SQL II. Penggunaan bantuan AI (jika ada) hanya digunakan sebagai referensi dan alat bantu pemahaman konsep, dan setiap baris kode telah saya pelajari, pahami, dan verifikasi secara mandiri.","__schemas":[{"nama":"users","kolom":[{"nama":"id","tipe":"SERIAL","isPK":true,"isNotNull":true,"refTable":"","refCol":""},{"nama":"nama","tipe":"VARCHAR(100)","isPK":false,"isNotNull":true,"refTable":"","refCol":""},{"nama":"username","tipe":"VARCHAR(50)","isPK":false,"isNotNull":true,"refTable":"","refCol":""},{"nama":"password","tipe":"VARCHAR(255)","isPK":false,"isNotNull":true,"refTable":"","refCol":""},{"nama":"role","tipe":"VARCHAR(20)","isPK":false,"isNotNull":true,"refTable":"","refCol":""},{"nama":"created_at","tipe":"TIMESTAMP","isPK":false,"isNotNull":false,"refTable":"","refCol":""}]},{"nama":"kategori","kolom":[{"nama":"id","tipe":"SERIAL","isPK":true,"isNotNull":true,"refTable":"","refCol":""},{"nama":"nama_kategori","tipe":"VARCHAR(50)","isPK":false,"isNotNull":true,"refTable":"","refCol":""},{"nama":"created_at","tipe":"TIMESTAMP","isPK":false,"isNotNull":false,"refTable":"","refCol":""}]},{"nama":"menu","kolom":[{"nama":"id","tipe":"SERIAL","isPK":true,"isNotNull":true,"refTable":"","refCol":""},{"nama":"kategori_id","tipe":"INT","isPK":false,"isNotNull":true,"refTable":"kategori","refCol":"id"},{"nama":"nama_menu","tipe":"VARCHAR(100)","isPK":false,"isNotNull":true,"refTable":"","refCol":""},{"nama":"deskripsi","tipe":"TEXT","isPK":false,"isNotNull":false,"refTable":"","refCol":""},{"nama":"harga","tipe":"DECIMAL(10,2)","isPK":false,"isNotNull":true,"refTable":"","refCol":""},{"nama":"gambar","tipe":"VARCHAR(255)","isPK":false,"isNotNull":false,"refTable":"","refCol":""},{"nama":"created_at","tipe":"TIMESTAMP","isPK":false,"isNotNull":false,"refTable":"","refCol":""}]},{"nama":"keranjang","kolom":[{"nama":"id","tipe":"SERIAL","isPK":true,"isNotNull":true,"refTable":"","refCol":""},{"nama":"user_id","tipe":"INT","isPK":false,"isNotNull":true,"refTable":"users","refCol":"id"},{"nama":"menu_id","tipe":"INT","isPK":false,"isNotNull":true,"refTable":"menu","refCol":"id"},{"nama":"jumlah","tipe":"INT","isPK":false,"isNotNull":true,"refTable":"","refCol":""},{"nama":"created_at","tipe":"TIMESTAMP","isPK":false,"isNotNull":false,"refTable":"","refCol":""}]},{"nama":"pesanan","kolom":[{"nama":"id","tipe":"SERIAL","isPK":true,"isNotNull":true,"refTable":"","refCol":""},{"nama":"user_id","tipe":"INT","isPK":false,"isNotNull":true,"refTable":"users","refCol":"id"},{"nama":"tanggal_pesan","tipe":"TIMESTAMP","isPK":false,"isNotNull":false,"refTable":"","refCol":""},{"nama":"total_harga","tipe":"DECIMAL(10,2)","isPK":false,"isNotNull":true,"refTable":"","refCol":""},{"nama":"status","tipe":"VARCHAR(20)","isPK":false,"isNotNull":true,"refTable":"","refCol":""}]},{"nama":"detail_pesanan","kolom":[{"nama":"id","tipe":"SERIAL","isPK":true,"isNotNull":true,"refTable":"","refCol":""},{"nama":"pesanan_id","tipe":"INT","isPK":false,"isNotNull":true,"refTable":"pesanan","refCol":"id"},{"nama":"menu_id","tipe":"INT","isPK":false,"isNotNull":true,"refTable":"menu","refCol":"id"},{"nama":"jumlah","tipe":"INT","isPK":false,"isNotNull":true,"refTable":"","refCol":""},{"nama":"harga_satuan","tipe":"DECIMAL(10,2)","isPK":false,"isNotNull":true,"refTable":"","refCol":""}]}],"__mockup":[],"__screenshot":[],"__testCases":[{"id":1,"skenario":"Registrasi akun pelanggan baru","hasilDiharapkan":"Akun berhasil dibuat, redirect ke login dengan pesan sukses","status":"Berhasil","buktiGambar":[]},{"id":2,"skenario":"Login sebagai admin (username: admin)","hasilDiharapkan":"Sesi terbuat, redirect otomatis ke /admin (dashboard)","status":"Berhasil","buktiGambar":[]},{"id":3,"skenario":"Login sebagai pelanggan","hasilDiharapkan":"Sesi terbuat, redirect ke beranda / dengan daftar menu","status":"Berhasil","buktiGambar":[]},{"id":4,"skenario":"Login dengan password salah","hasilDiharapkan":"Muncul pesan error 'Password salah!', tidak masuk ke sistem","status":"Berhasil","buktiGambar":[]},{"id":5,"skenario":"Admin tambah kategori menu baru","hasilDiharapkan":"Kategori tersimpan di database dan muncul di list kategori","status":"Berhasil","buktiGambar":[]},{"id":6,"skenario":"Admin edit kategori yang sudah ada","hasilDiharapkan":"Perubahan nama kategori tersimpan dan tampil di list","status":"Berhasil","buktiGambar":[]},{"id":7,"skenario":"Admin hapus kategori (cascade ke menu)","hasilDiharapkan":"Kategori dan semua menu terkait terhapus dari database","status":"Berhasil","buktiGambar":[]},{"id":8,"skenario":"Admin tambah menu baru dengan upload gambar","hasilDiharapkan":"Menu tersimpan, gambar terupload ke Supabase Storage, URL gambar tersimpan di kolom gambar","status":"Berhasil","buktiGambar":[]},{"id":9,"skenario":"Admin edit menu (update harga)","hasilDiharapkan":"Harga menu berubah dan tampil di beranda pelanggan","status":"Berhasil","buktiGambar":[]},{"id":10,"skenario":"Admin hapus menu","hasilDiharapkan":"Menu terhapus, tidak muncul lagi di beranda pelanggan","status":"Berhasil","buktiGambar":[]},{"id":11,"skenario":"Pelanggan filter menu berdasarkan kategori","hasilDiharapkan":"Hanya menu dari kategori yang dipilih yang ditampilkan","status":"Berhasil","buktiGambar":[]},{"id":12,"skenario":"Pelanggan tambah menu ke keranjang","hasilDiharapkan":"Item masuk ke keranjang, badge counter keranjang bertambah","status":"Berhasil","buktiGambar":[]},{"id":13,"skenario":"Pelanggan tambah menu yang sama dua kali","hasilDiharapkan":"Jumlah item di keranjang bertambah (bukan duplikat baris baru)","status":"Berhasil","buktiGambar":[]},{"id":14,"skenario":"Pelanggan hapus item dari keranjang","hasilDiharapkan":"Item terhapus dari keranjang, total harga diperbarui","status":"Berhasil","buktiGambar":[]},{"id":15,"skenario":"Pelanggan checkout keranjang","hasilDiharapkan":"Pesanan terbuat di tabel pesanan dan detail_pesanan, keranjang dikosongkan, redirect ke riwayat pesanan dengan pesan sukses","status":"Berhasil","buktiGambar":[]},{"id":16,"skenario":"Admin update status pesanan (diproses ke selesai)","hasilDiharapkan":"Status pesanan berubah di database dan ditampilkan di halaman pesanan admin","status":"Berhasil","buktiGambar":[]},{"id":17,"skenario":"Akses halaman admin tanpa login","hasilDiharapkan":"Redirect otomatis ke /login (proteksi middleware requireAdmin)","status":"Berhasil","buktiGambar":[]},{"id":18,"skenario":"Pelanggan coba akses /admin","hasilDiharapkan":"Redirect otomatis ke /login karena role bukan admin","status":"Berhasil","buktiGambar":[]}],"__nextTestCaseId":19};



/* =========================================================
   DATA MODEL
   ========================================================= */
const defaultSchemas = () => ([
  { nama:"ruangan", kolom:[
    {nama:"id_ruangan",tipe:"INT",isPK:true,isNotNull:true,refTable:"",refCol:""},
    {nama:"nama_ruangan",tipe:"VARCHAR(100)",isPK:false,isNotNull:true,refTable:"",refCol:""}]},
  { nama:"barang", kolom:[
    {nama:"id_barang",tipe:"INT",isPK:true,isNotNull:true,refTable:"",refCol:""},
    {nama:"nama_barang",tipe:"VARCHAR(150)",isPK:false,isNotNull:true,refTable:"",refCol:""},
    {nama:"stok",tipe:"INT",isPK:false,isNotNull:true,refTable:"",refCol:""},
    {nama:"id_ruangan",tipe:"INT",isPK:false,isNotNull:true,refTable:"ruangan",refCol:"id_ruangan"}]},
  { nama:"peminjaman", kolom:[
    {nama:"id_pinjam",tipe:"INT",isPK:true,isNotNull:true,refTable:"",refCol:""},
    {nama:"id_barang",tipe:"INT",isPK:false,isNotNull:true,refTable:"barang",refCol:"id_barang"},
    {nama:"tgl_pinjam",tipe:"DATE",isPK:false,isNotNull:true,refTable:"",refCol:""},
    {nama:"peminjam",tipe:"VARCHAR(100)",isPK:false,isNotNull:true,refTable:"",refCol:""}]}
]);
const defaultTestCases = () => ([
  {id:1,skenario:"Tambah data baru",hasilDiharapkan:"Data tersimpan & muncul di tabel",status:"Berhasil",buktiGambar:[]},
  {id:2,skenario:"Edit data",hasilDiharapkan:"Perubahan tampil pada list",status:"Berhasil",buktiGambar:[]},
  {id:3,skenario:"Hapus data",hasilDiharapkan:"Data terhapus dari sistem",status:"Berhasil",buktiGambar:[]},
  {id:4,skenario:"Validasi input salah",hasilDiharapkan:"Sistem menolak & menampilkan error",status:"Berhasil",buktiGambar:[]}
]);

let schemas = defaultSchemas();
let mockupImages = [];
let screenshotImages = [];
let testCases = defaultTestCases();
let nextTestCaseId = 5;

const STORE_KEY = "rndSQL2_final_v2";

/* =========================================================
   UTIL
   ========================================================= */
function escapeHtml(s){
  if(s===undefined||s===null) return '';
  return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}
const $ = id => document.getElementById(id);

/* =========================================================
   PENYIMPANAN — IndexedDB (kuota besar) + kompres gambar
   Antisipasi "memory full": gambar dikompres, data utama di
   IndexedDB (bukan localStorage 5MB), localStorage hanya
   cadangan teks ringan.
   ========================================================= */
const IDB_NAME = "rndSQL2DB";
const IDB_STORE = "doc";
const IMG_MAX_SIZE = 1200;   // px sisi terpanjang
const IMG_QUALITY = 0.72;    // kualitas JPEG

function idbOpen(){
  return new Promise((res,rej)=>{
    if(!window.indexedDB){ rej(new Error("IndexedDB tidak tersedia")); return; }
    const req = indexedDB.open(IDB_NAME,1);
    req.onupgradeneeded = ()=>{ req.result.createObjectStore(IDB_STORE); };
    req.onsuccess = ()=>res(req.result);
    req.onerror = ()=>rej(req.error);
  });
}
function idbSet(key,val){
  return idbOpen().then(db=>new Promise((res,rej)=>{
    const tx=db.transaction(IDB_STORE,"readwrite");
    tx.objectStore(IDB_STORE).put(val,key);
    tx.oncomplete=()=>res(true);
    tx.onerror=()=>rej(tx.error);
  }));
}
function idbGet(key){
  return idbOpen().then(db=>new Promise((res,rej)=>{
    const tx=db.transaction(IDB_STORE,"readonly");
    const r=tx.objectStore(IDB_STORE).get(key);
    r.onsuccess=()=>res(r.result);
    r.onerror=()=>rej(r.error);
  }));
}

/* Kompres + resize gambar sebelum disimpan (mengembalikan dataURL JPEG) */
function compressImage(file){
  return new Promise((resolve)=>{
    const reader=new FileReader();
    reader.onload=ev=>{
      const img=new Image();
      img.onload=()=>{
        let {width:w,height:h}=img;
        if(w>h && w>IMG_MAX_SIZE){ h=Math.round(h*IMG_MAX_SIZE/w); w=IMG_MAX_SIZE; }
        else if(h>=w && h>IMG_MAX_SIZE){ w=Math.round(w*IMG_MAX_SIZE/h); h=IMG_MAX_SIZE; }
        const cv=document.createElement("canvas");
        cv.width=w; cv.height=h;
        cv.getContext("2d").drawImage(img,0,0,w,h);
        try{ resolve(cv.toDataURL("image/jpeg",IMG_QUALITY)); }
        catch(e){ resolve(ev.target.result); } // fallback bila gambar CORS/SVG
      };
      img.onerror=()=>resolve(ev.target.result);
      img.src=ev.target.result;
    };
    reader.readAsDataURL(file);
  });
}

/* Tampilkan pemakaian penyimpanan di bar atas */
function updateStorageMeter(){
  const el=$("storageMeter"); if(!el) return;
  if(navigator.storage && navigator.storage.estimate){
    navigator.storage.estimate().then(est=>{
      const usedMB=(est.usage||0)/1048576;
      const quotaMB=(est.quota||0)/1048576;
      el.textContent=`DB: ${usedMB.toFixed(1)} MB`;
      el.classList.remove("warn","full");
      if(quotaMB>0){
        const ratio=usedMB/quotaMB;
        if(ratio>0.9) el.classList.add("full");
        else if(ratio>0.7) el.classList.add("warn");
      }
    }).catch(()=>{ el.textContent="DB: ok"; });
  } else { el.textContent="DB: ok"; }
}

/* =========================================================
   DAFTAR ISI (auto)  — pakai angka romawi
   ========================================================= */
const ROMAN = ["I","II","III","IV","V","VI","VII","VIII","IX","X"];
function buildTOC(){
  const list = $("tocList");
  const secs = document.querySelectorAll(".section[data-toc]");
  let html = "";
  secs.forEach((s,i)=>{
    const label = s.getAttribute("data-toc");
    html += `<li><a href="#${s.id}"><span class="roman">${ROMAN[i]||(i+1)}.</span> <span>${label}</span><span class="leader"></span></a></li>`;
  });
  list.innerHTML = html;
}

/* =========================================================
   SCHEMA BUILDER
   ========================================================= */
function renderDynamicTables(){
  const container = $("daftarTabelDinamis");
  if(!container) return;
  let html = "";
  schemas.forEach((tbl,idxT)=>{
    html += `<div class="schema-row">
      <div class="row-top">
        <input type="text" class="input" style="max-width:260px;font-weight:700;" value="${escapeHtml(tbl.nama)}" onchange="updateNamaTabel(${idxT},this.value)">
        <button class="btn btn-sm btn-danger no-print" onclick="hapusTabelFunc(${idxT})">Hapus Tabel</button>
      </div>
      <div class="table-scroll"><table class="tbl"><thead><tr>
        <th>Kolom</th><th>Tipe Data</th><th class="ck">PK</th><th class="ck">Not Null</th><th>Foreign Key</th><th class="ck no-print">Aksi</th>
      </tr></thead><tbody>`;
    tbl.kolom.forEach((kol,idxK)=>{
      html += `<tr>
        <td><input class="input" value="${escapeHtml(kol.nama)}" onchange="updateKolomFunc(${idxT},${idxK},'nama',this.value)"></td>
        <td><input class="input" value="${escapeHtml(kol.tipe)}" onchange="updateKolomFunc(${idxT},${idxK},'tipe',this.value)"></td>
        <td class="ck"><input type="checkbox" ${kol.isPK?"checked":""} onchange="updateKolomFunc(${idxT},${idxK},'isPK',this.checked)"></td>
        <td class="ck"><input type="checkbox" ${kol.isNotNull?"checked":""} onchange="updateKolomFunc(${idxT},${idxK},'isNotNull',this.checked)"></td>
        <td><select class="input" onchange="updateFKFunc(${idxT},${idxK},this.value)">${generateFkOptions(tbl.nama,kol.refTable,kol.refCol)}</select></td>
        <td class="ck no-print"><button class="btn btn-sm btn-danger" onclick="hapusKolomFunc(${idxT},${idxK})">X</button></td>
      </tr>`;
    });
    html += `</tbody></table></div>
      <button class="btn btn-sm btn-light no-print" style="margin-top:10px;" onclick="tambahKolomFunc(${idxT})">+ Tambah Kolom</button>
    </div>`;
  });
  container.innerHTML = html;
  generateSQLAndPreview();
  renderDataDictionary();
}

function generateFkOptions(currentTable,curRefTable,curRefCol){
  let opts = `<option value="">— Tanpa FK —</option>`;
  schemas.forEach(t=>{
    if(t.nama===currentTable) return;
    t.kolom.forEach(k=>{
      if(k.isPK){
        const val = `${t.nama}.${k.nama}`;
        const sel = (curRefTable===t.nama&&curRefCol===k.nama)?"selected":"";
        opts += `<option value="${escapeHtml(val)}" ${sel}>${escapeHtml(val)}</option>`;
      }
    });
  });
  return opts;
}

window.updateNamaTabel=(i,v)=>{if(schemas[i])schemas[i].nama=v;renderDynamicTables();};
window.hapusTabelFunc=(i)=>{schemas.splice(i,1);renderDynamicTables();};
window.tambahKolomFunc=(i)=>{schemas[i].kolom.push({nama:"kolom_baru",tipe:"VARCHAR(100)",isPK:false,isNotNull:false,refTable:"",refCol:""});renderDynamicTables();};
window.hapusKolomFunc=(t,k)=>{schemas[t].kolom.splice(k,1);renderDynamicTables();};
window.updateKolomFunc=(t,k,f,v)=>{schemas[t].kolom[k][f]=v;renderDynamicTables();};
window.updateFKFunc=(t,k,v)=>{
  if(!v){schemas[t].kolom[k].refTable="";schemas[t].kolom[k].refCol="";}
  else{const[rt,rc]=v.split('.');schemas[t].kolom[k].refTable=rt;schemas[t].kolom[k].refCol=rc;}
  renderDynamicTables();
};

function generateSQLAndPreview(){
  let ddl="",rel="";
  schemas.forEach(t=>{
    ddl += `CREATE TABLE ${t.nama} (\n`;
    const cols=[];
    t.kolom.forEach(k=>{
      let line=`  ${k.nama} ${k.tipe}`;
      if(k.isNotNull) line+=" NOT NULL";
      if(k.isPK) line+=" PRIMARY KEY";
      cols.push(line);
    });
    t.kolom.forEach(k=>{
      if(k.refTable&&k.refCol){
        cols.push(`  FOREIGN KEY (${k.nama}) REFERENCES ${k.refTable}(${k.refCol})`);
        rel += `- ${t.nama}.${k.nama} -> ${k.refTable}.${k.refCol}\n`;
      }
    });
    ddl += cols.join(",\n")+"\n);\n\n";
  });
  $("previewDDL").textContent = ddl || "-- belum ada tabel";
  $("previewRelasi").textContent = rel || "-- tidak ada foreign key";
  $("lampiranSQL").value = `-- DDL\n${ddl}-- DML (isi data contoh di sini)\n`;
}

function renderDataDictionary(){
  const body = $("dataDictionary").querySelector("tbody");
  let html = `<tr><th>Tabel</th><th>Kolom</th><th>Tipe</th><th>Keterangan</th></tr>`;
  schemas.forEach(t=>{
    t.kolom.forEach(k=>{
      const ket=[];
      if(k.isPK) ket.push("Primary Key");
      if(k.isNotNull) ket.push("Wajib diisi");
      if(k.refTable) ket.push(`FK -> ${k.refTable}.${k.refCol}`);
      html += `<tr><td>${escapeHtml(t.nama)}</td><td>${escapeHtml(k.nama)}</td><td>${escapeHtml(k.tipe)}</td><td>${ket.join(", ")||"-"}</td></tr>`;
    });
  });
  body.innerHTML = html;
}

/* =========================================================
   TEST CASES
   ========================================================= */
function badgeFor(status){
  if(status==="Gagal") return '<span class="badge badge-fail">Gagal</span>';
  if(status==="Perbaikan") return '<span class="badge badge-fix">Perbaikan</span>';
  return '<span class="badge badge-ok">Berhasil</span>';
}
function renderTestCases(){
  const container=$("testCasesContainer");
  if(!container)return;
  let html="";
  testCases.forEach((tc,idx)=>{
    html += `<div class="tc-item">
      <div class="tc-grid">
        <div><label class="fld">Skenario Uji</label><input class="input" value="${escapeHtml(tc.skenario)}" onchange="updateTestCase(${idx},'skenario',this.value)"></div>
        <div><label class="fld">Hasil Diharapkan</label><input class="input" value="${escapeHtml(tc.hasilDiharapkan)}" onchange="updateTestCase(${idx},'hasilDiharapkan',this.value)"></div>
        <div><label class="fld">Status</label>
          <select class="input" onchange="updateTestCase(${idx},'status',this.value)">
            <option ${tc.status==='Berhasil'?'selected':''}>Berhasil</option>
            <option ${tc.status==='Gagal'?'selected':''}>Gagal</option>
            <option ${tc.status==='Perbaikan'?'selected':''}>Perbaikan</option>
          </select>
        </div>
        <div class="no-print"><button class="btn btn-sm btn-danger" onclick="hapusTestCase(${idx})">Hapus</button></div>
      </div>
      <div class="tc-bukti">
        <label class="fld">Bukti Screenshot ${badgeFor(tc.status)}</label>
        <div class="tc-thumbs" id="buktiGallery_${tc.id}"></div>
        <button type="button" class="btn btn-sm btn-light no-print" style="margin-top:8px;" onclick="tambahBuktiUji(${tc.id})">Upload Bukti</button>
      </div>
    </div>`;
  });
  container.innerHTML=html;
  testCases.forEach(tc=>{
    const g=$(`buktiGallery_${tc.id}`);
    if(!g)return;
    let h="";
    tc.buktiGambar.forEach((img,i)=>{
      h += `<div class="tc-thumb">
        <img src="${escapeHtml(img.src)}" alt="bukti">
        <input class="input" style="margin-top:6px;font-size:12px;" placeholder="Keterangan" value="${escapeHtml(img.caption)}" onchange="updateBuktiKeterangan(${tc.id},${i},this.value)">
        <button class="btn btn-sm btn-danger no-print" style="margin-top:6px;width:100%;" onclick="hapusBuktiUji(${tc.id},${i})">Hapus</button>
      </div>`;
    });
    g.innerHTML = h || '<span class="gallery-empty">Belum ada bukti. Klik "Upload Bukti".</span>';
  });
  updateProgress();
}
window.updateTestCase=(i,f,v)=>{if(testCases[i])testCases[i][f]=v;renderTestCases();};
window.hapusTestCase=(i)=>{testCases.splice(i,1);renderTestCases();};
window.tambahBuktiUji=(id)=>{
  const fi=document.createElement('input');fi.type='file';fi.accept='image/*';
  fi.onchange=e=>{const f=e.target.files[0];if(!f)return;
    compressImage(f).then(src=>{const tc=testCases.find(t=>t.id===id);if(tc){tc.buktiGambar.push({src,caption:'Bukti: '+tc.skenario});renderTestCases();}});};
  fi.click();
};
window.hapusBuktiUji=(id,i)=>{const tc=testCases.find(t=>t.id===id);if(tc){tc.buktiGambar.splice(i,1);renderTestCases();}};
window.updateBuktiKeterangan=(id,i,v)=>{const tc=testCases.find(t=>t.id===id);if(tc&&tc.buktiGambar[i]){tc.buktiGambar[i].caption=v;}};

/* =========================================================
   GALLERIES (mockup & screenshot)
   ========================================================= */
function renderGallery(containerId,arr){
  const c=$(containerId);if(!c)return;
  let h="";
  arr.forEach((item,idx)=>{
    h += `<div class="gallery-item">
      <img src="${escapeHtml(item.src)}" alt="gambar">
      <input class="input" style="margin-top:8px;font-size:13px;" placeholder="Keterangan gambar..." value="${escapeHtml(item.caption)}" onchange="updateGalleryCaption('${containerId}',${idx},this.value)">
      <button class="btn btn-sm btn-danger no-print" style="margin-top:8px;width:100%;" onclick="removeGalleryImage('${containerId}',${idx})">Hapus</button>
    </div>`;
  });
  c.innerHTML = h || '<span class="gallery-empty">Belum ada gambar.</span>';
}
function arrFor(containerId){return containerId==='mockupGalleryContainer'?mockupImages:screenshotImages;}
window.updateGalleryCaption=(cid,idx,v)=>{const a=arrFor(cid);if(a[idx])a[idx].caption=v;};
window.removeGalleryImage=(cid,idx)=>{const a=arrFor(cid);a.splice(idx,1);renderGallery(cid,a);};
function addImageToGallery(type){
  const cid = type==='mockup'?'mockupGalleryContainer':'screenshotGalleryContainer';
  const arr = arrFor(cid);
  const fi=document.createElement('input');fi.type='file';fi.accept='image/*';
  fi.onchange=e=>{const f=e.target.files[0];if(!f)return;
    compressImage(f).then(src=>{arr.push({src,caption:type==='mockup'?'Desain antarmuka':'Tampilan aplikasi'});renderGallery(cid,arr);});};
  fi.click();
}

/* =========================================================
   PRINT MIRROR — ubah input jadi teks dokumen formal
   ========================================================= */
function syncPrintMirrors(){
  document.querySelectorAll("#rndDocument input[id], #rndDocument textarea[id], #rndDocument select[id]").forEach(el=>{
    if(el.type==="checkbox"||el.type==="file") return;
    let m = el.nextElementSibling;
    if(!m || !m.classList || !m.classList.contains("print-mirror")){
      m = document.createElement("div");
      m.className="print-mirror";
      el.parentNode.insertBefore(m, el.nextSibling);
    }
    const val = (el.value||"").trim();
    m.textContent = val || "—";
  });
}

/* =========================================================
   PERSISTENCE
   ========================================================= */
function collectFormData(){
  const data={};
  document.querySelectorAll("#rndDocument input, #rndDocument textarea, #rndDocument select").forEach(el=>{
    if(el.id) data[el.id]=el.value;
  });
  data.__schemas=schemas;
  data.__mockup=mockupImages;
  data.__screenshot=screenshotImages;
  data.__testCases=testCases;
  data.__nextTestCaseId=nextTestCaseId;
  return data;
}
/* Cadangan teks-saja (tanpa gambar) ke localStorage — selalu kecil & aman */
function saveTextFallback(data){
  try{
    const lite={...data};
    lite.__mockup=[]; lite.__screenshot=[];
    lite.__testCases=(data.__testCases||[]).map(tc=>({...tc,buktiGambar:[]}));
    localStorage.setItem(STORE_KEY, JSON.stringify(lite));
  }catch(e){ /* abaikan, IDB yang utama */ }
}

function applyData(d){
  if(Array.isArray(d.__schemas))     schemas          = JSON.parse(JSON.stringify(d.__schemas));
  if(Array.isArray(d.__mockup))      mockupImages     = JSON.parse(JSON.stringify(d.__mockup));
  if(Array.isArray(d.__screenshot))  screenshotImages = JSON.parse(JSON.stringify(d.__screenshot));
  if(Array.isArray(d.__testCases))   testCases        = JSON.parse(JSON.stringify(d.__testCases));
  if(d.__nextTestCaseId) nextTestCaseId=d.__nextTestCaseId;
  for(const k in d){
    if(k.startsWith("__")) continue;
    const el=$(k); if(el) el.value=d[k];
  }
}
function renderAll(){
  renderDynamicTables();
  renderGallery('mockupGalleryContainer',mockupImages);
  renderGallery('screenshotGalleryContainer',screenshotImages);
  renderTestCases();
  updateProgress();
}

function saveAllFormData(silent){
  const data=collectFormData();
  saveTextFallback(data); // teks selalu aman walau gambar gagal
  idbSet("main",data).then(()=>{
    updateStorageMeter();
    if(!silent) alert("Tersimpan. Semua data (termasuk gambar) tercatat di browser ini.");
  }).catch(err=>{
    console.warn("IDB simpan gagal:",err);
    updateStorageMeter();
    if(!silent) alert("Teks tersimpan, tetapi GAMBAR gagal disimpan (penyimpanan penuh).\n\nSaran: gunakan tombol Export untuk backup .json, atau kurangi/hapus gambar besar.");
  });
}

function loadAllFormData(){
  idbGet("main").then(d=>{
    if(d && d.judulProyek){ applyData(d); renderAll(); updateStorageMeter(); return; }
    // migrasi dari localStorage lama bila ada
    const raw=localStorage.getItem(STORE_KEY);
    if(raw){ try{ const parsed=JSON.parse(raw); if(parsed.judulProyek){ applyData(parsed); renderAll(); updateStorageMeter(); return; } }catch(e){ console.warn(e); } }
    // Pertama kali buka — isi otomatis dari data KantinKu Nabila
    applyData(KANTINKU_PREFILL);
    renderAll();
    idbSet("main", collectFormData()).catch(()=>{});
    updateStorageMeter();
  }).catch(()=>{
    const raw=localStorage.getItem(STORE_KEY);
    if(raw){ try{ const parsed=JSON.parse(raw); if(parsed.judulProyek){ applyData(parsed); renderAll(); updateStorageMeter(); return; } }catch(e){ console.warn(e); } }
    applyData(KANTINKU_PREFILL);
    renderAll();
    updateStorageMeter();
  });
}

/* ---------- EXPORT / IMPORT .json (backup portabel) ---------- */
function exportJSON(){
  const data=collectFormData();
  const nim=(data.nim||"mahasiswa").replace(/[^\w.-]/g,"_");
  const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download=`RND_SQL2_${nim}.json`;
  a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href),2000);
}
function importJSON(file){
  const r=new FileReader();
  r.onload=ev=>{
    try{
      const d=JSON.parse(ev.target.result);
      if(!confirm("Muat data dari file ini? Data saat ini akan tertimpa."))return;
      applyData(d); renderAll();
      saveAllFormData(true);
      alert("Data berhasil dimuat dari file .json.");
    }catch(e){ alert("File tidak valid / bukan backup RND yang benar."); }
  };
  r.readAsText(file);
}
function resetDefault(){
  if(!confirm("Yakin reset semua data ke kondisi kosong/default? Tindakan ini tidak bisa dibatalkan."))return;
  localStorage.removeItem(STORE_KEY);
  idbSet("main",null).catch(()=>{});
  schemas=defaultSchemas();mockupImages=[];screenshotImages=[];
  testCases=defaultTestCases();nextTestCaseId=5;
  document.querySelectorAll("#rndDocument input, #rndDocument textarea").forEach(el=>{
    if(el.type==='checkbox'||el.type==='file') return;
    el.value='';
  });
  $("institusi").value="Politeknik Negeri Lampung";
  renderDynamicTables();
  renderGallery('mockupGalleryContainer',mockupImages);
  renderGallery('screenshotGalleryContainer',screenshotImages);
  renderTestCases();
  updateProgress();
  updateStorageMeter();
  alert("Dokumen telah direset.");
}

/* =========================================================
   CONTOH (sample fill)
   ========================================================= */
function isiContoh(){
  if(!confirm("Isi field yang masih kosong dengan data contoh?"))return;
  const v={
    judulProyek:"Sistem Informasi Inventaris Laboratorium Komputer",
    namaMahasiswa:"(Nama Mahasiswa)", nim:"(NIM)", kelasSemester:"Manajemen Informatika",
    dosenPengampu:"(Dosen Pengampu)", tglMulai:"2026-02-10", tglSelesai:"2026-06-15",
    latarBelakang:"Pengelolaan inventaris laboratorium masih dilakukan secara manual menggunakan Microsoft Excel sehingga menyulitkan pelacakan barang dan peminjaman. Diperlukan aplikasi berbasis database relasional dengan fitur CRUD untuk mengelola data secara terpusat.",
    rumusanMasalah:"1. Bagaimana merancang basis data relasional untuk inventaris?\n2. Bagaimana mengimplementasikan operasi CRUD pada data barang dan peminjaman?",
    tujuanProyek:"1. Membangun aplikasi CRUD inventaris.\n2. Merancang database relasional minimal 3 tabel dengan foreign key.\n3. Melakukan pengujian fungsional dan deployment.",
    techStackDetail:"Arsitektur: aplikasi berbasis database relasional.\n- Database: MySQL 8.0 (InnoDB)\n- Backend: PHP / sesuai pilihan\n- Frontend: HTML, CSS, JavaScript\n- Keamanan: prepared statement, validasi input",
    kesimpulan:"Aplikasi berhasil dibangun dan seluruh operasi CRUD berjalan sesuai rancangan. Database relasional dengan foreign key berfungsi dengan baik dan pengujian fungsional menunjukkan hasil yang memuaskan.",
    pernyataanAI:"Saya menyatakan bahwa dokumen dan proyek ini merupakan hasil karya sendiri. Penggunaan bantuan AI (jika ada) digunakan sebatas referensi dan telah saya pahami serta verifikasi."
  };
  for(const k in v){const el=$(k);if(el&&!el.value)el.value=v[k];}
  updateProgress();
  alert("Data contoh terisi pada field yang masih kosong.");
}

/* =========================================================
   ISI OTOMATIS DARI KANTINKU
   ========================================================= */
function isiDariKantinKu(){
  if(!confirm("Isi SEMUA field dari data aplikasi KantinKu (Nabila Rizky)?\n\nSemua data saat ini akan DIGANTI. Lanjutkan?")) return;
  applyData(KANTINKU_PREFILL);
  renderAll();
  saveAllFormData(true);
  alert("Berhasil! Semua field telah diisi dari data KantinKu.\n\nJangan lupa ganti: NIM, Dosen Pengampu, dan link Video YouTube kamu!");
}

/* =========================================================
   PROGRESS
   ========================================================= */
function updateProgress(){
  const req=document.querySelectorAll("[data-required]");
  let filled=0;
  req.forEach(el=>{ if(el.value && el.value.trim()!=='') filled++; });
  const total=req.length||1;
  const pct=Math.round(filled/total*100);
  $("progressFill").style.width=pct+"%";
  $("progressPct").textContent=pct+"%";
}

/* =========================================================
   VALIDATE & PRINT
   ========================================================= */
function validateAndPrint(){
  const missing=[];
  document.querySelectorAll("[data-required]").forEach(el=>{
    if(!el.value || el.value.trim()===''){
      const lbl = el.getAttribute("data-label") || el.placeholder || el.id;
      missing.push(lbl);
    }
  });
  if(missing.length){
    const proceed=confirm("Ada "+missing.length+" bagian wajib yang belum diisi:\n\n- "+
      missing.slice(0,10).join("\n- ")+(missing.length>10?"\n- ...":"")+
      "\n\nTetap lanjut mencetak?");
    if(!proceed) return;
  }
  syncPrintMirrors();
  saveAllFormData(true);
  window.print();
}

/* =========================================================
   INIT
   ========================================================= */
window.addEventListener("DOMContentLoaded",()=>{
  buildTOC();
  const yr=$("copyYear"); if(yr) yr.textContent=new Date().getFullYear();
  loadAllFormData();

  $("btnTambahTabel").addEventListener("click",()=>{
    schemas.push({nama:`tabel_${schemas.length+1}`,kolom:[{nama:"id",tipe:"INT",isPK:true,isNotNull:true,refTable:"",refCol:""}]});
    renderDynamicTables();
  });
  $("btnTambahTestCase").addEventListener("click",()=>{
    testCases.push({id:nextTestCaseId++,skenario:"Skenario uji baru",hasilDiharapkan:"Deskripsikan hasil yang diharapkan",status:"Berhasil",buktiGambar:[]});
    renderTestCases();
  });
  $("simpanDataBtn").addEventListener("click",()=>saveAllFormData(false));
  $("resetBtn").addEventListener("click",resetDefault);
  $("contohBtn").addEventListener("click",isiContoh);
  if($("isiKantinKuBtn")) $("isiKantinKuBtn").addEventListener("click",isiDariKantinKu);
  $("cetakPDFBtn").addEventListener("click",validateAndPrint);
  $("exportBtn").addEventListener("click",exportJSON);
  $("importBtn").addEventListener("click",()=>$("importFile").click());
  $("importFile").addEventListener("change",e=>{ if(e.target.files[0]) importJSON(e.target.files[0]); e.target.value=""; });

  document.querySelectorAll(".btn-tambah-gambar").forEach(btn=>{
    btn.addEventListener("click",()=>addImageToGallery(btn.getAttribute("data-gallery")));
  });

  // dukung Ctrl+P agar mirror tetap tersinkron
  window.addEventListener("beforeprint", syncPrintMirrors);

  // live progress + autosave (debounced)
  let t;
  document.addEventListener("input",()=>{
    updateProgress();
    clearTimeout(t); t=setTimeout(()=>saveAllFormData(true),1200);
  });
});
