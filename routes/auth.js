const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');

router.get('/login.php', (req, res) => res.redirect('/login'));
router.get('/login', (req, res) => {
    if (req.session.user_id) {
        if (req.session.role === 'admin') {
            return res.redirect('/admin');
        } else {
            return res.redirect('/');
        }
    }
    res.render('login', { error: null, success: false });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const { rows } = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        if (rows.length > 0) {
            const user = rows[0];
            const match = await bcrypt.compare(password, user.password.replace('$2y$', '$2a$')); // bcrypt compat for PHP hash
            
            if (match) {
                req.session.user_id = user.id;
                req.session.nama = user.nama;
                req.session.role = user.role;
                return res.render('login', { error: null, success: true, role: user.role, nama: user.nama });
            } else {
                return res.render('login', { error: 'Password salah!', success: false });
            }
        } else {
            return res.render('login', { error: 'Username tidak ditemukan!', success: false });
        }
    } catch (err) {
        console.error(err);
        let errorMsg = 'Terjadi kesalahan sistem.';
        if (err.code === 'ECONNREFUSED') errorMsg = 'Gagal terhubung ke database. Pastikan MySQL di XAMPP sudah menyala.';
        if (err.code === 'ER_BAD_DB_ERROR') errorMsg = 'Database kantinku tidak ditemukan. Pastikan sudah import database.sql.';
        return res.render('login', { error: errorMsg, success: false });
    }
});

router.get('/register.php', (req, res) => res.redirect('/register'));
router.get('/register', (req, res) => {
    if (req.session.user_id) {
        return res.redirect('/');
    }
    res.render('register', { error: null, success: null });
});

router.post('/register', async (req, res) => {
    const { nama, username, password, konfirmasi_password } = req.body;
    if (password !== konfirmasi_password) {
        return res.render('register', { error: 'Password tidak cocok!', success: null });
    }
    try {
        const { rows: cek } = await db.query('SELECT id FROM users WHERE username = $1', [username]);
        if (cek.length > 0) {
            return res.render('register', { error: 'Username sudah digunakan!', success: null });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            await db.query('INSERT INTO users (nama, username, password, role) VALUES ($1, $2, $3, $4)', 
                [nama, username, hashedPassword, 'pelanggan']);
            return res.render('register', { error: null, success: 'Pendaftaran berhasil! Silakan login.' });
        }
    } catch (err) {
        console.error(err);
        let errorMsg = 'Terjadi kesalahan sistem.';
        if (err.code === 'ECONNREFUSED') errorMsg = 'Gagal terhubung ke database. Pastikan MySQL di XAMPP sudah menyala.';
        if (err.code === 'ER_BAD_DB_ERROR') errorMsg = 'Database kantinku tidak ditemukan. Pastikan sudah import database.sql.';
        return res.render('register', { error: errorMsg, success: null });
    }
});

router.get('/logout.php', (req, res) => res.redirect('/logout'));
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;
