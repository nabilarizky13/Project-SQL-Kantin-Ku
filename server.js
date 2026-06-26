const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pool = require('./config/db');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('assets')); // Serve static files from 'assets' directory
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

// Session configuration
app.use(session({
    store: new pgSession({
        pool: pool,
        tableName: 'session',
        createTableIfMissing: true
    }),
    secret: 'kantinku_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));

// Middleware to pass session data to views
app.use((req, res, next) => {
    res.locals.user_id = req.session.user_id;
    res.locals.role = req.session.role;
    res.locals.nama = req.session.nama;
    next();
});

// Routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

app.use('/', authRoutes);
app.use('/', indexRoutes);
app.use('/admin', adminRoutes);

// Helper function equivalent to PHP base_url (can be used in EJS if needed)
app.locals.base_url = (pathPath = '') => {
    return `/${pathPath.replace(/^\//, '')}`;
};

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`<h2>Error:</h2><pre>${err.message}</pre><small>Check Netlify function logs for details.</small>`);
});

if (process.env.NODE_ENV !== 'production' && !process.env.NETLIFY) {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}

module.exports = app;
