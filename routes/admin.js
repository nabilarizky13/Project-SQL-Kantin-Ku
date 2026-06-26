const express = require('express');
const router = express.Router();
const db = require('../config/db');
const supabase = require('../config/supabase');
const multer = require('multer');

// Middleware for Admin authorization
const requireAdmin = (req, res, next) => {
    if (!req.session.user_id || req.session.role !== 'admin') {
        return res.redirect('/login');
    }
    next();
};

router.use(requireAdmin);

// Set up Multer for memory storage (Netlify compatible)
const upload = multer({ storage: multer.memoryStorage() });

router.get('/index.php', (req, res) => res.redirect('/admin'));
router.get(['/', '/index'], async (req, res) => {
    try {
        const { rows: pesanan_count } = await db.query("SELECT COUNT(id) AS total FROM pesanan");
        const { rows: pesanan_diproses_count } = await db.query("SELECT COUNT(id) AS total FROM pesanan WHERE status='diproses'");
        const { rows: pendapatan_count } = await db.query("SELECT SUM(total_harga) AS total FROM pesanan WHERE status='selesai'");
        const { rows: menu_count } = await db.query("SELECT COUNT(id) AS total FROM menu");
        const { rows: pesanan_terbaru } = await db.query("SELECT * FROM pesanan ORDER BY id DESC LIMIT 5");

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
            await db.query("DELETE FROM kategori WHERE id = $1", [req.query.hapus]);
            return res.redirect('/admin/kategori');
        }

        let edit_data = null;
        if (req.query.edit) {
            const { rows } = await db.query("SELECT * FROM kategori WHERE id = $1", [req.query.edit]);
            if (rows.length > 0) edit_data = rows[0];
        }

        const { rows: kategoris } = await db.query("SELECT * FROM kategori ORDER BY id DESC");
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
            await db.query("UPDATE kategori SET nama_kategori=$1 WHERE id=$2", [nama_kategori, id]);
        } else {
            await db.query("INSERT INTO kategori (nama_kategori) VALUES ($1)", [nama_kategori]);
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
            await db.query("DELETE FROM menu WHERE id = $1", [id]);
            return res.redirect('/admin/menu');
        }

        let edit_data = null;
        if (req.query.edit) {
            const { rows } = await db.query("SELECT * FROM menu WHERE id = $1", [req.query.edit]);
            if (rows.length > 0) edit_data = rows[0];
        }

        const { rows: kategoris } = await db.query("SELECT * FROM kategori");
        const { rows: menus } = await db.query("SELECT m.*, k.nama_kategori FROM menu m LEFT JOIN kategori k ON m.kategori_id = k.id ORDER BY m.id DESC");

        res.render('admin/menu', { menus, kategoris, edit_data });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

router.post('/menu', upload.single('gambar'), async (req, res) => {
    const { id, nama_menu, kategori_id, deskripsi, harga } = req.body;
    let gambar = null;

    try {
        if (req.file) {
            const { originalname, buffer, mimetype } = req.file;
            const fileName = `${Date.now()}_${originalname}`;
            const { data, error } = await supabase.storage
                .from('menu-images')
                .upload(fileName, buffer, { contentType: mimetype });
                
            if (error) throw error;
            
            const { data: publicUrlData } = supabase.storage
                .from('menu-images')
                .getPublicUrl(fileName);
                
            gambar = publicUrlData.publicUrl;
        }

        if (id) {
            if (gambar) {
                await db.query("UPDATE menu SET kategori_id=$1, nama_menu=$2, deskripsi=$3, harga=$4, gambar=$5 WHERE id=$6", [kategori_id, nama_menu, deskripsi, harga, gambar, id]);
            } else {
                await db.query("UPDATE menu SET kategori_id=$1, nama_menu=$2, deskripsi=$3, harga=$4 WHERE id=$5", [kategori_id, nama_menu, deskripsi, harga, id]);
            }
        } else {
            if (!gambar) gambar = '';
            await db.query("INSERT INTO menu (kategori_id, nama_menu, deskripsi, harga, gambar) VALUES ($1, $2, $3, $4, $5)", [kategori_id, nama_menu, deskripsi, harga, gambar]);
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
            await db.query("UPDATE pesanan SET status=$1 WHERE id=$2", [req.query.update_status, req.query.id]);
            return res.redirect('/admin/pesanan');
        }

        const { rows: pesanans } = await db.query("SELECT p.*, u.nama FROM pesanan p JOIN users u ON p.user_id = u.id ORDER BY p.id DESC");
        res.render('admin/pesanan', { pesanans });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

module.exports = router;
