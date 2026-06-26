const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Middleware to check if user is logged in
const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login');
    }
    next();
};

// Global middleware for this router to get cart count
router.use(requireLogin, async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT SUM(jumlah) AS total FROM keranjang WHERE user_id = ?', [req.session.user_id]);
        res.locals.cart_count = rows[0].total || 0;
        next();
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/index.php', (req, res) => res.redirect('/'));
router.get('/', async (req, res) => {
    if (req.session.role === 'admin') {
        return res.redirect('/admin');
    }

    const kategori_filter = req.query.kategori ? parseInt(req.query.kategori) : '';
    
    try {
        let menusQuery = 'SELECT * FROM menu';
        let queryParams = [];
        if (kategori_filter) {
            menusQuery += ' WHERE kategori_id = ?';
            queryParams.push(kategori_filter);
        }
        menusQuery += ' ORDER BY id DESC';

        const [menus] = await db.query(menusQuery, queryParams);
        const [kategoris] = await db.query('SELECT * FROM kategori');

        res.render('index', { menus, kategoris, kategori_filter });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

router.get('/detail.php', (req, res) => res.redirect('/detail?id=' + req.query.id));
router.get('/detail', async (req, res) => {
    const id = parseInt(req.query.id);
    if (!id) return res.redirect('/');

    try {
        const [rows] = await db.query('SELECT m.*, k.nama_kategori FROM menu m LEFT JOIN kategori k ON m.kategori_id = k.id WHERE m.id = ?', [id]);
        if (rows.length === 0) return res.redirect('/');

        res.render('detail', { menu: rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

router.post('/detail', async (req, res) => {
    const id = parseInt(req.query.id);
    if (!id) return res.redirect('/');
    
    const user_id = req.session.user_id;
    const jumlah = parseInt(req.body.jumlah);

    try {
        const [cek] = await db.query('SELECT id, jumlah FROM keranjang WHERE user_id = ? AND menu_id = ?', [user_id, id]);
        if (cek.length > 0) {
            const jumlah_baru = cek[0].jumlah + jumlah;
            await db.query('UPDATE keranjang SET jumlah = ? WHERE id = ?', [jumlah_baru, cek[0].id]);
        } else {
            await db.query('INSERT INTO keranjang (user_id, menu_id, jumlah) VALUES (?, ?, ?)', [user_id, id, jumlah]);
        }
        res.redirect('/keranjang');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

router.get('/keranjang.php', (req, res) => {
    if (req.query.hapus) {
        return res.redirect('/keranjang?hapus=' + req.query.hapus);
    }
    res.redirect('/keranjang');
});
router.get('/keranjang', async (req, res) => {
    const user_id = req.session.user_id;

    if (req.query.hapus) {
        const id = parseInt(req.query.hapus);
        await db.query('DELETE FROM keranjang WHERE id = ? AND user_id = ?', [id, user_id]);
        return res.redirect('/keranjang');
    }

    try {
        const [keranjang_items] = await db.query('SELECT k.id as keranjang_id, k.jumlah, m.* FROM keranjang k JOIN menu m ON k.menu_id = m.id WHERE k.user_id = ?', [user_id]);
        res.render('keranjang', { keranjang_items });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

router.post('/keranjang', async (req, res) => {
    if (req.body.checkout !== undefined) {
        const user_id = req.session.user_id;
        
        try {
            const [keranjang] = await db.query('SELECT k.*, m.harga FROM keranjang k JOIN menu m ON k.menu_id = m.id WHERE k.user_id = ?', [user_id]);
            if (keranjang.length > 0) {
                let total_harga = 0;
                keranjang.forEach(item => total_harga += (item.harga * item.jumlah));

                const [result] = await db.query('INSERT INTO pesanan (user_id, total_harga, status) VALUES (?, ?, ?)', [user_id, total_harga, 'diproses']);
                const pesanan_id = result.insertId;

                for (let item of keranjang) {
                    await db.query('INSERT INTO detail_pesanan (pesanan_id, menu_id, jumlah, harga_satuan) VALUES (?, ?, ?, ?)', [pesanan_id, item.menu_id, item.jumlah, item.harga]);
                }

                await db.query('DELETE FROM keranjang WHERE user_id = ?', [user_id]);
                return res.redirect('/pesanan_saya?success=1');
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Error');
        }
    }
    res.redirect('/keranjang');
});

router.get('/pesanan_saya.php', (req, res) => {
    let url = '/pesanan_saya';
    if(req.query.success) url += '?success=' + req.query.success;
    res.redirect(url);
});
router.get('/pesanan_saya', async (req, res) => {
    const user_id = req.session.user_id;
    try {
        const [pesanan] = await db.query('SELECT * FROM pesanan WHERE user_id = ? ORDER BY id DESC', [user_id]);
        
        for (let p of pesanan) {
            const [details] = await db.query('SELECT dp.jumlah, m.nama_menu FROM detail_pesanan dp JOIN menu m ON dp.menu_id=m.id WHERE dp.pesanan_id = ?', [p.id]);
            p.menu_list = details.map(d => `${d.jumlah}x ${d.nama_menu}`);
        }

        res.render('pesanan_saya', { pesanan, success: req.query.success });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

module.exports = router;
