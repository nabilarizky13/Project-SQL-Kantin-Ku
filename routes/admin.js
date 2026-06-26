const express = require('express');
const router = express.Router();
const db = require('../config/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Middleware for Admin authorization
const requireAdmin = (req, res, next) => {
    if (!req.session.user_id || req.session.role !== 'admin') {
        return res.redirect('/login');
    }
    next();
};

router.use(requireAdmin);

// Set up Multer for file uploads
const uploadDir = path.join(__dirname, '../assets/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.get('/index.php', (req, res) => res.redirect('/admin'));
router.get(['/', '/index'], async (req, res) => {
    try {
        const [pesanan_count] = await db.query("SELECT COUNT(id) AS total FROM pesanan");
        const [pesanan_diproses_count] = await db.query("SELECT COUNT(id) AS total FROM pesanan WHERE status='diproses'");
        const [pendapatan_count] = await db.query("SELECT SUM(total_harga) AS total FROM pesanan WHERE status='selesai'");
        const [menu_count] = await db.query("SELECT COUNT(id) AS total FROM menu");
        const [pesanan_terbaru] = await db.query("SELECT * FROM pesanan ORDER BY id DESC LIMIT 5");

        res.render('admin/index', {
            total_pesanan: pesanan_count[0].total || 0,
            pesanan_diproses: pesanan_diproses_count[0].total || 0,
            total_pendapatan: pendapatan_count[0].total || 0,
            total_menu: menu_count[0].total || 0,
            pesanan_terbaru
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

router.get('/kategori.php', (req, res) => res.redirect('/admin/kategori'));
router.get('/kategori', async (req, res) => {
    try {
        if (req.query.hapus) {
            await db.query("DELETE FROM kategori WHERE id = ?", [req.query.hapus]);
            return res.redirect('/admin/kategori');
        }

        let edit_data = null;
        if (req.query.edit) {
            const [rows] = await db.query("SELECT * FROM kategori WHERE id = ?", [req.query.edit]);
            if (rows.length > 0) edit_data = rows[0];
        }

        const [kategoris] = await db.query("SELECT * FROM kategori ORDER BY id DESC");
        res.render('admin/kategori', { kategoris, edit_data });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

router.post('/kategori', async (req, res) => {
    const { id, nama_kategori } = req.body;
    try {
        if (id) {
            await db.query("UPDATE kategori SET nama_kategori=? WHERE id=?", [nama_kategori, id]);
        } else {
            await db.query("INSERT INTO kategori (nama_kategori) VALUES (?)", [nama_kategori]);
        }
        res.redirect('/admin/kategori');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

router.get('/menu.php', (req, res) => res.redirect('/admin/menu'));
router.get('/menu', async (req, res) => {
    try {
        if (req.query.hapus) {
            const id = req.query.hapus;
            const [data] = await db.query("SELECT gambar FROM menu WHERE id = ?", [id]);
            if (data.length > 0 && data[0].gambar) {
                const filepath = path.join(uploadDir, data[0].gambar);
                if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
            }
            await db.query("DELETE FROM menu WHERE id = ?", [id]);
            return res.redirect('/admin/menu');
        }

        let edit_data = null;
        if (req.query.edit) {
            const [rows] = await db.query("SELECT * FROM menu WHERE id = ?", [req.query.edit]);
            if (rows.length > 0) edit_data = rows[0];
        }

        const [kategoris] = await db.query("SELECT * FROM kategori");
        const [menus] = await db.query("SELECT m.*, k.nama_kategori FROM menu m LEFT JOIN kategori k ON m.kategori_id = k.id ORDER BY m.id DESC");

        res.render('admin/menu', { menus, kategoris, edit_data });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

router.post('/menu', upload.single('gambar'), async (req, res) => {
    const { id, nama_menu, kategori_id, deskripsi, harga } = req.body;
    let gambar = req.file ? req.file.filename : null;

    try {
        if (id) {
            if (gambar) {
                const [lama] = await db.query("SELECT gambar FROM menu WHERE id=?", [id]);
                if (lama.length > 0 && lama[0].gambar) {
                    const filepath = path.join(uploadDir, lama[0].gambar);
                    if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
                }
                await db.query("UPDATE menu SET kategori_id=?, nama_menu=?, deskripsi=?, harga=?, gambar=? WHERE id=?", [kategori_id, nama_menu, deskripsi, harga, gambar, id]);
            } else {
                await db.query("UPDATE menu SET kategori_id=?, nama_menu=?, deskripsi=?, harga=? WHERE id=?", [kategori_id, nama_menu, deskripsi, harga, id]);
            }
        } else {
            if (!gambar) gambar = '';
            await db.query("INSERT INTO menu (kategori_id, nama_menu, deskripsi, harga, gambar) VALUES (?, ?, ?, ?, ?)", [kategori_id, nama_menu, deskripsi, harga, gambar]);
        }
        res.redirect('/admin/menu');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

router.get('/pesanan.php', (req, res) => res.redirect('/admin/pesanan'));
router.get('/pesanan', async (req, res) => {
    try {
        if (req.query.update_status && req.query.id) {
            await db.query("UPDATE pesanan SET status=? WHERE id=?", [req.query.update_status, req.query.id]);
            return res.redirect('/admin/pesanan');
        }

        const [pesanans] = await db.query("SELECT p.*, u.nama FROM pesanan p JOIN users u ON p.user_id = u.id ORDER BY p.id DESC");
        res.render('admin/pesanan', { pesanans });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

module.exports = router;
